define [
  'underscore'
  'backbone'
  './base-relational'
  './server'
  './../collections/servers'
  './../utils/utils'
  'FieldDB'
  'backbonelocalstorage'
], (_, Backbone, BaseRelationalModel, ServerModel, ServersCollection, utils, FieldDB) ->

  # Application Settings Model
  # --------------------------
  #
  # Holds server configuration and (in the future) other stuff.
  # Persisted in the browser using localStorage (Backbone.localStorage)
  #
  # Uses Backbone-relational to facilitate the auto-generation of sub-models
  # and sub-collections. See the `relations` attribute.
  #
  # Also contains the authentication logic.

  class ApplicationSettingsModel extends BaseRelationalModel

    initialize: ->
      fieldDBTempApp = new (FieldDB.App)(@get('fieldDBApplication'))
      fieldDBTempApp.authentication.eventDispatcher = Backbone
      @listenTo Backbone, 'authenticate:login', @authenticate
      @listenTo Backbone, 'authenticate:logout', @logout
      @listenTo Backbone, 'authenticate:register', @register
      @listenTo @, 'change:activeServer', @activeServerChanged
      if @get('activeServer')
        @listenTo @get('activeServer'), 'change:url', @activeServerURLChanged
      if not Modernizr.localstorage
        throw new Error 'localStorage unavailable in this browser, please upgrade.'

      @setVersion()

    # set app version from package.json
    setVersion: ->
      if @get('version') is 'da'
        $.ajax
          url: 'package.json',
          type: 'GET'
          dataType: 'json'
          error: (jqXHR, textStatus, errorThrown) =>
            console.log "Ajax request for package.json threw an error: #{errorThrown}"
          success: (packageDetails, textStatus, jqXHR) =>
            @set 'version', packageDetails.version

    activeServerChanged: ->
      #console.log 'active server has changed says the app settings model'
      if @get('fieldDBApplication')
        @get('fieldDBApplication').website = @get('activeServer').get('website')
        @get('fieldDBApplication').brand = @get('activeServer').get('brand') or @get('activeServer').get('userFriendlyServerName')
        @get('fieldDBApplication').brandLowerCase = @get('activeServer').get('brandLowerCase') or @get('activeServer').get('serverCode')
      return

    activeServerURLChanged: ->
      #console.log 'active server URL has changed says the app settings model'

    getURL: ->
      url = @get('activeServer')?.get('url')
      if url.slice(-1) is '/' then url.slice(0, -1) else url

    getCorpusServerURL: ->
      @get('activeServer')?.get 'corpusUrl'

    getServerCode: ->
      @get('activeServer')?.get 'serverCode'

    authenticateAttemptDone: (taskId) ->
      Backbone.trigger 'longTask:deregister', taskId
      Backbone.trigger 'authenticate:end'


    # Login (a.k.a. authenticate)
    #=========================================================================

    # Attempt to authenticate with the passed-in credentials
    authenticate: (username, password) ->
      if @get('activeServer')?.get('type') is 'FieldDB'
        @authenticateFieldDBAuthService username: username, password: password, authUrl: @get('activeServer')?.get('url')
      else
        @authenticateOLD username: username, password: password

    authenticateOLD: (credentials) ->
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'authenticating', taskId
      BaseRelationalModel.cors.request(
        method: 'POST'
        timeout: 3000
        url: "#{@getURL()}/login/authenticate"
        payload: credentials
        onload: (responseJSON) =>
          @authenticateAttemptDone taskId
          if responseJSON.authenticated is true
            @save
              username: credentials.username
              password: credentials.password
              loggedIn: true
            Backbone.trigger 'authenticate:success'
          else
            Backbone.trigger 'authenticate:fail', responseJSON
        onerror: (responseJSON) =>
          Backbone.trigger 'authenticate:fail', responseJSON
          @authenticateAttemptDone taskId
        ontimeout: =>
          Backbone.trigger 'authenticate:fail', error: 'Request timed out'
          @authenticateAttemptDone taskId
      )

    authenticateFieldDBAuthService: (credentials) =>
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'authenticating', taskId
      if !@get 'fieldDBApplication'
        @set 'fieldDBApplication', FieldDB.FieldDBObject.application
      @get('fieldDBApplication').authentication = @get('fieldDBApplication').authentication || new FieldDB.Authentication()
      @get('fieldDBApplication').authentication.login(credentials).then((promisedResult) =>
        @set
          username: credentials.username,
          password: credentials.password, # TODO dont need this!
          loggedInUser: @get('fieldDBApplication').authentication.user
        @save()
        @authenticateAttemptDone taskId
        return
      , (error) =>
        @authenticateAttemptDone taskId
        return
      ).fail (error) =>
        Backbone.trigger 'authenticate:fail', error
        @authenticateAttemptDone taskId
        return

    # Logout
    #=========================================================================

    logout: ->
      if @get('activeServer')?.get('type') is 'FieldDB'
        @logoutFieldDB()
      else
        @logoutOLD()

    logoutOLD: ->
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'logout', taskId
      BaseRelationalModel.cors.request(
        url: "#{@getURL()}/login/logout"
        method: 'GET'
        timeout: 3000
        onload: (responseJSON) =>
          @authenticateAttemptDone taskId
          if responseJSON.authenticated is false
            @save 'loggedIn', false
            Backbone.trigger 'logout:success'
          else
            Backbone.trigger 'logout:fail'
        onerror: (responseJSON) =>
          @authenticateAttemptDone taskId
          Backbone.trigger 'logout:fail'
        ontimeout: =>
          @authenticateAttemptDone taskId
          Backbone.trigger 'logout:fail', error: 'Request timed out'
      )

    logoutFieldDB: ->
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'logout', taskId
      if !@get 'fieldDBApplication'
        @set 'fieldDBApplication', FieldDB.FieldDBObject.application
      @get('fieldDBApplication').authentication.logout({letClientHandleCleanUp: 'dontReloadWeNeedToCleanUpInDativeClient'}).then(
        (responseJSON) =>
          @set 'fieldDBApplication', null
          @save
            loggedIn: false
            activeFieldDBCorpus: null
            activeFieldDBCorpusTitle: null
          Backbone.trigger 'logout:success'
        ,
        (reason) ->
          Backbone.trigger 'logout:fail', reason.userFriendlyErrors.join ' '
      ).done(=> @authenticateAttemptDone taskId)


    # Check if logged in
    #=========================================================================

    # Check if we are already logged in.
    checkIfLoggedIn: ->
      if @get('activeServer')?.get('type') is 'FieldDB'
        @checkIfLoggedInFieldDB()
      else
        @checkIfLoggedInOLD()

    checkIfLoggedInOLD: ->
      taskId = @guid()
      Backbone.trigger('longTask:register', 'checking if already logged in',
        taskId)
      BaseRelationalModel.cors.request(
        url: "#{@getURL()}/speakers"
        timeout: 3000
        onload: (responseJSON) =>
          @authenticateAttemptDone(taskId)
          if utils.type(responseJSON) is 'array'
            @save 'loggedIn', true
            Backbone.trigger 'authenticate:success'
          else
            @save 'loggedIn', false
            Backbone.trigger 'authenticate:fail'
        onerror: (responseJSON) =>
          @save 'loggedIn', false
          Backbone.trigger 'authenticate:fail', responseJSON
          @authenticateAttemptDone(taskId)
        ontimeout: =>
          @save 'loggedIn', false
          Backbone.trigger 'authenticate:fail', error: 'Request timed out'
          @authenticateAttemptDone(taskId)
      )

    checkIfLoggedInFieldDB: ->
      taskId = @guid()
      Backbone.trigger('longTask:register', 'checking if already logged in',
        taskId)
      FieldDB.Database::resumeAuthenticationSession().then(
        (sessionInfo) =>
          if sessionInfo.ok and sessionInfo.userCtx.name
            @save 'loggedIn', true
            Backbone.trigger 'authenticate:success'
          else
            @save 'loggedIn', false
            Backbone.trigger 'authenticate:fail'
        ,
        (reason) =>
          @save 'loggedIn', false
          Backbone.trigger 'authenticate:fail', reason
      ).done(=> @authenticateAttemptDone taskId)


    # Register a new user
    # =========================================================================

    # `RegisterDialogView` should never allow an OLD registration attempt.
    register: (params) ->
      if @get('activeServer')?.get('type') is 'FieldDB'
        @registerFieldDB params

    registerFieldDB: (params) ->
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'registering a new user', taskId
      params.authUrl = @getURL()
      params.appVersionWhenCreated = "v#{@get('version')}da"
      BaseRelationalModel.cors.request(
        url: "#{@getURL()}/register"
        payload: params
        method: 'POST'
        timeout: 10000 # FieldDB auth can take some time to register a new user ...
        onload: (responseJSON) =>
          @authenticateAttemptDone taskId
          # TODO @cesine: what other kinds of responses to registration requests
          # can the auth service make?
          if responseJSON.user?
            user = responseJSON.user
            Backbone.trigger 'register:success', responseJSON
          else
            Backbone.trigger 'register:fail', responseJSON.userFriendlyErrors
        onerror: (responseJSON) =>
          @authenticateAttemptDone taskId
          Backbone.trigger 'register:fail', 'server responded with error'
        ontimeout: =>
          @authenticateAttemptDone taskId
          Backbone.trigger 'register:fail', 'Request timed out'
      )


    # Backbone-relational stuff
    # =========================================================================
    #
    # This is useful because it auto-creates a model hierachy; e.g.,
    # `@get('activeServer')` returns a `ServerModel` instance and
    # `@get('servers')` returns a `ServerCollection` instance.
    #
    # See http://backbonerelational.org/#RelationalModel-relations

    idAttribute: 'id'

    relations: [
        type: Backbone.HasMany
        key: 'servers'
        relatedModel: ServerModel
        collectionType: ServersCollection
        includeInJSON: ['id', 'name', 'type', 'url', 'serverCode', 'corpusServerURL']
        reverseRelation:
          key: 'applicationSettings'
      ,
        type: Backbone.HasOne
        key: 'activeServer'
        relatedModel: ServerModel
        includeInJSON: 'id'
      #,
      #  type: Backbone.HasMany
      #  key: 'fieldDBCorpora'
      #  relatedModel: CorpusModel
    ]

    # Defaults
    #=========================================================================

    defaults: ->

      server1 = new FieldDB.Connection(FieldDB.Connection.defaultConnection('localhost') ) ;
      server1.id = @guid()
      server1.type = 'FieldDB'
      server1.name = server1.userFriendlyServerName

      server2 =
        id: @guid()
        name: 'OLD Local Development'
        type: 'OLD'
        website: 'http://www.onlinelinguisticdatabase.org'
        url: 'http://127.0.0.1:5000'
        serverCode: null
        corpusServerURL: null

      server3 = new FieldDB.Connection(FieldDB.Connection.defaultConnection('lingsync') ) ;
      server3.id = @guid()
      server3.type = 'FieldDB'
      server3.name = server3.userFriendlyServerName

      server4 =
        id: @guid()
        name: 'OLD'
        type: 'OLD'
        website: 'http://www.onlinelinguisticdatabase.org'
        url: 'http://www.onlinelinguisticdatabase.org'
        serverCode: null
        corpusServerURL: null

      servers = [server3, server4]
      if window.location.hostname is "localhost"
        servers = [server1, server2, server3, server4]

      id: @guid()
      activeServer: servers[0].id
      loggedIn: false
      loggedInUser: null
      loggedInUserRoles: []
      baseDBURL: null
      username: ''
      password: '' # TODO trigger authenticate:mustconfirmidentity instead of storing the password in localStorage
      servers: servers
      serverTypes: ['FieldDB', 'OLD']
      fieldDBServerCodes: [
        'localhost'
        'testing'
        'beta'
        'production'
        'mcgill'
        'concordia'
        'dyslexdisorth'
      ]

      activeFieldDBCorpus: null
      activeFieldDBCorpusTitle: null

      formsDisplaySettings:
        itemsPerPage: 5
        primaryDataLabelsVisible: true
        allFormsExpanded: false

      subcorporaDisplaySettings:
        itemsPerPage: 10
        primaryDataLabelsVisible: true
        allSubcorporaExpanded: false

      phonologiesDisplaySettings:
        itemsPerPage: 3
        primaryDataLabelsVisible: true
        allPhonologiesExpanded: false

      morphologiesDisplaySettings:
        itemsPerPage: 3
        primaryDataLabelsVisible: true
        allMorphologiesExpanded: false

      activeJQueryUITheme: 'cupertino'
      defaultJQueryUITheme: 'cupertino'
      jQueryUIThemes: [
        ['ui-lightness', 'UI lightness']
        ['ui-darkness', 'UI darkness']
        ['smoothness', 'Smoothness']
        ['start', 'Start']
        ['redmond', 'Redmond']
        ['sunny', 'Sunny']
        ['overcast', 'Overcast']
        ['le-frog', 'Le Frog']
        ['flick', 'Flick']
        ['pepper-grinder', 'Pepper Grinder']
        ['eggplant', 'Eggplant']
        ['dark-hive', 'Dark Hive']
        ['cupertino', 'Cupertino']
        ['south-street', 'South Street']
        ['blitzer', 'Blitzer']
        ['humanity', 'Humanity']
        ['hot-sneaks', 'Hot Sneaks']
        ['excite-bike', 'Excite Bike']
        ['vader', 'Vader']
        ['dot-luv', 'Dot Luv']
        ['mint-choc', 'Mint Choc']
        ['black-tie', 'Black Tie']
        ['trontastic', 'Trontastic']
        ['swanky-purse', 'Swanky Purse']
      ]

      version: 'da'

      # These objects control how particular FieldDB form (i.e., datum) fields
      # are displayed. Note that FieldDB datumFields can be arbitrarily defined
      # by users so these fields may not all be present. This simply causes these
      # fields to be ordered (in both display and input views) as shown here,
      # if the fields exist. This will need to be made user-configurable and
      # corpus-specific in the future.
      fieldDBFormCategories:

        grammaticality: [
          'judgement'
        ]

        # IGT FieldDB form attributes.
        # The returned array defines the "IGT" attributes of a FieldDB form (along
        # with their order). These are those that will be aligned into columns of
        # one word each when displayed in an IGT view.
        igt: [
          'utterance'
          'morphemes'
          'gloss'
        ]

        translation: [
          'translation'
        ]

        # Secondary FieldDB form attributes.
        # The returned array defines the order of how the secondary attributes are
        # displayed. It is defined in models/application-settings because it should
        # ultimately be user-configurable.
        # QUESTION: @cesine: how is the elicitor of a FieldDB datum/session
        # documented?
        secondary: [
          'syntacticCategory'
          'comments'
          'tags'
          'dateElicited'
          'language'
          'dialect'
          'consultants'
          'enteredByUser'
          'dateEntered'
          'modifiedByUser'
          'dateModified'
          'syntacticTreeLatex'
          'validationStatus'
        ]

        readonly: [
          'enteredByUser'
          'dateEntered'
          'modifiedByUser'
          'dateModified'
        ]

      # These objects are valuated by arrays that determine how OLD form fields
      # are displayed. Note that the OLD case is simpler than the FieldDB one
      # since the OLD data structure is (at present) fixed.
      oldFormCategories:

        grammaticality: [
          'grammaticality'
        ]

        # IGT OLD Form Attributes.
        igt: [
          'narrow_phonetic_transcription'
          'phonetic_transcription'
          'transcription'
          'morpheme_break'
          'morpheme_gloss'
        ]

        # Note: this is currently not being used (just being consistent with
        # FieldDB above.)
        translation: [
          'translations'
        ]

        # Secondary OLD Form Attributes.
        secondary: [
          'syntactic_category_string'
          'break_gloss_category'
          'comments'
          'speaker_comments'
          'elicitation_method'
          'tags'
          'syntactic_category'
          'date_elicited'
          'speaker'
          'elicitor'
          'enterer'
          'datetime_entered'
          'modifier'
          'datetime_modified'
          'verifier'
          'source'
          #'files'
          #'collections'
          'syntax'
          'semantics'
          'status'
          'UUID'
          'id'
        ]

        readonly: [
          'syntactic_category_string'
          'break_gloss_category'
          'enterer'
          'datetime_entered'
          'modifier'
          'datetime_modified'
          'UUID'
          'id'
        ]


  # Backbone-relational requires this when using CoffeeScript
  ApplicationSettingsModel.setup()

