define(['footwork', 'scripts/viewModels/TodoItem.js'],
  function(fw, TodoItem) {
    return fw.viewModel.create({
      namespace: 'TodoList',
      initialize: function() {
        var self = this; // create a reference to this viewModel we can use inside of the callback

        // stores the list of TodoItem entries
        this.todos = fw.observableArray();

        // broadcasts the number of remaining todos
        this.numRemainingTodos = fw.observable(0).broadcastAs('numRemainingTodos');

        // receives the list filter value from the MainRouter
        this.listFilter = fw.observable().receiveFrom('MainRouter', 'listFilter');

        // filter the list of todo entries based on this.listFilter received from MainRouter
        this.filteredTodos = fw.computed(function() {
          var listFilter = this.listFilter();
          var todoList = [];

          // go through each todo entry and add it to the filtered todoList if appropriate
          this.todos().forEach(function(todo) {
            switch(listFilter) {
              case 'active': // show only 'active' todo entries
                if(!todo.isDone()) {
                  todoList.push(todo);
                }
                break;

              case 'completed': // show only 'completed' todo entries
                if(todo.isDone()) {
                  todoList.push(todo);
                }
                break;

              default: // show all todo entries (no filter)
                todoList.push(todo);
                break;
            }
          });

          // return the filtered todoList entries
          return todoList;
        }, this);

        // listen for any 'newItem' messages broadcast on our namespace.
        this.$namespace.subscribe('newItem', function(thingToDo) {
          // new thingToDo was received, lets create a new TodoItem based on it
          self.todos.push( new TodoItem({ thingToDo: thingToDo }) );
        });

        // listen for any 'clearCompleted' commands broadcast on our namespace.
        this.$namespace.command.handler('clearCompleted', function() {
          // Create a list of the completed todos
          var completedTodos = [];
          self.todos().forEach(function(todo) {
            if(todo.isDone()) {
              completedTodos.push(todo);
            }
          });

          // remove the completed todo entries
          completedTodos.forEach(function(todo) {
            todo.deleteItem();
          });
        });

        // listen for any 'setAllAs' commands broadcast on our namespace.
        this.$namespace.command.handler('setAllAs', function(doneState) {
          // when a new doneState is received loop through and set each todo
          self.todos().forEach(function(todo) {
            todo.isDone(doneState);
          });
        });

        // listen for any 'deleteItem' commands broadcast on our namespace.
        this.$namespace.command.handler('deleteItem', function(item) {
          // when a new deleteItem command is received delete it from the list of todos
          self.todos.remove(item);
        });

        // This method computes the number of remaining todos
        function computeRemainingTodos() {
          // Loop over each todo and count the number that are !isDone().
          var numRemaining = 0;
          self.todos().forEach(function(todo) {
            if(!todo.isDone()) {
              numRemaining++;
            }
          });

          // write the number of remaining todos to the numRemainingTodos broadcastable
          self.numRemainingTodos(numRemaining);
        }

        // listen for any messages/commands which require us to compute the remaining todos.
        this.$namespace.subscribe('itemChanged', computeRemainingTodos);
        this.$namespace.subscribe('newItem', computeRemainingTodos);
        this.$namespace.command.handler('setAllAs', computeRemainingTodos);
        this.$namespace.command.handler('deleteItem', computeRemainingTodos);
      }
    });
  }
);