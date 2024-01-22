const questions=[
    {
        question: "What is the meaning of Hakuna Matata?",
        answers:[
            {text:"Thank You",correct:false},
            {text:"No worries",correct:true},
            {text:"Good Night",correct:false},
            {text:"Good Morning",correct:false},
        ]
    },
    {
        question: "Which country drinks the most amount of coffee per person?",
        answers:[
            {text:"India",correct:false},
            {text:"Italy",correct:false},
            {text:"Columbia",correct:false},
            {text:"Finland",correct:true},
        ]
    },
    {
        question: "Which is the tallest mountain in the world?",
        answers:[
            {text:"K2",correct:false},
            {text:"Mount Everest",correct:true},
            {text:"Mount Kilimanjaro",correct:false},
            {text:"Denali",correct:false},
        ]
    },
    {
        question: "What is the main ingredient in hummus?",
        answers:[
            {text:"Chickpeas",correct:true},
            {text:"Potatoes",correct:false},
            {text:"Lentils",correct:false},
            {text:"White Beans",correct:false},
        ]
    }

];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestions();
}
function showQuestions()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach( answer => {
       const button=document.createElement("button");
       button.innerHTML=answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
       if (answer.correct)
       {
        button.dataset.correct=answer.correct;
       }
       button.addEventListener("click",selectAnswer);
    });
}
function resetState()
{
    nextButton.style.display = "none";
    while (answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e)
{
        const selectedBtn=e.target;
        const isCorrect=selectedBtn.dataset.correct==="true";
        if (isCorrect)
        {
            selectedBtn.classList.add("correct");
            score++;
        }
        else 
        {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button=>{
            if (button.dataset.correct==="true")
            {
                button.classList.add("correct");
            }
            button.disabled="true";
        });
        nextButton.style.display="block";
}
function showScore()
{
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton()
{
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length){
    showQuestions();
     }
     else{
       showScore();
     }
}
nextButton.addEventListener("click",()=>{
       if (currentQuestionIndex<questions.length){
        handleNextButton();
       }else
       {
        startQuiz();
       }
});
startQuiz();
