// Class to represent a column on the board
flowBoard = {};

flowBoard.nextItemId = 1;

flowBoard.Item = function(text) {
    var self = this;
    self.id = flowBoard.nextItemId++;
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
    
    self.removeItem = function(item) {
        self.items.remove(item);
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

    self.removeColumn = function(column) { 
        self.columns.remove(column)
    }

    self.clearBoard = function() {
        self.columns.removeAll();
    }

    self.loadBoard = function() {
        var columnIndex, newColumn, itemIndex, newItem;
        var newboard = { columns: [
                { name: "First", items: [
                        {text: "test 1"},
                        {text: "test 2"}
                    ]
                },
                { name: "Second", items: [
                        {text: "2 test 1"}
                    ]
                },
                { name: "Third", items: [
                        {text: "3 test 1"},
                        {text: "3 test 2"},
                        {text: "3 test 2"},

                    ]
                }
            ]
        };

        self.clearBoard();
        
        for (columnIndex = 0; columnIndex < newboard.columns.length; columnIndex++) {
            newColumn = new flowBoard.Column(newboard.columns[columnIndex].name);
            for (itemIndex = 0; itemIndex < newboard.columns[columnIndex].items.length; itemIndex++) {
                newItem = new flowBoard.Item(newboard.columns[columnIndex].items[itemIndex].text);
                newColumn.items.push(newItem);
            }
            self.columns.push(newColumn);
        }
    }
}

ko.applyBindings(new flowBoard.Board());