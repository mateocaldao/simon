/*global define */
define([], function () {
    'use strict'
     
    var userPlaying = false
    var userClicks = new Array()
    var buttonList
    var computerSequence = new Array()
    
    //inicializamos buttonList con todos los elementos de nuestra clase button
    var initialize = function() {
        buttonList = jQuery.map( $(".button"),
                       function(element) {
                         return $(element).attr('id')
                       })
    }
    //generamos un random de la secuencia automatica
    var generateComputerSequence = function() {
        computerSequence.push( buttonList[
                                 Math.floor(Math.random()
                                   * buttonList.length)] )
        console.log(computerSequence)
    }
 
    var highlight = function(button, color) {
      var oldColor = button.css("background-color")
      button.css("background-color", color).dequeue()
            .delay(300)
            .queue( function() {
                    button.css("background-color", oldColor).dequeue()
                  })
    }
    // mostramos la secuecia generada aleatoria
    var showComputerSequence = function() {
        var seq = computerSequence
        for(var id in seq) {
           (function(id){
             setTimeout( function() {
               highlight($("#"+seq[id]), "#fff")
             }, 600*id)
           })(id)
        }
        setTimeout( function() {
            userPlaying = true
        }, 600*seq.length)
    }
    //comparacion de secuencias 
    var compareSequences = function() {
    	 for(var i = 0; i < userClicks.length; ++i)
         {
                 if(userClicks[i] != computerSequence[i])
                 {
                         return false;
                 }
         }

         console.log("Bien!");
         $('#score').text(userClicks.length)
         return true;
    }
    //final del juego
    var endGame = function() {
    	 for(var i = 0; i < buttonList.length; i++)
         {
              $("#"+buttonList[i]).css("opacity", 0.3)
         }
         $('#fail').html("HAS PERDIDO")
         $('#fail').fadeIn(1000)
         $('#fail').fadeOut(1000)
         $('#score').html("Score "+(userClicks.length-1))
         userClicks.length=0;
         computerSequence.length=0;
         $('#startbutton').fadeIn()
    }
     //funcion principal
    $(document).ready(function() {
        initialize()
 
        $('#startbutton').click(function() {
        	for(var i = 0; i < buttonList.length; i++)
            {
                 $("#"+buttonList[i]).css("opacity", 1)
            }
            $('#score').text("0");
            $(this).css('color', '#fff').fadeOut()
            setTimeout( function() {
                generateComputerSequence()
                showComputerSequence()
            }, 500)
        })
 
        $('.button').click( function() {
            if(userPlaying) {
                var thisId = $(this).attr('id')
                highlight($(this), "#fff")
                userClicks.push(thisId)
 
                if (userClicks.length >= computerSequence.length) {
                    userPlaying = false
                      if (compareSequences()){
                          userClicks.length = 0
                          setTimeout(function() {
                          generateComputerSequence()
                          showComputerSequence()
                      }, 1000)

                    }
                  else
                  {
                    endGame()
                  }      
                }
            }
        })
    })
    return "OK";
 
     
});
 
  
        
