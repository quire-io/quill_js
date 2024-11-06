//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Mon Sep 2 02:22 PM CST 2024
// Author: rudyhuang

@JS()
library quill_js;

import 'dart:html';

import 'package:js/js.dart';

import 'main.dart';
import 'parchment.dart';

/// Handlers will be called with `this` bound to the [KeyboardModule] 
/// and be passed the current [Selection].
/// 
/// By default, a handler stops propagating to the next handler,
/// unless it explicitly returns `true`.
typedef BindingHandler = bool? Function(
  Selection,
  BindingContext,
  Object,
);

@anonymous
@JS()
abstract class KeyboardModule {
  external Quill get quill;

  external void addBinding(
    BindingObject binding,
    BindingHandler handler,
  );
}

@anonymous
@JS()
abstract class BindingObject {
  external List<dynamic> get key;
  external bool? get shortKey;
  external bool? get shiftKey;
  external bool? get altKey;
  external bool? get metaKey;
  external bool? get ctrlKey;

  // Context
  external bool get collapsed;
  external bool get empty;
  external int get offset;
  external RegExp get prefix;
  external RegExp get suffix;
  external Object get format;

  /// [shortKey] is a platform specific modifier equivalent to 
  /// [metaKey] on a Mac and [ctrlKey] on Linux and Windows.
  external factory BindingObject({
    List<dynamic> key,
    bool? shortKey = false,
    bool? shiftKey = false,
    bool? altKey = false,
    bool? metaKey = false,
    bool? ctrlKey = false,
    bool collapsed,
    bool empty,
    int offset,
    RegExp prefix,
    RegExp suffix,
    Object format,
  });
}

@anonymous
@JS()
abstract class BindingContext {
  external bool get collapsed;
  external bool get empty;
  external int get offset;
  external KeyboardEvent get event;
  external String get prefix;
  external String get suffix;
  external Object get format;
  external Blot get line;
}