//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Mon Sep 2 02:22 PM CST 2024
// Author: rudyhuang

@JS()
library;

import 'dart:js_interop';

import 'package:web/web.dart' hide Selection;

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
  JSObject,
);

extension type KeyboardModule._(JSObject _) implements JSObject {
  external Quill get quill;

  external void addBinding(
    BindingObject binding,
    JSFunction handler,
  );
}

extension type BindingObject._(JSObject _) implements JSObject {
  external JSArray get key;
  external bool? get shortKey;
  external bool? get shiftKey;
  external bool? get altKey;
  external bool? get metaKey;
  external bool? get ctrlKey;

  // Context
  external bool get collapsed;
  external bool get empty;
  external int get offset;
  external JSObject get prefix;
  external JSObject get suffix;
  external JSObject get format;

  /// [shortKey] is a platform specific modifier equivalent to 
  /// [metaKey] on a Mac and [ctrlKey] on Linux and Windows.
  external factory BindingObject({
    JSArray key,
    bool? shortKey,
    bool? shiftKey,
    bool? altKey,
    bool? metaKey,
    bool? ctrlKey,
    bool collapsed,
    bool empty,
    int offset,
    JSObject prefix,
    JSObject suffix,
    JSObject format,
  });
}

extension type BindingContext._(JSObject _) implements JSObject {
  external bool get collapsed;
  external bool get empty;
  external int get offset;
  external KeyboardEvent get event;
  external String get prefix;
  external String get suffix;
  external JSObject get format;
  external Blot get line;
}