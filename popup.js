console.log('ready');
const button = document.getElementById('add-button')
const clearButton = document.getElementById('clear-button')

chrome.storage.sync.get('yelpObjs', (response) => {
  console.log(response);
  if (Object.keys(response).length !== 0) {
    
    let bizCard = '';
    response.yelpObjs.forEach((item, index) => {
      bizCard += '<div class="row" id="' + index + '">'
      bizCard += '<div class="col-pic">'
      bizCard += '<img class="img-card" src="' + item.imgUrl + '" />'
      bizCard += '</div>'
      bizCard += '<div class="col-text">'
      bizCard += '<div class="name"><a target="_blank" href="' + item.url + '">' + item.title + '</a></div>'
      bizCard += '<div class="category">' + item.categories + '</div>'
      bizCard += '<div class="review-count" style="background-position: ' + item.ratingX + ' ' + item.ratingY + '"></div>'
      bizCard += '<div>' + item.reviewCount + ' Ratings</div>'
      bizCard += '</div>'
      bizCard += '<div class="col-del-but">'
      bizCard += '<button id="deleter">Delete</button>'
      bizCard += '</div>'
      bizCard += '</div>'
    });

    document.querySelector('#list').innerHTML = bizCard;
    const rows = [...document.getElementsByClassName('row')];
    console.log(rows);
    rows.forEach((row) => {
          row.addEventListener('click', (event) => {
            if (event.target.id === 'deleter') {
              console.log('deleter clicked for row' + event.target.parentNode.parentNode.id)
              let newYelpObjs = response.yelpObjs.slice();
              newYelpObjs.splice(Number(event.target.parentNode.parentNode.id), 1)
              console.log('new yelp objs', newYelpObjs);
              chrome.storage.sync.set({'yelpObjs': newYelpObjs});
              console.log(event.target.parentNode.parentNode);
              event.target.parentNode.parentNode.remove();
            }
          })
        })
  }
})

// allow user to clear events
clearButton.addEventListener('click', function () {
  chrome.storage.sync.clear(() => console.log('cleared events'));
  document.querySelector('#list').innerHTML = '';
})
// when button is clicked, run content script
button.addEventListener('click', function () {
  // console.log('clicked');

  // run content.js and add a card to chrome.storage.sync
  // requests yelpObjs array 
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
      // console.log(response.yelpObjects);
      // create card for each object in yelpObjs
      if (response) {
        
        document.querySelector('#list').innerHTML = '';
        let bizCard = '';

        response.yelpObjects.forEach((item, index) => {
          bizCard += '<div class="row" id="' + index + '">'
          bizCard += '<div class="col-pic">'
          bizCard += '<img class="img-card" src="' + item.imgUrl + '" />'
          bizCard += '</div>'
          bizCard += '<div class="col-text">'
          bizCard += '<div class="name"><a target="_blank" href="' + item.url + '">' + item.title + '</a></div>'
          bizCard += '<div class="category">' + item.categories + '</div>'
          bizCard += '<div class="review-count" style="background-position: ' + item.ratingX + ' ' + item.ratingY + '"></div>'
          bizCard += '<div>' + item.reviewCount + ' Ratings</div>'
          bizCard += '</div>'
          bizCard += '<div class="col-del-but">'
          bizCard += '<button id="deleter">Delete</button>'
          bizCard += '</div>'
          bizCard += '</div>'
        });
        
        document.querySelector('#list').innerHTML = bizCard;

        const rows = [...document.getElementsByClassName('row')];
        console.log(rows);
        rows.forEach((row) => {
          row.addEventListener('click', (event) => {
             if (event.target.id === 'deleter') {
              console.log('deleter clicked for row' + event.target.parentNode.parentNode.id)
              let newYelpObjs = response.yelpObjs.slice();
              newYelpObjs.splice(Number(event.target.parentNode.parentNode.id), 1)
              console.log('new yelp objs', newYelpObjs);
              chrome.storage.sync.set({'yelpObjs': newYelpObjs});
              console.log(event.target.parentNode.parentNode);
              event.target.parentNode.parentNode.remove();
            }
          })
        })

      }
      else {
        console.log('You aren\'t on a valid yelp business page');
      }
      return true;

    });
  });

})

