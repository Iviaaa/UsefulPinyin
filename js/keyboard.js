

var pinyinText = document.getElementById('pinyin').textContent;
var currentLetter = '';
var currentIndex = 0;
var { pinyin } = pinyinPro;
function translateMe() {
    var chineseText = document.querySelector('.output').textContent;
    pinyinText = getPinyin(chineseText);
    document.getElementById('pinyin').innerText = pinyinText;
    currentLetter = pinyinText[0];
    currentIndex = 0;
    highlight();
}

function getPinyin(text) {
    let before = pinyin(text, {toneType: 'none'});
    let after = before.split(' ').join('');
    return after;
}

function highlight(){
    currentLetter = pinyinText[currentIndex];
    var element = document.getElementById(currentLetter);
    element.style.backgroundColor = "red";
}

function learnPinyin(key){
    console.log(pinyinText[currentIndex]);
    var element = document.getElementById(currentLetter);
    var pressedKey = document.getElementById(key);
    if (key != currentLetter){   
        console.log("warning: wrong key");
        element.style.color = "red";} //display warning
    else {
        element.style.color = "green";
        currentIndex++;
        currentIndex = currentIndex % pinyinText.length;
        pressedKey.style.backgroundColor = "transparent";
        var audio = new Audio('audio/' + key + '.mp3');
        audio.play();
        highlight();
    }
    element.style.color = "blue";
};

var inputText = document.getElementById('inputText');

inputText.addEventListener("keyup", function(e) {
    learnPinyin(e.key);
});