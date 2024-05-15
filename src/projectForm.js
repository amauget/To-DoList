function projectForm(bodyContainer){
  let hiddenContainer= createEl('div', 'hiddenContainer');

  let form = createEl('div', 'form');

  let title = createEl('h3', 'formTitle');
  title.textContent = 'Create a New Project';

  let nameInput = createEl('input', 'nameInput');
  nameInput.required = true;

  let nameLabel = createEl('label', 'formLabel');
  labelFor(nameLabel, nameInput.id);
  nameLabel.textContent = 'Project Name: ';
  
  let dueInput = createEl('input', 'dueDateInput');
  dueInput.setAttribute('type', 'date');
  dueInput.required = true;

  let dueDateLabel = createEl('label','formLabel' );
  labelFor(dueDateLabel, dueInput.id);
  dueDateLabel.textContent = 'Due Date: ';

  let priorityContainer = createEl('div', 'priorityContainer');

  let priorityLabel = createEl('label', 'priorityLabel')
  
  priorityLabel.textContent = 'Priority:';
  priorityContainer.append(priorityLabel)

  //priority radio components:
  let low = new PriorityRadio('Low ', 'low');
  let med = new PriorityRadio('Medium ', 'medium');
  let high = new PriorityRadio('High ', 'high');
  low.radioDOMItem(priorityContainer); med.radioDOMItem(priorityContainer); high.radioDOMItem(priorityContainer);

  let btnContainer = createEl('div', 'btnContainer');

  let submit = createEl('button', 'submitBtn');
  submit.textContent = 'Submit';

  let cancel = createEl('button', 'cancelBtn');
  cancel.textContent = 'Cancel';

  btnContainer.append(submit, cancel);

  form.append(title, nameLabel, nameInput, dueDateLabel, dueInput, priorityContainer , btnContainer);

  hiddenContainer.append(form);
 
  bodyContainer.append(hiddenContainer);

  return hiddenContainer;
}

function createEl(element, name){
  let item = document.createElement(element);
  
  if(element !== 'label'){
    item.className = name;
    item.setAttribute('id',name);
  } 

  return item;
}

function labelFor(label,inputId){
  return label.setAttribute('for', inputId);
}

class PriorityRadio{
  constructor(text, nameClass){
    this.container = createEl('div', 'choiceContainer');
    this.label =  createEl('label', 'radioLabel');
    this.input = createEl('input', nameClass);
    this.text = text;
    this.name = 'priority'
    this.value = nameClass;
  }
  radioDOMItem(priorityContainer){
    let choiceContainer = createEl('div', 'choiceContainer');
    this.label.textContent = this.text;

    this.input.setAttribute('type', 'radio');
    this.input.name = this.name; /* uniform names disallow multiple selection */
    this.input.value = this.value;
    
    choiceContainer.append(this.label, this.input)

    priorityContainer.append(choiceContainer)
    
    return choiceContainer;
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
}  