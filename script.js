/**
 * Created by jar4677 on 4/14/16.
 */

var guess = {
    //Basic Guess Event
    theNumber: 0,
    correct: false,
    score: 105,
    //color change properties
    low: 0,
    high: 0,
    color: 'rgb(255, 255, 255)',
    indicatorValue: 0,

    /**
     * guess.pickNumber - selects a randm number between 1-100
     * @returns {number}
     */
    pickNumber: function () {
        var randomNumber = (Math.ceil(Math.random() * 100));
        guess.low = ((randomNumber - 1) / 2);
        guess.high = (randomNumber + ((100 - (randomNumber + 1)) / 2));
        return (randomNumber)
    },

    /**
     * guess.setColor - sets color for button based on the guess made
     * @param highLow
     * @param theGuess
     */
    setColor: function (highLow, theGuess) {
        //gets the absolute value of the difference from the median
        var guessDif = Math.abs(highLow - theGuess);

        //gets the rgb value depending on whether the guess is high or low
        if (theGuess < guess.theNumber) {
            var x = Math.round(255 * ((highLow - guessDif) / highLow));
        } else {
            var y = 100 - highLow;
            var x = Math.round(255 * ((y - guessDif) / y));
        }

        //sets the rgb value to the color variable
        if (theGuess > guess.low && theGuess < guess.high) {
            guess.color = "rgb(255, 0, " + x + ")";
        } else {
            guess.color = "rgb(" + x + ", 0, 255)";
        }

        guess.indicatorValue = 100 - ((x / 255) * 100);
    },

    /**
     * guess.makeGuess - decision engine
     */
    makeGuess: function () {
        var theGuess = $("#guess-input").val();
        $("#guess-input").focus().val('');
        //makes changes based on input
        switch (true) {
            case (isNaN(theGuess) || theGuess < 1 || theGuess > 100):
                $("#response").html("Invalid Input");
                $("#reprompt").css('display', 'block');
                break;
            case (theGuess > guess.theNumber):
                $("#response").html("Too High!");
                $("#reprompt").css('display', 'block');
                guess.setColor(guess.high, theGuess);
                $("#guess").css('background-color', guess.color);
                $("#indicator").css('left', guess.indicatorValue + '%');
                break;
            case (theGuess < guess.theNumber):
                $("#response").html("Too Low!");
                $("#reprompt").css('display', 'block');
                guess.setColor(guess.low, theGuess);
                $("#guess").css('background-color', guess.color);
                $("#indicator").css('left', guess.indicatorValue + '%');
                break;
            default :
                $("#response").html("You guessed it!");
                $("#reprompt").css('display', 'none');
                $("#new-game").css('display', 'block');
                $("#guess").css('background-color', 'green');
                $("#indicator").css('display', 'none');
                $("#your-score").html("Your score: " + guess.score + "!").css('display', 'block');
                guess.correct = true;
                break;
        }
    },

    /**
     * guess.guessClicked - restarts if previous guess was correct, otherwise calls guess.makeGuess
     */
    guessClicked: function () {
        console.log('clicked');
        if (guess.correct) {
            guess.reset()
        } else {
            guess.score -= 5;
            guess.makeGuess();
        }
    },

    /**
     * guess.reset - restarts the game
     */
    reset: function () {
        guess.theNumber = guess.pickNumber();
        $("#response").html("Click Here");
        $("#reprompt", "#new-game", "#your-score").css('display', 'none');
        $("#guess").css('background-color', 'grey');
        $("#indicator").css('left', '50%').css('display', 'block');
        $("#guess-input").val('').focus();
        guess.correct = false;
        guess.score = 105;
    }
};




//run the first time
$("document").ready(function () {
    guess.reset();
    
    //click handler
    $("#guess").click(guess.guessClicked);

    //keypress handler
    $(document).keypress(function (event) {
        if(event.which == 13){
            guess.guessClicked();
        }
    })
});