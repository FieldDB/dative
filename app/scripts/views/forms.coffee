define [
  'backbone'
  './base'
  './form'
  './pagination-menu-top'
  './pagination-item-table'
  './../collections/forms'
  './../templates/forms'
  'perfectscrollbar'
], (Backbone, BaseView, FormView, PaginationMenuTopView,
  PaginationItemTableView, FormsCollection, formsTemplate) ->

  # Forms View
  # -----------
  #
  # Displays a list of forms.

  class FormsView extends BaseView

    template: formsTemplate

    initialize: (options) ->
      @focusedElementIndex = null
      @renderedFormViews = []
      @renderedPaginationItemTableViews = []
      @paginationMenuTopView = new PaginationMenuTopView pagination: @pagination
      @applicationSettings = options.applicationSettings
      @getActiveServerType()
      @collection = new FormsCollection()
      @collection.applicationSettings = @applicationSettings
      @formViews = []
      @listenToEvents()

    events:
      'focus button, input, .ui-selectmenu-button': 'rememberFocusedElement'

    listenToEvents: ->
      @stopListening()
      @undelegateEvents()
      @delegateEvents()
      @listenTo Backbone, 'fetchAllFieldDBFormsStart', @fetchAllFormsStart
      @listenTo Backbone, 'fetchAllFieldDBFormsEnd', @fetchAllFormsEnd
      @listenTo Backbone, 'fetchAllFieldDBFormsSuccess', @fetchAllFormsSuccess

      @listenTo @paginationMenuTopView, 'paginator:changeItemsPerPage', @changeItemsPerPage
      @listenTo @paginationMenuTopView, 'paginator:showFirstPage', @showFirstPage
      @listenTo @paginationMenuTopView, 'paginator:showLastPage', @showLastPage
      @listenTo @paginationMenuTopView, 'paginator:showPreviousPage', @showPreviousPage
      @listenTo @paginationMenuTopView, 'paginator:showNextPage', @showNextPage
      @listenTo @paginationMenuTopView, 'paginator:showThreePagesBack', @showThreePagesBack
      @listenTo @paginationMenuTopView, 'paginator:showTwoPagesBack', @showTwoPagesBack
      @listenTo @paginationMenuTopView, 'paginator:showOnePageBack', @showOnePageBack
      @listenTo @paginationMenuTopView, 'paginator:showOnePageForward', @showOnePageForward
      @listenTo @paginationMenuTopView, 'paginator:showTwoPagesForward', @showTwoPagesForward
      @listenTo @paginationMenuTopView, 'paginator:showThreePagesForward', @showThreePagesForward


    render: (taskId) ->
      context =
        pluralizeByNum: @utils.pluralizeByNum
        pagination: @pagination
      @$el.html @template(context)
      @matchHeights()
      @guify()
      @renderPaginationMenuTopView()
      @collection.fetchAllFieldDBForms()
      @listenToEvents()
      @perfectScrollbar()
      @setFocus()
      Backbone.trigger 'longTask:deregister', taskId
      @

    renderPaginationMenuTopView: ->
      @paginationMenuTopView.setElement @$('div.dative-pagination-menu-top').first()
      @paginationMenuTopView.render pagination: @pagination
      @rendered @paginationMenuTopView

    fetchAllFormsStart: ->
      @spin 'fetching all forms'

    fetchAllFormsEnd: ->
      @stopSpin()

    fetchAllFormsSuccess: ->
      @getFormViews()
      @refreshPage()

    refreshPage: (options) ->
      @refreshHeader()
      @refreshPaginationMenuTop()
      @closeThenOpenCurrentPage options

    closeThenOpenCurrentPage: (options) ->
      hideMethod = 'hide'
      hideOptions =
        complete: =>
          @$('.dative-pagin-items').html ''
          @closeRenderedFormViews()
          @closeRenderedPaginationItemTableViews()
          @renderPage options
      if options?.hideEffect
        hideOptions.duration = @getAnimationDuration()
        hideMethod = options.hideEffect
      @$('.dative-pagin-items')[hideMethod] hideOptions

    getAnimationDuration: ->
      400 + (25 * @getItemsDisplayed())

    closeRenderedFormViews: ->
      while @renderedFormViews.length
        formView = @renderedFormViews.pop()
        formView.close()
        @closed formView

    closeRenderedPaginationItemTableViews: ->
      while @renderedPaginationItemTableViews.length
        paginationItemTableView = @renderedPaginationItemTableViews.pop()
        paginationItemTableView.close()
        @closed paginationItemTableView

    refreshPaginationMenuTop: ->
      @paginationMenuTopView.render pagination: @pagination

    getFormViews: ->
      @collection.each (formModel) =>
        newFormView = new FormView
          model: formModel
          applicationSettings: @applicationSettings
        @formViews.push newFormView

    spinnerOptions: ->
      _.extend BaseView::spinnerOptions, {top: '25%', left: '98%'}

    spin: (tooltipMessage) ->
      @$('#dative-page-header')
        .spin @spinnerOptions()
        .tooltip
          items: 'div'
          content: tooltipMessage
          position:
            my: "left+10 center"
            at: "right top+20"
            collision: "flipfit"
        .tooltip 'open'

    stopSpin: ->
      $header = @$('#dative-page-header')
      $header.spin false
      if $header.tooltip 'instance' then $header.tooltip 'destroy'

    getActiveServerType: ->
      if @applicationSettings.get('activeServer').get('type') is 'FieldDB'
        @activeServerType = 'FieldDB'
        @activeFieldDBCorpus = @applicationSettings.get 'activeFieldDBCorpus'
      else
        @activeServerType = 'OLD'

    pagination:
      items: 0
      itemsPerPage: 10
      page: 1
      pages: 0
      start: 0
      end: 0

    refreshPagination: ->
      @pagination.start = (@pagination.page - 1) * @pagination.itemsPerPage
      @pagination.end = @pagination.start + @pagination.itemsPerPage - 1
      @pagination.pages = Math.ceil(@pagination.items / @pagination.itemsPerPage)

    setFocus: ->
      if @focusedElementIndex
        @focusLastFocusedElement()
      else
        @focusFirstButton()

    focusFirstButton: ->
      @$('button.ui-button').first().focus()

    guify: ->

      @$('button').button().attr('tabindex', 0)

      @$('button.expand-all')
        .button()
        .tooltip
          position:
            my: "right-10 center"
            at: "left center"
            collision: "flipfit"

      @$('button.collapse-all')
        .button()
        .tooltip
          position:
            my: "right-45 center"
            at: "left center"
            collision: "flipfit"

    perfectScrollbar: ->
      @$('#dative-page-body')
        .perfectScrollbar()
        .scroll => @closeAllTooltips()

    # Render a page (pagination) of form views.
    renderPage: (options) ->
      @refreshPagination()
      $formList = @$('.dative-pagin-items')
      for formView, index in @formViews[@pagination.start..@pagination.end]
        formId = formView.model.get('id')
        paginationItemTableView = new PaginationItemTableView
          formId: formId
          index: index + 1
        $formList.append paginationItemTableView.render().el
        formView.setElement @$("##{formId}")
        formView.render()
        @renderedFormViews.push formView
        @rendered formView
        @renderedPaginationItemTableViews.push paginationItemTableView
        @rendered paginationItemTableView

      if options?.showEffect
        $formList[options.showEffect]
          duration: @getAnimationDuration()
          complete: =>
            @setFocus()
      else
        $formList.show()
        @setFocus()

    getItemsDisplayed: ->
      if @pagination.itemsPerPage > @pagination.items
        @pagination.items
      else
        @pagination.itemsPerPage

    refreshHeader: ->
      @pagination.items = @collection.length
      @refreshPagination()
      @$('.items-displayed').text @utils.integerWithCommas(@getItemsDisplayed())
      @$('.form-count').text @utils.integerWithCommas(@pagination.items)
      @$('.form-count-noun').text @utils.pluralizeByNum('form', @pagination.items)
      @$('.page-count').text @utils.integerWithCommas(@pagination.pages)
      @$('.page-count-noun').text @utils.pluralizeByNum('page', @pagination.pages)

    changeItemsPerPage: (newItemsPerPage) ->
      itemsDisplayedBefore = @getItemsDisplayed()
      @pagination.itemsPerPage = newItemsPerPage
      @refreshPagination()
      itemsDisplayedAfter = @getItemsDisplayed()
      if itemsDisplayedBefore isnt itemsDisplayedAfter
        @refreshPage
          hideEffect: 'fadeOut'
          showEffect: 'fadeIn'

    showFirstPage: ->
      console.log "forms view knows that you want to showFirstPage"

    showLastPage: ->
      console.log "forms view knows that you want to showLastPage"

    showPreviousPage: ->
      console.log "forms view knows that you want to showPreviousPage"

    showNextPage: ->
      console.log "forms view knows that you want to showNextPage"

    showThreePagesBack: ->
      console.log "forms view knows that you want to showThreePagesBack"

    showTwoPagesBack: ->
      console.log "forms view knows that you want to showTwoPagesBack"

    showOnePageBack: ->
      console.log "forms view knows that you want to showOnePageBack"

    showOnePageForward: ->
      console.log "forms view knows that you want to showOnePageForward"

    showTwoPagesForward: ->
      console.log "forms view knows that you want to showTwoPagesForward"

    showThreePagesForward: ->
      console.log "forms view knows that you want to showThreePagesForward"

