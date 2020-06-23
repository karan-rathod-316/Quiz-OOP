let quizComponents = document.querySelector('.quiz-components')
let mainText = document.querySelector('.start-text')
quizComponents.style.display = "none"
let start = document.querySelector(".start")
start.addEventListener('click', () => {
    quizComponents.style.display = "block";
    start.style.display = "none";
    mainText.style.display = "none";
})



class Question {
    constructor(title, options, correctAnswerIndex) {
        this.title = title;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
    }
    isCorrect(userAnswer) {
        return this.correctAnswerIndex === userAnswer;
    }

    getCorrectAnswer() {
        return this.options[this.correctAnswerIndex]
    }
    render() {
            // let root = document.getElementById("root");

            return `<form>
        <fieldset>
          <legend>${this.title}</legend>
          <div class="options">
          ${this.options.map(
              (option, index) =>
            `<input type="radio" class="radio-btn" id="quizQuestion"
             name=${this.title} value=${index}>
            <label for="quizQuestion">${option}</label>
            `).join("")}
        
          </div>
          <div>
        </div>
        </fieldset>
      </form>`
    }

}

let questionOne = new Question("1. A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much does the ball cost?", ["10 cents", "5 cents", "15 cents", "20 cents"],
    1);

let questionTwo = new Question("If it takes five machines five minutes to make five widgets, how long would it take 100 machines to make 100 widgets?", ["5 minutes", "100 minutes", "50 minutes", "150 minutes"],
0);

let questionThree = new Question("In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?", ["18 days", "47 days", "24 days", "48 days"],
1);



console.log(questionOne)
console.log("isCorrect", questionOne.isCorrect("option2"))
console.log("isCorrect", questionOne.isCorrect("option1"))
console.log("getCorrectAnswer ", questionOne.getCorrectAnswer())
questionOne.render();
questionTwo.render();
let root = document.getElementById("root")
let nextElm = document.querySelector('.btn')
let notification = document.querySelector(".notification")
let restart = document.querySelector('.restart')
let finalScore = document.querySelector('.final-score')


class Quiz {
    constructor (rootElm, nextElm, questions, finalScore) {
        this.questions = questions;
        this.rootElm = rootElm;
        this.activeQuestionIndex = 0;
        this.nextElm= nextElm;
        this.score = 0;
        this.handleFunctions = this.handleFunctions();
        this.finalScore = finalScore
    }

    handleFunctions(){
        this.nextElm.addEventListener("click",() => {
            let radioBtn = document.querySelectorAll('.radio-btn')
            let selectBtn = [...radioBtn].filter(elm => {
                return elm.checked
            })
            console.log(selectBtn)
            if (!selectBtn[0]) {
                return notification.innerText = "Please select an option to continue"
                
            }
            let currentQuestion = this.questions[this.activeQuestionIndex]
            console.log(selectBtn[0].value)
            if (currentQuestion.isCorrect(+selectBtn[0].value)){
                this.score++
            }
            this.nextQuestion(this.activeQuestionIndex);
        })
        this.createUI()
    }

    nextQuestion () {
        notification.innerText = "";
        // finalScore.innerText = "";
        this.activeQuestionIndex++;
        if (this.activeQuestionIndex > this.questions.length -1)
        {
            root.style.display = "none";
            nextElm.style.display = "none";
            document.querySelector('.final-score').innerHTML = `<h2 class="score-header">Your final score is ${this.score}!!<h2>
            <h3 class="solution-header">Here's the solution:<h3>

<p class="solution-para">1. Say the ball costs X. Then the bat costs $1 more, so it is X + 1. So we have bat + ball = X + (X + 1) = 1.1 because together they cost $1.10. This means 2X + 1 = 1.1, then 2X = 0.1, so X = 0.05. This means the ball costs 5 cents and the bat costs $1.05.</p>
<p class="solution-para">2. If it takes 5 machines 5 minutes to make 5 widgets, then it takes 1 machine 5 minutes to make 1 widget (each machine is making a widget in 5 minutes). If we have 100 machines working together, then each can make a widget in 5 minutes. So there will be 100 widgets in 5 minutes.</p>
<p class="solution-para">3. Every day FORWARD the patch doubles in size. So every day BACKWARDS means the patch halves in size. So on day 47 the lake is half full.</p>


            `
            console.log(this.score);
            restart.style.display = "block";
            restart.innerText = "Restart"
            restart.addEventListener('click', this.restartQuiz)
            return;
        }
        this.createUI();
    }

    restartQuiz () {
        let quizRestart = new Quiz (root, nextElm, [questionOne, questionTwo], finalScore);
        quizRestart.createUI()       
        root.style.display = "block";
        nextElm.style.display = "block" 
        finalScore.innerText = "";
        restart.style.display = "none";

    }

    createUI() {
        restart.style.display = "none";

        this.rootElm.innerHTML = this.questions[this.activeQuestionIndex].render()
    }
}


let quiz = new Quiz (root, nextElm, [questionOne, questionTwo, questionThree], finalScore);
quiz.createUI();
console.log(quiz);

//On click on next, check whether the selected answer index is true or not
//if true, this.score++
//change this is handlefunctions

// Prevent Reload
document.onkeydown = function(){
    switch (event.keyCode){
          case 116 : //F5 button
              event.returnValue = false;
              event.keyCode = 0;
              return false;
          case 82 : //R button
              if (event.ctrlKey){ 
                  event.returnValue = false;
                  event.keyCode = 0;
                  return false;
              }
      }
  }

//   Mouse Effects