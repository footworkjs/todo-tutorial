var TodoForm = fw.viewModel.create({
  namespace: 'TodoForm',
  autoRegister: true,
  initialize: function() {
    // The observable which stores the current thingToDo form text
    this.thingToDo = fw.observable();

    // create the namespace 'channel' we will use to talk to the TodoList
    this.todoListNamespace = fw.namespace('TodoList');

    this.submitForm = function() {
      // The user wishes to add a todo item, lets tell the TodoList what it is
      this.todoListNamespace.publish('newItem', this.thingToDo());

      // clear out the text box so the user can type a new entry
      this.thingToDo('');
    };
  }
});