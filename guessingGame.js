/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
/*

Research what an IIFE (Immediately Invoked Function Expression) is, try to apply it to your Guessing Game code to eliminate Global
Variables such as winNum, guesses, arr, etc.
Here is a good link to get started: http://benalman.com/news/2010/11/immediately-invoked-function-expression/
*/

var winNum;
var guesses;
var arr;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(100*Math.random())+1;
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(player, winning, guesses){
	if (guesses > 2) {
		if (Math.abs(player-winning) <= 33) {
			return player + " is not quite it, but its warm!";
		} else {
			return player + " is way off! Guess again!";
		}
	} else {
		if (player < winning && Math.abs(player-winning) < 30) {
			return "Try guessing a number that is no more than 30 greater than your guess of " + player;
		} else if (player < winning && Math.abs(player-winning) > 30) {
			return "Try guessing a number that is more than 30 greater than your guess of " + player;
		} else if (player > winning && Math.abs(player-winning) < 30) {
			return "Try guessing a number that is no more than 30 less than your guess of " + player;
		} else {
			return "Try guessing a number that is more than 30 less than your guess of " + player;
		}
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(player, winning, guesses){
	if (player === winning) {
		$("#bottom").css('display', 'block');
		$("#field").css('display', 'none');
		$("#enter").css('display', 'none');
		$('#right').css('display', 'none');
		return "Congratulations!  You guessed the correct number!";
	} else if (guesses > 0) {
		$('#right').css('display', 'block');
		return lowerOrHigher(player, winning, guesses);
	} else {
		$("#bottom").css('display', 'block');
		$("#field").css('display', 'none');
		$("#enter").css('display', 'none');
		$('#right').css('display', 'none');
		return "Sorry, you lost!  The number was " + winning + "!";
	}
	
	
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(winning, guesses, arr){
	if (guesses > 5) {
		return "No hints until you make a guess!"
	} else {
		var win = guesses*2*(Math.floor(Math.random()));
		var choices = [];
		for (var i = 0; i < guesses*2; i++) {
			if (i !== win) {
				var choice = winning;
				while (choice === winning) {
					choice = Math.floor(100*Math.random())+1;
					for (var j = 0; j < arr.length; j++) {
						if (choice === arr[j]) {
							choice = winning;
						}
					}
				}
				choices.push(choice);
			} else {
				choices.push(winning);
			}
		}
		return "One of these is the correct number: " + choices.join(',');
	}
}

// Allow the "Player" to Play Again

function playAgain(){
	location.reload();
}


/* **** Event Listeners/Handlers ****  */

$(document).ready(function() {
	$(document).one('ready', function() {
		winNum = generateWinningNumber();
    	guesses = 5;
    	arr = [];
	});
	$('#message').click(function() {
		$('#message').css('display', 'none');
	});
	$('ul').click(function() {
		$('li').toggle();
	});

	$("#field").on('submit', function() {
		if (guesses > 0) {
			var player = $("#field").val();
			var previous = false;
			for (var i = 0; i < arr.length; i++) {
				if (parseInt(player) === arr[i]) {
					previous = true;
				}
			}
			if (!isNaN(player)) {
				if (!previous) {
					arr.push(parseInt(player));
					guesses --;
					$('ul').append("<li></li>");
					$('li').last().text(player);
					$('li').css({'display': 'none', 'font-size': '40px', 'color': 'black', "background-color": 'white'});
					$('#message').css('display', 'block');
					$('#message').text(checkGuess(parseInt(arr[arr.length-1]), winNum, guesses));
				} else {
					alert("You already guessed that number!  Choose another!")
				}
			} else {
				alert("Please choose a number between 1 and 100");
			}
		}
	});
	
	$("#enter").click(function() {
		$("#field").submit();
	});
	$("#right").click(function() {
		$('#message').css('display', 'block');
		$('#message').text(provideHint(winNum, guesses, arr));
		$('#right').css('display', 'none');
		
	});
	$('#bottom').click(function() {
		playAgain();
	});
	$('#field').keypress(function (x) {
  		if (x.which === 13) {
    		$(this).submit();
    		return false;
  		}
	});
	
});
