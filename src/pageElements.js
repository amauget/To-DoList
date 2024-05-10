
class PageItem{
  constructor(element, parent){
    this.element = element;
    this.parent = parent;
    this.DOMItem = document.createElement(this.element);
  }
  createDom(){
    if(this.parent.className !== 'bodyContainer'){
      this.parent = this.parent.DOMItem; 
    }
    this.parent.appendChild(this.DOMItem); 
  }
  class(name){
    this.DOMItem.className = name;
  }
}
function pageElements(bodyContainer){
  header(bodyContainer);
  sideBar(bodyContainer);
 
}
function elementText(item, text){
  item = item.DOMItem;
  return item.innerHTML = text;  
}

function header(bodyContainer){
  const header = new PageItem('header', bodyContainer);
  header.createDom();

  const headerChild = new PageItem('h1',header);
  headerChild.createDom()
  headerChild.class('headerChild')
  elementText(headerChild, 'H1');


  const paragraph = new PageItem('p', headerChild);
  paragraph.createDom();
  paragraph.class('paragraph')
  elementText(paragraph, 'Welcome to the page! I hope you find it useful.' )
  return header;
}
function sideBar(bodyContainer){
  const sideBarContainer = new PageItem('div', bodyContainer);
  sideBarContainer.createDom();
  sideBarContainer.class('sideBarContainer');
}


export default pageElements;