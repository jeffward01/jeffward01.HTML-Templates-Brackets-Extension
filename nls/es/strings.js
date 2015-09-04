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
/*global define, brackets, $ */

define({
    'MENU_COMMAND': 'Generar archivo HTML ...',
    'TITLE_H1': 'Configuración de HTML',
    'LANGUAGE_SELECTION' : '1.) Seleccione la etiqueta de idioma',
    'LANGUAGE_DESCRIPTION': 'Idiomas soportados:',
    'CHARSET_SELECTION': '2.) Seleccione su etiqueta charset',
    'CHARSET_DESCRIPTION':'De juego de caracteres disponibles:',
    'NO_FILE_OPEN_ERROR': 'No hay ningún archivo abierto. Por favor, abra un archivo antes de ejecutar Plantillas HTML.',
    'TITLE_H4': '3. ) Escoge un DOCTYPE',
    'CONTENT_ERROR': 'El archivo ya tiene contenido, esta acción sobreescribirá el contenido existente.',
    'SECTION_DOCTYPE': 'DOCTYPES estándar:',
    'SELECT_LABEL': 'Elegir...',
    'SECTION_TEMPLATES': '4. ) Elija las bibliotecas que desea utilizar',
    'SECTION_TEMPLATES_DESC': 'Estas bibliotecas están alojados en Google CDN',
    'GENERATE_BUTTON': 'generar HTML',
    'CANCEL_BUTTON': 'Cancelar'
});
