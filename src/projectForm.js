function projectForm(bodyContainer){
  let hiddenContainer= createEl('div', 'hiddenContainer');

  let form = createEl('div', 'form');

  let title = createEl('h3', 'formTitle');
  title.textContent = 'Create a New Project';

  let nameLabel = createEl('label', 'formLabel');
  nameLabel.textContent = 'Project Name: ';
  let nameInput = createEl('input', 'nameInput');

  let dueDateLabel = createEl('label','formLabel' );
  dueDateLabel.textContent = 'Due Date: ';
  
  let dueInput = createEl('input', 'dueDateInput');
  dueInput.setAttribute('type', 'date');

  let priorityContainer = createEl('div', 'priorityContainer');

  let priorityLabel = createEl('label', 'priorityLabel')
  priorityLabel.textContent = 'Priority:';
  priorityContainer.append(priorityLabel)

  //priority radio components:
  let low = new PriorityRadio('Low ', 'lowInput');
  let med = new PriorityRadio('Medium ', 'mediumInput');
  let high = new PriorityRadio('High ', 'highInput');
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
  item.className = name;

  return item;
}

function resetInputs(){
  let formInputs = document.querySelectorAll('input');
    formInputs.forEach(function(input){
      input.value = '';
      input.checked = false;
    })
}
class PriorityRadio{
  constructor(text, nameClass){
    this.container = createEl('div', 'choiceContainer');
    this.label =  createEl('label', 'radioLabel');
    this.input = createEl('input', nameClass);
    this.text = text;
    this.name = 'priority'
  }
  radioDOMItem(priorityContainer){
    let choiceContainer = createEl('div', 'choiceContainer');
    this.label.textContent = this.text;

    this.input.setAttribute('type', 'radio');
    this.input.name = this.name; /* uniform names disallow multiple selection */
    choiceContainer.append(this.label, this.input)

    priorityContainer.append(choiceContainer)
    
    return choiceContainer;
  }
}

module.exports = {
  projectForm,
  resetInputs,
}  