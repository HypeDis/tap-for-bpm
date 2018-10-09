// $('#bpm-display-input').focus();

// let averageBPM = 0;
let tapTimeArray = [];
// dont want the average to calculate when its the first tap
let isFirstTap = true;
//current time is basically the second tap and every even tap afterwards
let currentTime = 0;
// previousTime is basically the time at first tap and every odd tap afterwards
let previousTime = 0;

function getAverageBPM () {
     
  // trim the array when it gets too long
  if(tapTimeArray.length >= 20) {
      tapTimeArray.shift();
  } 
  
    // sum the array
  let sumTapTime = tapTimeArray.reduce(function(acc, curr) {
      return acc + curr;
  },0)

    // 60000 = ms in 1 minute. bpm = 1 minute (in) / average tap time
  return (60000 / (sumTapTime / tapTimeArray.length)).toFixed(2);
}

$(document).keypress(function() {

  if(isFirstTap === false) {
    currentTime = new Date().getTime();
    let tapTime = currentTime - previousTime;
    previousTime = currentTime;
    tapTimeArray.push(tapTime);
    getAverageBPM();
    $('#bpm-display-input').attr('placeholder', getAverageBPM() + ' BPM');
  } else {
    previousTime = new Date().getTime();
    isFirstTap = false;
    $('#bpm-display-input').attr('placeholder', 0)
  }
 
  
 
})

$('#reset').click(function(){

  // blur unfocuses the button so that it doesnt trigger again when pressing a key
  $('#reset').blur();
  // averageBPM = 0;
  tapTimeArray = [];
  isFirstTap = true;
  currentTime = 0;
  previousTime = 0;
  $('#bpm-display-input').attr('placeholder', 'Tap any key to start');
})



