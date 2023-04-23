const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");

const words = ['basketball', 'programming', 'motivation', 'pirate','grow','debt','indication','me','guitar','close','spectrum','digital','thoughtful','refrigerator','custody','confine','fuel','hit','win','loose','poerty','host','waist','pavement','tiger','trouble','nightmare','precision','glass','morning','criminal','financial','fork','surgeon','scramble'];
// Paņem vārdus un atzīmēt selectedwords
let selectedWord = words[Math.floor(Math.random() * words.length)];
//Definē lauku lai saglabātu pareizos burtus
const correctLetters = [];
//Definē lauku lai saglabātu nepareizos
const wrongLetters = [];

//Pārādīt uzminēto vārdu, atlasa burtus, parāda paziņojumu
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'You won!';
        popup.style.display= 'flex';
    }
}

// Atjaunot nepareizos burtus
function updateWrongLetterE1(){
    //Parādīt nepareizos burtus
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Parādīt daļu, nepareizo burtu skaitu utt.
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //Pārbaudīt vai zaudēji
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'You lost.';
        popup.style.display = 'flex';
    }
}

//Parādīt paziņojumu
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Taustiņu burtu nospiešanas eventi, visi paziņojumi 
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
});

//Spēlēt atkal no jauna 
playAgainBtn.addEventListener('click', () => {
    //Tukšs laukums 
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();
