define [
  'backbone'
  './base'
  './server'
  './../models/server'
  './../templates/servers'
  'perfectscrollbar'
], (Backbone, BaseView, ServerView, ServerModel, serversTemplate) ->

  # Servers View
  # -------------
  #
  # A view for a collection of server objects.

  class ServersView extends BaseView

    tagName: 'div'
    template: serversTemplate

    initialize: (options) ->
      @serverTypes = options.serverTypes
      @serverViews = []
      @collection.each (server) =>
        newServerView = new ServerView
          model: server
          serverTypes: @serverTypes
        @serverViews.push newServerView
      @bodyVisible = false

    listenToEvents: ->
      @listenTo Backbone, 'removeServerView', @_removeServerView
      @delegateEvents()

    _removeServerView: (serverView) ->
      @serverViews = _.without @serverViews, serverView
      serverView.close()
      @closed serverView

    events:
      'keydown button.toggle-appear': '_keyboardControl'
      'keydown button.add-server': '_keyboardControl'
      'click button.toggle-appear': '_toggleServerConfig'
      'click button.add-server': '_addServer'

    render: ->
      @$el.html @template()
      @_guify()
      @$widgetBody = @$('div.dative-widget-body').first()
      container = document.createDocumentFragment()
      for serverView in @serverViews
        container.appendChild serverView.render().el
        @rendered serverView
      @$widgetBody.append container
      @listenToEvents()
      @

    setCollectionFromGUI: ->
      updatedServerModels = []
      for serverView in @serverViews
        serverView.setModelFromGUI()
        updatedServerModels.push serverView.model
      @collection.add updatedServerModels

    _addServer: (event) ->
      if event
        event.preventDefault()
        event.stopPropagation()
      @_openServerConfig()
      serverModel = new ServerModel()
      @collection.unshift serverModel
      serverView = new ServerView
        model: serverModel
        serverTypes: @serverTypes
      @serverViews.unshift serverView
      serverView.render().$el.prependTo(@$widgetBody).hide().slideDown('slow')
      @rendered serverView

    _guify: ->

      @$('button').button().attr('tabindex', 0)

      triangleIcon = 'ui-icon-triangle-1-s'
      if not @bodyVisible
        @$('.dative-widget-body').first().hide()
        triangleIcon = 'ui-icon-triangle-1-e'

      @$('button.toggle-appear')
        .button
          icons: {primary: triangleIcon}
          text: false

      @$('button.add-server')
        .button
          icons: {primary: 'ui-icon-plusthick'}
          text: false

    _toggleServerConfig: (event) ->
      if event
        event.preventDefault()
        event.stopPropagation()

      @$('.toggle-appear .ui-button-icon-primary')
        .toggleClass 'ui-icon-triangle-1-e ui-icon-triangle-1-s'

      @$('.dative-widget-body').first()
        .slideToggle
          complete: =>
            $firstInput = @$('input[name=name]').first()
            if $firstInput.is(':visible')
              $firstInput.focus()
            @bodyVisible = @$('.dative-widget-body').is(':visible')

    _openServerConfig: ->
      if not @$('.dative-widget-body').is(':visible')
        @_toggleServerConfig()

    _rememberTarget: (event) ->
      try
        @$('.dative-input-display').each (index, el) =>
          if el is event.target
            @focusedElementIndex = index

    _keyboardControl: (event) ->
      @_rememberTarget event
      # <Enter> on input calls `save`, on data display calls `edit`
      if event.which is 13
        event.preventDefault()
        event.stopPropagation()
        try
          classes = $(event.target).attr('class').split /\s+/
          if 'toggle-appear' in classes
            @_toggleServerConfig()
          else if 'add-server' in classes
            @_addServer()


