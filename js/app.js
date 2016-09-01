
$(document).ready(function(){

    gameObj = {            
            randomNumber: (function(){
                return Math.floor(Math.random() * (100 - 1)) + 1;
            })(),
            /*--- Display information modal box ---*/
            what: $(".what").click(function(){
                $(".overlay").fadeIn(1000);
            }),
            /*--- Hide information modal box ---*/
            whatClose: $("a.close").click(function(){
                    $(".overlay").fadeOut(1000);
            }),
            guess: $('form').submit(function(event){
                event.preventDefault();  
                gameObj.guessCount();              
                var guess = $('input#userGuess').val();
                $('ul#guessList').append(
                    '<li>' + guess + '</li>'
                    );
                var diff = gameObj.compare(gameObj.randomNumber, guess);
                if(diff >= 50){
                    gameObj.renderTemp('Ice Cold!');
                } else if(diff < 50 && diff >= 30) {
                    gameObj.renderTemp('Pretty Cold!');
                } else if(diff < 30 && diff >= 15) {
                    gameObj.renderTemp('Cold!');
                }  else if(diff < 15 && diff >= 10) {
                    gameObj.renderTemp('Hot!');
                } else if(diff < 10 && diff >= 5) {
                    gameObj.renderTemp('Pretty Hot!');
                } else if(diff < 5 && diff >= 1) {
                    gameObj.renderTemp('Red Hot!');
                } else if(diff === 0) {
                    gameObj.renderTemp('You Got It!');
                    $('body').css('background-color', '#f38254');
                    // alert('You Win!');
                }
            }),
            compare: function(answer, userGuess){
                var diff = Math.abs(answer - userGuess);
                return diff;
            },
            renderTemp: function(temp) {
                $('#feedback').text(temp);
            },
            guessCount: function() {
                var count = parseInt($('#count').text());
                count++;
                $('#count').text(count);
            }
        }

    console.log(gameObj.randomNumber);
});


