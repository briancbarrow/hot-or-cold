$(document).ready(function() {
  gameObj = {
    answer: 0,
    diff: 0,
    randomNumber: function() {
      gameObj.answer = Math.floor(Math.random() * (100 - 1)) + 1;
    },
    /*--- Display information modal box ---*/
    what: $(".what").click(function() {
      $(".overlay").fadeIn(1000);
    }),
    /*--- Hide information modal box ---*/
    whatClose: $("a.close").click(function() {
      $(".overlay").fadeOut(1000);
    }),

    guess: $('form').submit(function(event) {
      event.preventDefault();      
      var guess = parseInt($('input#userGuess').val());
      if (!Number.isInteger(guess)) {
        alert('Please enter a number');
      } else{
        if(gameObj.betweenVerify(guess) || gameObj.duplicateAlert(guess)){
          return;
        }
        $('ul#guessList').append('<li>' + guess + '</li>');
        var diff = gameObj.findAbs(gameObj.answer, guess);
        gameObj.findTemp(diff);
        gameObj.findDirection(gameObj.answer, guess);      
        gameObj.guessCount();
      }
      // console.log(gameObj.guesses);
    }),
    findAbs: function(answer, userGuess) {
      var abs = Math.abs(answer - userGuess);
      return abs;
    },
    findDirection: function(answer, userGuess) {
      var diff = gameObj.findAbs(answer, userGuess);
      console.log('findDirection diff: ' + diff);
      console.log('gameObj.diff: ' + gameObj.diff);
      var directionDiff = diff - gameObj.diff;
      console.log('directionDiff: ' + directionDiff)
      if (gameObj.diff === 0 || diff === 0) {
        gameObj.renderDirection('!');
        gameObj.diff = diff;
      } else if (diff > 0 && directionDiff < 0) {
          gameObj.diff = diff;
          gameObj.renderDirection(' and Getting Warmer!');
      } else if (diff > 0 && directionDiff >= 0) {
          gameObj.diff = diff;
          gameObj.renderDirection(' and Getting Colder!');
      }
    },
    renderDirection: function(direction) {
      var text = $('#feedback').text();
      $('#feedback').text(text + direction);
    },
    findTemp: function(diff) {
      if (diff >= 50) {
        gameObj.renderTemp('Ice Cold');
      } else if (diff < 50 && diff >= 30) {
        gameObj.renderTemp('Pretty Cold');
      } else if (diff < 30 && diff >= 20) {
        gameObj.renderTemp('Cold');
      } else if (diff < 20 && diff >= 15) {
        gameObj.renderTemp('Warm');
      } else if (diff < 15 && diff >= 10) {
        gameObj.renderTemp('Hot');
      } else if (diff < 10 && diff >= 5) {
        gameObj.renderTemp('Pretty Hot');
      } else if (diff < 5 && diff >= 1) {
        gameObj.renderTemp('Red Hot');
      } else if (diff === 0) {
        gameObj.renderTemp('You Got It');
        $('body').css('background-color', '#f38254');
      };
    },
    renderTemp: function(temp) {
      $('#feedback').text(temp);
    },
    guessCount: function() {
      var count = gameObj.guesses.length;
      $('#count').text(count);
    },
    newGame: function() {
      gameObj.answer = 0;
      gameObj.diff = 0;
      $('#count').text('0');
      $('ul#guessList').html('');
      $('input#userGuess').attr('placeholder', "Enter your Guess").val("").focus();
      $('#feedback').text('Make your Guess!');
      $('body').css('background-color', '#1F253D');   
      gameObj.guesses = [];   
      gameObj.randomNumber();
      console.log(gameObj.answer)
    },
    guesses: [],
    duplicateAlert: function(guess) {
      if(gameObj.guesses.indexOf(guess) !== -1){
        alert("You already guessed that number!");
        return true;
      } else {
        gameObj.guesses.push(guess);
      }
    },
    betweenVerify: function(guess) {
      if(guess < 1 || guess > 100) {
        alert('Please Enter a Number Between 1 and 100!')
        return true;
      };
    }
  };
  
  console.log(gameObj.answer);
  $('.new').click(function(){
    gameObj.newGame()
  });
  gameObj.newGame();
});