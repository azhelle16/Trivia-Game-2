/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

/* GLOBAL VARIABLES */

var secs = "10"
var rt
var triviaArr = ["movie"]
var answers = { "movie": ["Remember Me","Storm","Rob Reiner","Bruce Wayne","Franki Valli","Lady and the Tramp",
						 "Bruce Lee","The Emerald City","48 Hours","Meg Ryan"]

			  } 
var qNum = 1
var cor = 0
var incor = 0
var noans = 0

$(document).ready(function() {

	//footer
 	var currdate = new Date();
 	var year = currdate.getFullYear();
 	//var canvasTop = "450";
 	var crstr = "&copy; "+year+"<br>";
 	$('footer').empty().append(crstr);
 	$(".resetButton").css("opacity","0")
 	
 	$(".startButton").on("click", function() {
 		$("#mainContainer").removeClass("dispHide")
 		$("#questionnaire").load("./assets/html/movie.html", function() {
 			initButtons()
 			//$("#doneButton, #q1").removeClass("dispHide")
 			$("#q1").removeClass("dispHide")
			$(".startButton").css("opacity","0")
			rt = setInterval(runTimer,1000)
 		})
 		
 	})

 	$(".resetButton").on("click", function() {
 		secs = "10"
 		$("#countdown").empty();
 		var im2 = $("<img>")
		im2.attr("src","./assets/images/1.png")
		im2.attr("height","200")
		$("#countdown").append(im2)
		var im = $("<img>")
		im.attr("src","./assets/images/0.png")
		im.attr("height","200")
		$("#countdown").append(im)
 		$("#questionnaire").removeClass("dispHide")
		$(".resetButton").css("opacity","0")
		$("#quizResult").addClass("dispHide")
		qNum = 1
		cor = 0
		incor = 0
		noans = 0
		$("#mainContainer").removeClass("dispHide")
 		$("#questionnaire").load("./assets/html/movie.html", function() {
 			$("#q1").removeClass("dispHide")
			rt = setInterval(runTimer,1000)
 		})
 	});

})

/*
 #######################################################################
 #
 #  FUNCTION NAME : runTimer
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 22, 2019 PST 
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 26, 2019 PST
 #  REVISION #    : 2
 #  DESCRIPTION   : runs the timer
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function runTimer() {

	$("#countdown").empty();

	var s = parseInt(secs) - 1
	var secArr = secs.split("")

	for (var j = 0; j < secArr.length; j++) {
		var im = $("<img>")
		if (secArr.length > 1) {
			im.attr("src","./assets/images/"+secArr[j]+".png")
			im.attr("height","200")
		} else {
			var im2 = $("<img>")
			im2.attr("src","./assets/images/0.png")
			im2.attr("height","200")
			$("#countdown").append(im2)
			im.attr("src","./assets/images/"+secArr[j]+".png")
			im.attr("height","200")
		  }
		$("#countdown").append(im)  
	}

	if (s < 0) {
		$("#wrongAudio").trigger("play");
		showCorWrongAnswers("")
	} else {
		 if (s < 5){
		 	$("#timerAudio").trigger("play");
	  	 }
		 secs = ""+s 
	  }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : showResults
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 27, 2019 PST 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : shows the result of the game
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function showResults() {

	$("#questionnaire, #doneButton").addClass("dispHide")
	$("#quizResult").removeClass("dispHide")
	$("#cor").text(cor)
	$("#wro").text(incor)
	$("#noa").text(noans)
	$(".resetButton").css("opacity","1")
	$(".startButton").css("opacity","0")

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : initButtons
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 31, 2019 PST 
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : February 02, 2019 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : initializes how the radiobuttons works upon clicking
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function initButtons() {

	$(".cbut").on("click",function() {
		showCorWrongAnswers($(this).val())
	})

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : showCorWrongAnswers
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : February 02, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : shows the answers and let user know whether its wrong or right
 #  PARAMETERS    : movie name
 #
 #######################################################################
*/

function showCorWrongAnswers(mov) {

	$("#q"+qNum).addClass("dispHide")
	var im = $("<img>")
	im.attr("src","./assets/images/a"+qNum+".jpg")
	im.attr("class","thisImg")
	var toShow
	var div = $("<div>")
	div.append(im)
	if (mov != "") {
		if (answers.movie.includes(mov)) { //CORRECT ANSWER
			$("#correctAudio").trigger("play");
			toShow = "clogo"
			cor += 1
		} else { //WRONG ANSWER
			$("#wrongAudio").trigger("play");
			toShow = "wlogo"
			$("#ansSpan").text(answers.movie[qNum-1])
			incor += 1
		  }
	} else {
		toShow = "wlogo"
		$("#ansSpan").text(answers.movie[qNum-1])
		noans += 1
	  }
	$("#"+toShow).removeClass("dispHide")
	$("#answers").append(div)
	clearInterval(rt)
	secs = "10";
	setTimeout(function() {
		qNum += 1
		if (qNum > 10) {
			clearInterval(rt)
			showResults();
		} else {
			rt = setInterval(function() {
				div.remove();
				$("#"+toShow).addClass("dispHide")
				runTimer();
			}, 1000)
			setTimeout(function() {
				$("#q"+qNum).removeClass("dispHide")
			},1000)
		  }
		
	},1000)

}