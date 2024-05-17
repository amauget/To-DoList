const{DOMObjects, elementText} = require('./createDOM');

/* refactor cut 36 lines of code. */
function projectForm(bodyContainer){

  let hiddenContainer = DOMObjects('div', 'hiddenContainer', bodyContainer);

  let form = DOMObjects('div', 'form', hiddenContainer);

  let title = DOMObjects('h3', 'formTitle', form);
  elementText(title, 'Create a New Project');

  let nameInput = new InputComponents('text', 'nameInput', 'Project Name:');
  nameInput.makeInput(form);

  let dateInput = new InputComponents('date', 'dueDateInput', 'Due Date:');
  dateInput.makeInput(form);

  let priorityContainer = DOMObjects('div', 'priorityContainer', form);

  let priorityLabel = DOMObjects('label', 'priorityLabel', priorityContainer);
  elementText(priorityLabel, 'Priority:');

  //priority radio components:
  let low = new InputComponents('radio','Low', 'Low:');
  let med = new InputComponents('radio','Medium', 'Medium: ');
  let high = new InputComponents('radio','High', 'High: ');
  low.makeInput(priorityContainer); med.makeInput(priorityContainer); high.makeInput(priorityContainer);

  let btnContainer = DOMObjects('div', 'btnContainer', form);

  let submitBtn = DOMObjects('button','submitBtn', btnContainer);
  elementText(submitBtn, 'Submit');

  let cancelBtn = DOMObjects('button', 'cancelBtn', btnContainer);
  elementText(cancelBtn, 'Cancel');

  bodyContainer.append(hiddenContainer);
  
  return hiddenContainer;
}

class InputComponents{ 
  constructor(inputType, inputId, labelText){
    this.inputType = inputType;
    this.inputId = inputId;
    this.labelText = labelText;
  }
  makeInput(container){

    let label = document.createElement('label');
    label.for = this.inputId;
    label.textContent = this.labelText;

    let input = document.createElement('input');
    input.type = this.inputType;
    input.id = this.inputId;
    input.className = this.inputId;

    if(input.type ==='radio'){
      input.name = 'priority'
    }

    return container.append(label, input);
    
  }
}

function resetInputs(){
  let formInputs = document.querySelectorAll('input');
  
    formInputs.forEach(function(input){
      if(input.type === 'text' || input.type === 'date'){
        input.value = '';
        input.style.border = 'none'
      }
      else{
        input.checked = false;
      }
    })
}

function requiredInputs(nameInput, dateInput){
  nameInput.style.border = 'none';
  
  dateInput.style.border = 'none';

  if(nameInput.value === ''){
    nameInput.style.border = 'red solid 2px';
  }
  
  if(dateInput.value === ''){
    dateInput.style.border = 'red solid 2px';
  }

  if(nameInput.value !== '' && dateInput.value !== ''){
    return true;
  }
}
function duplicateCheck(nameInput){
  let sideBarContainer = document.querySelector('.sideBarContainer');
  let projects = sideBarContainer.querySelectorAll('li');

  projects.forEach(project =>{
    if(nameInput.value === project.textContent){
      alert(`${project.textContent} already exists.`);
      resetInputs();
      return true
    }

  })
  return false;
}

module.exports = {
  projectForm,
  InputComponents,
  resetInputs,
  requiredInputs,
  duplicateCheck
}  