//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Tue Sep 3 12:37 PM CST 2024
// Author: rudyhuang

@JS()
library quill_js;

import 'dart:html';

import 'package:js/js.dart';

@JS()
abstract class Scroll {
  external RegistryDefination? query(String query, [int? scope = ParchmentScope.any]);
  external Blot? find(Node node, [bool bubble = false]);
  /// Returns `[Blot?, int]`
  external List<dynamic> descendant(bool Function(Blot?) matcher, int index);
  external List<Blot> descendants(bool Function(Blot?) matcher, int index, int length);
}

@JS()
abstract class Blot {
  external BlotConstructor get statics;
  external Blot? get parent;
  external Blot? get prev;
  external Blot? get next;
  external List<Blot> get children;
  external Scroll get scroll;
  external Node get domNode;
  external int length();
  external int offset([Blot? root]);
  external void remove();
  external Blot replaceWith(String name, dynamic value);
}

@JS()
abstract class RegistryDefination {
  /// see [ParchmentScope]
  external int get scope;
}

@JS()
abstract class BlotConstructor extends RegistryDefination {
  external String get blotName;
  external String get tagName;
  external String? get className;
}

@JS()
abstract class Formattable extends Blot {
  external void format(String name, dynamic value);

  external Object formats();
}

@JS()
abstract class Leaf extends Blot {
  external dynamic value();
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