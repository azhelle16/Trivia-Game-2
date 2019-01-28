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
 		$("#mainContainer").removeClass("dispHide")//
 		$("#questionnaire").load("./assets/html/movie.html", function() {
 			$("#doneButton, #q1").removeClass("dispHide")
			$(".startButton").css("opacity","0")
			rt = setInterval(runTimer,1000)
 		})
 		
 	})

 	$("#doneButton").on("click", function() {
 		if (qNum == 10) {
 			$("#correctAudio").trigger("play");
 			//$("#tUp img").attr("src","./assets/images/results.png");
 			clearInterval(rt)
 			checkAnswers()
 			showResults();
 		} else {
	 		clearInterval(rt)
	 		checkAnswers()
	 		secs = "10"
	 		var num = qNum;
			qNum += 1
			$("#q"+num).addClass("dispHide")
			$("#q"+qNum).removeClass("dispHide")
			runTimer();
			rt = setInterval(runTimer,1000)
		  }
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
 		$("#mainContainer").addClass("dispHide")
 		$("#questionnaire").removeClass("dispHide")
 		$("#doneButton").addClass("dispHide")
		$(".resetButton").css("opacity","0")
		$("#quizResult").addClass("dispHide")
		$(".startButton").css("opacity","1")
		qNum = 1
		cor = 0
		incor = 0
		noans = 0
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
		if (qNum == 10) {			
			clearInterval(rt)
			checkAnswers()
			showResults();
		} else {
			clearInterval(rt)
			checkAnswers()
			secs = "10"
			setTimeout(function() {
				var num = qNum;
				qNum += 1
				rt = setInterval(function() {
					$("#q"+num).addClass("dispHide")
					runTimer();
					$("#q"+qNum).removeClass("dispHide")
				}, 1000)
			},500)
		  }
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
 #  FUNCTION NAME : checkAnswers
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 24, 2019 PST 
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 26, 2019 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : checks the answer selected
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function checkAnswers() {

	var noc = 0 //no check counter
	$("input[name='rb"+qNum+"']").each(function() {
		
		if ($(this).is(":checked")) {
			console.log("ANSWER: "+$(this).val())
			if (answers.movie.includes($(this).val())) {
				cor += 1
			} else {
				incor += 1
			  }
		} else {
			noc += 1
		  }
		 
	})

	if (noc == 4)
		noans += 1

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