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

    self.appendItem = function(item) {
        self.items.push(item);
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

    self.selectedColumn = null;
    self.selectedItem = null;

    self.addColumn = function() {
        self.columns.push(new flowBoard.Column("New Column"));
    }

    self.removeColumn = function(column) { 
        self.columns.remove(column)
    }

    self.clearBoard = function() {
        self.columns.removeAll();
    }

    self.loadBoard = function() {
        var columnIndex, newColumn, itemIndex, newItem;

        var newboard = JSON.parse(localStorage.getItem('board'));

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

    self.saveBoard = function() {
        localStorage.setItem('board', ko.toJSON(self));
    }

    self.selectItem = function(item) {
        self.selectedItem = item;
        return true;
    } 

    self.selectColumnDown = function(column) {
        self.selectedColumn = column;
        return true;
    }

    self.selectColumnUp = function(column) {
        if (column.name === self.selectedColumn.name) {
            return true;
        }
        
        if (self.selectedItem) {
            self.selectedColumn.removeItem(self.selectedItem);
            column.appendItem(self.selectedItem);
            self.selectedItem = null;
        }
        return true;
    }
}

ko.applyBindings(new flowBoard.Board());
