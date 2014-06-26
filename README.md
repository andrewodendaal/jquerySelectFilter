jquerySelectFilter
==================

An advanced select component with ability to add and filter through select elements



[View the examples](https://rawgit.com/andrewodendaal/jquerySelectFilter/master/examples.html)



###Basic usage

```html
<input type="hidden" id="selectFilter" name="selectFilter" value="" />
```

```javascript
$("#selectFilter").jquerySelectFilter();
```

Or add some options
```javascript
$("#selectFilter").jquerySelectFilter({
	id: "some_id",
	name: "some_name",
	style: "width:250px",
	defaultvalue: "Select..",
	optionslist: ["test1","test2","test3"],
	callbackadd: function(data) {},
	actionadd: function(data) {},
	addnewtype: "input",
	addnewvalue: "Add new.."
});
```

`style` is the css style you would like to associate to the grouped element, such as `width:250px`
