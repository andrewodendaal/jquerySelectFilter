/**
 * Requires JSON.parse and JSON.stringify
 */

(function($) {
	$.fn.jquerySelectFilter = function( options ) {

        var _defaultvalue = "Select..";

		var original_input = $(this);

		var settings = $.extend({
			id: Math.random().toString().split(".").join(""),
			name: "jquerySelectFilterValue",
			style: "",
			defaultvalue: _defaultvalue,
			optionslist: ["test1","test2","test3"],
            optionslistkey: name,
            callbackselect: function(data) {},
			callbackadd: function(data) {},
			actionadd: function(data) {},
			addnew: true,
			addnewtype: "input",
			addnewvalue: "Add new.."
		}, options);

        if (settings.defaultvalue!=_defaultvalue) original_input.val( settings.defaultvalue );

		var html = "<div class='jquerySelectFilterContainer' id='jquerySelectFilterContainer_"+settings.id+"'> \
						<div class='jquerySelectFilterContainer_simple' style='"+settings.style+"' id='jquerySelectFilterContainer_simple_"+settings.id+"'><span class='simple_value'>"+settings.defaultvalue+"</span><span class='arrow'>&#x25BC;</span></div> \
						<div class='jquerySelectFilterContainer_advanced' style='"+settings.style+"' id='jquerySelectFilterContainer_advanced_"+settings.id+"'> \
							<div class='jquerySelectFilterContainer__search'id='jquerySelectFilterContainer__search_"+settings.id+"'> \
								<input type='text' placeholder='Search..' /> \
							</div> \
							<div class='jquerySelectFilterContainer__select'id='jquerySelectFilterContainer__select_"+settings.id+"'>";

		for (var i=0; i<settings.optionslist.length; i++) {
			if (typeof settings.optionslist[i]=="object") html += "<a href='javascript:;' data-obj='"+ JSON.stringify(settings.optionslist[i])+"' data-id='"+settings.optionslist[i][settings.optionslistkey]+"'>"+settings.optionslist[i][settings.optionslistkey]+"</a>";
            else html += "<a href='javascript:;' data-obj='' data-id='"+settings.optionslist[i]+"'>"+settings.optionslist[i]+"</a>";
		}

		html += "			</div>";

		if (settings.addnew) {
			html += "		<div class='jquerySelectFilterContainer__add'id='jquerySelectFilterContainer__add_"+settings.id+"'>";

			if (settings.addnewtype=="input") {
				html += "		<input id='txt' type='text' placeholder='"+settings.addnewvalue+"' />";
			} else if(settings.addnewtype=="button") {
				html += "		<input id='txt' type='button' value='"+settings.addnewvalue+"' />";
			} else {
				html += "		<input id='txt' type='text' placeholder='"+settings.addnewvalue+"' />";
			}


			html += "		</div>";
		}
		html += "			<input type='hidden' class='jquerySelectFilterHiddenValue'id='jquerySelectFilterHiddenValue_"+settings.id+"' name='"+settings.name+"' value='DEFAULT VALUE' /> \
						</div> \
					</div> \
				</div>";

		original_input.parent().append(html);

		$("#jquerySelectFilterContainer__search_"+settings.id+" input").keyup(function() {
			var value = $("#jquerySelectFilterContainer__search_"+settings.id+" input").val();
			$("#jquerySelectFilterContainer__select_"+settings.id+" > a").each(function() {
				if ($(this).text().search(value) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		});
		function jquerySelectFilterUpdateValue(id, value) {
			$("#jquerySelectFilterContainer_simple_"+settings.id+" span.simple_value").html( value );
			original_input.val( id );
			$("#jquerySelectFilterContainer_"+settings.id).trigger("mouseout");
		}
		$("#jquerySelectFilterContainer__select_"+settings.id+" a").on("click", function() {

            if ($(this).attr("data-obj")=="") {
                jquerySelectFilterUpdateValue($(this).attr("data-id"), $(this).html());
                settings.callbackselect($(this));
            } else {
                var _obj = JSON.parse($(this).attr("data-obj"));
                jquerySelectFilterUpdateValue(_obj[settings.optionslistkey], $(this).html());
                settings.callbackselect(_obj);
            }

		});

		if (settings.addnew) {
			if (settings.addnewtype=="input") {
				$("#jquerySelectFilterContainer__add_"+settings.id+" input").keypress(function(e) {
					var _value = $("#jquerySelectFilterContainer__add_"+settings.id+" input").val();
					if(e.which == 13) {

						settings.callbackadd(_value);

						$("#jquerySelectFilterContainer__select_"+settings.id).append('<a href="javascript:;" data-id="'+_value+'">'+_value+'</a>');
						jquerySelectFilterUpdateValue(_value, _value);
						$("#jquerySelectFilterContainer__select_"+settings.id+" a").off().on("click", function() {
							jquerySelectFilterUpdateValue($(this).attr("data-id"), $(this).html());
						});
					}
				});
			} else if (settings.addnewtype=="button") {
				$("#jquerySelectFilterContainer__add_"+settings.id+" input").click(function(e) {
					settings.callbackadd();
				});
			}
		}

		$("#jquerySelectFilterContainer_"+settings.id).on("mouseover", function() {
			$("#jquerySelectFilterContainer_simple_"+settings.id).hide();
			$("#jquerySelectFilterContainer_advanced_"+settings.id).show();
			$("#jquerySelectFilterContainer__search_"+settings.id+" input").focus();
		});
		$("#jquerySelectFilterContainer_"+settings.id).on("mouseout", function() {
			$("#jquerySelectFilterContainer_advanced_"+settings.id).hide();
			$("#jquerySelectFilterContainer_simple_"+settings.id).show();
		});

		setInterval(function() {
			if ($("#jquerySelectFilterContainer_simple_"+settings.id).is("visible")) {
				$("#jquerySelectFilterContainer__add_"+settings.id+" input").val("");

				$("#jquerySelectFilterContainer__search_"+settings.id+" input").val("");
				$("#jquerySelectFilterContainer__select_"+settings.id+" > a").each(function() {
					$(this).show();
				});
			}
		}, 1000);

	};
})(jQuery)
