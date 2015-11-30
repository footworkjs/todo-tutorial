define(['footwork'],
  function(fw) {
    return fw.viewModel.create({
      namespace: 'TodoItem',
      initialize: function(thingToDo) {
        // get the username from the MainRouter so we can use it in the GUID
        var loggedInUser = fw.observable().receiveFrom('MainRouter', 'loggedInUser');

        // use existing GUID or generate a random one
        var guid = thingToDo.guid || (loggedInUser() + '-' + fw.utils.guid());

        // create the namespace 'channel' we will use to talk to the TodoList
        this.todoListNamespace = fw.namespace('TodoList');

        // store the string text entered by user as thingToDo
        this.thingToDo = fw.observable(thingToDo.thingToDo);

        // store the state of the TodoItem (true = done, false = not done)
        this.isDone = fw.observable(thingToDo.isDone);

        // Listen for any changes on the TodoItem isDone state
        this.isDone.subscribe(function() {
          // when it is changed publish an 'itemChanged' event to the TodoList
          this.todoListNamespace.publish('itemChanged');

          // the value changed so we save the todo again
          this.saveItem();
        }, this);

        // toggle the state of this TodoItem
        this.toggleDone = function() {
          this.isDone(!this.isDone());
        };

        // method used to send the deleteItem command when a user clicks the 'X'
        this.deleteItem = function() {
          // tell the TodoList to delete this item
          this.todoListNamespace.command('deleteItem', this);

          // delete this item from localStorage also
          localStorage.removeItem(guid);
        };

        this.saveItem = function() {
          // save the todo item using the username-based GUID as its key
          localStorage.setItem(guid, JSON.stringify({
            guid: guid,
            thingToDo: this.thingToDo(),
            isDone: this.isDone()
          }));
        };

        if(!thingToDo.guid) {
          // the data object as no guid, it is new so lets save it to localStorage
          this.saveItem();
        }
      }
    });
  }
);
