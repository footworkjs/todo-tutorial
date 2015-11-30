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

        // Create the event handler which receives the 'userLogin' event
        this.$namespace.event.handler('userLogin', function() {
          // Tell the router to route to '/todo'
          router.setState('/todo');
        });
      },

      routes: [
        {
          route: '/',
          title: 'Todo Application Tutorial',
          controller: function() {
            // show our login page here
            this.outlet('mainView', 'login-page');
          }
        },
        {
          route: '/todo',
          title: 'Todo List',
          controller: function() {
            // show our todo list page here
            this.outlet('mainView', 'todo-page');
          }
        }
      ]
    });
  }
);