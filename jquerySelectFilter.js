/**
 * Requires JSON.parse and JSON.stringify
 */

(function($) {
    $.fn.jquerySelectFilter = function(options) {

        var _defaultvalue = "Select..";

        var original_input = $(this);


        var replaceOptions = function(options) {
            settings.optionslist = options;
            var html = renderOptions();
            $("#jquerySelectFilterContainer__select_" + settings.id).html(html);
        };

        var settings = $.extend({
            id: Math.random().toString().split(".").join(""),
            name: "jquerySelectFilterValue",
            style: "",
            defaultvalue: _defaultvalue,
            optionslist: ["test1", "test2", "test3"],
            optionslistkey: name,
            callbackselect: function(data, that) {},
            callbackadd: function(data) {},
            actionadd: function(data) {},
            onchange: function(event, value) {},
            addnew: true,
            addnewtype: "input",
            addnewvalue: "Add new..",
            addnewbuttonvalue: "Add",
            replaceoptions: replaceOptions
        }, options);


        function renderOptions() {
            var html = '';
            for (var i = 0; i < settings.optionslist.length; i++) {
                if (typeof settings.optionslist[i] == "object") html += "<a href='javascript:;' data-obj='" + JSON.stringify(settings.optionslist[i]) + "' data-id='" + settings.optionslist[i][settings.optionslistkey] + "'>" + settings.optionslist[i][settings.optionslistkey] + "</a>";
                else html += "<a href='javascript:;' data-obj='' data-id='" + settings.optionslist[i] + "'>" + settings.optionslist[i] + "</a>";
            }
            return html;
        }

        if (settings.defaultvalue != _defaultvalue) original_input.val(settings.defaultvalue);

        var html = "<div class='jquerySelectFilterContainer' id='jquerySelectFilterContainer_" + settings.id + "'> \
						<div class='jquerySelectFilterContainer_simple' style='" + settings.style + "' id='jquerySelectFilterContainer_simple_" + settings.id + "'><span class='simple_value'>" + settings.defaultvalue + "</span><span class='arrow'>&#x25BC;</span></div> \
						<div class='jquerySelectFilterContainer_advanced' style='" + settings.style + "' id='jquerySelectFilterContainer_advanced_" + settings.id + "'> \
							<div class='jquerySelectFilterContainer__search'id='jquerySelectFilterContainer__search_" + settings.id + "'> \
								<input type='text' placeholder='Search..' /> \
							</div> \
							<div class='jquerySelectFilterContainer__select'id='jquerySelectFilterContainer__select_" + settings.id + "'>";

        html += renderOptions();

        html += "			</div>";

        if (settings.addnew) {
            html += "		<div class='jquerySelectFilterContainer__add'id='jquerySelectFilterContainer__add_" + settings.id + "'>";

            if (settings.addnewtype == "input") {
                html += "<input id='txt' class='add-text' type='text' placeholder='" + settings.addnewvalue + "' /><input id='txt' type='button' class='add-button' value='" + settings.addnewbuttonvalue + "' />";
            } else if (settings.addnewtype == "double-input") {
                html += "<input id='txt' class='add-text split' type='text' placeholder='" + settings.addnewvalue[0] + "' /><input id='txt' class='add-text split' type='text' placeholder='" + settings.addnewvalue[1] + "' /><input id='txt' type='button' class='add-button' value='" + settings.addnewbuttonvalue + "' />";

            } else if (settings.addnewtype == "button") {
                html += "		<input id='txt' type='button' value='" + settings.addnewvalue + "' />";
            } else {
                html += "		<input id='txt' type='text' placeholder='" + settings.addnewvalue + "' />";
            }


            html += "		</div>";
        }

        html += "			<input type='hidden' class='jquerySelectFilterHiddenValue'id='jquerySelectFilterHiddenValue_" + settings.id + "' name='" + settings.name + "' value='DEFAULT VALUE' /> \
						</div> \
					</div> \
				</div>";

        original_input.parent().append(html);

        $("#jquerySelectFilterContainer__search_" + settings.id + " input").keyup(function(event) {
            var value = $("#jquerySelectFilterContainer__search_" + settings.id + " input").val();

            settings.onchange(event, value, settings);

            $("#jquerySelectFilterContainer__select_" + settings.id + " > a").each(function() {
                if ($(this).text().toUpperCase().search(value.toUpperCase()) > -1) {
                    $(this).show().addClass('visible').removeClass('hidden');
                } else {
                    $(this).hide().addClass('hidden').removeClass('visible');
                }
            });
        });

        function jquerySelectFilterUpdateValue(id, value) {
            $("#jquerySelectFilterContainer_simple_" + settings.id + " span.simple_value").html(value);
            original_input.val(id);
            $("#jquerySelectFilterContainer_" + settings.id).trigger("mouseout");
        }

        function jquerySelectFilterAddValue() {

            if (settings.addnewtype == "double-input") {
                var first = $("#jquerySelectFilterContainer__add_" + settings.id + " input:first").val();
                var second = $("#jquerySelectFilterContainer__add_" + settings.id + " input:eq(1)").val();
                var editedValue = settings.callbackadd(first,second);
                var _value;
                if (first && second) {
                    var _value = first + ' ' + second;
                }
            }
            else {
                var _value = $("#jquerySelectFilterContainer__add_" + settings.id + " input").val();
                var editedValue = settings.callbackadd(_value);
            }

            if (editedValue) {
                _value = editedValue;
            }

            $("#jquerySelectFilterContainer__select_" + settings.id).append('<a href="javascript:;" data-id="' + _value + '">' + _value + '</a>');
            jquerySelectFilterUpdateValue(_value, _value);
            $("#jquerySelectFilterContainer__select_" + settings.id + " a").off().on("click", function() {
                jquerySelectFilterUpdateValue($(this).attr("data-id"), $(this).html());
            });
        }

        $("#jquerySelectFilterContainer__select_" + settings.id ).on("click", 'a', function() {

            if ($(this).attr("data-obj") == "") {
                jquerySelectFilterUpdateValue($(this).attr("data-id"), $(this).html());
                settings.callbackselect($(this), $(this));
            } else {
                var _obj = JSON.parse($(this).attr("data-obj"));
                jquerySelectFilterUpdateValue(_obj[settings.optionslistkey], $(this).html());
                settings.callbackselect(_obj, $(this));
            }

        });

        if (settings.addnew) {
            if (settings.addnewtype == "input" || settings.addnewtype == "double-input") {
                $("#jquerySelectFilterContainer__add_" + settings.id + " input").keypress(function(e) {

                    if (e.which == 13) {
                      jquerySelectFilterAddValue();
                    }
                });
                $("#jquerySelectFilterContainer__add_" + settings.id + " .add-button").click(function(e) {
                      jquerySelectFilterAddValue();
                      return false;
                });
            } else if (settings.addnewtype == "button") {
                $("#jquerySelectFilterContainer__add_" + settings.id + " input").click(function(e) {
                    settings.callbackadd();
                });
            }
        }

        $("#jquerySelectFilterContainer_" + settings.id).on("mouseover", function() {
            $("#jquerySelectFilterContainer_simple_" + settings.id).hide();
            $("#jquerySelectFilterContainer_advanced_" + settings.id).show();
            if (settings.addnewtype != "double-input") $("#jquerySelectFilterContainer__search_" + settings.id + " input").focus();
        });
        $("#jquerySelectFilterContainer_" + settings.id).on("mouseleave", function() {
            $("#jquerySelectFilterContainer_advanced_" + settings.id).hide();
            $("#jquerySelectFilterContainer_simple_" + settings.id).show();
        });

        setInterval(function() {
            if ($("#jquerySelectFilterContainer_simple_" + settings.id).is("visible")) {
                $("#jquerySelectFilterContainer__add_" + settings.id + " input").val("");

                $("#jquerySelectFilterContainer__search_" + settings.id + " input").val("");
                $("#jquerySelectFilterContainer__select_" + settings.id + " > a").each(function() {
                    $(this).show();
                });
            }
        }, 1000);

    };
})(jQuery);
