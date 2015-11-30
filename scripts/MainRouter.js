define(['footwork'],
  function(fw) {
    return fw.router.create({
      namespace: 'MainRouter',
      routes: [
        {
          route: '/',
          title: 'Todo Application Tutorial',
          controller: function() {
            // show our login page here
          }
        },
        {
          route: '/todo',
          title: 'Todo List',
          controller: function() {
            // show our todo list page here
          }
        }
      ]
    });
  }
);