$(document).ready(function() {
    var dialpadVM = new DialPadViewModel();
    window.dialpadVM = dialpadVM;
    ko.applyBindings(dialpadVM);
});
