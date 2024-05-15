const{DOMObjects, elementText} = require('./createDOM');

/*  DOMObjects(elementType,name, parent) */
  /* elementText(name, text) */

function populateProject(projectObj){
  appendtoSidebar(projectObj);
  projectLayout(projectObj);
}
/*   
   create DOM items:
      project container
        Project title: object.name
        
        project details container:
          due date: object.due
          priority: object.priority
          priority.background condition based on which choice is made.

          Edit Project button:
            popup: 
              title: edit project
              project name: ____
              due: ___
              priority: ____

              submit btn
              cancel btn */
function appendtoSidebar(projectObj){
  let ul = document.querySelector('.projectList');
  let li = DOMObjects('li', 'projectListItem', ul);
  elementText(li, projectObj.name);
  li.value = projectObj;
}

function projectLayout(projectObj){ 
  
  let bodyContainer = document.querySelector('.bodyContainer');

  let projectContainer = DOMObjects('div', 'projectContainer', bodyContainer);
  
  //Actual Header
  let projectTitle = DOMObjects('h2', 'projectTitle', projectContainer);
  elementText(projectTitle, projectObj.name);

  //Header Container
  let projectDetails = DOMObjects('div', 'projectDetails', projectContainer);

  let dueDate = DOMObjects('h4', 'projectDue', projectDetails);
  elementText(dueDate, `Due: ${projectObj.due}`);

  let priority = DOMObjects('h4', 'priorityTitle', projectDetails);
  elementText(priority, `Priority: ${projectObj.priority}`);
  priority.style.background = priorityBackground(projectObj.priority)

  let editProject = DOMObjects('button', 'editProject', projectDetails);
  elementText(editProject, 'Edit Project Details')

  let addTask = DOMObjects('button', 'addTask', projectContainer);
  elementText(addTask, 'Add a Task');

  addTask.addEventListener('click',() =>{
    toDoForm();
  })

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
            card-style appearance similar to libarary project
          
          Completed items container:
            append if completed status permits.
            Allow completed status change. (3 buttons?)


  */
}

module.exports = {
  populateProject
}