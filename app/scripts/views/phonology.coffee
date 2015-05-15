define [
  './resource'
  './phonology-extra-actions'
  './phonology-add-widget'
  './person-field-display'
  './date-field-display'
  './boolean-icon-display'
], (ResourceView, PhonologyExtraActionsView, PhonologyAddWidgetView,
  PersonFieldDisplayView, DateFieldDisplayView, BooleanIconFieldDisplayView) ->

  # Phonology View
  # --------------
  #
  # For displaying individual phonologies.

  class PhonologyView extends ResourceView

    resourceName: 'phonology'

    excludedActions: ['history']

    extraActionsViewClass: PhonologyExtraActionsView

    resourceAddWidgetView: PhonologyAddWidgetView

    # Attributes that are always displayed.
    primaryAttributes: [
      'name'
      'description'
    ]

    # Attributes that may be hidden.
    secondaryAttributes: [
      'compile_succeeded'
      'compile_message'
      'compile_attempt'
      'enterer'
      'modifier'
      'datetime_entered'
      'datetime_modified'
      'UUID'
      'id'
      'script'
    ]

    # Map attribute names to display view class names.
    attribute2displayView:
      enterer: PersonFieldDisplayView
      modifier: PersonFieldDisplayView
      datetime_entered: DateFieldDisplayView
      datetime_modified: DateFieldDisplayView
      compile_succeeded: BooleanIconFieldDisplayView

