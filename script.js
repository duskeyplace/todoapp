
  // Import the functions you need from the SDKs you need
 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCovrImbvU9tDhjqsdjYH8rtVRf4SMLEa0",
    authDomain: "todoapp-1078a.firebaseapp.com",
    projectId: "todoapp-1078a",
    databaseURL: "https://todoapp-1078a-default-rtdb.firebaseio.com",
    storageBucket: "todoapp-1078a.appspot.com",
    messagingSenderId: "178833914535",
    appId: "1:178833914535:web:97d8c46bf5746f9620b982"
  };

  // Initialize Firebase



// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var list = document.getElementById("list");

firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    var liElement = document.createElement("li");

    var liText = document.createTextNode(data.val().todoVal);

    liElement.appendChild(liText);

    list.appendChild(liElement);

    var EditBtnELement = document.createElement("button");

    var EditBtnText = document.createTextNode("Edit");

    EditBtnELement.appendChild(EditBtnText);

    var DeleteBtnELement = document.createElement("button");

    var DeleteBtnText = document.createTextNode("Delete");

    DeleteBtnELement.appendChild(DeleteBtnText);

    liElement.appendChild(EditBtnELement);

    liElement.appendChild(DeleteBtnELement);

    EditBtnELement.setAttribute("class", "Editbtn");
    DeleteBtnELement.style.backgroundColor = "lightcoral";

    DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");

    DeleteBtnELement.setAttribute("id", data.val().key);

    EditBtnELement.setAttribute("onclick", "EditItem(this)");

    EditBtnELement.setAttribute("id", data.val().key);
  });

function addTodo() {
  var input = document.getElementById("todoInput");

  var id = Date.now().toString(25);

  var todoObj = {
    todoVal: input.value,
    key: id,
  };

  firebase
    .database()
    .ref("todos/" + id)
    .set(todoObj);
    input.value="";
}

function deleteAll() {
  firebase.database().ref("todos").remove();
  list.innerHTML = "";
}

function deleteItem(e) {
  firebase.database().ref(`todos/${e.id}`).remove();
  e.parentNode.remove();
}

function EditItem(e) {
  var updateValue = prompt(
    "Enter updated value",
    e.parentNode.firstChild.nodeValue
  );

  firebase.database().ref(`todos/${e.id}`).set({
    key: e.id,
    todoVal: updateValue,
  });

  e.parentNode.firstChild.nodeValue = updateValue;
}
