let savar = get("savar"),
  m = get("messageBox");
savar.onclick = () =>{
  fetch(`cgi-bin/chat.py?name=${messageBox.value}`).then(i=>{
    i.text().then(j=>alert(j))
  })
}
