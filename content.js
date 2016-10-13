
$(document).ready(function () {
  console.log('contentJS running');
  const STARS = 'chrome-extension://fcgcolkdcnjfmihjmojdfchebcddbokb/stars_map.png'

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
      if (request.greeting == "hello") {
        // get title
        const title = $('.biz-page-title').text().trim();
        console.log(title);

        // get review count
        let reviewCount = $('.review-count').find('span')[1];
        reviewCount = $(reviewCount).text();
        console.log(reviewCount);

        // image url
        let imgUrl = $('.showcase-container').find('.photo-box-img')[2]
        imgUrl = $(imgUrl).attr('src');
        console.log(imgUrl);

        // url 
        let url = window.location.href;
        console.log(url);

        //icon 
        let ratingX = $('.rating-very-large').find('i')[0];
        ratingX = $(ratingX).css('background-position-x');

        let ratingY = $('.rating-very-large').find('i')[0];
        ratingY = $(ratingY).css('background-position-y');

        let categories = $('.category-str-list').find('a');
        categories = $(categories[0]).text()
        console.log(categories);

        const yelpObj = {
          title,
          reviewCount,
          imgUrl,
          url,
          ratingX,
          ratingY,
          categories
        }
        console.log(yelpObj)

        // update storage
        console.log('accessing storage:');
        chrome.storage.sync.get('yelpObjs', (response) => {
          console.log('currently storing:', response)
          if (Object.keys(response).length > 0) {
            console.log(response);
            response.yelpObjs.push(yelpObj);
          } else {
            response = { yelpObjs: [yelpObj] };
          }

          console.log('adding to storage')
          chrome.storage.sync.set({ 'yelpObjs': response.yelpObjs }, () => {
            chrome.storage.sync.get('yelpObjs', (response) => {
              console.log('storage now contains', response);
              sendResponse({yelpObjects: response.yelpObjs });
            })
          });

        });
      }
      return true;
    })

})

