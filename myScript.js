//---------------------------VARIABLES-----------------------------

var addButton = document.getElementById("add");
var taskInput = document.getElementById("new-task");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var timedTasksHolder = document.getElementById("timed-tasks");
var coins = document.getElementById("numCoins");
var added = 0;
var start = true;

//---------------------------FUNCTIONS-----------------------------

function moodUpdate() {
  var elem = document.getElementById("myBar");
  var width = 50;
  var id = setInterval(frame, 100);
  function frame() {
    if (width <= 0) {
      width = .1;
    }
    else if (width <= 25) {
      changeSad();
      elem.style.backgroundColor = "#ff6961";
    }
    else if (width <= 75) {
      changeNeutral();
      elem.style.backgroundColor = "#fdfd96";
    }
    else if (width <= 100){
      changeHappy();
      elem.style.backgroundColor = "#77dd77";
    }
    else if (width > 100) {
      width = 100.01;
    }
    width += added;
    if (width > 100) {
      width = 100;
    }
    added = 0;
    width -= 0.01;
    elem.style.width = width + '%';
    document.getElementById("label").innerHTML = 'mood: ' + Math.round(width) + '%';
    }
  }

var createNewListElement = function(taskString) {
  //Create list item
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input");
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input");
  //button .edit
  var editButton = document.createElement("button");
  //button .delete
  var deleteButton = document.createElement("button");
  // add to timer task
  var timeButton = document.createElement("button");
  // each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  label.innerHTML = taskString;
  timeButton.innerHTML = "Time";
  timeButton.className = "time";


  // and each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(timeButton);

  return listItem;
}

var addTask = function() {
  if (taskInput.value) {
    //Create new list item with text from #new-task
    var listItem = createNewListElement(taskInput.value);
    //append list item to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    // CHECKBOX
    bindTaskEvents(listItem, deleteTaskHappy);
    taskInput.value = "";
  }
  if (start) {
    moodUpdate();
    start = false;
  }
}

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// mood++
var deleteTaskHappy = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  added = 50;
  coins.innerHTML++;
}

//mood--
var deleteTaskSad = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  added -= 10;
}

var addTimerTask = function() {
  var listItem = this.parentNode;
  console.log(listItem);
  //var ul = listItem.parentNode;
  //console.log(ul);
  timedTasksHolder.appendChild(listItem);
  console.log(timedTasksHolder);
  //ul.removeChild(listItem);
  setTimer();
}

var editTask = function() {

  var editButton = this;
  var listItem = this.parentNode;

  var label = listItem.querySelector("label");
  var editInput = listItem.querySelector("input[type=text]");
  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};

var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
  //console.log("Binding list item events");
  //select taskListItem's children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  var timeButton = taskListItem.querySelector("button.time");

  //bind editTask to edit button

  editButton.addEventListener("click", editTask);
  //bind deleteTask to deleted button
  // DELETE BUTTON
  deleteButton.addEventListener("click", deleteTaskSad);
  //TIME BUTTON
  timeButton.addEventListener("click", addTimerTask);
  //bind checkboxEventHandler to checkbox
  checkbox.onchange = checkboxEventHandler;
}

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to li item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], deleteTaskHappy);
}

addButton.addEventListener("click", addTask);

function displayTask() {
  var task = document.getElementById("task").value;
  var displayTask = document.getElementById('displayTask');
  displayTask.innerHTML = task;
}

function changeHappy() {
  var pic = document.getElementById('pic');
  pic.src = "happy.png";
  pic.alt = "happy";
}

function changeSad() {
  var pic = document.getElementById('pic');
  pic.src = "sad.png";
  pic.alt = "sad";
}

function changeNeutral() {
  var pic = document.getElementById('pic');
  pic.src = "neutral.png";
  pic.alt = "neutral";
}


function setTimer() {
    var hour = prompt("Type in number of hours:", "");
    var min = prompt("Type in number of minutes:", "");
    var time = parseInt(hour*60) + parseInt(min);
    initializeClock('clockdiv', time);
  }

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, time) {
  var timeInMinutes = time;
  var currentTime = Date.parse(new Date());
  var endtime = new Date(currentTime + timeInMinutes*60*1000);
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2) + " : ";
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2) + " : ";
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      hoursSpan.innerHTML = ('00').slice(-2) + " : ";
      minutesSpan.innerHTML = ('00').slice(-2) + " : ";
      secondsSpan.innerHTML = ('00').slice(-2);
      var audio = new Audio('buzzer_1.wav');
      function sound()
      {
        audio.play();
      }
      sound();
      var ans = alert("Time is up!");
    }

    document.getElementById('reset').onclick = function () {
      clearInterval(timeinterval);
      hoursSpan.innerHTML = ('00').slice(-2) + " : ";
      minutesSpan.innerHTML = ('00').slice(-2) + " : ";
      secondsSpan.innerHTML = ('00').slice(-2);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
