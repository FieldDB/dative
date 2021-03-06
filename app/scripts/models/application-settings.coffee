define [
  './base'
  './server'
  './parser-task-set'
  './keyboard-preference-set'
  './morphology'
  './language-model'
  './../collections/servers'
  './../utils/utils'
  './../utils/globals'
  # 'FieldDB'
], (BaseModel, ServerModel, ParserTaskSetModel, KeyboardPreferenceSetModel,
  MorphologyModel, LanguageModelModel, ServersCollection, utils, globals) ->

  # Application Settings Model
  # --------------------------
  #
  # Holds Dative's application settings. Persisted in the browser using
  # localStorage.
  #
  # Also contains the authentication logic.

  class ApplicationSettingsModel extends BaseModel

    modelClassName2model:
      'MorphologyModel': MorphologyModel
      'LanguageModelModel': LanguageModelModel

    initialize: ->
      @fetch()
      # fieldDBTempApp = new (FieldDB.App)(@get('fieldDBApplication'))
      # fieldDBTempApp.authentication.eventDispatcher = Backbone
      @listenTo Backbone, 'authenticate:login', @authenticate
      @listenTo Backbone, 'authenticate:logout', @logout
      @listenTo Backbone, 'authenticate:register', @register
      @listenTo @, 'change:activeServer', @activeServerChanged
      if @get('activeServer')
        activeServer = @get 'activeServer'
        if activeServer instanceof ServerModel
          @listenTo activeServer, 'change:url', @activeServerURLChanged
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
          error: (jqXHR, textStatus, errorThrown) ->
            console.log "Ajax request for package.json threw an error:
              #{errorThrown}"
          success: (packageDetails, textStatus, jqXHR) =>
            @set 'version', packageDetails.version

    activeServerChanged: ->
      #console.log 'active server has changed says the app settings model'
      if @get('fieldDBApplication')
        @get('fieldDBApplication').website = @get('activeServer').get('website')
        @get('fieldDBApplication').brand = @get('activeServer').get('brand') or
          @get('activeServer').get('userFriendlyServerName')
        @get('fieldDBApplication').brandLowerCase =
          @get('activeServer').get('brandLowerCase') or
            @get('activeServer').get('serverCode')

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
        @authenticateFieldDBAuthService
          username: username
          password: password
          authUrl: @get('activeServer')?.get('url')
      else
        @authenticateOLD username: username, password: password

    authenticateOLD: (credentials) ->
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'authenticating', taskId
      Backbone.trigger 'authenticateStart'
      @constructor.cors.request(
        method: 'POST'
        timeout: 20000
        url: "#{@getURL()}/login/authenticate"
        payload: credentials
        onload: (responseJSON) =>
          @authenticateAttemptDone taskId
          Backbone.trigger 'authenticateEnd'
          if responseJSON.authenticated is true
            @set
              username: credentials.username
              loggedIn: true
              loggedInUser: responseJSON.user
              homepage: responseJSON.homepage
            @save()
            Backbone.trigger 'authenticateSuccess'
          else
            Backbone.trigger 'authenticateFail', responseJSON
        onerror: (responseJSON) =>
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateFail', responseJSON
          @authenticateAttemptDone taskId
        ontimeout: =>
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateFail', error: 'Request timed out'
          @authenticateAttemptDone taskId
      )

    authenticateFieldDBAuthService: (credentials) =>
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'authenticating', taskId
      Backbone.trigger 'authenticateStart'
      if not @get 'fieldDBApplication'
        @set 'fieldDBApplication', FieldDB.FieldDBObject.application
      if not @get('fieldDBApplication').authentication or not @get('fieldDBApplication').authentication.login
        @get('fieldDBApplication').authentication = new FieldDB.Authentication()
      @get('fieldDBApplication').authentication.login(credentials).then(
        (promisedResult) =>
          @set
            username: credentials.username,
            password: credentials.password, # TODO dont need this!
            loggedInUser: @get('fieldDBApplication').authentication.user
          @save()
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateSuccess'
          @authenticateAttemptDone taskId
      ,
        (error) =>
          @authenticateAttemptDone taskId
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateFail', responseJSON.userFriendlyErrors
      ).fail (error) =>
        Backbone.trigger 'authenticateEnd'
        Backbone.trigger 'authenticateFail', error: 'Request timed out'
        @authenticateAttemptDone taskId

    # This is the to-be-deprecated version that has been made obsolete by
    # `authenticateFieldDBAuthService` above.
    authenticateFieldDBAuthService_: (credentials) =>
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'authenticating', taskId
      Backbone.trigger 'authenticateStart'
      @constructor.cors.request(
        method: 'POST'
        timeout: 20000
        url: "#{@getURL()}/login"
        payload: credentials
        onload: (responseJSON) =>
          if responseJSON.user
            # Remember the corpusServiceURL so we can logout.
            @get('activeServer')?.set(
              'corpusServerURL', @getFieldDBBaseDBURL(responseJSON.user))
            @set
              baseDBURL: @getFieldDBBaseDBURL(responseJSON.user)
              username: credentials.username,
              password: credentials.password,
              gravatar: responseJSON.user.gravatar,
              loggedInUser: responseJSON.user
            @save()
            credentials.name = credentials.username
            @authenticateFieldDBCorpusService credentials, taskId
          else
            Backbone.trigger 'authenticateFail', responseJSON.userFriendlyErrors
            @authenticateAttemptDone taskId
        onerror: (responseJSON) =>
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateFail', responseJSON
          @authenticateAttemptDone taskId
        ontimeout: =>
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateFail', error: 'Request timed out'
          @authenticateAttemptDone taskId
      )

    authenticateFieldDBCorpusService: (credentials, taskId) ->
      @constructor.cors.request(
        method: 'POST'
        timeout: 3000
        url: "#{@get('baseDBURL')}/_session"
        payload: credentials
        onload: (responseJSON) =>
          # TODO @jrwdunham: this responseJSON has a roles Array attribute which
          # references more corpora than I'm seeing from the `corpusteam`
          # request. Why the discrepancy?
          Backbone.trigger 'authenticateEnd'
          @authenticateAttemptDone taskId
          if responseJSON.ok
            @set
              loggedIn: true
              loggedInUserRoles: responseJSON.roles
            @save()
            Backbone.trigger 'authenticateSuccess'
          else
            Backbone.trigger 'authenticateFail', responseJSON
        onerror: (responseJSON) =>
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateFail', responseJSON
          @authenticateAttemptDone taskId
        ontimeout: =>
          Backbone.trigger 'authenticateEnd'
          Backbone.trigger 'authenticateFail', error: 'Request timed out'
          @authenticateAttemptDone taskId
      )

    localStorageKey: 'dativeApplicationSettings'

    # An extremely simple re-implementation of `save`: we just JSON-ify the app
    # settings and store them in localStorage.
    save: ->
      localStorage.setItem @localStorageKey,
        JSON.stringify(@attributes)

    # Fetching means simply getting the app settings JSON object from
    # localStorage and setting it to the present model. Certain attributes are
    # evaluated to other Backbone models; handling this conversion is the job
    # of `backbonify`.
    fetch: (options) ->
      if localStorage.getItem @localStorageKey
        applicationSettingsObject =
          JSON.parse(localStorage.getItem(@localStorageKey))
        applicationSettingsObject = @fix applicationSettingsObject
        applicationSettingsObject = @backbonify applicationSettingsObject
        @set applicationSettingsObject
        @usingDefaults = false
      else
        @usingDefaults = true
        @save()

    # Fix the application settings, if necessary. This is necessary when Dative
    # has been updated but the user's application settings object, as persisted
    # in their `localStorage`, was built using an older version of Dative. If
    # the app settings are out-of-date, then Dative may break.
    # Note: `aso` is the Application Settings Object.
    # The `ns` (namespace) param is good for debugging.
    fix: (aso, defaults=null, ns='') ->
      defaults = defaults or @defaults()
      if 'attributes' of defaults
        defaults = defaults.attributes
      for attr, defval of defaults
        if attr not of aso
          aso[attr] = defval
        # Recursively call `@fix` if the default val is an object.
        else if ((@utils.type(defval) == 'object') and
        not ((defval instanceof Backbone.Model) or
        (defval instanceof Backbone.Collection)))
          aso[attr] = @fix aso[attr], defval, "#{ns}.#{attr}"
      for attr of aso
        if attr not of defaults
          delete aso[attr]
      return aso

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
      Backbone.trigger 'logoutStart'
      @constructor.cors.request(
        url: "#{@getURL()}/login/logout"
        method: 'GET'
        timeout: 3000
        onload: (responseJSON, xhr) =>
          @authenticateAttemptDone taskId
          Backbone.trigger 'logoutEnd'
          if responseJSON.authenticated is false or
          (xhr.status is 401 and
          responseJSON.error is "Authentication is required to access this
          resource.")
            @set loggedIn: false, homepage: null
            @save()
            Backbone.trigger 'logoutSuccess'
          else
            Backbone.trigger 'logoutFail'
        onerror: (responseJSON) =>
          Backbone.trigger 'logoutEnd'
          @authenticateAttemptDone taskId
          Backbone.trigger 'logoutFail'
        ontimeout: =>
          Backbone.trigger 'logoutEnd'
          @authenticateAttemptDone taskId
          Backbone.trigger 'logoutFail', error: 'Request timed out'
      )

    logoutFieldDB: ->
      taskId = @guid()
      Backbone.trigger 'longTask:register', 'logout', taskId
      Backbone.trigger 'logoutStart'
      if not @get 'fieldDBApplication'
        @set 'fieldDBApplication', FieldDB.FieldDBObject.application
      # TODO: @cesine: I'm getting "`authentication.logout` is not a function"
      # errors here ...
      @get('fieldDBApplication').authentication
        .logout({letClientHandleCleanUp: 'dontReloadWeNeedToCleanUpInDativeClient'})
        .then(
          (responseJSON) =>
            @set
              fieldDBApplication: null
              loggedIn: false
              activeFieldDBCorpus: null
              activeFieldDBCorpusTitle: null
            @save()
            Backbone.trigger 'logoutSuccess'
        ,
          (reason) ->
            Backbone.trigger 'logoutFail', reason.userFriendlyErrors.join ' '
      ).done(
        =>
          Backbone.trigger 'logoutEnd'
          @authenticateAttemptDone taskId
      )

    # Check if logged in
    #=========================================================================

    # Check if we are already logged in.
    checkIfLoggedIn: ->
      if @get('activeServer')?.get('type') is 'FieldDB'
        @checkIfLoggedInFieldDB()
      else
        @checkIfLoggedInOLD()

    # Check with the OLD if we are logged in. We ask for the speakers. and
    # trigger 'authenticateFail' if we can't get them.
    checkIfLoggedInOLD: ->
      taskId = @guid()
      Backbone.trigger('longTask:register', 'checking if already logged in',
        taskId)
      @constructor.cors.request(
        url: "#{@getURL()}/speakers"
        timeout: 3000
        onload: (responseJSON) =>
          @authenticateAttemptDone(taskId)
          if utils.type(responseJSON) is 'array'
            @set 'loggedIn', true
            @save()
            Backbone.trigger 'authenticateSuccess'
          else
            @set 'loggedIn', false
            @save()
            Backbone.trigger 'authenticateFail'
        onerror: (responseJSON) =>
          @set 'loggedIn', false
          @save()
          Backbone.trigger 'authenticateFail', responseJSON
          @authenticateAttemptDone(taskId)
        ontimeout: =>
          @set 'loggedIn', false
          @save()
          Backbone.trigger 'authenticateFail', error: 'Request timed out'
          @authenticateAttemptDone(taskId)
      )

    checkIfLoggedInFieldDB: ->
      taskId = @guid()
      Backbone.trigger('longTask:register', 'checking if already logged in',
        taskId)
      FieldDB.Database::resumeAuthenticationSession().then(
        (sessionInfo) =>
          if sessionInfo.ok and sessionInfo.userCtx.name
            @set 'loggedIn', true
            @save()
            Backbone.trigger 'authenticateSuccess'
          else
            @set 'loggedIn', false
            @save()
            Backbone.trigger 'authenticateFail'
        ,
        (reason) =>
          @set 'loggedIn', false
          @save()
          Backbone.trigger 'authenticateFail', reason
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
      @constructor.cors.request(
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


    idAttribute: 'id'

    # Transform certain attribute values of the `appSetObj`
    # object into Backbone collections/models and return the `appSetObj`.
    backbonify: (appSetObj) ->

      serverModelsArray = ((new ServerModel(s)) for s in appSetObj.servers)
      appSetObj.servers = new ServersCollection(serverModelsArray)
      activeServer = appSetObj.activeServer
      if activeServer
        appSetObj.activeServer = appSetObj.servers.get activeServer.id

      longRunningTasks = appSetObj.longRunningTasks
      for task in appSetObj.longRunningTasks
        task.resourceModel =
          new @modelClassName2model[task.modelClassName](task.resourceModel)
      for task in appSetObj.longRunningTasksTerminated
        task.resourceModel =
          new @modelClassName2model[task.modelClassName](task.resourceModel)

      appSetObj.parserTaskSet = new ParserTaskSetModel(appSetObj.parserTaskSet)

      appSetObj.keyboardPreferenceSet =
        new KeyboardPreferenceSetModel(appSetObj.keyboardPreferenceSet)

      appSetObj

    ############################################################################
    # Defaults
    ############################################################################

    defaults: ->

      # Default servers are provided at runtime using servers.json
      server =
        new ServerModel
          id: @guid()
          name: 'OLD Local Development'
          type: 'OLD'
          url: 'http://127.0.0.1:5000'
          serverCode: null
          corpusServerURL: null
          website: 'http://www.onlinelinguisticdatabase.org'

      servers = new ServersCollection([server])

      parserTaskSetModel = new ParserTaskSetModel()

      keyboardPreferenceSetModel = new KeyboardPreferenceSetModel()

      id: @guid()
      activeServer: servers.at 0
      loggedIn: false
      loggedInUser: null
      loggedInUserRoles: []

      # An OLD will send an object representing the home page when a user
      # successfully logs in, if there is such a page named 'home'.
      homepage: null

      baseDBURL: null
      username: ''

      # This gets set to `true` as soon as the user makes modifications to the
      # list of servers. This allows us to avoid over-writing the
      # user-specified servers with those supplied by Dative in servers.json.
      serversModified: false

      # This contains the array of objects contstituting the last set of
      # servers that Dative has sent us. We use this to decide whether to
      # prompt/annoy the user to merge these servers into their own.
      lastSeenServersFromDative: null

      servers: servers
      # serverTypes: ['FieldDB', 'OLD']
      serverTypes: ['OLD']
      fieldDBServerCodes: [
        'localhost'
        'testing'
        'beta'
        'production'
        'mcgill'
        'concordia'
        'dyslexdisorth'
      ]

      # TODO: remove the activeFieldDBCorpusTitle and related attributes. We
      # should simply store a real `CorpusModel` as the value of
      # `activeFieldDBCorpus`. Note that `AppView` adds
      # `activeFieldDBCorpusModel` and stores a Backbone model there. This all
      # needs to be cleaned up.
      activeFieldDBCorpus: null
      activeFieldDBCorpusTitle: null

      languagesDisplaySettings:
        itemsPerPage: 100
        dataLabelsVisible: true
        allFormsExpanded: false

      formsDisplaySettings:
        itemsPerPage: 10
        dataLabelsVisible: false
        allFormsExpanded: false

      subcorporaDisplaySettings:
        itemsPerPage: 10
        dataLabelsVisible: true
        allSubcorporaExpanded: false

      phonologiesDisplaySettings:
        itemsPerPage: 1
        dataLabelsVisible: true
        allPhonologiesExpanded: false

      morphologiesDisplaySettings:
        itemsPerPage: 1
        dataLabelsVisible: true
        allMorphologiesExpanded: false

      activeJQueryUITheme: 'pepper-grinder'
      defaultJQueryUITheme: 'pepper-grinder'
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

      # Use this to limit how many "long-running" tasks can be initiated from
      # within the app. A "long-running task" is a request to the server that
      # requires polling to know when it has terminated, e.g., phonology
      # compilation, morphology generation and compilation, etc.
      # NOTE !IMPORTANT: the OLD has a single foma worker and all requests to
      # compile FST-based resources appear to enter into a queue. This means
      # that a 3s request made while a 1h request is ongoing will take 1h1s!
      # Not good ...
      longRunningTasksMax: 2

      # An array of objects with keys `resourceName`, `taskName`,
      # `taskStartTimestamp`, and `taskPreviousUUID`.
      longRunningTasks: []

      # An array of objects with keys `resourceName`, `taskName`,
      # `taskStartTimestamp`, and `taskPreviousUUID`.
      longRunningTasksTerminated: []

      # IME types that can be uploaded (to an OLD server, at least).
      # TODO: this should be expanded and/or made backend-specific.
      allowedFileTypes: [
        'application/pdf'
        'image/gif'
        'image/jpeg'
        'image/png'
        'audio/mpeg'
        'audio/mp3'
        'audio/ogg'
        'audio/x-wav'
        'audio/wav'
        'video/mpeg'
        'video/mp4'
        'video/ogg'
        'video/quicktime'
        'video/x-ms-wmv'
      ]

      version: 'da'

      parserTaskSet: parserTaskSetModel

      keyboardPreferenceSet: keyboardPreferenceSetModel

      # This object contains metadata about Dative resources, i.e., forms,
      # files, etc.
      # TODO: resource display settings (e.g., `formsDisplaySettings` above)
      # should be migrated here.
      resources:

        forms:

          # Array of form attributes that are "sticky", i.e., that will stick
          # around and whose values in the most recent add request will be the
          # defaults for subsequent add requests.
          stickyAttributes: []

          # Array of form attributes that *may* be specified as "sticky".
          possiblyStickyAttributes: [
            'date_elicited'
            'elicitation_method'
            'elicitor'
            'source'
            'speaker'
            'status'
            'syntactic_category'
            'tags'
          ]

          # This will be populated by the resources collection upon successful
          # add requests. It will map attribute names in `stickyAttributes`
          # above to their values in the most recent successful add request.
          pastValues: {}

          # These objects define metadata on the fields of form resources.
          # Note that there are separate metadata objects for OLD fields and
          # for FieldDB fields.
          fieldsMeta:

            OLD:

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

              # Note: this is currently not being used (just being consistent
              # with the FieldDB `fieldsMeta` object below)
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
                'files'
                #'collections' # Does the OLD provide the collections when the forms resource is fetched?
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

              # This array may contain the names of OLD form attributes that should
              # be hidden. This is the (for now only client-side-stored) data
              # structure that users manipulate in the settings widget of a
              # `FormView` instance.
              hidden: [
                'narrow_phonetic_transcription'
                'phonetic_transcription'
                'verifier'
              ]

            FieldDB:

              # This is the set of form attributes that are considered by
              # Dative to denote grammaticalities.
              grammaticality: [
                'judgement'
              ]

              # IGT FieldDB form attributes.
              # The returned array defines the "IGT" attributes of a FieldDB
              # form (along with their order). These are those that are aligned
              # into columns of one word each when displayed in an IGT view.
              igt: [
                'utterance'
                'morphemes'
                'gloss'
              ]

              # This is the set of form attributes that are considered by
              # Dative to denote a translation.
              translation: [
                'translation'
              ]

              # Secondary FieldDB form attributes.
              # The returned array defines the order of how the secondary
              # attributes are displayed. It is defined in
              # models/application-settings because it should ultimately be
              # user-configurable.
              # QUESTION: @cesine: how is the elicitor of a FieldDB
              # datum/session documented?
              # TODO: `audioVideo`, `images`
              secondary: [
                'syntacticCategory'
                'comments'
                'tags'
                'dateElicited' # session field
                'language' # session field
                'dialect' # session field
                'consultants' # session field
                'enteredByUser'
                'dateEntered'
                'modifiedByUser'
                'dateModified'
                'syntacticTreeLatex'
                'validationStatus'
                'timestamp' # make this visible?
                'id'
              ]

              # These read-only fields will not be given input fields in
              # add/update interfaces.
              readonly: [
                'enteredByUser'
                'dateEntered'
                'modifiedByUser'
                'dateModified'
              ]

