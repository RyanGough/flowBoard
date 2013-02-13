// Class to represent a column on the board
flowBoard = {};

flowBoard.Item = function(text) {
    var self = this;
    self.text = ko.observable(text);
}

flowBoard.Column = function(name) {
    var self = this;
    self.name = ko.observable(name);
    
    // Editable data
    self.items = ko.observableArray([
        new flowBoard.Item("Do some work"),
        new flowBoard.Item("Do more work")
    ]);

    self.addItem = function() {
        self.items.push(new flowBoard.Item("New Item"));
    }  
}

// Overall viewmodel for this screen, along with initial state
flowBoard.Board = function() {
    var self = this;

    // Editable data
    self.columns = ko.observableArray([
        new flowBoard.Column("ToDo"),
        new flowBoard.Column("InDev")
    ]);

    self.addColumn = function() {
        self.columns.push(new flowBoard.Column("New Column"));
    }

    self.addItem = function() {
        self.columns()[0].addItem();
    } 

    self.removeColumn = function(column) { self.columns.remove(column) }
}

ko.applyBindings(new flowBoard.Board());