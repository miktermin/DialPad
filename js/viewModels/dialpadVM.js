function DialPadViewModel() {
    var self = this;

    function Contact(name, number) {
        this.name = name;
        this.number = number;
    }

    this.dialed = ko.observable("");
    this.contactName = ko.observable("");
    this.contactNumber = ko.observable("");

    this.addContact = function() {
        if(self.contactName() && self.contactNumber())
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
        new Contact("Abel", "010223265"),
        new Contact("Alan", "077*094215259"),
        new Contact("Bartholomew", "089798989"),
        new Contact("Carol", "74100003665"),
        new Contact("David", "789456123"),
        new Contact("Eleanor", "0887946130"),
        new Contact("Frank", "077656565"),
        new Contact("Gilmour", "45464561"),
        new Contact("Helen", "012345687"),
        new Contact("Irwin", "091120947"),
        new Contact("Mher", "066666666"),
        new Contact("Matt", "9887454646"),
        new Contact("New", "0025898989"),
        new Contact("Kate", "*77*12113485"),
        new Contact("Loyd", "045461216345"),
        new Contact("Oscar", "45431215345643"),
        new Contact("Paris", "45463121684"),
        new Contact("Silvia", "41545845"), 
        new Contact("Tom", "45484864313")
    ]);

    this.currentContact = ko.observable({});
    this.selectContact = function(c) {
        self.currentContact(c);
    }

    this.removeContact = function() {
        self.contacts.remove(self.currentContact());
    }

    this.matched = ko.computed(function() {
        var matchedContacts = [];
        var contacts = self.contacts();
        if(self.dialed().length !== 0)
        {
            var dialed = self.dialed();
            var astraArray = dialed.match(/[*]/g);
            if(astraArray && astraArray.length > 0)
            {
               dialed = self.dialed().replace(/[*]/g, '\\*');
            }
            var pattern = new RegExp(dialed, "g");
            for(var i = 0; i < contacts.length; i++)
            {
                if(contacts[i].number.match(pattern) !== null)
                {
                    matchedContacts.push(contacts[i]);
                }
            }
        }
            return matchedContacts;
    });

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

    this.addToDialed = function(el) {
        if(self.dialed().length < 19)
        {
            self.dialed(self.dialed() + el.num);
        }
    }

    this.removeFromDialed = function() {
        self.dialed(self.dialed().substring(0, self.dialed().length - 1));
    }

    this.letters = function(el) {
        return el["lett"].join('').toUpperCase();
    }
}



