const{DOMObjects, elementText} = require('./createDOM');

function parseData(nameInput, dateInput, priorityRating){
  let projectName = nameInput.value;
  let dueDate = dateFormat(dateInput.value);

  //Create Project Object for Storage
  let projectObj = {
    name: projectName,
    due: dueDate,
    priority: priorityRating
  }

  return projectObj;
}

function dateFormat(dueDate){
  let dateString = ``;

  if(dueDate !== ''){

    let dueDateIndex = [5,6,4,8,9,7,0,1,2,3];
      /*DUE DATE INDEXES:  5-6 month, 4 slash, 8-9 day, 7 slash, 0-3 year, */

    for(i of dueDateIndex){
      dateString += `${dueDate[i]}`;
    }
  }
  return dateString;
}

function storeItems(projectObj){
  let storageName = projectObj.name;

  let projectString = JSON.stringify(projectObj);

  localStorage.setItem(storageName, projectString);
}
function removeProject(key){
  return localStorage.removeItem(key);
}
function projectList(){ /* rewrite to sort based on due date */

  let ul = document.querySelector('.projectList');
  ul.innerHTML = ''; 
  let dataArray = []; /* Array to append all key names */
  for (let i = 0; i < localStorage.length; i++){
    let keyName = localStorage.key(i);
    let dueDate = JSON.parse(localStorage.getItem(keyName));
    dataArray.push(dueDate);
  }
  
  let parseDate = (dateStr) => {
    let [month, day, year] = dateStr.split('-');
    return new Date(year, month - 1, day); // Months are 0-based
  }
  dataArray.sort((a, b) => parseDate(a.due) - parseDate(b.due));

  let formatDate = (date) => {
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  // Access each object and format its due date
  dataArray.forEach(item => {
    let dueDate = parseDate(item.due);
    let formattedDate = formatDate(dueDate);

    let li = DOMObjects('li','sideBarList', ul);

    let name = DOMObjects('p', 'projectListName', li);
    elementText(name,item.name )
    

    let due = DOMObjects('p', 'projectListDue', li);
    elementText(due, formattedDate);
      
  });
    return ul;
}

function findStorageIndex(projectName){ /* STILL BUGGY */
  let index = undefined;
  let array = []
  /* project 12: index 0, project 5: index 1 */
  for(let i = 0; i < localStorage.length; i++){
    array.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  for(i in array){
    if(projectName === array[i].name){
      index = i;
    }
  }
return index;
  
}

module.exports = {
  parseData,
  storeItems,
  projectList,
  removeProject,
  findStorageIndex
}
