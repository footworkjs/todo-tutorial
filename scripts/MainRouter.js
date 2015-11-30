define(['footwork'],
  function(fw) {
    return fw.router.create({
      namespace: 'MainRouter',

      /**
       * Add the initialize method which is called when the MainRouter is instantiated.
       * We then setup the event handler for 'userLogin' messages received on this.$namespace
       */
      initialize: function() {
        // Create reference to the router we will use in the callback
        var router = this;

        /**
         * broadcast the username of the current user as 'loggedInUser'
         * (the default value is null indicating 'logged out')
         */
        this.loggedInUser = fw.observable(null).broadcastAs('loggedInUser');

        // broadcast the state we wish to filter the list for
        this.listFilter = fw.observable(null).broadcastAs('listFilter');

        // Create the event handler which receives the 'userLogin' event (and corresponding userName)
        this.$namespace.event.handler('userLogin', function(username) {
          // Tell the router to route to '/todo/username' if we have a username
          if(username) {
            router.setState('/todo/' + username + '/all');
          }
        });
      },

      routes: [
        {
          route: '/',
          title: 'Todo Application Tutorial',
          controller: function() {
            // the user is logged out if at the default route, lets nullify the username
            this.loggedInUser(null);

            // show our login page here
            this.outlet('mainView', 'login-page');
          }
        },
        {
          route: '/todo/:username(/:state)', // required parameter 'username', optional parameter 'state'
          title: 'Todo List',
          controller: function(username, state) {
            // set the loggedInUser value to the username
            this.loggedInUser(username);

            // set the listFilter value to the supplied state (will be broadcast to the TodoList)
            this.listFilter(state || 'all');

            // show our todo list page here
            this.outlet('mainView', 'todo-page');
          }
        }
      ]
    });
  }
);
