$(document).ready(function(){
    //initialize socket.io
    App.init();

    setTimeout(function() {
        App.dead();
    }, 3000);


});

var App = (function() {

    var socket = null;

    return {

        init: function () {
            this.socket = io.connect('http://localhost');
            this.socket.on('join', this.join());
        },

        join: function(data) {
            console.log(data);
            $("#messageBox").hide();
            $("body").removeClass().addClass(data.team);
        },

        dead: function() {
            $("#messageBox").text('You\'re dead!').show();
            $("body").removeClass().addClass('final');
            this.socket.emit('dead');
        }
    }
})();