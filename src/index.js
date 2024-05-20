const{projectForm, resetInputs,requiredInputs, duplicateCheck} = require('./projectForm');
const{parseData, storeItems, projectList} = require('./dataStorage');
const{populateProject} = require('./createProject');
const{DOMObjects, elementText} = require('./createDOM');
/* DOMOjects(element, class, parent), elementText(item, text) */
import './stylesheets/style.css';



function initiatePage(){
  let body = document.querySelector('body');
  let bodyContainer = DOMObjects('div', 'bodyContainer', body);

  let sideBarContainer = sideBar(bodyContainer);
  
  let projectContainer = projectSpace(bodyContainer);
  
  header(bodyContainer); /* Header is static, so it's called and not valued. */

  let hiddenContainer = projectForm(bodyContainer); /* Container is the parent of the add project form */
  
  pageButtons(hiddenContainer, sideBarContainer, projectContainer)

  //TEMPORARY CACHE CLEAR BUTTON:
  let clearCache = document.querySelector('.clearCache');
  clearCache.addEventListener('click',() =>{
    localStorage.clear();
    
  })

}

function pageButtons(hiddenContainer, sideBarContainer, projectContainer){

  let addProject = document.querySelector('.addProject');
  
  addProject.addEventListener('click',() => {
    hiddenContainer.style.display = 'block';
  });

  //side bar list
  let sideBarList = () =>{
    let li = sideBarContainer.querySelectorAll('.sideBarList');
   
    li.forEach((item) =>{ 
      
      item.addEventListener('click',() =>{
        let name = item.querySelector('.projectListName').textContent;
        populateProject(name, projectContainer);

        
      })
    })
  };
  sideBarList()
  
  // form events
  let submit = document.querySelector('.submitBtn');
  submit.addEventListener('click',()=>{

    let nameInput = document.querySelector('.nameInput');
    let dateInput = document.querySelector('.dueDateInput');

    let required = requiredInputs(nameInput, dateInput); /* verifies form inputs are filled out */
    let duplicated = duplicateCheck(nameInput); /* compares name input to current projects. */
    
    let priorityRadioBtns = document.querySelectorAll('input[type="radio"]');

    let priorityRating = undefined;

    priorityRadioBtns.forEach(item => {
      if(item.checked){
        return priorityRating = item.className;
      }
    })
     
    if(required === true && duplicated === false){ /* BUG ISOLATED TO BELOW THIS CONDITION... */
      let projectInfo = parseData(nameInput, dateInput, priorityRating);  /* converts form inputs into object */

      populateProject(projectInfo, projectContainer);

      storeItems(projectInfo); 
      
      projectList()/* appends to sidebar */
      
      resetInputs(); 

      hiddenContainer.style.display = 'none';
      
      sideBarList(); /* calls again to update 'li' definition */
    };
  });
  
  let cancel = document.querySelector('.cancelBtn'); 
  cancel.addEventListener('click',()=>{ /* This works */

    hiddenContainer.style.display = 'none';
    resetInputs();
  })

  
}
//Page Element Constants:

function header(bodyContainer){
  let header = DOMObjects('h1', 'header', bodyContainer);
  elementText(header, 'To-Do List!');
}

function sideBar(bodyContainer){
  let sideBarContainer = DOMObjects('div', 'sideBarContainer', bodyContainer);

  let sideBarHeader = DOMObjects('div', 'sideBarHeader', sideBarContainer);
  
  let projectTitle = DOMObjects('h5', 'sideBarProjectTitle', sideBarHeader);
  elementText(projectTitle, 'Projects');

  let dueTitle = DOMObjects('h5', 'sideBarDueTitle', sideBarHeader);
  elementText(dueTitle, 'Due')

  let ul = DOMObjects('ul', 'projectList', sideBarContainer);
  let addProject = DOMObjects('button', 'addProject', sideBarContainer);
  elementText(addProject, 'Add Project');

  projectList();

  return sideBarContainer;
}

function projectSpace(bodyContainer){
  let projectContainer =  DOMObjects('div', 'projectContainer', bodyContainer);
  return projectContainer;
}



initiatePage();


console.trace();  
