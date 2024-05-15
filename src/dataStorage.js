const{DOMObjects, elementText} = require('./createDOM');

function parseData(){
  let projectName = document.querySelector('.nameInput').value;
  let dueDate = dateFormat();

  let priorityRating = undefined;
  
  let priorityRadioBtns = document.querySelectorAll('input[type="radio"]');

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

function dateFormat(){
  let dueDate = document.querySelector('.dueDateInput').value;
  /*DUE DATE INDEXES: 0-3 year, 4 slash, 5-6 month, 7 slash, 8-9 day */
  let dueDateIndex = [5,6,4,8,9,7,0,1,2,3];
  let dateString = ``;
  for(i of dueDateIndex){
   dateString += `${dueDate[i]}`;
  }
  return dateString;
}

function storeItems(projectObj){
  let storageName = projectObj.name;

  let projectString = JSON.stringify(projectObj);

  localStorage.setItem(storageName, projectString);
}
function projectList(){
  let ul = document.querySelector('.projectList');
  ul.innerHTML = '';
  let nameArray = []; /* Array to append all key names */
  for (let i = 0; i < localStorage.length; i++){

    let keyName = localStorage.key(i);
    nameArray.push(keyName);
  }
  nameArray = nameArray.sort(); /* alphabetize before creating list */
  for (item of nameArray){
    let li = DOMObjects('li', 'sideBarList', ul);
    elementText(li, item);
  }
    return ul;
}


module.exports = {
  parseData,
  storeItems,
  projectList
}
