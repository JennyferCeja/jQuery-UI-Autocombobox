jQuery.widget('ui.autocombobox', {
    input : null,
    select : null,
    _create : function () {
        var input;
        var self = this,
        select = this.select = this.element.hide(),
        selected = select.children(':selected'),
        value = selected.val() ? selected.text() : '',
        wrapper = jQuery('<span>').addClass('ui-autocombocontainer')
                                  .insertAfter(select);

        openCloseAutocomplete = function () {
            // close if already visible
            if (input.autocomplete('widget').is(':visible')) {
                input.autocomplete('close');
                return;
            }
            // pass empty string as value to search for, displaying all results
            input.autocomplete('search', '');
            input.focus();
        };
        
        input = this.input = jQuery('<input>')
            .appendTo(wrapper)
            .addClass('ui-autocombobox')
            .val(value)
            .autocomplete({
                delay : 0,
                minLength : 0,
                position: {
                    my: 'left top',
                    at: 'left bottom',
                    collision: 'flip',
                    of: wrapper
                },
                source : function (request, response) {
                    var matcher = new RegExp(jQuery.ui.autocomplete.escapeRegex(request.term), 'i');
                    response(select.children('option').map(function () {
                            var text = jQuery(this).text();
                            if (this.value && (!request.term || matcher.test(text)))
                                return {
                                    label : text.replace(
                                        new RegExp(
                                            '(?![^&;]+;)(?!<[^<>]*)(' +
                                            jQuery.ui.autocomplete.escapeRegex(request.term) +
                                            ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<b>$1</b>'),
                                    value : text,
                                    option : this
                                };
                        }));
                },
                select : function (event, ui) {
                    input.autocomplete('close');
                    ui.item.option.selected = true;
                    self._trigger('selected', event, {
                        item : ui.item.option
                    });
                },
                change : function (event, ui) {
                    if (!ui.item) {
                        var matcher = new RegExp('^' + jQuery.ui.autocomplete.escapeRegex(jQuery(this).val()) + '$', 'i'),
                        valid = false;
                        select.children('option').each(function () {
                            if (jQuery(this).text().match(matcher)) {
                                this.selected = valid = true;
                                return false;
                            }
                        });
                        if (!valid) {
                            // remove invalid value, as it didn't match anything
                            jQuery(this).val('');
                            select.val('');
                            input.data('autocomplete').term = '';
                            return false;
                        }
                    }
                }
            })
            .click(openCloseAutocomplete);

        input.data('autocomplete')._renderItem = function (ul, item)
        {
            if(!ul.hasClass('ui-autocombolist'))
                ul.addClass('ui-autocombolist');

            return jQuery('<li></li>').data('item.autocomplete', item)
                                      .append('<a>' + item.label + '</a>')
                                      .appendTo(ul);
        };
        
        button = jQuery('<button> </button>')
                        .attr('tabIndex', -1)
                        .attr('title', 'Voir tous les éléments')
                        .addClass('ui-autocombobutton')
                        .insertAfter(input)
                        .button({
                            icons : {
                                primary : 'ui-icon-triangle-1-s'
                            },
                            text : false
                        })
                        .removeClass('ui-corner-all')
                        .addClass('ui-corner-right')
                        .click(openCloseAutocomplete);
                                    
        input.width(input.width() - button.outerWidth() - button.css('padding-left').replace('px', ''));
    },
    setValue : function(val) {
        this.select.val(val);
        text = this.select.children(':selected').text();

        this.input.val(text);
        this.input.data('autocomplete').term = text;
    },
    destroy : function () {
        this.wrapper.remove();
        this.element.show();
        jQuery.Widget.prototype.destroy.call(this);
    }
});