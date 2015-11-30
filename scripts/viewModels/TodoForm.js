define(['footwork'],
  function(fw) {
    return fw.viewModel.create({
      namespace: 'TodoForm',
      autoRegister: true,
      initialize: function() {
        // The observable which stores the current thingToDo form text
        this.thingToDo = fw.observable();

        // create the namespace 'channel' we will use to talk to the TodoList
        this.todoListNamespace = fw.namespace('TodoList');

        // holds flag which indicates whether we have 'marked all' or 'mark none' of the items
        this.allMarked = fw.observable(false);

        // event triggered when user clicks the down-chevron icon
        this.markAll = function() {
          this.allMarked( !this.allMarked() );
        };

        // Listen for changes on the allMarked value
        this.allMarked.subscribe(function(doneState) {
          // When a change is made command the TodoList to setAllAs the doneState
          this.todoListNamespace.command('setAllAs', doneState);
        }, this);

        this.submitForm = function() {
          // The user wishes to add a todo item, lets tell the TodoList what it is
          this.todoListNamespace.publish('newItem', this.thingToDo());

          // clear out the text box so the user can type a new entry
          this.thingToDo('');
        };
      }
    });
  }
);
