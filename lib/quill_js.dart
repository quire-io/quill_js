//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Wed Jun 19 09:52 AM CST 2024
// Author: jimmyshiau
@JS()
library quill_js;

import 'dart:html';

import "package:js/js.dart";

@JS('QuillJsLib.createQuill')
external Quill createQuill(dynamic container, QuillConfiguration options);

@JS('QuillJsLib.registerService')
external void registerService(Object service);

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

@anonymous
@JS()
abstract class Quill {
  static const eventTextChange = 'text-change';
  static const eventSelectionChange = 'selection-change';

  external QuillJsDelta deleteText(int index, int length, [String source = 'api']);

  external QuillJsDelta getContents([int index = 0, int length]);

  external int getLength();

  external String getText(int index, [int length]);

  external String getSemanticHTML([int index = 0, int length]);

  external QuillJsDelta insertEmbed(int index, String type, dynamic value, [String source = 'api']);

  /// Pass a [jsify] Map, or `Object()` as empty format
  external QuillJsDelta insertText(int index, String text, [Object formats, String source = 'api']);

  external QuillJsDelta setContents(List<dynamic> data);

  external QuillJsDelta setText(String text, [String source = 'api']);

  external QuillJsDelta updateContents(List<dynamic> data, [String source = 'api']);

  external QuillJsDelta format(String name, dynamic value, [String source = 'api']);

  /// Pass a [jsify] Map, or `Object()` as empty format
  external QuillJsDelta formatLine(int index, int length, [Object formats, String source = 'api']);

  /// Pass a [jsify] Map, or `Object()` as empty format
  external QuillJsDelta formatText(int index, int length, [Object formats, String source = 'api']);

  /// Use [getProperty] to get the property
  external Object getFormat([int index, int length = 0]);

  external QuillJsDelta removeFormat(int index, int length, [String source = 'api']);

  external Bounds getBounds(int index, [int length = 0]);

  external Selection? getSelection([bool focus = false]);

  external void setSelection(int index, [int length = 0, String source = 'api']);

  external void scrollSelectionIntoView();

  external void blur();

  external void disable();

  external void enable([bool enabled = true]);

  external void focus();

  external bool hasFocus();

  external void update([String source = 'api']);

  external void on(String name, Function handler);

  external void once(String name, Function handler);

  external void off(String name, Function handler);

  external Element get container;

  external Element get root;

  external Scroll get scroll;

  external Element addContainer(Node domNode, [Node? refNode]);
}

@anonymous
@JS()
abstract class Bounds {
  external int get left;
  external int get top;
  external int get height;
  external int get width;

  external factory Bounds({
    int left,
    int top,
    int height,
    int width,
  });
}

@anonymous
@JS()
abstract class Selection {
  external int get index;
  external int get length;

  external factory Selection({
    int index,
    int length,
  });
}

@anonymous
@JS()
abstract class QuillConfiguration {

  external factory QuillConfiguration({
    String theme,
    String placeholder,
    QuillConfigurationModules modules});
}

@anonymous
@JS()
abstract class QuillConfigurationModules {
  external List<dynamic> get toolbar;
  external set toolbar(List<dynamic> v);

  external factory QuillConfigurationModules({
    List<dynamic> toolbar,});
}

@anonymous
@JS()
abstract class QuillHeaderOption {
  external List<dynamic> get header;
  external set header(List<dynamic> v);

  external factory QuillHeaderOption({
    List<dynamic> header,});}

@anonymous
@JS()
abstract class QuillJsDelta {
  external List<QuillJsDeltaOp> get ops;

  external factory QuillJsDelta({List<QuillJsDeltaOp> ops});
}

@anonymous
@JS()
abstract class QuillJsDeltaOp {
  external Object? get insert;
  external Object? get delete;
  external Object? get retain;
  external Object? get attributes;

  external factory QuillJsDeltaOp({
    Object? insert,
    Object? delete,
    Object? retain,
    Object? attributes,
  });
}

@anonymous
@JS()
abstract class Scroll {
  external Object? query(String query);
  external Blot? find(node, [bool bubble = false]);
  /// Returns `[Blot?, int]`
  external List<dynamic> descendant(bool Function(Blot?) matcher, int index);
  external List<Object> descendants(bool Function(Blot?) matcher, int index, int length);
}

@anonymous
@JS()
abstract class Blot {
  external BlotConstructor get statics;
  external Blot? get parent;
  external Blot? get prev;
  external Blot? get next;
  external Node get domNode;
  external int length();
  external int offset([Blot? root]);
}

@anonymous
@JS()
abstract class BlotConstructor {
  external String get blotName;
  external String get tagName;
}