define(['footwork'],
  function(fw) {
    return fw.viewModel.create({
      namespace: 'TodoItem',
      initialize: function(thingToDo) {
        // store the string text entered by user as thingToDo
        this.thingToDo = fw.observable(thingToDo);

        // stores the state of the TodoItem (true = done, false = not done)
        this.isDone = fw.observable(false);

        // toggle the state of this TodoItem
        this.toggleDone = function() {
          this.isDone(!this.isDone());
        };
      }
    });
  }
);