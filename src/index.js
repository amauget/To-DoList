const{projectForm, resetInputs} = require('./projectForm');
const{ parseData, storeItems, retreiveSideBar} = require('./dataStorage');
const{populateProject} = require('./createProject');
const{DOMObjects, elementText} = require('./createDOM');
import './stylesheets/style.css';



function initiate(){
  let body = document.querySelector('body');

  //TEMPORARY CACHE CLEAR BUTTON:
  let clearCache = document.querySelector('.clearCache');
  clearCache.addEventListener('click',() =>{
    localStorage.clear();
  })

  let bodyContainer = DOMObjects('div', 'bodyContainer', body);

  let sideBarContainer = DOMObjects('div', 'sideBarContainer', bodyContainer);

  //routing page construction
  header(bodyContainer);
  sideBar(sideBarContainer);
  
  let addProject = document.querySelector('.addProject');

  let hiddenContainer = projectForm(bodyContainer)

  addProject.addEventListener('click',() => {
    hiddenContainer.style.display = 'block';
  });

  let submit = document.querySelector('.submitBtn');
  submit.addEventListener('click',()=>{
    // parseData(); /* assigns value to items and passes to proj obj creater */
    let projectObj = parseData();
    populateProject(projectObj);
    storeItems(projectObj)


    resetInputs();
    hiddenContainer.style.display = 'none';
  })



  let cancel = document.querySelector('.cancelBtn');
  cancel.addEventListener('click',()=>{

    hiddenContainer.style.display = 'none';
    resetInputs();
  })

  
}
//Page Element Constants:

function header(bodyContainer){
  const header = DOMObjects('h1', 'header', bodyContainer);
  
  elementText(header, 'To-Do List!');
}

function sideBar(sideBarContainer){
  const sideBarHeader = DOMObjects('div', 'sideBarHeader', sideBarContainer);
  
  const sideBarTitle = DOMObjects('h2', 'sideBarTitle', sideBarHeader);
  elementText(sideBarTitle, 'Projects');

  const ul = DOMObjects('ul', 'projectList', sideBarContainer);
  const addProject = DOMObjects('button', 'addProject', sideBarContainer);
  elementText(addProject, 'Add Project');

  retreiveSideBar(ul)

  let li = document.querySelectorAll('li');
  li.forEach((item) =>{
    item.addEventListener('click',() =>{
      let name = li.elementText;
      console.log(name)
    })
  })
 
}


//FACTORY FUNCTIONS





initiate();


console.trace();  
