//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Wed Jun 19 09:52 AM CST 2024
// Author: jimmyshiau
@JS('QuillJsLib')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

import 'parchment.dart';
import 'module.dart';

@JS()
external Quill createQuill(JSAny container, QuillConfiguration options,
  JSArray<JSString>? formats);

@JS()
external void registerService(JSObject service);

typedef QuillTextChangeEventHandler = void Function(
  QuillJsDelta delta,
  QuillJsDelta oldContents,
  String source,
);

typedef QuillSelectionChangeEventHandler = void Function(
  Selection? range,
  Selection? oldRange,
  String source,
);

extension type Quill._(JSObject _) implements JSObject {
  static const eventTextChange = 'text-change';
  static const eventSelectionChange = 'selection-change';

  external QuillJsDelta deleteText(int index, int length, [String source]);

  external QuillJsDelta getContents([int index, int length]);

  external int getLength();

  external String getText(int index, [int length]);

  external String getSemanticHTML([int index, int length]);

  external QuillJsDelta insertEmbed(int index, String type, JSAny value, [String source]);

  /// Pass a [jsify] Map, or `JSObject()` as empty format
  external QuillJsDelta insertText(int index, String text, [JSObject formats, String source]);

  external QuillJsDelta setContents(JSArray<JSObject> data);

  external QuillJsDelta setText(String text, [String source]);

  external QuillJsDelta updateContents(JSArray<JSObject> data, [String source]);

  external QuillJsDelta format(String name, JSAny value, [String source]);

  /// Pass a [jsify] Map, or `JSObject()` as empty format
  external QuillJsDelta formatLine(int index, int length, [JSObject formats, String source]);

  /// Pass a [jsify] Map, or `JSObject()` as empty format
  external QuillJsDelta formatText(int index, int length, [JSObject formats, String source]);

  /// Use [getProperty] to get the property
  external JSObject getFormat([int index, int length]);

  external QuillJsDelta removeFormat(int index, int length, [String source]);

  external Bounds? getBounds(int index, [int length]);

  external Selection? getSelection([bool focus]);

  external void setSelection(int index, [int length, String source]);

  external void scrollSelectionIntoView();

  external void blur();

  external void disable();

  external void enable([bool enabled]);

  external bool isEnabled();

  external void focus();

  external bool hasFocus();

  external void update([String source]);

  external void on(String name, JSFunction handler);

  external void once(String name, JSFunction handler);

  external void off(String name, JSFunction handler);

  external int getIndex(Blot blot);

  /// Returns [LeafBlot?, int]
  external JSArray<JSAny> getLeaf(int index);

  /// Returns [Block?, int]
  external JSArray<JSAny> getLine(int index);

  external JSArray<Blot> getLines([int index, int length]);

  external HTMLElement get container;

  external KeyboardModule get keyboard;

  external HTMLElement get root;

  external Scroll get scroll;

  external QuillHistory get history;

  external HTMLElement addContainer(Node domNode, [Node? refNode]);

  external JSObject getModule(String name);
}

extension type Bounds._(JSObject _) implements JSObject {
  external num get left;
  external num get top;
  external num get height;
  external num get width;

  external factory Bounds({
    num left,
    num top,
    num height,
    num width,
  });
}

extension type Selection._(JSObject _) implements JSObject {
  external int get index;
  external int get length;

  external factory Selection({
    int index,
    int length,
  });
}

extension type QuillConfiguration._(JSObject _) implements JSObject  {

  external factory QuillConfiguration({
    String theme,
    String placeholder,
    JSObject? modules});
}

extension type QuillJsDelta._(JSObject _) implements JSObject {
  external JSArray<QuillJsDeltaOp> get ops;

  external factory QuillJsDelta({JSArray<QuillJsDeltaOp> ops});
}

extension type QuillJsDeltaOp._(JSObject _) implements JSObject {
  external JSObject? get insert;
  external JSObject? get delete;
  external JSObject? get retain;
  external JSObject? get attributes;

  external factory QuillJsDeltaOp({
    JSObject? insert,
    JSObject? delete,
    JSObject? retain,
    JSObject? attributes,
  });
}

extension type QuillHistory._(JSObject _) implements JSObject {
  external void clear();
  external void cutoff();
  external void redo();
  external void undo();
}