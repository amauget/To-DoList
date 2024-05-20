const{DOMObjects, elementText} = require('./createDOM')/*  DOMObjects(elementType,name, parent)  elementText(name, text) */
const{InputComponents, projectForm} =  require('./projectForm');
const{parseData,storeItems, removeProject, projectList, findStorageIndex} = require('./dataStorage');

function populateProject(projectInfo, projectContainer){
  if(typeof(projectInfo)=== 'string'){ /* condition when side bar list is clicked. */
    projectInfo = retreiveProject(projectInfo);
    
  }  

  let headerObject = headerLayout(projectInfo, projectContainer); /* retreiving info from form submission */

  projectButtons(projectInfo, headerObject);
}

function projectButtons(projectInfo, headerObject){
  
  let editBtn = headerObject.edit; addTask = headerObject.add;

  editBtn.addEventListener('click',()=> {    
    
    let editBtnData = editHeader(headerObject); /* populates edit header, and returns related buttons as Obj */
    editHeaderEvents(editBtnData, projectInfo);
  })
  addTask.addEventListener('click',() =>{
    console.log('add task')
    // toDoForm(); 
  })

}
function retreiveProject(projectName){
  let projectObj = JSON.parse(localStorage.getItem(projectName));
  return projectObj;
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
    dueValue: dueValue
  }
  return editBtnData
 
}

function editHeaderEvents(editBtnData, projectInfo){ /* editButtons are the actual DOM button elements */
 

  // priority buttons 
  let low = editBtnData.low;
  let med = editBtnData.med;
  let high = editBtnData.high;

  let priorityValue = projectInfo.priority;

  let priorityArray = [low, med, high];

  let changeColor = (selection) =>{
    for (i of priorityArray){
      i.style.background = 'white';
    }
    selection.style.background = priorityBackground(selection.textContent);
    return priorityValue = selection.textContent;
  }

  priorityArray.forEach(item =>{ 
    item.addEventListener('click',() => {changeColor(item)}) /* need to assign value to priority */
  });

  //submit & cancel
  let submit = editBtnData.submit;

  let cancel = editBtnData.cancel;

  let projectContainer = document.querySelector('.projectContainer')


  submit.addEventListener('click', () => { /* BUG: if item is named the same as another Item, other item is deleted.. */
    let newTitle = document.querySelector('.projectTitle');
    let newTitleValue = newTitle.value;

    let dueDate = document.querySelector('.editDateInput');

    let originalName = projectInfo.name;
    
    let OGProjectIndex = findStorageIndex(originalName);

    let checkIndex = findStorageIndex(newTitleValue)

    if(checkIndex !== undefined && OGProjectIndex !== checkIndex){ 
      /* findStorageIndex finds index of entered title. If newTitle doesn't match any existing: undefined, if index != current, another project has that title already */
      alert('A project with that name already exists.');
        
        titleValue.value = originalName;
    }
    else{
      removeProject(originalName); 
    
      let updatedObj = parseData(newTitle, dueDate, priorityValue);

      storeItems(updatedObj);

      projectList();

      populateProject(updatedObj, projectContainer);
    }
  })
  
  cancel.addEventListener('click',() =>{
    populateProject(projectInfo, projectContainer)
  })
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