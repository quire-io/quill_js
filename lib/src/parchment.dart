//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Tue Sep 3 12:37 PM CST 2024
// Author: rudyhuang

@JS()
library quill_js;

import 'dart:html';

import 'package:js/js.dart';

@JS()
abstract class Scroll {
  external Object? query(String query);
  external Blot? find(Node node, [bool bubble = false]);
  /// Returns `[Blot?, int]`
  external List<dynamic> descendant(bool Function(Blot?) matcher, int index);
  external List<Object> descendants(bool Function(Blot?) matcher, int index, int length);
}

@JS()
abstract class Blot {
  external BlotConstructor get statics;
  external Blot? get parent;
  external Blot? get prev;
  external Blot? get next;
  external Node get domNode;
  external int length();
  external int offset([Blot? root]);
  external void remove();
  external Blot replaceWith(String name, dynamic value);
}

@JS()
abstract class BlotConstructor {
  external String get blotName;
  external String get tagName;
  external String? get className;
}

@JS()
abstract class Formattable extends Blot {
  external void format(String name, dynamic value);
}

@JS()
abstract class Leaf extends Blot {
  external dynamic value();
}