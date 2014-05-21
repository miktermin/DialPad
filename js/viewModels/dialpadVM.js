function DialPadViewModel() {
    var self = this;

    function Contact(name, number) {
        this.name = name;
        this.number = number;
    }
    this.currentTab = ko.observable(1);
    this.tabs = ko.observableArray([
            {imgSrc:"img/keypad.png", tabText:"Keypad", id: 1},
            {imgSrc:"img/logs.png", tabText:"Logs", id: 2},
            {imgSrc:"img/contacts.png", tabText:"Contacts", id: 3},
            {imgSrc:"img/star.png", tabText:"Favorites", id: 4},
            {imgSrc:"img/groups.png", tabText:"Groups", id: 5}
        ]);

    

    this.setCurrentTab = function(id) {
        self.currentTab(id);
    };



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

    this.contacts = ko.observableArray([
        new Contact("Michael", '099211214'),
        new Contact("John", '099125465'),
        new Contact("Sharp", "010#354"),
        new Contact("Arthur", "010271219")
        ]);

    this.matched = ko.observableArray([]);

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

    this.matchByNumber = ko.computed(function() {
        self.matched([]);
        if(self.dialed().join().length !== 0)
        {
            var pattern = new RegExp(self.dialed().join(''), "g");
            for(var i = 0; i < self.contacts().length; i++)
            {
                if(self.contacts()[i].number.match(pattern) !== null)
                {
                    self.matched.push(self.contacts()[i]);
                }
            }
        }
    });
}



