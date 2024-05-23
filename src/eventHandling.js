const{projectForm, resetInputs, AlertWindow} = require('./projectForm.js');
const{findStorageIndex, requiredInputs} = require('./verify.js');
const{populateProject, editHeader, headerLayout} = require('./createProject.js');
const{parseData,storeItems, removeProject, projectList, retrieveProject, dateFormat} = require('./dataStorage');
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
    console.log(nameAlert)
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
function taskSubmitHandler(projectInfo){
  let taskName = document.querySelector('.taskName');
  
  let dueDateInput = document.querySelector('.taskDue');
  let dueDate = dateFormat(dueDateInput.value);
  

  let comment = document.querySelector('.taskComment').value;

  let required = requiredInputs(taskName, dueDateInput);
  if (required === true){

    let taskObject = {
      taskName: taskName.value,
      dueDate: dueDate,
      comment: comment
    };
    (projectInfo.taskObj).push(taskObject); 
    removeProject(projectInfo.name)
    storeItems(projectInfo);
    populateProject(projectInfo)
  }

  
  
  
}

module.exports = {
  formSubmit,
  editProjectSubmit,
  removeProjectHandler,
  taskSubmitHandler

}