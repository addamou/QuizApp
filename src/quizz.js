//===============selection des objets html============
let reponse1 = document.getElementById('reponse1');
let reponse2 = document.getElementById('reponse2');
let reponse3 = document.getElementById('reponse3');
let reponse4 = document.getElementById('reponse4');
let question = document.getElementById('questionnaire');
let answerTrue = document.getElementById('bon');
let answerFalse = document.getElementById('faux');
let categorie = document.getElementById('typeQuestion');
let next = document.getElementById('next');
let btnRenit = document.getElementById('btnRelance');
let  winGame = answerTrue.textContent;
let  lostGame = answerFalse.textContent;
let reponse;
setSave();
save();
quiiz()

//===== fonction de recuperation des donnée========
function quiiz()
{
    let URL = "https://opentdb.com/api.php?amount=1";
    fetch(URL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let results = data.results[0];
        displayQuizz(results);
        console.log(results);
        reponse1.setAttribute('class','reload');
        reponse2.setAttribute('class','reload');
        reponse3.setAttribute('class','reload');
        reponse4.setAttribute('class','reload');
    })
    .catch(function(e){
        console.log(e);
    })

}
//================décrementation des bons reponses ==================
function increase(){
    winGame = Number(answerTrue.textContent) + 1;
}
//=================décrementation pour les faux============
function decrease(){
    lostGame = Number(answerFalse.textContent) + 1;
}
//===================fonction pour la relance du jeu ================
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

btnRelance.addEventListener('click',function(){
 init()
})

function displayQuizz(results){
    reponse = results.correct_answer;
    console.log(reponse);
   let  tabs = [];
   tabs.push(results.incorrect_answers.concat(results.correct_answer));
   question.textContent = results.question;
    reponse1.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
    reponse2.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
    reponse3.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
    reponse4.textContent = tabs[0][Math.floor(Math.random()*tabs[0].length)];
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
reponse1.addEventListener('click', function(event){
    event.stopPropagation();
    check(reponse1);
    reload()
});
reponse2.addEventListener('click', function(event){
    event.stopPropagation();
    check(reponse2);
    reload()
});
reponse3.addEventListener('click', function(event){
    event.stopPropagation();
    check(reponse3);
    reload()
});
reponse4.addEventListener('click', function(event){
    event.stopPropagation();
    check(reponse4);
    reload()
});


next.addEventListener('click',quiiz);