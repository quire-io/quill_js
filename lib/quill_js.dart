//Copyright (C) 2024 Potix Corporation. All Rights Reserved.
//History: Wed Jun 19 09:52 AM CST 2024
// Author: jimmyshiau
@JS()
library quill_js;

import "package:js/js.dart";

@JS('QuillJsLib.createQuill')
external Quill createQuill(dynamic container, QuillConfiguration options);

@JS('QuillJsLib.Quill')
class Quill {

  external void setContents(List<dynamic> data);
  
  external void updateContents(List<dynamic> data, [String source = 'api']);

  external void on(String name, Function handler);

  external void off(String name, Function handler);
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
class DeltaAttributes {}

@anonymous
@JS()
abstract class DeltaInsert {
  external DeltaAttributes? get attributes;
  external set attributes(DeltaAttributes? v);

  external String get insert;
  external set insert(String v);

   external factory DeltaInsert({
    String insert,
    DeltaAttributes? attributes,});
}

@anonymous
@JS()
abstract class DeltaDelete {
  external DeltaAttributes? get attributes;
  external set attributes(DeltaAttributes? v);

  external int get delete;
  external set delete(int v);

   external factory DeltaDelete({
    int delete,
    DeltaAttributes? attributes,});
}

@anonymous
@JS()
abstract class DeltaRetain {
  external DeltaAttributes? get attributes;
  external set attributes(DeltaAttributes? v);

  external int get retain;
  external set retain(int v);

   external factory DeltaRetain({
    int retain,
    DeltaAttributes? attributes,});
}
