define [
  './controls'
  './parse-control'
  './generate-and-compile-control'
], (ControlsView, ParseControlView, GenerateAndCompileControlView) ->

  # Morphological Parser Controls View
  # ---------------------------------------
  #
  # View for a widget containing inputs and controls for manipulating the extra
  # actions of a morphological parser resource, actions like requesting parses.
  #
  # Actions that should ultimately be supported:
  # PUT /morphologicalparsers/{id}/applydown
  # PUT /morphologicalparsers/{id}/applyup
  # PUT /morphologicalparsers/{id}/export
  # PUT /morphologicalparsers/{id}/generate
  # PUT /morphologicalparsers/{id}/generate_and_compile
  # PUT /morphologicalparsers/{id}/parse
  # GET /morphologicalparsers/{id}/history
  # GET /morphologicalparsers/{id}/servecompiled

  class MorphologicalParserControlsView extends ControlsView

    actionViewClasses: [
      ParseControlView
      GenerateAndCompileControlView
    ]

