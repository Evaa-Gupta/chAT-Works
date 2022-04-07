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

UserName = localStorage.getItem("username")
document.getElementById("welcome").innerHTML = "Hi " + UserName + "! Welcome...Start Chatting now! 😄"

function logout() {
  localStorage.removeItem("username")
  localStorage.removeItem("RoomName")
  window.location = "login.html"
}

function addRoom(){
  roomName=document.getElementById("groupname").value;
  firebase.database().ref("/").child(roomName).update({
    purpose:"addingRoomName"
  })
 localStorage.setItem("RoomName", roomName)
 window.location= "chatReal.html"
 document.getElementById("groupname").value=""
}

function displayRoomName(){
  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) { 
       childKey  = childSnapshot.key;
   roomNames=childKey
   row="<div id="+roomNames+" class='room_name' onclick='redirectRoom(this.id)'>"+roomNames+"</div><hr>"
   document.getElementById("output").innerHTML += row
    })
  })
}
displayRoomName()

function redirectRoom(name){
  localStorage.setItem("RoomName",name)
 
  window.location="chatReal.html"
}