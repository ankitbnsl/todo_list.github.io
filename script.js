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


input_text.addEventListener('keydown', function (event) {
    //  console.log(event.keyCode);
    if (event.keyCode == 13) {

        console.log(event.target.value);

        const text = event.target.value;
        if (text == "") {
            alert('text can not be empty');

        } else {
            const task = { title: text, id: Date.now().toString(), complete: false }
            tasks.push(task);
            event.target.value="";
            addtolist(tasks);
        }

    }
});

function addtolist(tasks) {
    console.log("adding");
    list.innerHTML = "";
    for (t of tasks) {
        //    console.log("task",t);
        const li = document.createElement('li');
        li.innerHTML = `<input type="radio" name="" id=${t.id} ${t.complete ? 'checked' : ''} class="radio">  ${t.title} 
             <img src="image.webp" alt="" id=${t.id}  class="deleteitem"> `;
        list.append(li);
        if(t.complete){ li.style.textDecoration = "line-through";  }
    }
    const count = tasks.length;
    total_tasks.innerHTML = count;


}


document.addEventListener('click', handleclickListeners);

function handleclickListeners(e) {
    const target = e.target;
    //    console.log(target);

    if (target.className === "radio") {
        console.log("radio", target.id);
        // toggleTask(target.id);
        hello(target.id);
        return;
    }
    if (target.className === "deleteitem") {
        deletetask(target.id);
        return;
    }

    if (target.id === "complete-all") {
        console.log("checkbox");
        changecolor(target);
        complete_alltasks(tasks);
        return;
    }
    if (target.id === "clear") {
        console.log("clear",p);  
        changecolor(target);  
        clear_tasks();
        return;
    }
    if (target.id === "all") {
        console.log("all");  
        changecolor(target);
        all_tasks(tasks);
        return;
    }
    if (target.id === "Completed") {
        console.log("completed"); 
        changecolor(target); 
        completed_tasks(tasks);
        return;
    }
    if (target.id === "uncompleted") {
        console.log("uncompleted");  
        changecolor(target);
        uncompleted_tasks(tasks);
        return;
    }



}

function changecolor(target){
    for(i of p){
        i.style.color="gray";
    }
    target.style.color="white";
}

function hello(taskid){
    const togtask=tasks.filter(function(task){
        return task.id===taskid
    });
    console.log(togtask);
     togtask[0].complete= !togtask[0].complete;
    addtolist(tasks);
}


function complete_alltasks(tasks) {
    for (t of tasks) {
        t.complete = true;
    }

    addtolist(tasks);
}

function clear_tasks() {
    console.log(tasks);
    tasks = tasks.filter(function(task){
        return task.complete !=true ;
    });
    console.log(tasks);
    
    addtolist(tasks);
} 

function all_tasks(tasks) {
    addtolist(tasks);
}

function uncompleted_tasks(tasks) {
    const only_uncompletd = tasks.filter(function (task) {
        return task.complete == false;
    });

    addtolist(only_uncompletd);
}

function completed_tasks(tasks) {
    const only_completd = tasks.filter(function (task) {
        return task.complete === true;
    });

    addtolist(only_completd);
}

function deletetask(taskid) {
    console.log("Delete item :", taskid);

    tasks = tasks.filter(function (task) {
        return task.id != taskid
    });

    addtolist(tasks);

}


