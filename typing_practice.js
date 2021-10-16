// Author: Gengar

// fade out
function scoreChanged(element) {
    var opacity = 1;
    var timer = setInterval(function(){
        if(opacity < 0.1){
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity -=  0.1;
    }, 50);
}

// document.body.onclick=function()
//   {
//     var elem=document.getElementById("focusOnMe");
//     elem.focus()
//   };

document.addEventListener('DOMContentLoaded', function() {
  var keyCodeToBePress = 32;  // 32 is the space key
  var countCorrect = 0;
  var countWrong = 0;
  var keyCodeList = [65, 83, 68, 70, 74, 75, 76];  // keycode for asdfjkl
  var isWrong = false;
  var t1, t2;
  var t_combo1, t_combo2;
  
  function keydownHandler(e) {
    // if ( !e.metaKey ) {
    //   e.preventDefault();
    // }

    // if space is press, starting the game.
    if (e.keyCode == 32 && document.getElementById("description")) {
      document.getElementById("description").outerHTML = "";
      keyCodeToBePress = keyCodeList[Math.floor(Math.random()*keyCodeList.length)];
      document.getElementById("keytobepress").textContent = String.fromCharCode(keyCodeToBePress);
      var date = new Date();
      t1 = date.getTime();
      return 0
    } else if (document.getElementById("description")) {
      document.getElementById("description").style.color = "red";
      return 0
    }

    // if the "keytobepress" element is red, setting it to black.
    if (isWrong) {
        document.getElementById("keytobepress").style.color = "black";
        isWrong = false;
    }

    // Check the keypress is the correct key or not.
    if (e.keyCode == keyCodeToBePress) {
      var date = new Date();
      t_combo2 = date.getTime();
      if (t_combo2 - t_combo1 < 1000) {
        document.getElementById("combo").textContent = Number(document.getElementById("combo").textContent) + 1;
      } else {
        document.getElementById("combo").textContent = "0";
      }
      scoreChanged(document.getElementById("correctPlusOne"));
      countCorrect += 1;
      document.getElementById("keyCorrect").textContent = countCorrect;
      keyCodeToBePress = keyCodeList[Math.floor(Math.random()*keyCodeList.length)];
      document.getElementById("keytobepress").textContent = String.fromCharCode(keyCodeToBePress);
      var date = new Date();
      t_combo1 = date.getTime();
    } else {
      document.getElementById("combo").textContent = "0";
      scoreChanged(document.getElementById("wrongPlusOne"));
      countWrong += 1;
      document.getElementById("keyWrong").textContent = countWrong;
      document.getElementById("keytobepress").style.color = "red";
      isWrong = true;
    }
    var date = new Date();
    t2 = date.getTime();
    document.getElementById("correctTypingRate").textContent = (countCorrect / (t2 - t1) * 1000).toString().slice(0, 5);
    document.getElementById("CorrectWrongRate").textContent = (countCorrect / (countCorrect + countWrong) * 100).toString().slice(0, 5) + " %";
  }
  
  // register handler method for the keydown event
  if (document.addEventListener) {
    document.addEventListener('keydown', keydownHandler, false);
  }
  else if (document.attachEvent) {
    document.attachEvent('onkeydown', keydownHandler);
  }
});