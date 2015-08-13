define [
  './resource-select-via-search-input'
  './source-as-row'
  './../models/source'
  './../collections/sources'
], (ResourceSelectViaSearchInputView, SourceAsRowView, SourceModel,
  SourcesCollection) ->

  class SourceSelectViaSearchInputView extends ResourceSelectViaSearchInputView

    # Change these attributes in subclasses.
    resourceName: 'source'
    resourceModelClass: SourceModel
    resourcesCollectionClass: SourcesCollection
    resourceAsRowViewClass: SourceAsRowView

    resourceAsString: (resource) ->
      tmp = new @resourceModelClass resource
      try
        "#{tmp.getAuthor()} (#{tmp.getYear()})"
      catch
        'error caught is your resource-as-string'

    # These are the `[<attribute]`s or `[<attribute>, <subattribute>]`s that we
    # "smartly" search over.
    smartStringSearchableFileAttributes: [
      ['id']
      ['key']
      ['type']
      ['crossref']
      ['author']
      ['editor']
      ['year']
      ['journal']
      ['title']
      ['booktitle']
      ['chapter']
      ['publisher']
      ['school']
      ['institution']
      ['note']
    ]
