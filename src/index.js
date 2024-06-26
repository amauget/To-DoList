const{storeItems, projectList,taskList, retrieveProject, removeProject, deleteTask, taskParseData, dateFormat} = require('./dataStorage');
const{projectForm, InputComponents, resetInputs, AlertWindow, createTaskForm, editTaskForm} = require('./projectForm.js');
const{DOMObjects, elementText} = require('./createDOM');
const{formSubmit, editProjectSubmit, removeProjectHandler, taskSubmitHandler, submitProcessing} = require('./eventHandling');
const{populateProject, headerLayout, editHeader, priorityBackground} = require('./createProject.js');

import './stylesheets/style.css';



function initiatePage(){
  let body = document.querySelector('body');
  let bodyContainer = DOMObjects('div', 'bodyContainer', body);

  headerDOM(bodyContainer); /* HeaderDOM is static, so it's called and not valued. */
  
  allPageEvents(bodyContainer);
}

function allPageEvents(bodyContainer){
  let projectContainer =  DOMObjects('div', 'projectContainer', bodyContainer);
  let sideBarContainer = sideBarDOM(bodyContainer, projectContainer);
  let hiddenContainer = projectForm(bodyContainer);

  sideBar();
 
  function sideBar(){
    /*Side bar list events */
    listEvents()
    
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
        taskListEvents();
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

    let addTask = document.querySelector('.addTask'); 
    
    let deleteBtn = document.querySelector('.deleteProject');

    editBtn.addEventListener('click',()=> {    
      resetInputs();
      /* populates edit header, and returns related buttons as Obj */
      
      editHeaderEvents(projectName, projectContainer);
    })

    addTask.addEventListener('click',() =>{
      let projectInfo = retrieveProject(projectName);

      createTaskForm(projectInfo);
      addTaskEvents(projectInfo.name);
      
    })
    deleteBtn.addEventListener('click', () =>{
      let areYouSure = new AlertWindow('Are you sure you would like to delete this project, and any associated to-do items?');
      let alertBtns = areYouSure.twoButtonAlert('Yes', 'No');

      let yes = alertBtns[0]; 
      let no = alertBtns[1];
      
      yes.addEventListener('click', () => {
        let projectInfo = retrieveProject(projectName);

        removeProjectHandler(areYouSure, projectContainer, projectInfo);
        
        listEvents();
      })
      no.addEventListener('click', () =>{
        areYouSure.removeContainer();
      })
    })
  }

  function editHeaderEvents(projectName, projectContainer){
    let projectInfo = retrieveProject(projectName);
    let headerObject = headerLayout(projectInfo,projectContainer )
    let editBtnData = editHeader(headerObject);
  
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
    let projectInfo = retrieveProject(projectName);
    
   if(editProjectSubmit(priorityValue, projectInfo) === true){
    projectButtons();
   }; /* eventHandling.js */
    listEvents();
    taskListEvents();
  });
  
  cancelPrjEdit.addEventListener('click',() =>{
    projectInfo = retrieveProject(projectName);
    populateProject(projectInfo);
    projectButtons();
    taskListEvents();
  })
  }
  
  function addTaskEvents(projectName){
    let taskForm = document.querySelector('.taskForm')
    let submitTask = taskForm.querySelector('.submitBtn');
    let cancelTask = taskForm.querySelector('.cancelBtn');

    submitTask.addEventListener('click', () =>{
      let taskName = undefined;

      if(taskSubmitHandler(taskName) === true){
        let projectInfo = retrieveProject(projectName);
        duplicateTaskAlert(taskName, projectInfo, 'add');
      };
    
      projectButtons();

      taskListEvents();
    })

    cancelTask.addEventListener('click', () =>{
      bodyContainer.removeChild(taskForm);
      projectButtons();

      taskListEvents();
      
    })
  }

  function taskListEvents(){
    let projectName = document.querySelector('.projectTitle').textContent;

    let listItem = document.querySelectorAll('.taskListItem');

    listItem.forEach(item => {
      let deleteItem = item.querySelector('.deleteTask')
      let editTask = item.querySelector('.editTask');

      let projectInfo = retrieveProject(projectName);

      deleteItem.addEventListener('click', () =>{
        let taskName = item.querySelector('.taskNameOutput').textContent;
        removeProject(projectInfo.name);
        projectInfo = deleteTask(taskName, projectInfo);
        storeItems(projectInfo)
        let ul = document.querySelector('.taskList');

        ul.removeChild(item);
      })

      editTask.addEventListener('click', () =>{
        let 
        taskName = item.querySelector('.taskNameOutput').textContent,
        dueDate = item.querySelector('.taskDueOutput').textContent,
        comment = item.querySelector('.taskCommentOutput').textContent;
        let editTaskObj = editTaskForm(taskName, dueDate, comment);
        
        let submit = editTaskObj.submit;
        submit.addEventListener('click', () =>{

          if(taskSubmitHandler(taskName) === true){
            duplicateTaskAlert(taskName, projectInfo, 'edit');
          };
            callDispatch();          
        })
        let cancel = editTaskObj.cancel;

        cancel.addEventListener('click', () =>{
          bodyContainer.removeChild(document.querySelector('.taskForm'));
          callDispatch();
        })
      })
    })
  }
  function duplicateTaskAlert(taskName, projectInfo, origin){
    let taskObject = taskParseData();

    let duplicateForm = new AlertWindow('This task already exists. Would you like to duplicate, replace, or try again?');
    let buttons = duplicateForm.twoButtonAlert('Duplicate', 'Cancel');
   
    let duplicate = buttons[0]
    let cancel =buttons[1];
    
    duplicate.addEventListener('click', () => {
      if(origin === 'edit'){
  
        deleteTask(taskName, projectInfo); /* Since title is edited, the original needs to be erased. */
      }
      
      removeProject(projectInfo.name);

      projectInfo.taskObj.push(taskObject);

      submitProcessing(projectInfo);
      
      duplicateForm.removeContainer()
      callDispatch();
    })
    cancel.addEventListener('click', () =>{
      populateProject(projectInfo);
      duplicateForm.removeContainer()
      callDispatch()
    })
  }
  function callDispatch(){
    listEvents();
    projectButtons();
    taskListEvents();
  }
}
//PAGE ELEMENT CONSTANTS

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


