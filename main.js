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
  var modal = require('text!html/modal.html');
  var Strings = require('strings');

  //Define Libraries Scripts

  //  var lib_angular = document.getElementById('angularjs').value;
  //  var lib_angularMaterial = document.getElementById('angularmaterial').value;
  //  var lib_dojo = document.getElementById('dojo').value;
  //  var lib_extcore = document.getElementById('extcore').value;
  //  var lib_jquery111 = document.getElementById('jquery111').value;
  //  var lib_jquery214 = document.getElementById('jquery214').value;
  //  var lib_jquerymobile = document.getElementById('lib_jquerymobile').value;
  //



  //Edit > Generate HTML... is selected 'clicked'
  function action() {

    //Show Modal
    Dialogs.showModalDialogUsingTemplate(Mustache.render(modal, Strings));

    //Valdation to see State of main UI
    var editor = EditorManager.getCurrentFullEditor();
    if (editor) {
      //Checks main UI to see if there is content on open page/file
      if (editor._codeMirror.getValue().length > 0) {
        // file has content, show warning
        $('#templates_warning').show();
      }
    } else {
      // no file is open, show error
      $('#templates_error').show();
    }

    //JEFF START CODING BELOW




    // result of clicking a template choice
    // selector is very specific to avoid cross-extension contamination, just in case
    $('#generate_html_button').on('click', function () {

      // send the chosen template
      chosenTemplate($(this).val());
    }); //End on-Click


    //Declare choice.  Choice = user's selection from Modal.
    var choice = new Object();

    choice.language = function () {
        //Buid HTML top 'head'
        var htmlTop = "<!DOCTYPE html>" + "<html>" + "<head lang='";
        //Grab Selected Language Type
        var languageChoice = document.getElementById("languages").value;
        //Determine what Selected Language type is and complete HTML 'head'
        if (languageChoice === "english") {
          languageChoice = "en";
          return htmlTop + languageChoice + "'>";
        } else if (languageChoice === "german") {
          languageChoice = "de";
          return htmlTop + languageChoice + "'>";
        } else if (languageChoice === "spanish") {
          languageChoice = "es";
          return htmlTop + languageChoice + "'>";
        } else if (languageChoice === "french") {
          languageChoice = "fr";
          return htmlTop + languageChoice + "'>";
        } else if (languageChoice === "italian") {
          languageChoice = "it";
          return htmlTop + languageChoice + "'>";
        } else if (languageChoice === "chinese") {
          languageChoice = "zh-cn";
          return htmlTop + languageChoice + "'>";
        }
      } //end choice.language

    choice.charset = function () {
        //Build meta and the rest of the 'head tag'
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
      } // end choice.charset

    choice.doctype = function () {
      var doctypeChoice = document.getElementById("doctype").value;
      return doctypeChoice;
    }
    choice.libraries = function () {
      var checkedBoxes = getCheckedBoxes("lib_checkboxes");
      checkedBoxes.forEach(function(item){
      var scripts += $(item).data('script') + '\n';
      var bottomHTML = scripts + "</body>" + "</html>";
        return bottomHTML;
      });//End forEach

    } //End choice.libraries


    var chosenTemplate = function(){
    var template = choice.language() + choice.charset() + choice.libraries();

      // insert html into file, this will overwrite whatever content happens to be there already
      EditorManager.getCurrentFullEditor()._codeMirror.setValue(template);

      // automatically close the modal window
      $('#templates_modalBtn').click();
    }

    //Get checkedBoxes function
    // Pass the checkbox name to the function
    function getCheckedBoxes(chkboxName) {
      var checkboxes = document.getElementsByName(chkboxName);
      var checkboxesChecked = [];
      // loop over them all
      for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i]);
        }
      }
      // Return the array if it is non-empty, or null
      return checkboxesChecked.length > 0 ? checkboxesChecked : null;
    }


  } // End action();

  //JEFF STOP CODING HERE

  // Register the commands and insert in the File menu
  CommandManager.register(Strings.MENU_COMMAND, 'templates', action);
  var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
  menu.addMenuDivider();
  menu.addMenuItem('templates');

}); //end define;
