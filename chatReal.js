const firebaseConfig = {
    apiKey: "AIzaSyBAIXbtawFT5oCmiD1B0pS4Mbrks_fgIvg",
    authDomain: "chat-1523f.firebaseapp.com",
    databaseURL: "https://chat-1523f-default-rtdb.firebaseio.com",
    projectId: "chat-1523f",
    storageBucket: "chat-1523f.appspot.com",
    messagingSenderId: "611118921366",
    appId: "1:611118921366:web:1309a609dc22179e5c74b7"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  UserName= localStorage.getItem("username")
  roomName= localStorage.getItem("RoomName")
document.getElementById("roomName").innerHTML= roomName

function logout() {
  localStorage.removeItem("username")
  localStorage.removeItem("RoomName")
  window.location = "login.html"
}

function sound(){
document.getElementById("sound").play()
}

function send(){
  message= document.getElementById("message").value
  console.log(message)
  if(message.length !== 0 && !message.match(/^[ \s]/)){
firebase.database().ref(roomName).push({
  Name: UserName,
  Message: message,
  like: 0
})
document.getElementById("message").value= ""
}
}
function displayMessage(){
  firebase.database().ref("/"+roomName).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; childData = childSnapshot.val(); 
      
      if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         
         console.log(firebase_message_id)
         console.log(message_data)
         name=message_data['Name']
         message=message_data['Message']
         like=message_data['like']

         messagename= "<h4 id= 'usernamebold'>"+name+"<img src='tick.png' class='tick'></h4>"
         messagecontent= "<h4 class= 'messageContent'>"+message+"</h4>"
         messageLike= "<button class='btn btn-warning' id= "+firebase_message_id+" value= "+like+" onclick= 'updateLike(this.id)'>"
         thumbsUp = "<span class= 'glyphicon glyphicon-thumbs-up'> </span>"+like+"</button> &nbsp"
         messageDelete= "<button class='btn btn-danger' id= "+firebase_message_id+" onclick= 'updateDelete(this.id)'>"
         trash = "<span class= 'glyphicon glyphicon-trash'></span> </button> <hr> " 

         row= messagename+messagecontent+messageLike+thumbsUp+messageDelete+trash
         document.getElementById("output").innerHTML+=row
      }});  
    });
  
}
displayMessage()

function updateLike(messageid){
  buttonID=messageid
  likes=document.getElementById(buttonID).value
  updateLikes=Number(likes)+1
  firebase.database().ref(roomName).child(messageid).update({
    like: updateLikes
  })

}

function updateDelete(deleteid){
  firebase.database().ref(roomName).child(deleteid).remove()
}