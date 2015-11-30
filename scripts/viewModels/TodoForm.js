fw.viewModel.create({
  namespace: 'TodoForm',
  autoRegister: true,
  initialize: function() {
    // The observable which stores the current thingToDo form text
    this.thingToDo = fw.observable();

    // Method/Action we want triggered when the form is submitted
    this.submitForm = function() {
      console.info('TodoForm submit action triggered');
    };
  }
});