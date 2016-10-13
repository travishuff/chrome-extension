console.log('contentJS running');
const STARS = 'chrome-extension://fcgcolkdcnjfmihjmojdfchebcddbokb/stars_map.png'
$(document).ready( function() {

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
})