define(['footwork'],
  function(fw) {
    return fw.viewModel.create({
      namespace: 'TodoItem',
      initialize: function(thingToDo) {
        // create the namespace 'channel' we will use to talk to the TodoList
        this.todoListNamespace = fw.namespace('TodoList');

        // store the string text entered by user as thingToDo
        this.thingToDo = fw.observable(thingToDo);

        // store the state of the TodoItem (true = done, false = not done)
        this.isDone = fw.observable(false);

        // Listen for any changes on the TodoItem isDone state
        this.isDone.subscribe(function() {
          // when it is changed publish an 'itemChanged' event to the TodoList
          this.todoListNamespace.publish('itemChanged');
        }, this);

        // toggle the state of this TodoItem
        this.toggleDone = function() {
          this.isDone(!this.isDone());
        };

        // method used to send the deleteItem command when a user clicks the 'X'
        this.deleteItem = function() {
          // tell the TodoList to delete this item
          this.todoListNamespace.command('deleteItem', this);
        };
      }
    });
  }
);