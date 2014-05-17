$(document).ready(function() {
    function KnockoutViewModel() {
        var self = this;
        self.say = function() {
            alert("You have successfully installed knockout");
        }
    }

    ko.applyBindings(new KnockoutViewModel());
});