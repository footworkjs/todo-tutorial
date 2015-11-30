define(['footwork'],
  function(fw) {
    return fw.viewModel.create({
      namespace: 'Header',
      initialize: function() {
        // loggedInUser will receive its value from the MainRouter
        this.loggedInUser = fw.observable().receiveFrom('MainRouter', 'loggedInUser');
      }
    });
  }
);