function DialPadViewModel() {
    var self = this;


    this.numPad = ko.observableArray([
        {"num":1, "lett":[]},
        {"num":2, "lett":['a', 'b', 'd']},
        {"num":3, "lett":['d', 'e', 'f']},
        {"num":4, "lett":['g', 'h', 'i']},
        {"num":5, "lett":['j', 'k', 'l']},
        {"num":6, "lett":['m', 'n', 'o']},
        {"num":7, "lett":['p', 'q', 'r', 's']},
        {"num":8, "lett":['t', 'u', 'v']},
        {"num":9, "lett":['w', 'x', 'y', 'z']},
        {"num":'*', "lett":["P"]},
        {"num":0, "lett":["+"]},
        {"num":'#', "lett":[]}
    ]);

    this.numPadPerRow = ko.computed(function() {
        var rows = [];
        var row = [];
        $.each(self.numPad(), function(index, item) {
            if (index % 3 === 0) {
                row = [];
                rows.push(row);
            }
            row.push(item);
        });
        return rows;
    });

    this.dialed = ko.observableArray();

    this.addToDialed = function(el) {
        if(self.dialed().length < 19)
        {
            self.dialed.push(el.num);
        }
    }

    this.removeFromDialed = function() {
        self.dialed.pop();
    }

    this.letters = function(el) {
        return el["lett"].join('').toUpperCase();
    }
}