$(document).ready(function(){
    //initialize socket.io
    //App.init();

    window.addEventListener("deviceorientation", function () {
        App.shake(event.alpha, event.beta, event.gamma);
    }, true);

});

var App = (function() {

    var socket = null;
    var previousY = null;
    var previousZ = null;

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

        shake: function(currentX, currentY, currentZ){

            // Don't die on start
            if(this.previousY && this.previousZ){

                var fuzzy  = 0.70;

                // Checker
                if((this.previousY - currentY) > fuzzy){
                    console.log("DEAD Y", this.previousY, currentY);
                    this.dead();
                }

                // Checker
                if((this.previousZ - currentZ) > fuzzy){
                    console.log("DEAD Z", this.previousZ, currentZ);
                    this.dead();
                }
            }

            this.previousY = currentY;
            this.previousZ = currentZ;
        },

        dead: function() {
            $("#messageBox").text('You\'re dead!').show();
            $("body").removeClass().addClass('final');
            this.socket.emit('dead');
        }
    }
})();