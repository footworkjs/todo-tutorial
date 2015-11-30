/**
 * Configure RequireJS, telling it where the text plugin (used to load templates) and
 * footwork are located.
 */
requirejs.config({
  baseUrl: '/',
  paths: {
    "text": "bower_components/requirejs-text/text",
    "footwork": "bower_components/footwork/dist/footwork-all-history"
  }
});

require(['footwork'],
  function(fw) {
    /**
     * Tell footwork it can find the 'LoginForm' and 'TodoList' viewModels
     * inside of scripts/viewModel.
     */
    fw.viewModel.registerLocation([
      'LoginForm', // will load from scripts/viewModels/LoginForm.js
      'TodoList' // will load from scripts/viewModels/TodoList.js
    ], 'scripts/viewModels/');

    /**
     * Here we provide the entire filename to footwork because the lowercase
     * 'todoform' does not match the file names on disk.
     */
    fw.components.registerLocation('todoform', {
      viewModel: 'scripts/viewModels/TodoForm', // loads scripts/viewModels/TodoForm.js
      template: 'scripts/templates/TodoForm' // loads scripts/templates/TodoForm.html
    });

    /**
     * Register the location of the 'MainRouter'
     * Loads from scripts/MainRouter.js
     */
    fw.router.registerLocation('MainRouter', 'scripts/');

    // Tell footwork it can find the login-page and todo-page inside of scripts/views/
    fw.outlets.registerViewLocation([
      'login-page', // will load from scripts/views/login-page.html
      'todo-page' // will load from scripts/views/todo-page.html
    ], 'scripts/views/');

    // tell footwork to startup and begin binding
    fw.start();
  }
);