const{DOMObjects, elementText} = require('./createDOM')/*  DOMObjects(elementType,name, parent)  elementText(name, text) */
const{InputComponents, AlertWindow, resetInputs, createTask} =  require('./projectForm');
const{parseData,storeItems, removeProject, projectList, retrieveProject} = require('./dataStorage');


function populateProject(projectInfo){
  
  let projectContainer = document.querySelector('.projectContainer');
  
  if(typeof(projectInfo)=== 'string'){ /* condition when side bar list is clicked. */
    projectInfo = retrieveProject(projectInfo);

  }  

  headerLayout(projectInfo, projectContainer); // populates project header. Defined in index.js for return val.
  
  if(projectInfo.taskObj.length !== 0){
    taskList(projectInfo);
  }
  
  
}

function headerLayout(projectObj, projectContainer){ 
 
  projectContainer.innerHTML = ''; /* reset content every execution */

  //Header Container and Items
  let headerContainer = DOMObjects('div', 'headerContainer', projectContainer); 

  let projectTitle = DOMObjects('h2', 'projectTitle', headerContainer);
  elementText(projectTitle, projectObj.name);

  let deleteProject = DOMObjects('button', 'deleteProject', headerContainer);
  elementText(deleteProject, 'Delete Project');

  let dueDate = DOMObjects('h4', 'projectDue', headerContainer);
  elementText(dueDate, `Due: ${projectObj.due}`);

  let priority = DOMObjects('h4', 'priorityTitle', headerContainer);

  let priorityValue = projectObj.priority;

  if(priorityValue === undefined){
    priorityValue = 'Unspecified'
  }
  
  elementText(priority, `Priority: ${priorityValue}`);
  priority.style.background = priorityBackground(priorityValue);

  let editBtn = DOMObjects('button', 'editProject', headerContainer);
  elementText(editBtn, 'Edit Project Details');

  let addTask = DOMObjects('button', 'addTask', headerContainer);
  elementText(addTask, 'Add a Task');

  let headerObject = {
    container: headerContainer,
    title: projectTitle, 
    due: dueDate,
    priority: priority,
    priorityValue: priorityValue,
    deleteProject: deleteProject,
    edit: editBtn, 
    add: addTask }
  
   /* returns headerObject to be referenced in editHeader() */

  return headerObject;
  
}

function editHeader(headerObject){
  
  let headerContainer = headerObject.container;
  headerContainer.innerHTML = '';

  let titleValue = (headerObject.title).textContent;
  let titleClass = (headerObject.title).className;

  let inputTitle = DOMObjects('input', titleClass, headerContainer);
  inputTitle.type = 'text'; inputTitle.value = titleValue;
  
  let dueValue = new Date((headerObject.due).textContent).toISOString().substring(0, 10); /* converts to browser format to populate date input. */
  let dueClass = (headerObject.due).className;

  let dateTitle = DOMObjects('h4', dueClass, headerContainer);
  elementText(dateTitle, 'Date: ')

  let inputDate = DOMObjects('input', 'editDateInput', dateTitle);
  inputDate.type = 'date'; inputDate.value = dueValue;

  let priorityValue = headerObject.priorityValue;
  let priorityStyle = (headerObject.priority).style.background;

  let priorityContainer = DOMObjects('div', 'priorityButtons', headerContainer); /* need static button layout */

    let low = DOMObjects('button', 'lowButton', priorityContainer);
    elementText(low, 'Low');
    low.style.border = 'green solid 1px';

    let med = DOMObjects('button', 'medButton', priorityContainer);
    elementText(med, 'Medium');
    med.style.border = 'yellow solid 1px';

    let high = DOMObjects('button', 'highButton', priorityContainer);
    elementText(high, 'High');
    high.style.border = 'red solid 1px';
    
    let priorityArray = [low, med, high];

    for(i = 0; i < 3; i++){
      if(priorityArray[i].textContent  === priorityValue){
        priorityArray[i].style.background = priorityStyle;
      }
    }

  let editClass = (headerObject.edit).className;

  let submitBtn = DOMObjects('button', 'editHeaderSubmit', headerContainer);
  submitBtn.className = editClass;
  elementText(submitBtn, 'Submit Changes');

  let addClass = (headerObject.add).className;

  let cancelBtn = DOMObjects('button','editHeaderCancel', headerContainer);
  cancelBtn.className = addClass;
  elementText(cancelBtn, 'Discard Changes');

  let editPrompt = DOMObjects('h3','editPrompt', headerContainer)
  elementText(editPrompt, 'Edit Project');

  let editBtnData = {
    low: low,
    med:med,
    high:high,
    submit: submitBtn,
    cancel: cancelBtn,
    priorityValue: priorityValue, 
    titleValue: titleValue,
    dueValue: dueValue,
  }
  return editBtnData
 
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

function taskList(projectInfo){ 
  /* 
  Won't append to project container
  Need to separate Container so that it is always present despite a lack of tasks.
  */
 
  let taskObj = projectInfo.taskObj;
  let projectContainer = document.querySelector('.projectContainer')

  let taskContainer = DOMObjects('div', 'taskContainer', projectContainer);

  let taskTitle = DOMObjects('h3', 'taskTitle', taskContainer);
  elementText(taskTitle, 'Project Tasks')
  
  let ul = DOMObjects('ul', 'taskList', taskContainer)
 

  for(let i = 0; i < taskObj.length; i++){
    
    let li = DOMObjects('li', 'taskListItem', ul);

    let taskTitle = DOMObjects('p', 'taskTitle', li);
    elementText(taskTitle, taskObj[i].taskName);

    let taskDue = DOMObjects('p', 'taskDue', li);
    elementText(taskDue, `By: ${taskObj[i].dueDate}`);

    let comment = DOMObjects('p', 'taskComment', li);
    elementText(comment, taskObj[i].comment);
    
    let deleteTask = DOMObjects('img', 'deleteTask', li);
    deleteTask.src = './externalContent/trash.svg';

    let editTask = DOMObjects('img', 'editTask', li);
    editTask.src = './externalContent/gear.svg';


  }


}
/*   projectList(ul, dataArray) */
    
    
  
  
 

function populateTaskList(){
  

}

module.exports = {
  populateProject,
  headerLayout,
  editHeader,
  priorityBackground
}