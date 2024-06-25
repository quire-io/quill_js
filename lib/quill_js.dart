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
    List<dynamic> header,});
}