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
  let low = new InputComponents('radio','low', 'Low:');
  let med = new InputComponents('radio','medium', 'Medium: ');
  let high = new InputComponents('radio','high', 'High: ');
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

    return container.append(label, input);
    
  }
}

function resetInputs(){
  let formInputs = document.querySelectorAll('input');
  
    formInputs.forEach(function(input){
      if(input.type === 'text' || input.type === 'date'){
        input.value = '';
      }
      else{
        input.checked = false;
      }
    })
}

module.exports = {
  projectForm,
  resetInputs,
  InputComponents,
}  