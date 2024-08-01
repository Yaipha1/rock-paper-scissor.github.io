let userScore=0;
let compScore=0;
let lastClicked=null;
let compChoice;


const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg")




// Computer choice
const genCompChoice=()=>{
    // rock, paper, scissor
    const options=["rock","paper","scissor"];
    let idx= Math.floor(Math.random() * 3);
    return options[idx];

}


//Draw game
const drawGame=()=>{
    console.log("Game was a draw.");
    setTimeout(function() {
        msg.innerText="Game was a draw!";
        msg.style.backgroundColor="#081b31";
    }, 800);
    
}



//Show Result (scoreboard)
const showWinner=(userWin, userChoice, compChoice)=>{
    if(userWin==true) {
        console.log("User wins.");
        setTimeout(function() {
            msg.innerText=` You win! ${userChoice} beats ${compChoice}`;
            msg.style.backgroundColor="green";
            userScore++;
            userScorePara.innerText=userScore;
        }, 800);
    } 
    else{
        console.log("Computer Wins");
        setTimeout(function() {
            msg.innerText=` Computer win! ${compChoice} beats ${userChoice}`;
            msg.style.backgroundColor="rgb(150, 47, 47)";
            compScore++;
            compScorePara.innerText=compScore;
        }, 800);
    } 
    
}


// Decide if draw, win or loose
const playGame=(userChoice)=>{
    console.log(`user choice: ${userChoice} `);
    compChoice=genCompChoice();
    console.log(`comp choice is: ${compChoice}`);

    if(userChoice==compChoice){
        //Draw game
        drawGame();
    }
    else{
        let userWin=true;
        if(userChoice==="rock"){
            //scissor or paper
            userWin=compChoice==="paper" ? false : true;
        }
        else if(userChoice==="paper"){
            userWin=compChoice==="scissor" ? false : true;

        }
        else userWin=compChoice==="rock" ? false : true;
        
        // decide the game winner
        showWinner(userWin, userChoice, compChoice);
    }
};

// USER CHOICE and FLICKERING ANIMATION
choices.forEach((click) => {
    click.addEventListener("click", (event) => {

        //backgroud color of the clicked element
        if (lastClicked) {
            lastClicked.style.backgroundColor = ""; // Revert to original color
        }
        click.style.backgroundColor = "green";
        lastClicked = click; // Update the last clicked element


        // User Choice
        const userChoice = click.getAttribute("id");       
        playGame(userChoice); // Set compChoice before starting the animation

        var pictures = document.querySelectorAll('.picture');
        var index = 0;
        var compIdx;

        // Determine the index for compChoice
        if (compChoice === "paper") compIdx = 1;
        else if (compChoice === "scissor") compIdx = 2;
        else compIdx = 0; // Assuming "rock" or a default

        // flickering
        var interval = setInterval(function() {
            pictures.forEach(function(picture, i) {
                picture.style.display = (i === index) ? 'block' : 'none';
            });
            index = (index + 1) % pictures.length;
        }, 100); // Adjust flicker speed (in milliseconds)

        // to stop flickering
        setTimeout(function() {
            clearInterval(interval);

            // to Display the computer's choice
            pictures.forEach(function(picture, i) {
                picture.style.display = (i === compIdx) ? 'block' : 'none';
            })
        }, 700); // Stop flickering after 700 milliseconds
    });
});



    


