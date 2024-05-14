const{projectForm, resetInputs} = require('./projectForm');
import './stylesheets/style.css';


function initiate(){
  let body = document.querySelector('body');

  let bodyContainer = DOMObjects('div', 'bodyContainer', body);

  let sideBarContainer = DOMObjects('div', 'sideBarContainer', bodyContainer);

  //routing page construction
  header(bodyContainer);
  sideBar(sideBarContainer);
  appendArea(bodyContainer);
  
  let addProject = document.querySelector('.addProject');

  let hiddenContainer = projectForm(bodyContainer)
  

  addProject.addEventListener('click',() => {

    hiddenContainer.style.display = 'block';
  });

  let submit = document.querySelector('.submitBtn');
  submit.addEventListener('click',()=>{
    //project file initiate 
    resetInputs();
    hiddenContainer.style.display = 'none';
  })



  let cancel = document.querySelector('.cancelBtn');
  cancel.addEventListener('click',()=>{
    resetInputs();
    hiddenContainer.style.display = 'none';
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

  const ul = DOMObjects('ul', 'projectList', sideBarHeader);
  const addProject = DOMObjects('button', 'addProject', sideBarContainer);
  elementText(addProject, 'Add Project');

}
function appendArea(bodyContainer){

}
//FACTORY FUNCTIONS

function DOMObjects(elementType,name, parent){
  let item = document.createElement(elementType);
  if (name !== null){
    item.className = name;
  }

  return parent.appendChild(item);
}


function elementText(name, text){
  return name.innerHTML = text;
}




initiate();


console.trace();  
