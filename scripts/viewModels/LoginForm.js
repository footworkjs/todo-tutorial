define(['footwork'],
  function(fw) {
    return fw.viewModel.create({
      namespace: 'LoginForm',
      initialize: function() {
        this.username = fw.observable();
        this.loginUser = function() {
          console.info('Login form submitted!');
        };
      }
    });
  }
);