const{DOMObjects, elementText} = require('./createDOM');

function parseData(){
  let projectName = document.querySelector('.nameInput').value;
  let dueDate = document.querySelector('.dueDateInput').value;
  let priorityRating = undefined;
  
  let priorityRadioBtns = document.querySelectorAll('input[name="priority"]');

  priorityRadioBtns.forEach(item => {
    if(item.checked){
      return priorityRating = item.className;
    }
  })
  //Create Project Object for Storage
  let projectObj = {
    name: projectName,
    due: dueDate,
    priority: priorityRating
  }

  return projectObj;
}

function storeItems(projectObj){
  let storageName = projectObj.name;

  let projectString = JSON.stringify(projectObj);

  localStorage.setItem(storageName, projectString);
  // alert(localStorage.getItem(storageName));
}
function retreiveSideBar(ul){
  let i = 1;
  while(i<= localStorage.length){
    let projectObj = JSON.parse(localStorage.getItem(`Project ${i}`));
    let listName = projectObj.name;

    let li = document.createElement('li');
    li.textContent = (listName);
    ul.append(li);
    // elementText(li, projectObj.name);
   

    i++;
  }
    return ul;
}


module.exports = {
  parseData,
  storeItems,
  retreiveSideBar
}
