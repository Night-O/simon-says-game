let gameSeq=[];
let userSeq=[];
let start=false;
let level=0;
let btns=["yellow", "red", "green", "purple"];
let highscore=0;

document.addEventListener("keypress", function () {
    if(start==false){
        start=true;
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}

function userFlash(btn) {
    btn.classList.add("back");
    setTimeout(function(){
        btn.classList.remove("back");
    },250)
}

function checkAns(idx){
    if(gameSeq[idx]==userSeq[idx]){
        if(idx==gameSeq.length-1){
            setTimeout(levelUp, 1000);
        }
    }else{
        highscore=Math.max(highscore,level-1);
        document.querySelector("h2").innerHTML=`Game Over. Your score was <b>${level-1}</b><br>Press any key to start<br>Your highscore is ${highscore}`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){document.querySelector("body").style.backgroundColor="white";},150)
        reset();
    }
}

function levelUp() {
    userSeq=[];
    level++;
    document.querySelector("h2").innerText=`Level ${level}`;
    let rand = Math.floor(Math.random()*4);
    let randbtn = btns[rand];
    gameSeq.push(randbtn);
    gameFlash(document.querySelector(`.${randbtn}`));
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userSeq.push(btn.getAttribute("id"));
    checkAns(userSeq.length-1);
}

let allbtns= document.querySelectorAll(".btn");
for (btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    start=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}