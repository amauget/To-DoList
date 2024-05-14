function createProject(bodyContainer){
 initLocalStorage()
 
}

function initLocalStorage(projectName, dueDate, priorityRating){
  let projectObj = {
    name: projectName,
    due: dueDate,
    priority: priorityRating,
  } 
  //stringify before commiting to local storage...
}
function processForm(name, dueDate, priority){
  name = name.value;
  dueDate = dueDate.value;
  priority = priority.value;
  initLocalStorage(name,dueDate,priority)

}

function toDo(){

}
function done(){

}
export default processForm;

 /* 
  Initiate popup:
    project name:
    dueDate:
    "add to-do item":
    
      To do Item:
        to-do name:
        due date:
        priority:
        done toggle (default "not done"):

    "create project" button


  */