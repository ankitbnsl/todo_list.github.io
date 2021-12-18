// initialize all variables from their classes or ids or tag names present in html file
var complete_all = document.getElementById('complete-all');
var clear = document.getElementById('clear');
var total_tasks = document.getElementById('total-tasks');
var all = document.getElementById('all');
var uncompleted = document.getElementById('uncompleted');
var completed = document.getElementById('Completed');
var input_text = document.getElementById('input_text');
var list = document.getElementById('list');
let tasks = [];
var p=document.getElementsByTagName('p');

// Add event listener on pressing any key in input field
// if keycode is 13 i.e for enter , add the task if task is not empty
input_text.addEventListener('keydown', function (event) {
    //  console.log(event.keyCode);
    if (event.keyCode == 13) {

        console.log(event.target.value);

        const text = event.target.value;

        // if text get from input field is empty , show an alert that text cnnot be empty
        if (text == "") {
            alert('text can not be empty');

        } else {   // if text is correct i.e not empty initialize a task with 3 aruments -title, id, complted and add it into task array
            const task = { title: text, id: Date.now().toString(), complete: false }
            tasks.push(task);
            event.target.value="";
            // on adding task add that task in list , for that call addtolist function
            addtolist(tasks);
        }

    }
});

// it take tasks array and add that tasks in list
function addtolist(tasks) {
    console.log("adding");
    //initialize list empty ist
    list.innerHTML = "";
    // for every task add one item of list
    for (t of tasks) {
        //    console.log("task",t);
        const li = document.createElement('li');
        li.innerHTML = `<input type="radio" name="" id=${t.id} ${t.complete ? 'checked' : ''} class="radio">  ${t.title} 
             <img src="image.webp" alt="" id=${t.id}  class="deleteitem"> `;
        list.append(li);
        if(t.complete){ li.style.textDecoration = "line-through";  }
    }

    // get total no of tasks and set its value in required field
    const count = tasks.length;
    total_tasks.innerHTML = count;


}

/////////////////////////////////////////////////////////

// click event listener 
// for every click call function hndleclicklisteners
document.addEventListener('click', handleclickListeners);


function handleclickListeners(e) {
    
    // get the type of element on which click is happen
    const target = e.target;
    
    // if radio item is pressed then call function toggle_radio with target id passed as argument
    if (target.className === "radio") {
        console.log("radio", target.id);
        ;
        toggle_radio(target.id);
        return;
    }

    // if target clicked is on deleteitem call deletetask function
    if (target.className === "deleteitem") {
        deletetask(target.id);
        return;
    }

    // if target clicked has id complete-all then 2 two things 1st change its button color so call changecolor function 
    // and 2nd call comlete_alltasks function to check all task radio buttons
    if (target.id === "complete-all") {
        console.log("checkbox");
        changecolor(target); all.style.color='white';
        complete_alltasks(tasks);
        return;
    }

      // if target clicked has id clear then 2 two things 1st change its button color so call changecolor function 
    // and 2nd call clear_alltasks function to clear all task which are checked
    if (target.id === "clear") {
        console.log("clear",p);  
        changecolor(target);  all.style.color='white';
        clear_tasks();
        return;
    }

      // if target clicked has id all then 2 two things 1st change its button color so call changecolor function 
    // and 2nd call all_tasks function to show all the tasks
    if (target.id === "all") {
        console.log("all");  
        changecolor(target);
        all_tasks(tasks);
        return;
    }

    // if target clicked has Completed all then 2 two things 1st change its button color so call changecolor function 
    // and 2nd call completed_tasks function to show all the completed tasks only 
    if (target.id === "Completed") {
        console.log("completed"); 
        changecolor(target); 
        completed_tasks(tasks);
        return;
    }

     // if target clicked has uncompleted all then 2 two things 1st change its button color so call changecolor function 
    // and 2nd call uncompleted_tasks function to show all the uncompleted tasks only 
    if (target.id === "uncompleted") {
        console.log("uncompleted");  
        changecolor(target);
        uncompleted_tasks(tasks);
        return;
    }



}
/////////////////////////////////////////////////////////////////////
//handle click listner complted

// change color function which set color to gray for all other button and set white for clicked button
function changecolor(target){
    for(i of p){
        i.style.color="gray";
    }
    target.style.color="white";
}

// toggle_radio which toggle the task , on clicking if task is true(checked) then become false(unchecked) and vice versa
function toggle_radio(taskid){
    const togtask=tasks.filter(function(task){
        return task.id===taskid
    });
    console.log(togtask);
     togtask[0].complete= !togtask[0].complete;
   // on making changes in tasks array , add list item again according to changes
    addtolist(tasks);
}


// it complte all tasks , check all tasks from unchecked  and add list items again after changes
function complete_alltasks(tasks) {
    for (t of tasks) {
        t.complete = true;
    }

    addtolist(tasks);
}

// it clear all the tasks which are checked already
function clear_tasks() {
    
    // apply filter to the tasks which return the task which are not checked
    tasks = tasks.filter(function(task){
        return task.complete !=true ;
    });
    
    // add the tasks which are not tasks to the list
    addtolist(tasks);
} 

// show all the tasks
function all_tasks(tasks) {
    addtolist(tasks);
}

// it shows tasks which are uncompleted i.e unchecked(false)
function uncompleted_tasks(tasks) {
    const only_uncompletd = tasks.filter(function (task) {
        return task.complete === false;
    });
    // after getting result from filter add tasks to list
    addtolist(only_uncompletd);
}
// it shows tasks which are completed i.e checked(true)
function completed_tasks(tasks) {
    const only_completd = tasks.filter(function (task) {
        return task.complete === true;
    });

 // after getting result from filter add tasks to list
    addtolist(only_completd);
}

// it deletes the task on clicking delete icon , it gets taskid of the list item
function deletetask(taskid) {
    console.log("Delete item :", taskid);
  
    // apply filter to remove that taskid item from list
    tasks = tasks.filter(function (task) {
        return task.id != taskid
    });

    // after getting result from filter add tasks to list
    addtolist(tasks);

}


