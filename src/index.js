const{parseData, storeItems, projectList, retrieveProject, removeProject, storedDataArray} = require('./dataStorage');
const{projectForm, resetInputs, AlertWindow, createTaskForm} = require('./projectForm.js');
const{DOMObjects, elementText} = require('./createDOM');
const{formSubmit, editProjectSubmit, removeProjectHandler, taskSubmitHandler} = require('./eventHandling');
const{findStorageIndex, requiredInputs} = require('./verify.js');
const{populateProject, headerLayout, editHeader, priorityBackground} = require('./createProject.js');

import './stylesheets/style.css';



function initiatePage(){
  let body = document.querySelector('body');
  let bodyContainer = DOMObjects('div', 'bodyContainer', body);

  let projectContainer =  DOMObjects('div', 'projectContainer', bodyContainer);


  headerDOM(bodyContainer); /* HeaderDOM is static, so it's called and not valued. */

  
  allPageEvents(bodyContainer);

  //TEMPORARY CACHE CLEAR BUTTON:
  let clearCache = document.querySelector('.clearCache');
  clearCache.addEventListener('click',() =>{
    localStorage.clear();
    
  })

}


function allPageEvents(bodyContainer){
  
  let projectContainer = document.querySelector('.projectContainer');
  let sideBarContainer = sideBarDOM(bodyContainer, projectContainer);
  let hiddenContainer = projectForm(bodyContainer);

  sideBar();
  

  function sideBar(){
    /*Side bar list events */
    listEvents();

    
    let addProject = document.querySelector('.addProject');
      
    addProject.addEventListener('click',() => {
      
      hiddenContainer.style.display = 'block';
      
      formEvents(hiddenContainer);
    });
  
  };
  function listEvents(){
    let li = document.querySelectorAll('.sideBarList');
    let hiddenContainer = document.querySelector('.hiddenContainer');

  
    li.forEach((item) =>{ 
      
      item.addEventListener('click',() =>{
        hiddenContainer.style.display = 'none';
        resetInputs();
        let name = item.querySelector('.projectListName').textContent;
    
        populateProject(name);
        projectButtons();
  
      })
    });
    return true;
  }
  function formEvents(){
    let hiddenContainer = document.querySelector('.hiddenContainer');

    // form events
    let submit = document.querySelector('.submitBtn');
  
    submit.addEventListener('click',()=>{
      let processing = formSubmit(hiddenContainer);

      if (processing === true){
        hiddenContainer.style.display = 'none';
        listEvents(); /* calls again to update 'li' definition */
        projectButtons()
      }
      

    });
    
    let cancel = document.querySelector('.cancelBtn'); 
    cancel.addEventListener('click',()=>{ /* This works */
      
      hiddenContainer.style.display = 'none';
      resetInputs();
    })
  }
  
  function projectButtons(){ 
    let projectName = document.querySelector('.projectTitle').textContent;

    let projectInfo = retrieveProject(projectName);

    let headerObject = headerLayout(projectInfo, projectContainer);

    let editBtn = headerObject.edit; 
    let addTask = headerObject.add; 
    
    let deleteBtn = document.querySelector('.deleteProject');

    editBtn.addEventListener('click',()=> {    
      resetInputs();
      
      let editBtnData = editHeader(headerObject);
      
      /* populates edit header, and returns related buttons as Obj */
      
      editHeaderEvents(editBtnData, projectInfo);
    })

    addTask.addEventListener('click',() =>{
      createTaskForm(projectInfo);
      addTaskEvents(projectInfo);
      
      
    })
    deleteBtn.addEventListener('click', () =>{
      let areYouSure = new AlertWindow('Are you sure you would like to delete this project, and any associated to-do items?');
      areYouSure.yesNOAlert();

      let yes = document.querySelector('.yesButton');
      let no = document.querySelector('.noButton');
      yes.addEventListener('click', () => {
        
        removeProjectHandler(areYouSure, projectContainer, projectInfo);
        
        listEvents();
        
      })
      no.addEventListener('click', () =>{

        areYouSure.removeContainer();

      })
        
    })
    
  }
  
  function addTaskEvents(projectInfo){
    
    let taskForm = document.querySelector('.taskForm')
    let submitTask = taskForm.querySelector('.submitBtn');
    let cancelTask = taskForm.querySelector('.cancelBtn');

    submitTask.addEventListener('click', () =>{
      taskSubmitHandler(projectInfo);
      projectButtons();
    })

    cancelTask.addEventListener('click', () =>{
      bodyContainer.removeChild(taskForm);
      projectButtons();
      
    })
  }
    

  function editHeaderEvents(editBtnData, projectInfo){
    // priority buttons 
    let low = editBtnData.low;
    let med = editBtnData.med;
    let high = editBtnData.high;

    let priorityValue = projectInfo.priority;

    let priorityArray = [low, med, high];

  
    let changeColor = (selection) =>{
      for (i of priorityArray){
        i.style.background = 'white'; /* resets unselected button background */
      }
      
      selection.style.background = priorityBackground(selection.textContent);
      
      return priorityValue = selection.textContent;
    }

    priorityArray.forEach(item =>{ 
      item.addEventListener('click',() => { changeColor(item)}) /* need to assign value to priority */
    
    });
  let submitPrjEdit = editBtnData.submit;

  let cancelPrjEdit = editBtnData.cancel;

  submitPrjEdit.addEventListener('click', () => { 
    
    editProjectSubmit(priorityValue, projectInfo); /* eventHandling.js */
    listEvents();
    projectButtons();
  });

  cancelPrjEdit.addEventListener('click',() =>{
    populateProject(projectInfo)
    projectButtons();
  })
  }
}

//Page Element Constants:

function headerDOM(bodyContainer){
  let header = DOMObjects('h1', 'header', bodyContainer);
  elementText(header, 'To-Do List!');
}

function sideBarDOM(bodyContainer){
  let sideBarContainer = DOMObjects('div', 'sideBarContainer', bodyContainer);

  let sideBarHeader = DOMObjects('div', 'sideBarHeader', sideBarContainer);
  
  let projectTitle = DOMObjects('h5', 'sideBarProjectTitle', sideBarHeader);
  elementText(projectTitle, 'Projects');

  let dueTitle = DOMObjects('h5', 'sideBarDueTitle', sideBarHeader);
  elementText(dueTitle, 'Due');

  let ul = DOMObjects('ul', 'projectList', sideBarContainer);

  

  projectList();

  let addProject = DOMObjects('button', 'addProject', sideBarContainer);
  elementText(addProject, 'Add Project');

  

  return sideBarContainer;
}


initiatePage();


console.trace();  
