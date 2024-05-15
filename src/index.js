const{projectForm, resetInputs} = require('./projectForm');
const{ parseData, storeItems, projectList} = require('./dataStorage');
const{populateProject} = require('./createProject');
const{DOMObjects, elementText} = require('./createDOM');
/* DOMOjects(element, class, parent), elementText(item, text) */
import './stylesheets/style.css';



function initiatePage(){
  let body = document.querySelector('body');
  let bodyContainer = DOMObjects('div', 'bodyContainer', body);

  let sideBarContainer = DOMObjects('div', 'sideBarContainer', bodyContainer);
  
  //delegate page construction
  header(bodyContainer);
  sideBar(sideBarContainer);
  projectSpace(bodyContainer);

  let hiddenContainer = projectForm(bodyContainer); /* Container is the parent of the add project form */
  pageButtons(hiddenContainer, sideBarContainer)

  //TEMPORARY CACHE CLEAR BUTTON:
  let clearCache = document.querySelector('.clearCache');
  clearCache.addEventListener('click',() =>{
    localStorage.clear();
    
  })

}

function pageButtons(hiddenContainer, sideBarContainer){
  let addProject = document.querySelector('.addProject');
  

  addProject.addEventListener('click',() => {
    hiddenContainer.style.display = 'block';
  });

  let submit = document.querySelector('.submitBtn');
  submit.addEventListener('click',()=>{
    let projectInfo = parseData();     /* assigns value to items and creates project object */
    populateProject(projectInfo);
    
    storeItems(projectInfo); projectList()

    resetInputs();
    hiddenContainer.style.display = 'none';
  })

  let cancel = document.querySelector('.cancelBtn');
  cancel.addEventListener('click',()=>{

    hiddenContainer.style.display = 'none';
    resetInputs();
  })


  let li = sideBarContainer.querySelectorAll('li');

  li.forEach((item) =>{
    item.addEventListener('click',() =>{
      let name = item.textContent;
      // console.log('works')
      // console.log(typeof(name))
      populateProject(name)
    })
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

  projectList();
}

function projectSpace(bodyContainer){
  let projectContainer =  DOMObjects('div', 'projectContainer', bodyContainer);
  
}



initiatePage();


console.trace();  
