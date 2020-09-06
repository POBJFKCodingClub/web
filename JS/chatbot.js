let isOpen = false
let jokes = [`Why did the programmer quit his job? <br> Because he didn't get arrays.`,
`["hip","hip"]... hip, hip array!`, `<img style="width: 100%; height: auto;" src="https://hackernoon.com/hn-images/1*7eXoCoTbeFYtWqnmxLJX0g.jpeg">`,
`<b><em>Algorithm</b></em> (noun.) <br> Word used by programmers when they do not want to explain what they did`,
`My dad's a programmer. One day, he was going to work, and I said "while you're out, buy some milk". He never came back`,
`<img style="width: 100%; height: auto" src="https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programmers-Life-Programming-Jokes.jpg">`,
`<img style="width: 100%; height: auto" src="https://external-preview.redd.it/Mks30iTqjm7cHx3gmodNUHMdOQCNm6g3UEZ5UFXqt4Q.jpg?auto=webp&s=fbdf8743cc7cc5b8b786475cc14376c701ebd5f0";`]
// button to open Chatbot
$("#btn-chatbot").click(function(){
  if(isOpen == true){
    $(".chatbot-container").slideUp()
    isOpen = false
  }
  else{
    $(".chatbot-container").slideDown()
    resizeOutput();
    isOpen = true;
  }
})
// clickable questions for quick input
function addEventListenerClickList(){
  $(".clickable-questions").off()
  $(".clickable-questions").find("li").click(function(){
    $(".chatbot-input").val($(this).text());
    $(".chatbot-input").focus()
  })
}
addEventListenerClickList()
// close icon hides chatbot
$(".close-icon").click(function(){
  $(this).parent().parent().hide()
})
// accepting inputs
$(".chatbot-input").keydown(function(event){
  let inputVal = $(this).val()
  if(event.keyCode==13){
    createOutput(`<p class="user-input"><i class="fas fa-circle user-icon"></i> <em>User Says</em>: ${inputVal}</p>`)
    $(this).val("")
    createOutput(analyzeInput(inputVal))
  }
})
// creating an output
function createOutput(output){
  $(".chatbot-container-output").append(`
    <div class="chatbot-output">
      ${output}
    </div>
    `)
}
// analyzes the input and returns
function analyzeInput(value){
  let input = value.toLowerCase()
  let response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> I either don't understand what you said or don't have an answer for that.</p>`
  if(input.includes("when") && (input.includes("meet")|| input.includes("meeting"))){
    response = `<p class="bot-response">
    <i class="fas fa-circle bot-icon"></i>
    Meetings are Tuesdays, every other week! For more specific dates, check out our Google Classroom. The code is osfxo44</p>`
  }
  else if(input.includes("google classroom code")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> The code is osfxo44</p>`
  }
  else if(input.includes("join") && input.includes("why")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> Check out our intro slides <a target="_blank" href="https://docs.google.com/presentation/d/1fPcAPbpbCIKpb77MslpZzt8Rqq5w2H6B0SVnUxxluKg/edit?usp=sharing">here</a></p><iframe style="width: 100%; height: 200px;" src="https://docs.google.com/presentation/d/e/2PACX-1vRn8rNmVyS-a4X1Vjm8WbFwpvcRd4xwGh9SJ42dNBuJjcXc62kmr0O-kPJY52mofpB4xscjOGOCyyia/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`
  }
  else if(input.includes("why code")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> Three words: money, convenience, and fun. Come to coding club to see what we mean.</p>`
  }
  else if(input.includes("what will we do")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> <em>Only cool things</em>. And a lot of them. Our activities and projects change each year, but generally we do stuff with (1) Web Development, (2) Game Development, (3) Machine Learning, (4) Raspberry Pi, etc. Talk to anyone currently on <a target="_blank" href="board.html">board</a> to find out more!</p>`
  }
  else if(input.includes("leaderboard")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> Earn points when you show up or make projects. Points are used as part of consideration for board & selection for various events. Check out the leaderboard <a target="_blank" href="leaderboard.html">here</a></p>`
  }
  else if(input.includes("tell") && input.includes("joke")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> ${jokes[Math.floor(Math.random()*jokes.length)]}</p>`
  }
  else if(input.includes("game")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> Pick your poison: <ul class="clickable-questions"><li>Love Calculator</li><li>Cow Clicker</li><li>TikTok Simulator</li><li>Fight a Random RPG Enemy</li></ul></p>`
    setTimeout(function(){
      addEventListenerClickList()
    }, 500)
  }
  else if(input.includes("mission")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> To educate, have fun, and use coding for good.</p>`
  }
  else if(input.includes("cow clicker")){
    response = `<p style="text-align: center"><span class="cow-clicker-num">0</span>🥛</p><img onclick="cowClicker(this)" class="cow-clicker-img" src="Images/cow.png">`
  }
  else if(input.includes("love calculator")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> Awww. Well isn't that just adorable.</p>`
    startLove()
  }
  else if(input.includes("tiktok simulator")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> I bet you're tiktok famous irl</p>`
    startTiktok()
  }
  else if(input.includes("fight a random rpg enemy")){
    response = `<p class="bot-response"><i class="fas fa-circle bot-icon"></i> Sorry! Not available right now. Try something else.</p>`
  }
  return response;
}
// cowClicker Game
function cowClicker(obj){
  let numObj = $(obj).parent().find(".cow-clicker-num");
  c(numObj.html())
  let newNum = parseInt(numObj.html())+1;
  numObj.html(newNum)
}
// Love game
function startLove(){
  alert("Welcome to the Love Calculator! Find out if two people are a good match or not ❤️.");
  let personOne = prompt("Enter the name of the first person");
  let personTwo = prompt("Enter the name of the second person");
  let chance = Math.floor(Math.random()*101);
  if(chance <= 10){
    alert(`... I've detected a ${chance}% match between ${personOne} and ${personTwo}! That's just sad. I don't even think these two have enough chemistry to be enemies 🤢.`)
  }
  else if(chance <= 30){
     alert(`${chance}% match between ${personOne} and ${personTwo}! With a lot of effort you two might just be enemies 🥰.`)
  }
  else if(chance <= 50){
    alert(`${chance}% match between ${personOne} and ${personTwo}! This is like the acquitance zone. Boring. Next.`)
  }
  else if(chance <= 65){
    alert(`Do I smell a ${chance}% match? I think ${personOne} and ${personTwo} might just make good friends... and who knows, maybe something more 😏.`)
  }
  else if(chance <=80){
    alert(`Damn a ${chance}% match? It may be less than an B in school, but to hell with school. Love is in the air! ${personOne} and ${personTwo} would either be (or are) best friends or a decent couple. Maybe even both!`)
  }
  else if(chance <= 90){
    alert(`Holy moly ${chance}% match? ${personOne} and ${personTwo} need to get a room. Their chemistry's just explosive 😵`)
  }
  else{
    alert(`Oh my... a ${chance}% match between ${personOne} and ${personTwo}? Say your vows: Now ✨ kith ✨`)
  }
}
// tiktok Simulator
/* With User Input */
function Video(description, likes){
    this.description = description;
    this.likes = likes;
    this.display = function(){
        return "[" + this.description + "] " + this.likes + " ♥ ";
    }
}
function BikBok(username, followers, numVideos, numLikes) {
    this.username = username;
    this.followers = followers;
    this.numLikes = numLikes;
    this.numVideos = numVideos;
    this.videos = [];
    this.displayStats = function(){
        alert(this.username + "'s BikBok account:\n- " + this.followers + " Followers\n- " + this.numVideos + " Total Videos\n- " + this.numLikes + " Total Likes\n");
    }
    this.postVideo = function(description){
        this.numVideos += 1;
        if(this.followers > 150){
          newLikes = Math.floor(Math.random()*(this.followers/3)) + Math.floor(Math.random()*100);
        }
        else{
          newLikes = Math.floor(Math.random()*(this.followers/3)) + Math.floor(Math.random()*1000);
        }
        if(Math.random()*10 < (1 + this.followers/1000)){
          newLikes += Math.floor(Math.random()*10000)
        }
        if(Math.random()*10 < (1 + this.followers/10000)){
          Math.floor(Math.random()*100000)
        }
        if(Math.random()*100 < (2 + this.followers/100000)){
          Math.floor(Math.random()*1000000)
        }
        newFollowers = Math.floor(Math.random()*(this.followers/10)) + 1 + Math.round(newLikes/(Math.floor(Math.random()*175)+25));
        this.followers += newFollowers;
        this.numLikes += newLikes;
        alert("You posted a video about " + description);
        alert("Video received " + newLikes +" likes!");
        alert("You gained " + newFollowers + " new followers!");
        this.videos.push(new Video(description, newLikes));
    }
}
function startTiktok(){
  alert("Welcome to Tiktok Simulator!")
  var myAccount = new BikBok(prompt("Enter a username"), 0, 0, 0);
  myAccount.displayStats();
  var playing = true;
  while(playing){
      var input = prompt("What would you like to do? Type 'video' to post a video, type 'info' to get account stats, type 'feed' to see your past videos, and type 'stop' to stop playing")
      switch(input){
          case "video":
              myAccount.postVideo(prompt("What is your video about?"));
              break;
          case "stop":
              alert("You have stopped playing.");
              myAccount.displayStats();
              playing = false;
              break;
          case "info":
              myAccount.displayStats();
              break;
          case "feed":
              var output = "[Video Description] Likes\n";
              for(var i = 0; i < myAccount.videos.length; i++){
                  output += myAccount.videos[i].display() + "\n";
              }
              alert(output);
              break;
          default:
              alert("Sorry, I did not understand that input. Try again.");
              break;
      }

  }
}


// resize output
function resizeOutput(){
  setTimeout(function(){
    let barSize = $(".chatbot-bar").css("height").slice(0,-2);
    let inputSize = $(".chatbot-input").css("height").slice(0,-2);
    let chatBotSize = $(".chatbot-container").css("height").slice(0,-2);
    let newHeight = parseInt(chatBotSize) - parseInt(barSize) - parseInt(inputSize);
    $(".chatbot-container-output").css("height",newHeight)
  },1000)

}
// debugging helper function
function c(log="check"){
  console.log(log)
}
