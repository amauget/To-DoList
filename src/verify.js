const{storedDataArray} = require('./dataStorage');

function findStorageIndex(projectName){ 
  let index = undefined;
  let dataArray = storedDataArray(); 
  for(i in dataArray){
    if(projectName === dataArray[i].name){
      index = i;
    }
  }
return index;
  
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

module.exports = {
  findStorageIndex,
  requiredInputs,
}