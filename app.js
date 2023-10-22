// input tag
var inputText = document.getElementById("input");

// Add button tag
var subBtn = document.getElementById("button");

// Todo List
var todoListTag = document.getElementById("todolist");

//creating array to store all todo elements, initially empty

    // Method-1
        //  if(localStorage.getItem("todoArr")!=null){
        //      var todoArr = JSON.parse(localStorage.getItem("todoArr"))
        //  }else{
        //      todoArr=[]
        // }

    //Method-2  (in one line)
var todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];

display();
// var todoArr = [];

// When Add button is Clicked
subBtn.addEventListener("click", addItemToArray);

//If input is on FOCUS and Enter key is clicked addItemToArray should be called to Add element to array
inputText.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addItemToArray();
  }
});

//event.target.value==inputText.value;
function addItemToArray() {

  // push the value to array if its not an empty string
  if (inputText.value != "") {
    todoArr.push(inputText.value);
}
localStorage.setItem("todoArr", JSON.stringify(todoArr));

  // reset the value to the empty string ""
  inputText.value = "";
  display();
}

function display() {

// To clear out old tasks, every time we add one item to the array
  todoListTag.innerHTML = "";

// Map through array and display
  todoArr.map((curr, i) => {
    // structure of li tag
    var listItem = `<li id="item${i}">
    <div>${curr}</div>
    <div>
      <span onclick="deleteItem(${i})">&times;</span>
      <span>|</span>
      <span onclick="editItem(${i})">Edit</span>
    </div>
    </li>`;

    // insert it inside <ul id="todoList">
    todoListTag.innerHTML += listItem;
  });
  localStorage.setItem("todoArr", JSON.stringify(todoArr));

}


function deleteItem(index) {

  // delete the element[index] from todoList
  todoArr.splice(index, 1);
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
  display();
}

function editItem(index) {
  // get new value from user
  var newValue = prompt("Please Edit");

  // Insert the value to array at that index
  todoArr.splice(index, 1, newValue);
  localStorage.setItem("todoArr", JSON.stringify(todoArr));

  display();
}

// reset the todo list
var resetbtn = document.getElementById("reset");
resetbtn.onclick = () => {
  todoArr = [];
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
  display();
};

// edit item div
function editItem(i){
    // select the single list item you want to edit
    var listItem = document.getElementById("item"+i);
    // the previous text
    var text = todoArr[i];
    // Replace the original list with editing html
    listItem.innerHTML = `<input id="edit${i}" style=" width: 300px;
    padding: 3px; border:none "type=text" value="${text}" placeholder="Enter Here" />
    <button id="editSubmit${i}"
    style="
    padding: 5px 30px;
    border-bottom: 5px solid #7055d3;
    font-size: medium" >Update</button>`;

    // Get the editing Html above input
    var editInput = document.getElementById("edit" + i);

    // Get the editing Html above submitbutton
    var editSubmit = document.getElementById("editSubmit"+i);

    // Focus on input
    editInput.focus();

    // on enter
    editInput.addEventListener("keypress", (event)=>{
        if(event.key === "Enter"){
            todoArr[i] = editInput.value;
            localStorage.setItem("todolist", JSON.stringify(todoArr));
            display();
        }
    });

    // on submit button click
    editSubmit.onclick =()=>{
        todoArr[i] = editInput.value;
        localStorage.setItem("todolist", JSON.stringify(todoArr));
        display();
    };

    // on unfocusing or blur
    editInput.onblur = function(){
        todoArr[i] = editInput.value;
        localStorage.setItem("todolist", JSON.stringify(todoArr));
        display();
    }
}

