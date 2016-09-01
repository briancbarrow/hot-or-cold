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
      $('ul#guessList').append('<li>' + guess + '</li>');
      var diff = gameObj.findAbs(gameObj.answer, guess);
      gameObj.findTemp(diff);
      gameObj.duplicateAlert(guess);
      gameObj.guessCount();
      console.log(gameObj.guesses);
    }),
    findAbs: function(answer, userGuess) {
      var abs = Math.abs(answer - userGuess);
      return abs;
    },
    findDiff: function(answer, userGuess) {
      var diff = answer - userGuess;
      var 
      if (gameObj.diff === 0 || diff ==== 0) {
        return '';
      } else if (diff > 0) {

      }
    },
    findTemp: function(diff) {
      if (diff >= 50) {
        gameObj.renderTemp('Ice Cold!');
      } else if (diff < 50 && diff >= 30) {
        gameObj.renderTemp('Pretty Cold!');
      } else if (diff < 30 && diff >= 20) {
        gameObj.renderTemp('Cold!');
      } else if (diff < 20 && diff >= 15) {
        gameObj.renderTemp('Warm!');
      } else if (diff < 15 && diff >= 10) {
        gameObj.renderTemp('Hot!');
      } else if (diff < 10 && diff >= 5) {
        gameObj.renderTemp('Pretty Hot!');
      } else if (diff < 5 && diff >= 1) {
        gameObj.renderTemp('Red Hot!');
      } else if (diff === 0) {
        gameObj.renderTemp('You Got It!');
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
      } else {
        gameObj.guesses.push(guess);
      }
    }
  };
  
  console.log(gameObj.answer);
  $('.new').click(function(){
    gameObj.newGame()
  });
  gameObj.newGame();
});