  console.log('ready');
  const button = document.getElementById('add-button')
  const clearButton = document.getElementById('clear-button')

  // allow user to clear events
  clearButton.addEventListener('click', function () {
    chrome.storage.sync.clear(() => console.log('cleared events'))  ;
  })
  // when button is clicked, run content script
  button.addEventListener('click', function () {
    console.log('clicked');

    chrome.storage.sync.get('yelpObjs', (response) => {
      console.log(response);
    })

    // run content.js and add a card to chrome.storage.sync
    // requests yelpObjs array 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
        console.log(response.yelpObjs);
        // create card for each object in yelpObjs


      });
    });

  })
  
