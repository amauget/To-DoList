const{DOMObjects, elementText} = require('./createDOM')
/*  DOMObjects(elementType,name, parent) */
  /* elementText(name, text) */
const{InputComponents, projectForm} =  require('./projectForm');

function populateProject(projectInfo, projectContainer){
  if(typeof(projectInfo)=== 'string'){ /* condition when side bar list is clicked. */
    projectInfo = retreiveProject(projectInfo);
  }  
  projectLayout(projectInfo, projectContainer); /* retreiving info from form submission */

}


function retreiveProject(projectName){
  let projectObj = JSON.parse(localStorage.getItem(projectName));
  return projectObj;
}

function projectLayout(projectObj, projectContainer){ 
 
  projectContainer.innerHTML = ''; /* reset content every execution */

  //Header Container and Items
  let projectDetails = DOMObjects('div', 'projectDetails', projectContainer);   /* TURN ALL OF THIS INTO A CLASS AND REFERENCE IN EDIT PROJECT FUNCTION */

  let projectTitle = DOMObjects('h2', 'projectTitle', projectDetails);
  elementText(projectTitle, projectObj.name);


  let dueDate = DOMObjects('h4', 'projectDue', projectDetails);
  elementText(dueDate, `Due: ${projectObj.due}`);

  let priority = DOMObjects('h4', 'priorityTitle', projectDetails);

  let priorityValue = projectObj.priority;
  if(priorityValue === undefined){
    priorityValue = 'Unspecified'
  }
  
  elementText(priority, `Priority: ${priorityValue}`);
  priority.style.background = priorityBackground(priorityValue);

  let editBtn = DOMObjects('button', 'editProject', projectDetails);
  elementText(editBtn, 'Edit Project Details');

  let addTask = DOMObjects('button', 'addTask', projectDetails);
  elementText(addTask, 'Add a Task');

  projectButtons(editBtn, addTask, projectObj);
  
}

function projectButtons(editBtn, addTask){
  editBtn.addEventListener('click',()=> {
    let projectName = document.querySelector('.projectTitle').textContent;
    let projectObj = retreiveProject(projectName);
    
    editProject(projectObj);
  })
  addTask.addEventListener('click',() =>{
    console.log('add task')
    // toDoForm(); 
  })
  //ADD events for edit, delete, add to-do, etc
}
function editProject(projectObj){
  let prjDetails = document.querySelector('.projectDetails');
  /* Guarantee there is a library for this.. */
  let prjDetailsForm = prjDetails.cloneNode(true);
  console.log(prjDetails) 
 
}

function appendToDo(){
  let projectContainer = document.querySelector('.projectContainer');
  let toDoContainer = DOMObjects('div','toDoContainer', projectContainer);
  let doneContainer = DOMObjects('div', 'doneContainer', projectContainer);

}

 
function priorityBackground(priority){
  let background = '';
  if(priority === 'Low'){
    background = 'green';
  }
  else if(priority === 'Medium'){
    background = 'yellow';
  }
  else if (priority === 'High'){
    background = 'red';
  }
  else{
    background = 'white'
  }
  return background;
}

module.exports = {
  populateProject
}