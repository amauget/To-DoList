const{DOMObjects, elementText} = require('./createDOM');

class InputComponents{ 
  constructor(inputType, inputId, labelText){
    this.inputType = inputType;
    this.inputId = inputId;
    this.labelText = labelText;
    this.input = document.createElement('input');

  }
  makeInput(container){

    let label = document.createElement('label');
    label.for = this.inputId;
    label.textContent = this.labelText;

    (this.input).type = this.inputType;
    (this.input).id = this.inputId;
    (this.input).className = this.inputId;

    if(this.input.type ==='radio'){
      this.input.name = 'priority'
    }

    container.append(label, this.input);
    return container;
  }
}
class AlertWindow{
  constructor(message){
    this.message = message;
    this.bodyContainer = document.querySelector('.bodyContainer');

    this.container = DOMObjects('div','alertContainer', this.bodyContainer);
    this.container.className = 'alertWindow';

    this.h3 = DOMObjects('h3', 'alertHeader', this.container);
   

  }
  okayAlert(){
    let okayBtn = DOMObjects('button', 'okayButton', this.container);
    elementText(okayBtn, 'Okay');
    

    elementText(this.h3, this.message);
        
    elementText(okayBtn, 'Okay');

    
  }
  twoButtonAlert(textA, textB){
    elementText(this.h3, this.message); 

    let button1 = DOMObjects('button', 'button1', this.container);
    elementText(button1, textA)
    
    let button2 = DOMObjects('button', 'button2', this.container);
    elementText(button2, textB);

    return [button1, button2];
  }
  removeContainer(){
    this.bodyContainer.removeChild(this.container);
  }
}

function projectForm(bodyContainer){

  let hiddenContainer = DOMObjects('div', 'hiddenContainer', bodyContainer);
  hiddenContainer.innerHTML = '';

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
  let formComments = document.querySelectorAll('textarea');
  formComments.forEach((comment) => {
    comment.value = '';
  }) 
}

function createTaskForm(projectInfo){
  let bodyContainer = document.querySelector('.bodyContainer');

  // let hiddenContainer = DOMObjects('div', 'hiddenTaskContainer', bodyContainer); 
  /*Hidden container may be replaced with innerHTML dump. or bodyContainer.removeChild()  */
  // showForm();
  let form = DOMObjects('div', 'taskForm', bodyContainer);
  form.innerHTML = '';


  let formTitle = DOMObjects('h3', 'formTitle', form);
  elementText(formTitle, `Create a new Task for: "${projectInfo.name}"`);
  formTitle.id = 'formTitle'

  let parentProject = projectInfo.name /* needs to be somehow used to bind in storage. */

  let taskName = new InputComponents('text', 'taskName', 'Enter a task name: ');
  taskName.makeInput(form);

  let taskDue = new InputComponents('date', 'taskDue', 'Task due date: ');
  taskDue.makeInput(form);


  let commentLabel = DOMObjects('label', 'commentLable', form);
  elementText(commentLabel, 'Comments:')
  commentLabel.for = 'taskComment';

  let comment = DOMObjects('textArea', 'taskComment', form);
  comment.id = 'taskComment'
  
  let submit = DOMObjects('button', 'submitBtn', form);
  elementText(submit, 'Submit');

  let cancel = DOMObjects('button', 'cancelBtn', form);
  elementText(cancel, 'Cancel')
  

}
function editTaskForm(taskName, dueDate, comment){
  let bodyContainer = document.querySelector('.bodyContainer');
 
  
  let editForm = DOMObjects('div', 'taskForm', bodyContainer);

  let title = DOMObjects('h3', 'formTitle', editForm);
  title.id = 'formTitle';
  title.value = taskName;
  elementText(title, `Edit Task`);
  
  let editTaskName = new InputComponents('text', 'taskName', 'Task Name: ');
  editTaskName.makeInput(editForm);
  (editTaskName.input).value = taskName; 

  let editTaskDate = new InputComponents('date', 'taskDue', 'Task Due: ');
  editTaskDate.makeInput(editForm);
  (editTaskDate.input).value = new Date(dueDate).toISOString().substring(0, 10);

  let commentLabel = DOMObjects('p', 'commentLabel', editForm);
  elementText(commentLabel, 'Comment')
  
  let editTaskComment = DOMObjects('textarea', 'taskComment', editForm);
  editTaskComment.value = comment;

  let submit = DOMObjects('button', 'submitBtn', editForm);
  elementText(submit, 'submit');
  let cancel = DOMObjects('button', 'cancelBtn', editForm)
  elementText(cancel, 'cancel');

  return {editTaskName: editTaskName.input, editTaskDate: editTaskDate.input, editTaskComment: editTaskComment , submit: submit, cancel: cancel}
}

module.exports = {
  projectForm,
  InputComponents,
  resetInputs,
  AlertWindow,
  createTaskForm,
  editTaskForm
}  