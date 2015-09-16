/*
 * Copyright (c) 2015 Jeff Ward. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true */
/*global define, require, brackets, $, Mustache, chosenTemplate */

require.config({
  paths: {
    "text": "lib/text",
    "i18n": "lib/i18n"
  },
  locale: brackets.getLocale()
});

define(function (require, exports, module) {

  'use strict';

  var CommandManager = brackets.getModule('command/CommandManager'),
      EditorManager = brackets.getModule('editor/EditorManager'),
      Menus = brackets.getModule('command/Menus'),
      Dialogs = brackets.getModule('widgets/Dialogs');

  // load up modal content, don't forget text! at beginning of file name
  var modal = require('text!html/modal.html'),
      Strings = require('strings');

  //Define Libraries Scripts

  //  var lib_angular = document.getElementById('angularjs').value;
  //  var lib_angularMaterial = document.getElementById('angularmaterial').value;
  //  var lib_dojo = document.getElementById('dojo').value;
  //  var lib_extcore = document.getElementById('extcore').value;
  //  var lib_jquery111 = document.getElementById('jquery111').value;
  //  var lib_jquery214 = document.getElementById('jquery214').value;
  //  var lib_jquerymobile = document.getElementById('lib_jquerymobile').value;

  //-----------------------------

  //add event listener here
//  $('#generate_html_button').on('click', templateBuilder.build);
//this breaks it
//  document.getElementById("generate_html_button").addEventListener("click", function(){ alert("Hello World!"); });


  function generateHtml() {

    // Template builder is a module that is solely responsible for building templates based on user input.
    var templateBuilder = function () {

      // Private: Gets checked boxes from the UI
      function getCheckedBoxes(checkboxName) {
        var checkboxes = document.getElementsByName(checkboxName);

        var checkedBoxes = checkboxes.map(function (checkbox) {
          return checkbox.checked;
        });

        return checkedBoxes.length > 0 ? checkedBoxes : null;
      }

      // Private: Creates language section based on user input
      function getLanguageTag() {
        var htmlTop = "<!DOCTYPE html><html><head lang='";

        var languageChoice = document.getElementById("languages").value;

        var languageMap = {
          "english": "en",
          "german": "de",
          "spanish": "es",
          "french": "fr",
          "italian": "it",
          "chinese": "zh-cn"
        };

        if (languageMap[languageChoice]) {
          return htmlTop + languageMap[languageChoice] + "'>";
        } else {
          return '';
        }
      }

      // Private: Creates charset section based on user input
      function getCharset() {
        var htmlCharset_Beginning = "<meta charset='";
        var htmlCharset_End = "'>" + "<title> -Insert Title- </title>" + "<!-- Insert CSS links below -->" + "</head>" + "<body>";
        var charsetChoice = document.getElementById("charset").value;
        if (charsetChoice === "utf8") {
          charsetChoice = "UTF-8";
          return htmlCharset_Beginning + charsetChoice + htmlCharset_End;
        } else {
          charsetChoice = "UTF-16";
          return htmlCharset_Beginning + charsetChoice + htmlCharset_End;
        }
      }

      // Private: Creates doctype based on user input
      function getDoctype() {
        return document.getElementById("doctype").value;
      }

      // Private: Adds libraries based on user input
      function getLibraries() {
        var checkedBoxes = getCheckedBoxes("lib_checkboxes");
        checkedBoxes.forEach(function (item) {
          var scripts = + $(item).data('script');
          var bottomHTML = scripts + "</body>" + "</html>";
          return bottomHTML;
        });
      }

      function buildTemplate() {
        var language = templateBuilder.getLanguage(),
            charset = templateBuilder.getCharset(),
            libraries = templateBuilder.getLibraries(),
            template = language + charset + libraries;
        console.log(template);
        EditorManager.getCurrentFullEditor()._codeMirror.setValue(template);

        hideModal();
      }

      // Here we define what functions are available in the templateBuilder module
      return {
        build: buildTemplate
      };
    } ();

    function bindEvents() {
      $('#generate_html_button').on('click', templateBuilder.build);
    };

    function validateMainUI() {
      var editor = EditorManager.getCurrentFullEditor();

      if (editor && editor._codeMirror.getValue().length) {
        $('#templates_warning').show();
      } else {
        $('#templates_error').show();
      }
    };

    function showModal() {
      Dialogs.showModalDialogUsingTemplate(Mustache.render(modal, Strings));
    };

    function hideModal() {
      $('#templates_modalBtn').click();
    };

    showModal();
    validateMainUI();
    bindEvents();
  }

  CommandManager.register(Strings.MENU_COMMAND, 'templates', generateHtml);
  var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
  menu.addMenuDivider();
  menu.addMenuItem('templates');

}); //end define;
