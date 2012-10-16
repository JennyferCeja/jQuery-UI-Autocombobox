jQuery-UI-Autocombobox
======================

This project is a jQuery-UI Autocomplete field using the &lt;option>&lt;/option> elements of a &lt;select>&lt;/select> element as the source of text for the autocomplete and value.

It permits autocompletion on textual values within the &lt;option>&lt;/option> elements while using &lt;option>&lt;/option> "val" attribute as the real value of the autocomplete combobox

Original &lt;select>&lt;/select> element is also kept up-to-date by the autocomplete combobox and must contains at least an &lt;option val="">&lt;/option> element which will be used when no value matches the searched text

## Usage


This creates the autocomplete combobox

    jQuery('#mySelect').autocombobox();

This sets the value of the autocomplete combobox and of the underlying combobox. This value must be one the &lt;option>&lt;/option> val attribute otherwise it will be set to ''

    jQuery('#mySelect').autocombobox('setValue', value);

This returns the value of the selected &lt;option>&lt;/option> element

    jQuery('#mySelect').val();
    jQuery('#mySelect').autocombobox().val();

    
## Compatibility

Works well on

 * Google Chrome 22.0
 * IE9
 * IE9 in IE8 mode
 * Firefox 15
 * Safari 5.1

Works with some glitches on

 * IE9 in IE7 mode 
 * IE6

It's forked from http://www.learningjquery.com/2010/06/a-jquery-ui-combobox-under-the-hood