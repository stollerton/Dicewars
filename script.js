//this variable will begin to count the number of times that the dice are rolled on the page.
var diceCounter = 0;
//this variable will begin to count the number of times that the player wins a dice contest.
var winCounter = 0;
//this variable will begin to count the number of times that the player wins a dice contest.
var lossCounter = 0;

//This is the function that generates the randomly generated numbers inside a specified range.
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

//sets the variable for the dice and the numbers shown as a result of the functions.
function roll(dice){
	var txtEnemy = document.getElementById("enemyd"+dice);
	var txtPlayer = document.getElementById("playerd"+dice);
	var btnRoll = document.getElementById("rollbtnd"+dice);
    //disables the functionality of the roll buttons once pressed. (originally placed after the if statement inside the combat function, however this created a gamebreaking exploit, where a player could press the same roll button quickly in succession. This caused only one dice to be rolled and an incorrect ending notification.)
	btnRoll.disabled = true

	//This function starts generating random numbers between 1 and and the dice number set by the txtenemy or txtplayer variable until told to stop by the next function
	var rollingAnimation = setInterval(function(){
		txtPlayer.innerHTML = getRandomInt(1, dice);
		txtEnemy.innerHTML = getRandomInt(1, dice);
	}, 60);
	//This ends the cycles of the function generating a final random number between 1 and the dice number set by the txtenemy or txtplayer variable after a full second
	setTimeout(function(){
		clearInterval(rollingAnimation);
        //refers to the combat function and specifies the variables it relies on to work.
		combat(txtEnemy, txtPlayer, btnRoll);
		//dice rolls resolve after 1 second
	}, 1000);
}

//this function runs the process for each dice roll competition between the player and the opponenet.
function combat (txtEnemy, txtPlayer, btnRoll){
	//if statement determined by the final random number difference between txtenemy and txtplayer variables for which div shows for that specific combat. Outcomes being either a victory or defeat.
	if(parseInt(txtPlayer.innerHTML) > parseInt(txtEnemy.innerHTML)){
		//if the player's roll is higher than the opponents, it will change the roll button's class to a bootstrap success button with no interactions and text saying victory.
        //mart10 is a class created to add margin px10 to the top of divs I add it to.
		btnRoll.className = 'btn btn-success mart10';
		btnRoll.innerHTML = "Victory";
		//adds +1 to the wincounter on a combat victory roll.
		winCounter++;
	}else{
		//if the player's roll is equal to or lower than the opponents, it will change the roll button's class to a bootstrap danger button with no interactions and text saying defeat.
		btnRoll.className = 'btn btn-danger mart10';
		btnRoll.innerHTML = "Defeat";
		//adds +1 to the losscounter on a combat defeat roll.
		lossCounter++;
	}
		//prevents the victory and defeat buttons from being pushed
	diceCounter++;
    //refers to the checkwinner function.
	checkwinner();
}

//this function takes the results from the six combats and determines if the player wins or loses
function checkwinner(){
	//if statement to weigh wincount against loss count to determine which end result to show
	if(diceCounter == 6){
		if(winCounter > lossCounter){
            //allows the if statement to change the css of the victoryend and defeatend divs to show them depending on the result.
			document.getElementById('victoryend').style.display = 'block';
		}else{
			document.getElementById('defeatend').style.display = 'block';
		}
	}
}
