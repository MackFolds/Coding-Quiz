var startQuizEl = document.querySelector('#start-quiz');
var remainingTime = document.getElementById('time-left');

debugger;

var count = 60;
var message = "OUT OF TIME!"
function countdown() {
    var timeInterval = setInterval(function() {
      if (count > 1) {
        remainingTime.textContent = count + ' seconds remaining';
        count--;
      } else if (count === 1) {
        remainingTime.textContent = count + ' second remaining';
        count--;
      } else {
        remainingTime.textContent = '0';
        clearInterval(timeInterval);
        displayMessage();
      }  


    }, 1000);
  }
      function displayMessage() {
        remainingTime.textContent = message
      }
  function setCounterText() {
    remainingTimeEl.textContent = count;
    };
startQuizEl.addEventListener("click", function(){
    countdown();
    renderQuestion();
    if (count < 60){
    document.getElementById("#start-quiz").disabled = true;
};
});

var questions=[
    {
    question: "What is CSS?",
    a: "CSS stands for Cascading Style Sheet. It is a popular styling language which is used with HTML to design websites.", 
    b: "A type of cookie.",
    c: "My favorite band.",
    correctAnswer: "A"
    },
    {
    question: "What is HTML?",
    a: "A type of car.",
    b: "HTML stands for Hyper Text Markup Language. It is a language of World Wide Web.",
    c: "My favorite soda.",
    correctAnswer: "B"
    },
    {
    question: "What is JavaScript?",
    a: "A type of old biblical text.",
    b: "My favorite candy.",
    c: "JavaScript is a scripting or programming language that allows you to implement complex features on web pages.",
    correctAnswer: "C"
    }
    ];

    function get(x){
        return document.getElementById(x);
      }

    var questionNumber = 0;
    var quiz, quizStatus, question, choice, choices, chA, chB, chC;
// this function renders a question for display on the page
function renderQuestion(){
    quiz = get("quiz");
    if(questionNumber >= questions.length){
      get("quizStatus").innerHTML = "quiz completed";
      // resets the variable to allow users to restart the quiz
      questionNumber = 0;
      correct = 0;
      // stops rest of renderQuestion function running when quiz is completed
      return false;
    }
    get("quizStatus").innerHTML = "Question "+(questionNumber+1)+" of "+questions.length;
    
    question = questions[questionNumber].question;
    chA = questions[questionNumber].a;
    chB = questions[questionNumber].b;
    chC = questions[questionNumber].c;
    // display the question
    quiz.innerHTML = "<h3>"+question+"</h3>";
    // display the answer options
    // the += appends to the data we started on the line above
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br><br>";
    quiz.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
  }

  function checkAnswer(){
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for(var i=0; i<choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
      }
    }

    questionNumber++;
    renderQuestion();
  }

var score = 0;
