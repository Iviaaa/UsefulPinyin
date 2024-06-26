
function translateMe() {
  resetkeyboard();
  console.log("called");
  var chineseText = document.querySelector('.output').textContent;
  pinyinText = getPinyin(chineseText);
  document.getElementById('pinyin').innerText = pinyinText;
  currentLetter = pinyinText[0];
  currentIndex = 0;
  highlight();
}

function resetkeyboard(){
  var keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].style.backgroundColor = "white";
    keys[i].style.color = "black"; 
  }
}

function getPinyin(text) {
  let before = pinyin(text, {toneType: 'none'});
  let after = before.split(' ').join('');
  return after;
}

function highlight(){
  currentLetter = pinyinText[currentIndex];
  var element = document.getElementById(currentLetter);
  element.style.backgroundColor = "#8bffc9";
}

function learnPinyin(key){
  console.log(pinyinText[currentIndex]);
  var element = document.getElementById(currentLetter);
  var pressedKey = document.getElementById(key);
  if (key != currentLetter){   
      console.log("warning: wrong key");
      alert("啊哦，点错了！");
      } //display warning
  else {
      element.style.color = "green";
      currentIndex++;
      if( currentIndex === pinyinText.length){
        alert("已经完成练习咯！点击确定，重新开始。");
        resetkeyboard();
      }else{
        element.style.color = "#ffa0fa";
      }
      currentIndex = currentIndex % pinyinText.length;
      pressedKey.style.backgroundColor = "transparent";
      var audio = new Audio('audio/' + key + '.mp3');
      // prompt new input or one more practice
      audio.play();
      highlight();
  }
  
};


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "zh-Hans";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");
const hints = document.querySelector(".hintspeak");

var pinyinText = document.getElementById('pinyin').textContent;
var currentLetter = '';
var currentIndex = 0;
var { pinyin } = pinyinPro;
const keys = document.querySelectorAll('.key');


hints.onclick = () => {
  try{
    recognition.start();
  }
  catch(e){
    console.log(e);
  }
  let circle = document.getElementById("hintcircle");
  circle.style.backgroundColor = "#ffa0fa";
  let hint = document.getElementById("circlehint");
  hint.innerHTML= "录入中";
  
};

hints.onspeechend = () =>{
  recognition.stop();
  
};

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  diagnostic.textContent = `${text}`;
  translateMe();
  let circle = document.getElementById("hintcircle");
  circle.style.backgroundColor = "#8bffc9";
  let hint = document.getElementById("circlehint");
  hint.innerHTML= "点我";
};

// recognition.onspeechend = () => {
//   recognition.stop();
// };

recognition.onerror = (event) => {
  diagnostic.textContent = `啊哦，出错了。请刷新网页！`;
  // hide
};

keys.forEach(el => el.addEventListener('click', event => {
  console.log(event.target.getAttribute("data-el"));
  learnPinyin(el.textContent);
}));
