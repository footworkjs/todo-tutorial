define(['footwork'],
  function(fw) {
    return fw.viewModel.create({
      namespace: 'Footer',
      initialize: function() {
        // create the namespace 'channel' we will use to talk to the TodoList
        this.todoListNamespace = fw.namespace('TodoList');

        // numRemainingTodos will receive its value from the TodoList
        this.numRemainingTodos = fw.observable().receiveFrom('TodoList', 'numRemainingTodos');

        // method which sends the command to clear all completed todos
        this.clearCompleted = function() {
          // tell the TodoList to clear the completed todo entries
          this.todoListNamespace.command('clearCompleted');
        };

        // loggedInUser will receive its value from the MainRouter
        this.loggedInUser = fw.observable().receiveFrom('MainRouter', 'loggedInUser');

        // the callbacks which return the needed filter routes
        this.allRoute = function() {
          return '/todo/' + this.loggedInUser() + '/all';
        }.bind(this);
        this.activeRoute = function() {
          return '/todo/' + this.loggedInUser() + '/active';
        }.bind(this);
        this.completedRoute = function() {
          return '/todo/' + this.loggedInUser() + '/completed';
        }.bind(this);
      }
    });
  }
);