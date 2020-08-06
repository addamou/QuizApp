const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const question = document.getElementById('question');
const answerTrue = document.getElementById('bon');
const answerFalse = document.getElementById('faux');
const categorie = document.getElementById('typeQuestion');
const next = document.getElementById('next');
const btnRenit = document.getElementById('btnRenit');
var winGame = answerTrue.textContent;
var lostGame = answerFalse.textContent;

setSave();
save();
quiiz()
let reponse;

function quiiz()
{
    const endPoint = "https://opentdb.com/api.php?amount=1";
    fetch(endPoint)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const results = data.results[0];
        displayQuizz(results);
        console.log(results);
        answer1.setAttribute('class','reload');
        answer2.setAttribute('class','reload');
        answer3.setAttribute('class','reload');
        answer4.setAttribute('class','reload');
    })
    .catch(function(e){
        console.log(e);
    })

}

function increase(){
    winGame = Number(answerTrue.textContent) + 1;
}

function decrease(){
    lostGame = Number(answerFalse.textContent) + 1;
}

function init(){
    localStorage.clear();
     answerTrue.textContent = 0;
     answerFalse.textContent = 0;
}

function setSave(){
    winGame = localStorage.getItem('findTrue');
    lostGame = localStorage.getItem('findFalse');

    answerTrue.textContent = winGame;
    answerFalse.textContent = lostGame;


}

function save(){
    localStorage.setItem('findTrue', answerTrue.textContent);
    localStorage.setItem('findFalse', answerFalse.textContent);
    setSave();

    if(!winGame&& !winGame){
        answerTrue.textContent = 0;
        answerFalse.textContent = 0;
        console.log(winGame, 'fv'+lostGame);
    }

    

}


function reload(){
    quiiz()
    answerTrue.textContent = winGame;
    answerFalse.textContent = lostGame;

}

btnRenit.addEventListener('click',function(){
 init()
})

function displayQuizz(results){
    reponse = results.correct_answer;
    console.log(reponse);
   var tabs = [];
   tabs.push(results.incorrect_answers.concat(results.correct_answer));
   question.textContent = results.question;
    answer1.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
    answer2.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
    answer3.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
    answer4.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
    categorie.textContent = results.category;
    save();
    setSave()
   console.log(results.category);
   console.log(tabs);
}

function check(item){
    if(item.textContent == reponse){
        
        item.setAttribute('class', "answerAllGreen");
        increase();
    }

    else if(item.textContent != reponse){
        item.setAttribute('class', "answerAllRed");
        decrease()
    }

    console.log(item.textContent);
};
answer1.addEventListener('click', function(event){
    event.stopPropagation();
    check(answer1);
    reload()
});
answer2.addEventListener('click', function(event){
    event.stopPropagation();
    check(answer2);
    reload()
});
answer3.addEventListener('click', function(event){
    event.stopPropagation();
    check(answer3);
    reload()
});
answer4.addEventListener('click', function(event){
    event.stopPropagation();
    check(answer4);
    reload()
});


next.addEventListener('click',quiiz);