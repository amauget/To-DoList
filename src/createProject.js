const{DOMObjects, elementText} = require('./createDOM')
/*  DOMObjects(elementType,name, parent) */
  /* elementText(name, text) */
const{InputComponents, projectForm} =  require('./projectForm');

function populateProject(projectInfo){
  if(typeof(projectInfo)=== 'string'){ /* condition when side bar list is clicked. */
    projectInfo = retreiveProject(projectInfo);
  }  
  projectLayout(projectInfo); /* retreiving info from form submission */

}


function retreiveProject(projectName){
  let projectObj = JSON.parse(localStorage.getItem(projectName));
  return projectObj;
}

function projectLayout(projectObj){ 
 
  let projectContainer = document.querySelector('.projectContainer');
 
  projectContainer.innerHTML = ''; /* reset content every execution */

  //Header Container and Items
  let projectDetails = DOMObjects('div', 'projectDetails', projectContainer);

  let projectTitle = DOMObjects('h2', 'projectTitle', projectDetails);
  elementText(projectTitle, projectObj.name);


  let dueDate = DOMObjects('h4', 'projectDue', projectDetails);
  elementText(dueDate, `Due: ${projectObj.due}`);

  let priority = DOMObjects('h4', 'priorityTitle', projectDetails);
  elementText(priority, `Priority: ${projectObj.priority}`);
  priority.style.background = priorityBackground(projectObj.priority)

  let editBtn = DOMObjects('button', 'editProject', projectDetails);
  elementText(editBtn, 'Edit Project Details')

  let addTask = DOMObjects('button', 'addTask', projectDetails);
  elementText(addTask, 'Add a Task');


  projectButtons(editBtn, addTask, projectObj)
  
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
  console.log(projectObj.due) 
  /* CURRENT DATE FORMAT IS YEAR MONTH DAY. FIGURE OUT HOW TO CHANGE */


  // let projectContainer = document.querySelector('.projectContainer')
  
  // let form = document.querySelector('.form');

  // let editForm = form.cloneNode(true); /* creates an editable copy of form */
  // editForm.className = 'editForm'

  // let title = document.querySelector('.formTitle');
  // title.textContent = 'Edit Project'
  // let inputs = editForm.querySelectorAll('input');
  // inputs.forEach(input => {
  //   if(input.type === 'text'){
  //     input.value = projectObj.name;
  //   }
  //   else if(input.type === 'date'){
  //     input.value = projectObj.due;
  //   }
  //   else{
  //     if(projectObj.priority === input.className){
  //       input.checked = true;
  //     }
  //   }
  // })
  // projectContainer.append(editForm);
  // return inputs;
}

function appendToDo(){
  let projectContainer = document.querySelector('.projectContainer');
  let toDoContainer = DOMObjects('div','toDoContainer', projectContainer);
  let doneContainer = DOMObjects('div', 'doneContainer', projectContainer);

}

 
function priorityBackground(priority){
  let background = '';
  if(priority === 'low'){
    background = 'green';
  }
  else if(priority === 'medium'){
    background = 'yellow';
  }
  else{
    background = 'red';
  }
  return background;
}
  //Add To-Do:



         /* Add To-Do Item button:
            popup:
              title: New To-Do Item
              Task:
              due:
              note:
              priority:
              Completed Status: to-do, started, completed
          
          To-Do Append Container:
            list format with undo button
          
          Completed items container:
            append if completed status permits.
            Allow completed status change. (3 buttons?)


  */


module.exports = {
  populateProject
}