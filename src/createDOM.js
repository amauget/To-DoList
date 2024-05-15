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

module.exports = {
  DOMObjects,
  elementText
}