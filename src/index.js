import pageElements from './pageElements.js';


  let body = document.querySelector('body');

  let bodyContainer = document.createElement('div');
  bodyContainer.className = 'bodyContainer';

  pageElements(bodyContainer);

  body.appendChild(bodyContainer);

  console.trace();  
