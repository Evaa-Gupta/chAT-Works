function addUser(){
    UserName= document.getElementById("username").value
    if(UserName.length !== 0 && !UserName.match(/^[ \s]/)){
        localStorage.setItem("username", UserName)
    window.location="mainPage.html" 
    }
    else{
    document.getElementById("username").setAttribute("placeholder","This field is empty!")
    }
}