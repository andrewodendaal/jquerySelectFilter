(function($) {
	$.fn.dropdownFilter = function( options ) {

		var original_input = $(this);

		var settings = $.extend({
			id: Math.random().toString().split(".").join(""),
			name: "dropdownFilterValue",
			style: "",
			defaultvalue: "Select..",
			optionslist: ["<a href='javascript:;' data-id='test1'>test1</a>",
				"<a href='javascript:;' data-id='test2'>test2</a>",
				"<a href='javascript:;' data-id='test3'>test3</a>"],
			callbackadd: function(data) {}
		}, options);


		var html = "<div class='dropdownFilterContainer' id='dropdownFilterContainer_"+settings.id+"'> \
						<div class='dropdownFilterContainer_simple' style='"+settings.style+"' id='dropdownFilterContainer_simple_"+settings.id+"'><span class='simple_value'>"+settings.defaultvalue+"</span><span class='arrow'>&#x25BC;</span></div> \
						<div class='dropdownFilterContainer_advanced' style='"+settings.style+"' id='dropdownFilterContainer_advanced_"+settings.id+"'> \
							<div class='dropdownFilterContainer__search'id='dropdownFilterContainer__search_"+settings.id+"'> \
								<input type='text' placeholder='Search..' /> \
							</div> \
							<div class='dropdownFilterContainer__select'id='dropdownFilterContainer__select_"+settings.id+"'>";

		for (var i=0; i<settings.optionslist.length; i++) {
			html += settings.optionslist[i];
		}

		html += "			</div> \
							<div class='dropdownFilterContainer__add'id='dropdownFilterContainer__add_"+settings.id+"'> \
								<input id='txt' type='text' placeholder='Add new..' /> \
							</div> \
							<input type='hidden' class='dropdownFilterHiddenValue'id='dropdownFilterHiddenValue_"+settings.id+"' name='"+settings.name+"' value='DEFAULT VALUE' /> \
						</div> \
					</div> \
				</div>";

		original_input.parent().append(html);

		$("#dropdownFilterContainer__search_"+settings.id+" input").keyup(function() {
			var value = $("#dropdownFilterContainer__search_"+settings.id+" input").val();
			$("#dropdownFilterContainer__select_"+settings.id+" > a").each(function() {
				if ($(this).text().search(value) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		});
		function dropdownFilterUpdateValue(id, value) {
			$("#dropdownFilterContainer_simple_"+settings.id+" span.simple_value").html( value );
			original_input.val( id );
			$("#dropdownFilterContainer_"+settings.id).trigger("mouseout");
		}
		$("#dropdownFilterContainer__select_"+settings.id+" a").on("click", function() {
			dropdownFilterUpdateValue($(this).attr("data-id"), $(this).html());
		});
		$("#dropdownFilterContainer__add_"+settings.id+" input").keypress(function(e) {
			var value = $("#dropdownFilterContainer__add_"+settings.id+" input").val();
			if(e.which == 13) {

				settings.callbackadd(value);

				$("#dropdownFilterContainer__select_"+settings.id).append('<a href="javascript:;" data-id="'+value+'">'+value+'</a>');
				dropdownFilterUpdateValue(value, value);
				$("#dropdownFilterContainer__select_"+settings.id+" a").off().on("click", function() {
					dropdownFilterUpdateValue($(this).attr("data-id"), $(this).html());
				});
			}
		});

		$("#dropdownFilterContainer_"+settings.id).on("mouseover", function() {
			$("#dropdownFilterContainer_simple_"+settings.id).hide();
			$("#dropdownFilterContainer_advanced_"+settings.id).show();
			$("#dropdownFilterContainer__search_"+settings.id+" input").focus();
		});
		$("#dropdownFilterContainer_"+settings.id).on("mouseout", function() {
			$("#dropdownFilterContainer_advanced_"+settings.id).hide();
			$("#dropdownFilterContainer_simple_"+settings.id).show();
		});

		setInterval(function() {
			if ($("#dropdownFilterContainer_simple_"+settings.id).is("visible")) {
				$("#dropdownFilterContainer__add_"+settings.id+" input").val("");

				$("#dropdownFilterContainer__search_"+settings.id+" input").val("");
				$("#dropdownFilterContainer__select_"+settings.id+" > a").each(function() {
					$(this).show();
				});
			}
		}, 1000);

	};
})(jQuery)
