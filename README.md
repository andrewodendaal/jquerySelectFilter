jquerySelectFilter
==================

An advanced select component with ability to add and filter through select elements



[View the examples](https://rawgit.com/ao/jquerySelectFilter/master/examples.html)



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
	optionslist: ["test1", "test2", "test3"],
	optionslistkey: name,
	callbackselect: function(data, that) {},
	callbackadd: function(data) {},
	actionadd: function(data) {},
	addnew: true,
	addnewtype: "input",
	addnewvalue: "Add new..",
	addnewbuttonvalue: "Add",
	replaceoptions: replaceOptions
});
```
