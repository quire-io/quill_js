//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Tue Sep 3 12:37 PM CST 2024
// Author: rudyhuang

@JS()
library;

import 'dart:js_interop';

import 'package:web/web.dart';

extension type Blot._(JSObject _) implements JSObject {
  external BlotConstructor get statics;
  external Blot? get parent;
  external Blot? get prev;
  external Blot? get next;
  /// Notice: Should check the existence with `js_util.hasProperty(blot, 'children')` first
  /// Example: if (js_util.hasProperty(blot, 'children')) { ... }
  /// since not all `Blot` is `Parent`.
  external LinkedList<Blot> get children;
  external Scroll get scroll;
  external Node get domNode;
  external int length();
  external int offset([Blot? root]);
  external void remove();
  external Blot replaceWith(String name, JSAny value);
}

extension type Scroll._(JSObject _) implements Blot {
  external RegistryDefination? query(String query, [int? scope]);
  external Blot? find(Node node, [bool bubble]);
  /// Returns `[Blot?, int]`
  external JSArray descendant(JSFunction matcher, int index);
  external JSArray<Blot> descendants(JSFunction matcher, int index, int length);
}

extension type LinkedList<T extends JSAny>._(JSObject _) implements JSObject {
  external T? get head;

  external T? get tail;

  external T? at(int index);

  external int get length;

  external void forEach(JSFunction callback);

  external JSArray<R> map<R extends JSAny?>(JSFunction callback);
}

extension type RegistryDefination._(JSObject _) implements JSObject {
  /// see [ParchmentScope]
  external int get scope;
}

extension type BlotConstructor._(JSObject _) implements RegistryDefination {
  external String get blotName;
  external String get tagName;
  external String? get className;
}

extension type Formattable._(JSObject _) implements Blot {
  external void format(String name, JSAny value);

  external JSObject formats();
}

extension type Leaf._(JSObject _) implements Blot {
  external JSAny value();
}

abstract class ParchmentScope {
  static const int type = (1 << 2) - 1; // 0011 Lower two bits
  static const int level = ((1 << 2) - 1) << 2; // 1100 Higher two bits

  static const int attribute = (1 << 0) | level; // 1101
  static const int blot = (1 << 1) | level; // 1110
  static const int inline = (1 << 2) | type; // 0111
  static const int block = (1 << 3) | type; // 1011

  static const int blockBlot = block & blot; // 1010
  static const int inlineBlot = inline & blot; // 0110
  static const int blockAttribute = block & attribute; // 1001
  static const int inlineAttribute = inline & attribute; // 0101

  static const int any = type | level;
}
