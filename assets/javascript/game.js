$(function(){

	var userGuess = 7;
	var userWin = 0;
	var userLoss = 0;
	var trophyCount = 0;
	var wordCount = 1;
	var wordChoices = ["potato", "steak", "jive", "cyclical", "garage", "institution", "express", "dinosaur", "viaduct", "delusion", "ankle", "jolly", "listing", "stimulation", "tense", "downstairs", "golf", "performance", "competition", "valuable", "accuracy", "equilibrium", "fiddle", "football", "stability"];
	var random = randomWord()
	var chosenWord = wordChoices[random].toUpperCase();
	var correctGuess = chosenWord.length;
	var gameWords = 4
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
        	$(wordLetter).addClass("hiddenLetter visibleLetter");
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
		userGuess = 7;
		$("#guessesLeft").text("Remaining Wrong Guesses: " + userGuess);
		$("#guessesMade").text("Wrong Guesses: (none)");
		$("#display").empty();
		wordChoices.splice(random, 1);
		arrayReset.push(chosenWord);
		if (gameWords >= 1) {
			gameWords--;
			wordCount++;
			$("#wordsLeft").text("Word " + wordCount + " of 5:");
			lettersGuessed = [];
			random = randomWord();
			chosenWord = wordChoices[random].toUpperCase();
			correctGuess = chosenWord.length;
			wordString(chosenWord);
		}
		else {
			if (userWin > userLoss) {
				trophyCount++;
				if (trophyCount == 1 ) {
					$("#userTrophies").html("Trophies: " + '<i class="fa fa-trophy" aria-hidden="true"></i>');
				}
				else {
					$("#userTrophies").append(" " + '<i class="fa fa-trophy" aria-hidden="true"></i>');
				}
			}
			var lowEnd = 65;
			var highEnd = 90;
			while(lowEnd <= highEnd){
				lettersGuessed.push(lowEnd++);
			}
			var resetBtn = $("<button>");
        	$(resetBtn).addClass("btn btn-danger reset-btn");
        	$(resetBtn).text("Play Again?");
        	$("#display").html('<h3>Game Over! </h3>');
        	$("#display").append(resetBtn);
        	$("#wordsLeft").empty();
		}
	}

	wordString(chosenWord);

	$(document).keyup(function(e) {
		var userChoice = String.fromCharCode(event.keyCode);
		userFail = 0;
        if (event.keyCode >= 65 && event.keyCode <= 90 && userLetters(lettersGuessed, event.keyCode) == false) {
        	lettersGuessed.push(event.keyCode);
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
	        		userGuess--;
		        	$("#guessesLeft").text("Remaining Wrong Guesses: " + userGuess);
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
	        		else if (userGuess == 6) {
			            $("#guessesMade").text("Wrong Guesses: " + userChoice);
			        }
			        else {
			            $("#guessesMade").append(", " + userChoice);
			        }
	        	}
	        }
    	}
    });

    $("#display").on("click", ".reset-btn", function() {
		lettersGuessed = []
		$.merge(wordChoices, arrayReset)
		arrayReset = []
    	$("#display").empty();
		userWin = 0;
		$("#userWins").text("Wins: 0");
		userLoss = 0;
		$("#userLosses").text("Losses: 0");
		wordCount = 1;
		$("#wordsLeft").text("Word " + wordCount + " of 5:");
		$("#winningWords").text("Winning Words: (none)");
		$("#losingWords").text("Losing Words: (none)");
       	random = randomWord();
		chosenWord = wordChoices[random].toUpperCase();
		correctGuess = chosenWord.length;
		gameWords = 4;
		wordString(chosenWord);
    });

});