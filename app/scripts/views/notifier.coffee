define [
  './base'
  './notification'
  './../utils/globals'
  './../templates/notifier'
], (BaseView, NotificationView, globals, notifierTemplate) ->

  # Notifier
  # --------
  #
  # Handler for creating, displaying, hiding, and destroying notifications.

  class NotifierView extends BaseView

    template: notifierTemplate

    initialize: ->

      @crudResources = [
        'form'
        'file'
        'subcorpus'
        'phonology'
        'morphology'
        'languageModel'
        'morphologicalParser'
        'search'
        'user'
      ]
      @crudRequests = ['add', 'update', 'destroy']
      @crudOutcomes = ['Success', 'Fail']
      @notifications = []
      @maxNotifications = 3
      @listenToEvents()

    listenToEvents: ->

      @listenTo Backbone, 'authenticateFail', @authenticateFail
      @listenTo Backbone, 'authenticateSuccess', @authenticateSuccess

      @listenTo Backbone, 'logoutFail', @logoutFail
      @listenTo Backbone, 'logoutSuccess', @logoutSuccess

      @listenTo Backbone, 'register:fail', @registerFail
      @listenTo Backbone, 'register:success', @registerSuccess

      @listenTo Backbone, 'fetchHistoryFormFail', @fetchHistoryFormFail
      @listenTo Backbone, 'fetchHistoryFormFailNoHistory',
        @fetchHistoryFormFailNoHistory

      @listenTo Backbone, 'newResourceOnLastPage', @newResourceOnLastPage

      @listenTo Backbone, 'morphologicalParseFail', @morphologicalParseFail
      @listenTo Backbone, 'morphologicalParseSuccess',
        @morphologicalParseSuccess
      @listenTo Backbone, 'morphologicalParserGenerateAndCompileFail',
        @morphologicalParserGenerateAndCompileFail
      @listenTo Backbone, 'morphologicalParserGenerateAndCompileSuccess',
        @morphologicalParserGenerateAndCompileSuccess

      @listenTo Backbone, 'phonologyApplyDownFail', @phonologyApplyDownFail
      @listenTo Backbone, 'phonologyApplyDownSuccess',
        @phonologyApplyDownSuccess
      @listenTo Backbone, 'phonologyCompileFail', @phonologyCompileFail
      @listenTo Backbone, 'phonologyCompileSuccess', @phonologyCompileSuccess
      @listenTo Backbone, 'phonologyRunTestsFail', @phonologyRunTestsFail
      @listenTo Backbone, 'phonologyRunTestsSuccess', @phonologyRunTestsSuccess
      @listenTo Backbone, 'phonologyServeCompiledFail', @phonologyServeCompiledFail
      @listenTo Backbone, 'phonologyServeCompiledSuccess', @phonologyServeCompiledSuccess

      @listenTo Backbone, 'morphologyGenerateAndCompileFail', @morphologyGenerateAndCompileFail
      @listenTo Backbone, 'morphologyCompileFail', @morphologyCompileFail
      @listenTo Backbone, 'morphologyCompileSuccess', @morphologyCompileSuccess

      @listenTo Backbone, 'formSearchSuccess', @formSearchSuccess
      @listenTo Backbone, 'formSearchFail', @formSearchFail
      @listenTo Backbone, 'fileSearchFail', @fileSearchFail

      @listenTo Backbone, 'corpusCountSuccess', @corpusCountSuccess
      @listenTo Backbone, 'corpusCountFail', @corpusCountFail
      @listenTo Backbone, 'corpusBrowseSuccess', @corpusBrowseSuccess
      @listenTo Backbone, 'corpusBrowseFail', @corpusBrowseFail

      @listenTo Backbone, 'cantDeleteFilterExpressionOnlyChild',
        @cantDeleteFilterExpressionOnlyChild

      @listenTo Backbone, 'disabledKeyboardShortcut', @disabledKeyboardShortcut

      @listenTo Backbone, 'generateAndCompileStart', @generateAndCompileStart
      @listenTo Backbone, 'tooManyTasks', @tooManyTasks
      @listenTo Backbone, 'taskAlreadyPending', @taskAlreadyPending

      @listenTo Backbone, 'fileSelectForbiddenType', @fileSelectForbiddenType
      @listenTo Backbone, 'fileSelectInvalidName', @fileSelectInvalidName
      @listenTo Backbone, 'fileSelectError', @fileSelectError

      @listenToCRUDResources()

    listenToCRUDResources: ->

      for resource in @crudResources
        for request in @crudRequests
          for outcome in @crudOutcomes
            event = "#{request}#{@utils.capitalize resource}#{outcome}"
            @listenTo Backbone, event, @[event]

    render: ->
      @$el.html @template()
      @

    renderNotification: (notification) ->
      @listenTo notification, 'notifierRendered', @closeOldNotifications
      @listenTo notification, 'destroySelf', @closeNotification
      @$('.notifications-container').append notification.render().el
      @rendered notification
      @notifications.push notification

    closeOldNotifications: ->
      while @notifications.length > @maxNotifications
        oldNotification = @notifications.shift()
        @closeNotification oldNotification

    closeNotification: (notification) ->
      notification.$el.slideUp()
      notification.close()
      @closed notification


    ############################################################################
    # Forms
    ############################################################################

    getFormId: (formModel) ->
      id = formModel.get 'id'
      activeServerType = globals
        .applicationSettings.get('activeServer').get 'type'
      if activeServerType is 'FieldDB' then id = id[-7..]
      id

    addFormSuccess: (formModel) ->
      notification = new NotificationView
        title: 'Form created'
        content: "You have successfully created a new form. Its id is
          #{@getFormId formModel}."
      @renderNotification notification

    updateFormSuccess: (formModel) ->
      notification = new NotificationView
        title: 'Form updated'
        content: "You have successfully updated form #{@getFormId formModel}."
      @renderNotification notification

    addUpdateFormFail: (error, type) ->
      if error
        content = "Your form #{type} request was unsuccessful. #{error}"
      else
        content = "Your form #{type} request was unsuccessful. See the error
          message(s) beneath the input fields."
      notification = new NotificationView
        title: "Form #{type} failed"
        content: content
        type: 'error'
      @renderNotification notification

    addFormFail: (error) ->
      @addUpdateFormFail error, 'creation'

    updateFormFail: (error) ->
      @addUpdateFormFail error, 'update'

    destroyFormFail: (error) ->
      notification = new NotificationView
        title: 'Form deletion failed'
        content: "Your form creation request was unsuccessful. #{error}"
        type: 'error'
      @renderNotification notification

    destroyFormSuccess: (formModel) ->
      notification = new NotificationView
        title: 'Form deleted'
        content: "You have successfully deleted the form with id
          #{@getFormId formModel}."
      @renderNotification notification


    ############################################################################
    # Files: add, update, & destroy notifications
    ############################################################################

    addFileSuccess: (model) -> @addResourceSuccess model, 'file'
    addFileFail: (error) -> @addResourceFail error, 'file'
    updateFileSuccess: (model) -> @updateResourceSuccess model, 'file'
    updateFileFail: (error) -> @updateResourceFail error, 'file'
    destroyFileFail: (error) -> @destroyResourceFail error, 'file'
    destroyFileSuccess: (model) -> @destroyResourceSuccess model, 'file'

    ############################################################################
    # Subcorpora: add, update, & destroy notifications
    ############################################################################

    addSubcorpusSuccess: (model) -> @addResourceSuccess model, 'subcorpus'
    addSubcorpusFail: (error) -> @addResourceFail error, 'subcorpus'
    updateSubcorpusSuccess: (model) -> @updateResourceSuccess model, 'subcorpus'
    updateSubcorpusFail: (error) -> @updateResourceFail error, 'subcorpus'
    destroySubcorpusFail: (error) -> @destroyResourceFail error, 'subcorpus'
    destroySubcorpusSuccess: (model) ->
      @destroyResourceSuccess model, 'subcorpus'

    ############################################################################
    # Phonologies: add, update, & destroy notifications
    ############################################################################

    addPhonologySuccess: (model) -> @addResourceSuccess model, 'phonology'
    addPhonologyFail: (error) -> @addResourceFail error, 'phonology'
    updatePhonologySuccess: (model) -> @updateResourceSuccess model, 'phonology'
    updatePhonologyFail: (error) -> @updateResourceFail error, 'phonology'
    destroyPhonologyFail: (error) -> @destroyResourceFail error, 'phonology'
    destroyPhonologySuccess: (model) ->
      @destroyResourceSuccess model, 'phonology'

    ############################################################################
    # Morphologies: add, update, & destroy notifications
    ############################################################################

    addMorphologySuccess: (model) -> @addResourceSuccess model, 'morphology'
    addMorphologyFail: (error) -> @addResourceFail error, 'morphology'
    updateMorphologySuccess: (model) ->
      @updateResourceSuccess model, 'morphology'
    updateMorphologyFail: (error) -> @updateResourceFail error, 'morphology'
    destroyMorphologyFail: (error) -> @destroyResourceFail error, 'morphology'
    destroyMorphologySuccess: (model) ->
      @destroyResourceSuccess model, 'morphology'

    ############################################################################
    # Language models: add, update, & destroy notifications
    ############################################################################

    addLanguageModelSuccess: (model) ->
      @addResourceSuccess model, 'language model'
    addLanguageModelFail: (error) ->
      @addResourceFail error, 'language model'
    updateLanguageModelSuccess: (model) ->
      @updateResourceSuccess model, 'language model'
    updateLanguageModelFail: (error) ->
      @updateResourceFail error, 'language model'
    destroyLanguageModelFail: (error) ->
      @destroyResourceFail error, 'language model'
    destroyLanguageModelSuccess: (model) ->
      @destroyResourceSuccess model, 'language model'

    ############################################################################
    # Morphological parsers: add, update, & destroy notifications
    ############################################################################

    addMorphologicalParserSuccess: (model) ->
      @addResourceSuccess model, 'morphological parser'
    addMorphologicalParserFail: (error) ->
      @addResourceFail error, 'morphological parser'
    updateMorphologicalParserSuccess: (model) ->
      @updateResourceSuccess model, 'morphological parser'
    updateMorphologicalParserFail: (error) ->
      @updateResourceFail error, 'morphological parser'
    destroyMorphologicalParserFail: (error) ->
      @destroyResourceFail error, 'morphological parser'
    destroyMorphologicalParserSuccess: (model) ->
      @destroyResourceSuccess model, 'morphological parser'

    ############################################################################
    # Searches: add, update, & destroy notifications
    ############################################################################

    addSearchSuccess: (model) -> @addResourceSuccess model, 'search'
    addSearchFail: (error) -> @addResourceFail error, 'search'
    updateSearchSuccess: (model) ->
      @updateResourceSuccess model, 'search'
    updateSearchFail: (error) -> @updateResourceFail error, 'search'
    destroySearchFail: (error) -> @destroyResourceFail error, 'search'
    destroySearchSuccess: (model) ->
      @destroyResourceSuccess model, 'search'

    ############################################################################
    # Users: add, update, & destroy notifications
    ############################################################################

    addUserSuccess: (model) ->
      @addResourceSuccess model, 'user'
    addUserFail: (error) ->
      @addResourceFail error, 'user'
    updateUserSuccess: (model) ->
      @updateResourceSuccess model, 'user'
    updateUserFail: (error) ->
      @updateResourceFail error, 'user'
    destroyUserFail: (error) ->
      @destroyResourceFail error, 'user'
    destroyUserSuccess: (model) ->
      @destroyResourceSuccess model, 'user'

    ############################################################################
    # Resources: add, update, & destroy notifications
    ############################################################################

    addResourceSuccess: (model, resource) ->
      notification = new NotificationView
        title: "#{@utils.capitalize resource} created"
        content: "You have successfully created a new #{resource}. Its id is
          #{model.get 'id'}."
      @renderNotification notification

    updateResourceSuccess: (model, resource) ->
      notification = new NotificationView
        title: "#{@utils.capitalize resource} updated"
        content: "You have successfully updated #{resource} #{model.get 'id'}."
      @renderNotification notification

    addUpdateResourceFail: (error, type, resource) ->
      if error
        content = "Your #{resource} #{type} request was unsuccessful. #{error}"
      else
        content = "Your #{resource} #{type} request was unsuccessful. See the
          error message(s) beneath the input fields."
      notification = new NotificationView
        title: "#{@utils.capitalize resource} #{type} failed"
        content: content
        type: 'error'
      @renderNotification notification

    addResourceFail: (error, resource) ->
      @addUpdateResourceFail error, 'creation', resource

    updateResourceFail: (error, resource) ->
      @addUpdateResourceFail error, 'update', resource

    destroyResourceFail: (error, resource) ->
      notification = new NotificationView
        title: "#{@utils.capitalize resource} deletion failed"
        content: "Your #{resource} deletion request was unsuccessful. #{error}"
        type: 'error'
      @renderNotification notification

    destroyResourceSuccess: (model, resource) ->
      notification = new NotificationView
        title: "#{@utils.capitalize resource} deleted"
        content: "You have successfully deleted the #{resource} with id
          #{model.get 'id'}."
      @renderNotification notification

    fetchHistoryFormFail: (formModel) ->
      notification = new NotificationView
        title: "Form history fetch failed"
        content: "Unable to fetch the history of form #{formModel.id}"
        type: 'error'
      @renderNotification notification

    fetchHistoryFormFailNoHistory: (formModel) ->
      notification = new NotificationView
        title: "No history"
        content: "There are no previous versions for form #{formModel.id}"
        type: 'warning'
      @renderNotification notification

    newResourceOnLastPage: (resourceModel, resourceName) ->
      notification = new NotificationView
        title: "New #{resourceName} on last page"
        content: "The #{resourceName} that you just created can be viewed on the last page"
        type: 'warning'
      @renderNotification notification

    morphologicalParseFail: (error, parserId) ->
      notification = new NotificationView
        title: "Parse fail"
        content: "Your attempt to parse using morphological parser #{parserId}
          failed: #{error}"
        type: 'error'
      @renderNotification notification

    morphologicalParseSuccess: (parserId) ->
      notification = new NotificationView
        title: "Parse success"
        content: "Your attempt to parse using morphological parser #{parserId}
          was successful; see the parses below the word input field."
      @renderNotification notification

    morphologicalParserGenerateAndCompileFail: (error, parserId) ->
      notification = new NotificationView
        title: "Parser generate and compile fail"
        content: "Your attempt to generate and compile parser #{parserId}
          failed: #{error}"
        type: 'error'
      @renderNotification notification

    morphologicalParserGenerateAndCompileSuccess: (parserId) ->
      notification = new NotificationView
        title: "Parser generate and compile success"
        content: "Your attempt to generate and compile the morphological parser
          #{parserId} was successful"
      @renderNotification notification

    phonologyCompileFail: (error, phonologyId) ->
      notification = new NotificationView
        title: "Phonology compile fail"
        content: "Your attempt to compile phonology #{phonologyId}
          failed: #{error}"
        type: 'error'
      @renderNotification notification

    phonologyCompileSuccess: (message, phonologyId) ->
      notification = new NotificationView
        title: "Phonology compile success"
        content: "Your attempt to compile phonology #{phonologyId} was
          successful: #{message}"
      @renderNotification notification

    phonologyApplyDownFail: (error, phonologyId) ->
      notification = new NotificationView
        title: "Phonologize fail"
        content: "Your attempt to phonologize using phonology #{phonologyId}
          failed: #{error}"
        type: 'error'
      @renderNotification notification

    phonologyApplyDownSuccess: (phonologyId) ->
      notification = new NotificationView
        title: "Phonologize success"
        content: "Your attempt to phonologize using phonology #{phonologyId}
          was successful; see the surface forms below the word input field."
      @renderNotification notification

    phonologyRunTestsFail: (error, phonologyId) ->
      notification = new NotificationView
        title: "Run tests fail"
        content: "Your attempt to run the tests of phonology #{phonologyId}
          was not successful: #{error}"
        type: 'error'
      @renderNotification notification

    phonologyRunTestsSuccess: (phonologyId) ->
      notification = new NotificationView
        title: "Run tests success"
        content: "Your attempt to run the tests of phonology #{phonologyId}
          was successful; see the results in the table below the “Run
          Tests” button."
      @renderNotification notification

    phonologyServeCompiledFail: (error, phonologyId) ->
      notification = new NotificationView
        title: "Serve compiled fail"
        content: "Your attempt to download the compiled binary file
          representing phonology #{phonologyId} was unsuccessful: #{error}"
        type: 'error'
      @renderNotification notification

    phonologyServeCompiledSuccess: (phonologyId) ->
      notification = new NotificationView
        title: "Serve compiled success"
        content: "Your attempt to download the compiled binary file
          representing phonology #{phonologyId} was successful: click
          the link next to the button to download the file to your computer"
      @renderNotification notification

    morphologyGenerateAndCompileFail: (error, morphologyId) ->
      notification = new NotificationView
        title: "Morphology generate and compile failed"
        content: "Your attempt to generate and compile morphology
          #{morphologyId} failed: #{error}"
        type: 'error'
      @renderNotification notification

    morphologyCompileFail: (error, morphologyId) ->
      notification = new NotificationView
        title: "Morphology compile failed"
        content: "Your attempt to compile morphology #{morphologyId} failed:
          #{error}"
        type: 'error'
      @renderNotification notification

    cantDeleteFilterExpressionOnlyChild: ->
      notification = new NotificationView
        title: "Search expression destroy failed"
        content: "You cannot destroy a search expression if it is the only one
          left, if it is the only child of an “or” or an “and”, or if
          it follows “not”."
        type: 'error'
      @renderNotification notification

    disabledKeyboardShortcut: (keyboardShortcut) ->
      notification = new NotificationView
        title: "Keyboard shortcut error"
        content: "You probably have to be logged in to use the keyboard shortcut #{keyboardShortcut}"
        type: 'error'
      @renderNotification notification

    morphologyCompileSuccess: (message, morphologyId) ->
      notification = new NotificationView
        title: "Morphology compile success"
        content: "Your attempt to compile morphology #{morphologyId} was
          successful: #{message}"
      @renderNotification notification

    registerFail: (reason) ->
      notification = new NotificationView
        title: 'Register failed'
        content: "Your attempt to register was unsuccessful. #{reason}"
        type: 'error'
      @renderNotification notification

    registerSuccess: ->
      notification = new NotificationView
        title: 'Registered'
        content: 'You have successfully created a new account'
      @renderNotification notification

    authenticateFail: (errorObj) ->
      notification = new NotificationView
        title: 'Login failed'
        content: @getAuthenticateFailContent errorObj
        type: 'error'
      @renderNotification notification

    authenticateSuccess: ->
      notification = new NotificationView
        title: 'Logged in'
        content: 'You have successfully logged in.'
      @renderNotification notification

    logoutFail: ->
      notification = new NotificationView
        title: 'Logout failed'
        content: 'Your attempt to log out was unsuccessful.'
        type: 'error'
      @renderNotification notification

    logoutSuccess: ->
      notification = new NotificationView
        title: 'Logged out'
        content: 'You have successfully logged out.'
      @renderNotification notification

    formSearchFail: (error, formSearchId) ->
      notification = new NotificationView
        title: 'Form search failed'
        content: "Your attempt to search through the forms using the saved
          search with id #{formSearchId} was unsuccessful: #{error}."
        type: 'error'
      @renderNotification notification

    formSearchSuccess: (formSearchId) ->
      notification = new NotificationView
        title: 'Form search success'
        content: "You have successfully used the saved search with id
          #{formSearchId} to search!."
      @renderNotification notification

    fileSearchFail: (errorMessage) ->
      notification = new NotificationView
        title: 'File search failed'
        content: "Your attempt to search through the files was unsuccessful:
          #{errorMessage}"
        type: 'error'
      @renderNotification notification

    corpusCountFail: (error, corpusId) ->
      notification = new NotificationView
        title: 'Corpus count failed'
        content: "Your attempt to count the number of forms in the corpus with
          id #{corpusId} was unsuccessful: #{error}."
        type: 'error'
      @renderNotification notification

    corpusCountSuccess: (corpusId) ->
      notification = new NotificationView
        title: 'Corpus count success'
        content: "You have successfully counted the number of forms in the
          corpus with id #{corpusId}."
      @renderNotification notification

    corpusBrowseFail: (error, corpusId) ->
      notification = new NotificationView
        title: 'Corpus browse failed'
        content: "Your attempt to browse the forms in the corpus with
          id #{corpusId} was unsuccessful: #{error}."
        type: 'error'
      @renderNotification notification

    corpusBrowseSuccess: (corpusId) ->
      notification = new NotificationView
        title: 'Corpus browse success'
        content: "You have made a successful request to browse the forms in the
          corpus with id #{corpusId}."
      @renderNotification notification

    generateAndCompileStart: (morphologyModel) ->
      @listenToOnce morphologyModel, 'morphologyGenerateAndCompileFail',
        @morphologyGenerateAndCompileFail
      @listenToOnce morphologyModel, 'morphologyGenerateAndCompileSuccess',
        @morphologyGenerateAndCompileSuccess
      notification = new NotificationView
        title: 'Morphology generate and compile request initiated'
        content: "You have requested that morphology
          ##{morphologyModel.get('id')} be generated and compiled. This may
          take a while. Please continue to use the application: we will let
          you know when the generate and compile request has terminated."
      @renderNotification notification

    generateAndCompileFail: (error, morphologyModel) ->
      notification = new NotificationView
        title: 'Morphology generate and compile request failed'
        content: "Your generate and compile request on morphology
          ##{morphologyModel.get('id')} failed."
        type: 'error'
      @renderNotification notification

    generateAndCompileSuccess: (morphologyObject, morphologyModel) ->
      notification = new NotificationView
        title: 'Morphology generate and compile request succeeded'
        content: "Your generate and compile request on morphology
          ##{morphologyModel.get('id')} was successful."
      @renderNotification notification

    tooManyTasks: ->
      notification = new NotificationView
        title: 'Too many tasks'
        content: 'Sorry, you cannot initiate another long-running tasks until
          one of your currently pending tasks terminates.'
        type: 'error'
      @renderNotification notification

    taskAlreadyPending: (taskDescription, resourceName, resourceModel) ->
      notification = new NotificationView
        title: 'Task already in-progress'
        content: "Sorry, there is already an in-progress request to
          #{taskDescription} #{resourceName} #{resourceModel.get('id')}"
        type: 'error'
      @renderNotification notification

    fileSelectForbiddenType: (errorMessage) ->
      notification = new NotificationView
        title: 'Forbidden file type'
        content: errorMessage
        type: 'error'
      @renderNotification notification

    fileSelectInvalidName: (errorMessage) ->
      notification = new NotificationView
        title: 'Invalid filename'
        content: errorMessage
        type: 'error'
      @renderNotification notification

    fileSelectError: ->
      notification = new NotificationView
        title: 'Error selecting a file'
        content: 'For some reason an error occurred while trying to select your
          file'
        type: 'error'
      @renderNotification notification

    getAuthenticateFailContent: (errorObj) ->
      contentPrefix = 'Yor attempt to log in was unsuccessful.'
      if errorObj
        if @getActiveServerType() is 'OLD'
          if errorObj.error
            "#{contentPrefix} #{errorObj.error}"
          else
            contentPrefix
        else
          if @utils.type(errorObj) is 'object' # FieldDB API returns string, not object (always?)
            if errorObj.reason
              "#{contentPrefix} #{errorObj.reason}"
            else
              contentPrefix
          else
            "#{contentPrefix} #{errorObj}"
      else
        contentPrefix

