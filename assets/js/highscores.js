var $ul = document.querySelector("#scores");
var $return = document.querySelector("#return-button")
var $clear = document.querySelector("#clear-button");
var highScores = [];
// end of global variables
var loadScores = function() {
    highScores = localStorage.getItem("scores");
    if(!highScores) {
        highScores = [];
        return false;
    }
    highScores = JSON.parse(highScores);
    console.log(highScores);
    for(var i = 0; i < highScores.length; i++) {
        var $listItem = document.createElement("li");
        $listItem.className = "listed-score";
        var $name = document.createElement("div");
        $name.className = "score-info";
        $name.textContent = `Name: ${highScores[i].name}`;
        $listItem.appendChild($name);
        var $score = document.createElement("div");
        $score.className = "score-info";
        $score.textContent = ` Score: ${highScores[i].score}`;
        $listItem.appendChild($score);
        $ul.appendChild($listItem);
    }
};

var goToIndex = function() {
    location.replace("././index.html");
};

var clearScores = function() {
    highScores = [];
    localStorage.setItem("scores", highScores);
    location.reload();
};

$return.addEventListener("click", goToIndex);
$clear.addEventListener("click", clearScores);

loadScores();
// end of highscore logic for scores.html