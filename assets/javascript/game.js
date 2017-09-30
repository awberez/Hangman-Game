$(function(){

	var userGuess = 15;
	var userFail = 0;
	var userWin = 0;
	var userLoss = 0;
	var wordChoices = ["potato", "steak", "jive", "macbook", "garage"];
	var random = randomWord()
	var chosenWord = wordChoices[random].toUpperCase();
	var correctGuess = chosenWord.length;
	var lettersGuessed = []
	var arrayReset = []

	function randomWord() {
  		min = Math.ceil(0);
  		max = Math.floor(wordChoices.length - 1);
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function wordString(word) {
		for (i = 0; i < word.length; i++) {
			var wordLetter = $("<span>");
			$(wordLetter).attr('id', "letterID" + [i]);;
        	$(wordLetter).addClass("hiddenLetter");
        	$(wordLetter).text(word.slice(i,i+1));
        	$(wordLetter).attr("data-code", word.charCodeAt(i,i+1));
        	$("#display").append($(wordLetter));
		}
	}

	function userLetters(arr, val) {
  		return arr.some(function(arrVal) {
    	return val === arrVal;
  		});
	}

	function resetGame() {
		userGuess = 15;
		userFail = 0;
		$("#guessesLeft").text("Remaining Guesses: " + userGuess);
		$("#guessesMade").text("Guesses Made: (none)");
		$("#display").empty();
		wordChoices.splice(random, 1);
		arrayReset.splice(0, 0, chosenWord.toLowerCase());
		if (wordChoices.length >= 1) {
			lettersGuessed = []
			random = randomWord()
			chosenWord = wordChoices[random].toUpperCase();
			correctGuess = chosenWord.length;
			wordString(chosenWord);
		}
		else {
			var lowEnd = 65;
			var highEnd = 90;
			while(lowEnd <= highEnd){
				lettersGuessed.push(lowEnd++);
			}
			var resetBtn = $("<button>");
        	$(resetBtn).addClass("btn btn-danger reset-btn");
        	$(resetBtn).text("Play Again?");
        	$("#display").text("Game Over! ");
        	$("#display").append(resetBtn);
		}
	}

	wordString(chosenWord);

	$(document).keyup(function(e) {
		var userChoice = String.fromCharCode(event.keyCode);
        if (event.keyCode >= 65 && event.keyCode <= 90 && userLetters(lettersGuessed, event.keyCode) == false) {
        	lettersGuessed.push(event.keyCode);
        	userGuess--;
        	$("#guessesLeft").text("Remaining Guesses: " + userGuess);
        	if (userGuess == 14) {
	            $("#guessesMade").text("Guesses Made: " + userChoice);
	        }
	        else {
	            $("#guessesMade").append(", " + userChoice);
	        }
        	for (i = 0; i < chosenWord.length; i++) {
        		var correctLetter = String.fromCharCode($("#letterID" + i.toString()).attr("data-code"));
	        	if (userChoice == correctLetter) {
	        		$("#letterID" + i.toString()).removeClass("hiddenLetter");
	        		correctGuess--;
	        		if (correctGuess == 0) {
	        			userWin++;
	        			$("#userWins").text("Wins: " + userWin);
	        			if (userWin == 1) {
	        				$("#winningWords").text("Winning Words: " + chosenWord);
	        			}
	        			else {
	        				$("#winningWords").append(", " + chosenWord);
	        			}
	        			resetGame();
	        		}
	        	}
	        	else {
	        		userFail++;
	        	}
	        	if (userFail == chosenWord.length) {
	        		userFail = 0;
	        		if (userGuess == 0) {
	        			userLoss++;
	        			$("#userLosses").text("Losses: " + userLoss);
	        			if (userLoss == 1) {
	        				$("#losingWords").text("Losing Words: " + chosenWord);
	        			}
	        			else {
	        				$("#losingWords").append(", " + chosenWord);
	        			}
	        			resetGame();
	        		}
	        	}
	        }
    	}
    });

    $("#display").on("click", ".reset-btn", function() {
		lettersGuessed = []
		wordChoices = arrayReset
		arrayReset = []
    	$("#display").empty();
		userWin = 0;
		$("#userWins").text("Wins: 0");
		userLoss = 0;
		$("#userLosses").text("Losses: 0");
		$("#winningWords").text("Winning Words: (none)");
		$("#losingWords").text("Losing Words: (none)");
       	random = randomWord();
		chosenWord = wordChoices[random].toUpperCase();
		correctGuess = chosenWord.length;
		wordString(chosenWord);
    });

});