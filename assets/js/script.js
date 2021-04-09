var $timer = document.querySelector("#timer");
var $main = document.querySelector("#main");
var $question = document.querySelector("#quiz-heading");
var $message = document.querySelector("#quiz-body");
var startButton = document.querySelector("#start-quiz");
var $outcome = document.querySelector("#outcome");
var indexNumber = 0;
var timer = 60;
var correct = 0;
var wrong = 0;
var play = true;
var highScores = [];
// end global variables
var questions = [
      {
      question: "What is CSS?",
      options: ["CSS stands for Cascading Style Sheet. It is a popular styling language which is used with HTML to design websites.", "A type of cookie.", "My favorite band."],
      answer: "1"
      },
      {
      question: "What is HTML?",
      options: ["A type of car.", "HTML stands for Hyper Text Markup Language. It is a language of World Wide Web.", "My favorite soda."],
      answer: "2"
      },
      {
      question: "What is JavaScript?",
      options: ["A type of old biblical text.", "My favorite candy.", "JavaScript is a scripting or programming language that allows you to implement complex features on web pages."],
      answer: "3"
      }
      ];
// end questions
var shuffleArr = function(array) {
    var loc = array.length, temp, index;
    while(loc > 0) {
        index = Math.floor(Math.random() * loc);
        loc--;
        temp = array[loc];
        array[loc] = array[index];
        array[index] = temp;
    };
    return array;
};
// end of shuffling questions
var countdown = function() {
    var timeInterval = setInterval(function() {
        if(timer > 0 && play === true) {
            $timer.setAttribute("style", "color:green;");
            $timer.innerText = timer;
            timer--;
        } else {
            $timer.innerText = timer;
            $timer.setAttribute("style", "color: red;");
            clearInterval(timeInterval);
            endQuiz();
        };
    }, 1000);
};
// end of timer
var runQuiz = function() {
    if(indexNumber === questions.length) {
        play = false;
    } else {
        var question = questions[indexNumber].question;
        var options = questions[indexNumber].options;
        answer = questions[indexNumber].answer;
        $question.textContent = question;
        $message.textContent = "";
        for (var i = 0; i < options.length; i++) {
            var $button = document.createElement("button");
            $button.className = "button optionList";
            $button.setAttribute("buttonId", [i+1]);
            $button.textContent = `${[i+1]}. ${options[i]}`;
            $message.appendChild($button);
        };
        indexNumber++;
    };
};

var startQuiz = function() {
    shuffleArr(questions);
    countdown();
    $question.setAttribute("style", "text-align: center;");
    $message.setAttribute("style", "text-align: center;");
    startButton.remove();
    runQuiz();
};

var optionHandler = function(event) {
    var $target = event.target;
    if($target.matches(".optionList")) {
        var guessId = $target.getAttribute("buttonId");
        optionCompare(guessId);
    };
};

var optionCompare = function(guessId) {
    if(guessId === answer) {
        timer += 8;
        correct++;
        $outcome.innerText = "You Answered Correct!";
        runQuiz();
    } else {
        timer -= 20;
        wrong++;
        $outcome.innerText = "You Answered Wrong!";
        runQuiz();
    };
};

var endQuiz = function() {
    if(timer < 0) {
        timer = 0;
        $timer.innerText = timer;
    };
    $question.removeAttribute("style");
    $question.textContent = "Congratulations on finishing the quiz! Lets take a look at how you did!";
    $message.innerHTML = `<div>You got ${correct} questions correct and ${wrong} questions wrong.</div><div>Your time score is: ${timer}.</div>`;
    var $form = document.createElement("form");
    $form.setAttribute("id", "name-form")
    var $input = document.createElement("input");
    $input.setAttribute("name", "user-name");
    $input.setAttribute("type", "text");
    $input.className = "user-name";
    $input.setAttribute("placeholder", "Enter Your Name");
    $form.appendChild($input);
    var $submit = document.createElement("button");
    $submit.className = "button";
    $submit.setAttribute("type", "submit");
    $submit.setAttribute("id", "save-name");
    $submit.textContent = "Submit";
    $form.appendChild($submit);
    $message.appendChild($form);
};
// end of quiz logic
var saveHighScore = function(event) {
    event.preventDefault();
    var $target = event.target;
    if($target.matches("#save-name")) {
        var $form = document.querySelector(".user-name");
        var userName = $form.value
        
        
        if(!userName) {
            alert("Please enter your name.");
            return false;
        } else {
            var highScoreObj = {
                name: userName,
                score: timer
            };
            highScores.push(highScoreObj);
            localStorage.setItem("scores", JSON.stringify(highScores));
            location.replace("./scores.html");
        };
    };
};

var loadScores = function() {
    highScores = localStorage.getItem("scores");
    if(!highScores) {
        highScores = [];
        return false;
    };
    highScores = JSON.parse(highScores);
};

startButton.addEventListener("click", startQuiz);
$message.addEventListener("click", optionHandler);
$main.addEventListener("click", saveHighScore);

loadScores();
// end of score logic
