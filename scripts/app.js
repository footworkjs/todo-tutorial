/**
 * Do not use templates this way! You should save the template
 * in a file.
 *
 * The HTML is embedded in a string here to keep this step focused on
 * components only. Look at the next step for an explanation on
 * how to dynamically load these from disk.
 */
var TodoFormHTML = '<form class="todo" data-bind="submit: submitForm">\
  <div class="icon-chevron-down"></div>\
  <input type="text" name="thingToDo" data-bind="value: thingToDo" placeholder="What needs to be done?" autofocus>\
  <input type="submit" value="Add Item" class="button">\
</form>';

fw.components.register('todoform', {
  viewModel: TodoForm,
  template: TodoFormHTML
});

// tell footwork to startup and begin binding
fw.start();