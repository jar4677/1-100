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
     * guess.pickNumber - selects a random number between 1-100
     * @returns {number}
     */
    pickNumber: function () {
        var randomNumber = (Math.ceil(Math.random() * 100));
        guess.low = ((randomNumber - 1) / 2);
        guess.high = (randomNumber + ((100 - (randomNumber + 1)) / 2));
        console.log(randomNumber);
        return randomNumber;
    },

    /**
     * guess.setColor - sets color for button based on the guess made
     * @param highLow
     * @param theGuess
     */
    setColor: function (highLow, theGuess) {
        //gets the absolute value of the difference from the median
        var guessDif = Math.abs(highLow - theGuess);
        var x;
        var y;

        //gets the rgb value depending on whether the guess is high or low
        if (theGuess < guess.theNumber) {
            x = Math.round(255 * ((highLow - guessDif) / highLow));
        } else {
            y = 100 - highLow;
            x = Math.round(255 * ((y - guessDif) / y));
        }

        //sets the rgb value to the color variable
        if (theGuess > guess.low && theGuess < guess.high) {
            guess.color = "rgb(255, 0, " + x + ")";
            guess.indicatorValue = 100 - ((x / 255) * 100);
        } else {
            guess.color = "rgb(" + x + ", 0, 255)";
            guess.indicatorValue = ((x / 255) * 100);
        }

        console.log("x: " + x);
        console.log('color: ' + guess.color);
        console.log("indicator: " + guess.indicatorValue);
    },

    /**
     * guess.makeGuess - decision engine
     */
    makeGuess: function () {
        var theGuess = $("#guess-input").val();

        //makes changes based on input
        switch (true) {
            case (isNaN(theGuess) || theGuess < 1 || theGuess > 100):
                $("#response").html("Invalid Input");
                $("#reprompt").show();
                $("#guess-input").focus().val('');
                break;
            case (theGuess > guess.theNumber):
                $("#response").html("Too High!");
                $("#reprompt").show();
                guess.setColor(guess.high, theGuess);
                $("#guess").css('background-color', guess.color);
                $("#indicator").css('left', guess.indicatorValue + '%');
                $("#guess-input").focus().val('');
                guess.log(theGuess);
                break;
            case (theGuess < guess.theNumber):
                $("#response").html("Too Low!");
                $("#reprompt").show();
                guess.setColor(guess.low, theGuess);
                $("#guess").css('background-color', guess.color);
                $("#indicator").css('left', guess.indicatorValue + '%');
                $("#guess-input").focus().val('');
                guess.log(theGuess);
                break;
            default :
                $("#response").html("You guessed it!");
                $("#reprompt").hide();
                $("#new-game, #indicator").show();
                $("#guess").css('background-color', 'green');
                $("#your-score").html("Your score: " + guess.score + "!").show();
                guess.correct = true;
                break;
        }
    },

    /**
     * guess.guessClicked - restarts if previous guess was correct, otherwise calls guess.makeGuess
     */
    guessClicked: function () {
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
        $("#reprompt, #new-game, #your-score").hide();
        $("#guess").css('background-color', 'grey');
        $("#indicator").css('left', '50%').show();
        $("#guess-input").val('').focus();
        guess.correct = false;
        guess.score = 105;
        $(".log-item").each(function () {
            $(this).remove();
        });
    },

    /**
     * randomPosition - gets a random position, excluding the game board
     * @returns {*[]}
     */
    randomPosition: function () {
        var x = Math.round(Math.random() * window.innerWidth);
        var y = Math.round(Math.random() * window.innerHeight - 50);

        var exclusionStart = (window.innerWidth / 2) - 250;
        var exclusionEnd = (window.innerWidth / 2) + 250;

        if (x > exclusionStart && x < exclusionEnd && y < 450){
            y += 400;
        }

        return [x, y];
    },

    /**
     * log - puts a circle with the number guessed on the page
     * @param number
     */
    log: function (number) {
        var position = guess.randomPosition();

        var text = $("<p>").text(number).addClass('log-text');
        var logItem = $("<div>").addClass('log-item').css({
            'background-color': guess.color,
            'top': position[1],
            'left': position[0],
            'transform': 'rotateZ(' + guess.randomAngle() + 'deg)',
            'font-size': guess.randomSize() + 'px'
        }).append(text);

        $('body').append(logItem);
    },

    /**
     * randomAngle - gets a random angle between -20 and 20
     * @returns {number}
     */
    randomAngle: function () {
        var angle = Math.round(Math.random() * 20);
        if(Math.random() <= 0.5){
            angle *= -1;
        }
        return angle;
    },

    /**
     * randomSize - gets a random font size between 20 and 34
     * @returns {number}
     */
    randomSize: function () {
        return Math.round(Math.random() * 14) + 20;
    }
};

move = function () {
    var position = guess.randomPosition();
    $(this).css({"top": position[1], "left": position[0]});
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
    });

    $('body').on("mouseover", ".log-item", move)
});