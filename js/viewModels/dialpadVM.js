function DialPadViewModel() {
    var self = this;

    function Contact(name, number) {
        this.name = name;
        this.number = number;
    }

    this.contactName = ko.observable("");
    this.contactNumber = ko.observable("");

    this.addContact = function() {
        if(self.contactName !== undefined && self.contactNumber !== undefined)
        {
            self.contacts.push(new Contact(self.contactName(), self.contactNumber()));
        }
    }
    
    this.tabs = ko.observableArray([
            {imgSrc:"img/keypad.png", tabText:"Keypad", id: 1},
            {imgSrc:"img/logs.png", tabText:"Logs", id: 2},
            {imgSrc:"img/contacts.png", tabText:"Contacts", id: 3},
            {imgSrc:"img/star.png", tabText:"Favorites", id: 4},
            {imgSrc:"img/groups.png", tabText:"Groups", id: 5}
        ]);

    this.currentTab = ko.observable(this.tabs()[0]);
    this.setCurrentTab = function(tab) {
        self.currentTab(tab);
    };
    

    this.clickMatchedList = ko.observable();
    this.showMatchedList = function() {
        return self.clickMatchedList(!self.clickMatchedList());
    }

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
        new Contact("Sharp", "010#354"),
        new Contact("Arthur", "010271219")
        ]);

    this.currentContact = ko.observable({});
    this.selectContact = function(c) {
        self.currentContact(c);
    }
    this.removeContact = function() {
        self.contacts.remove(self.currentContact());
    }

    this.matched = ko.observableArray([]);

    this.matchedFirst = ko.computed(function() {
        return self.matched()[0] || {};
    });

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

    this.dialed = ko.observableArray([]);

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

    this.filter = ko.computed(function() {
        self.matched([]);
        if(self.dialed().join().length !== 0)
        {
            var dialedNumber = self.dialed().join('');
            var astraArray = [];
            astraArray = dialedNumber.match(/[*]/g);

            if(astraArray.length > 0)
            {
                dialedNumber = dialedNumber.replace(/[*]/g, '\\*');
            }

            var pattern = new RegExp(dialedNumber, "g");
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



