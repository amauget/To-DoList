const{resetInputs, AlertWindow} = require('./projectForm.js');
const{findStorageIndex, requiredInputs} = require('./verify.js');
const{populateProject} = require('./createProject.js');
const{parseData,taskParseData,storeItems, removeProject, projectList, retrieveProject, deleteTask} = require('./dataStorage');
const{DOMObjects, elementText} = require('./createDOM.js')

function formSubmit(hiddenContainer){
  // listEvents();
  let nameInput = document.querySelector('.nameInput');
  let dateInput = document.querySelector('.dueDateInput');

  let priorityRadioBtns = document.querySelectorAll('input[type="radio"]');

  let priorityRating = undefined;

  priorityRadioBtns.forEach(item => {
    if(item.checked){
      return priorityRating = item.className;
    }
  })
  return formVerification(nameInput, dateInput, priorityRating)
}

function formVerification(nameInput, dateInput, priorityRating){
  let required = requiredInputs(nameInput, dateInput); /* verifies form inputs are filled out */
  let storageLocation = findStorageIndex(nameInput.value); /* checks if name input already has an index position in storage*/

  if(required === true && storageLocation === undefined){ 
    let projectInfo = parseData(nameInput, dateInput, priorityRating);  /* converts form inputs into object */
    
    populateProject(projectInfo);

    storeItems(projectInfo); 
    
    projectList()/* appends to sidebar */
    
    resetInputs(); 
    
    return true;
  }

  else if(required === true && storageLocation !== undefined){
    let nonEntry = new AlertWindow(`${nameInput.value} is already a project name. Try again.`)
    nonEntry.okayAlert();
    nameInput.style.border = '1px solid red';
    nameInput.value = '';
    
    let okayBtn = document.querySelector('.okayButton');
    okayBtn.addEventListener('click', () =>{
      nonEntry.removeContainer();
      
    })
    return false;
  }
}

function editProjectSubmit(priorityValue, projectInfo){
  let newTitle = document.querySelector('.projectTitle');
  
  let dueDate = document.querySelector('.editDateInput');

  let originalName = projectInfo.name;
  
  let OGProjectIndex = findStorageIndex(originalName);

  let checkIndex = findStorageIndex(newTitle.value)

  if(checkIndex !== undefined && OGProjectIndex !== checkIndex){
    
     /* create HTML element for all alerts. */
    newTitle.value = originalName;
    let nameAlert = new AlertWindow('Another project already has this name. Try something else.');
    nameAlert.okayAlert();
    
    let okay = (nameAlert.container).querySelector('.okayButton');
    okay.addEventListener('click', () =>{
      nameAlert.removeContainer();
    })
    return false; 
  }
  else{
    removeProject(originalName); 
  
    let updatedObj = parseData(newTitle, dueDate, priorityValue, projectInfo.taskObj); /* missing task obj */

    storeItems(updatedObj);

    projectList();

    populateProject(updatedObj);
   
    return true;
  }
};
function removeProjectHandler(areYouSure, projectContainer, projectInfo){
  projectContainer.innerHTML = '';

      let notify = DOMObjects('h2', 'projectDeleted', projectContainer);
      elementText(notify, `${projectInfo.name} has been deleted.`)

      removeProject(projectInfo.name), projectList();

      areYouSure.removeContainer();
}
function taskSubmitHandler(taskName){
  let projectName = document.querySelector('.projectTitle').textContent;
  let projectInfo = retrieveProject(projectName);

  let taskHeader = document.querySelector('#formTitle');
  /* taskHeader was assigned a value of taskName in editTaskForm() to isolate current task */
  
  let taskNameInput = document.querySelector('.taskName');
  let dueDateInput = document.querySelector('.taskDue');

  let required = requiredInputs(taskNameInput, dueDateInput);

  if (required === true){ /* otherwise, requiredInputs() alters form input borders */
    
    let taskObject = taskParseData();

    if(taskHeader.textContent === 'Edit Task'){


      if(taskNameInput.value === taskName||taskDuplicateCheck(projectInfo, taskNameInput.value) !== true ){
     
        deleteTask(taskName, projectInfo);
        projectInfo.taskObj.push(taskObject);
      
        submitProcessing(projectInfo)
      }
      else{
        return true; /* Indication to call duplicate form event listeners */
      }
    }
    else{
      let duplicate = taskDuplicateCheck(projectInfo, taskNameInput.value);

      if(duplicate !== true ){
        projectInfo.taskObj.push(taskObject)

        submitProcessing(projectInfo);
      }
      else{
        return true;
      }
    }
  }  
  function taskDuplicateCheck(projectInfo, taskName){
    let allTasks = projectInfo.taskObj;
    for(let i = 0; i< allTasks.length; i++){
      if(allTasks[i].taskName === taskName){
        return true;
      }
      
    }
  }
}

function submitProcessing(projectInfo){
  let bodyContainer = document.querySelector('.bodyContainer');

  bodyContainer.removeChild(document.querySelector('.taskForm')); /* Only deletes related to submit after info verified. */

  removeProject(projectInfo.name); 

  storeItems(projectInfo);

  populateProject(projectInfo);
}

module.exports = {
  formSubmit,
  editProjectSubmit,
  removeProjectHandler,
  taskSubmitHandler,
  submitProcessing
}