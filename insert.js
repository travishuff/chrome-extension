var toinsert = '<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyDmJ1ODTr1ks8AR3GDGkg5K7F3CjHUkwW0&callback=initMap\"async \'';

var hold = document.getElementById('fb-root');
hold.insertAdjacentHTML('afterend', toinsert);
var hold2 = document.getElementById('fb-root');

var businessAddress = document.getElementsByTagName('address')[0].innerHTML.trim();
businessAddress = businessAddress.split(',').join('');
var nubusinessAdree = '';
for (var i = 0; i < businessAddress.length; i++) {
  if(businessAddress[i] !== ' ' && businessAddress[i] !== ','){
    nubusinessAdree += businessAddress[i];
  }
  else if (businessAddress[i - 1] !== ' ') {
    nubusinessAdree += '+';
  }
}

function success(position) {
  let coordObj = {};
  coordObj.latitude  = position.coords.latitude;
  coordObj.longitude = position.coords.longitude;
  let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + coordObj.latitude + ',' + coordObj.longitude;
  url += '&destinations=' + nubusinessAdree;
  url += '&transit_mode=driving&units=imperial&key=AIzaSyBQkKWPXp3jVOahC9REXWIjSCbppsKV4eA';
  fetch(url)
      .then(function(response) {
         return response.json();
      }).then(function (test) {
        let distance = test.rows[0].elements[0].distance.text;
        let time = test.rows[0].elements[0].duration.text;
        // console.log(distance.replace(/[^0-9.]/g, ""), time.replace(/[^0-9]/g, ""));
        // console.log(coordObj)

        let div=document.createElement("div");
        div.style.color = "#666"
        div.innerText = distance;
        div.innerText += " ";
        div.innerText += time;
        div.innerText += "   "
        div.innerHTML += "<img style=\'width:60px;\' src=\'http://www.clker.com/cliparts/0/c/0/b/12065639991561891203zager_Sedan_Car.svg.hi.png\' />"
        let dist = distance.replace(/[^0-9.]/g, "");
        let ti = time.replace(/[^0-9]/g, "");
        if (dist * 2.2 < ti) {
          div.style.color = "#ed0008";
        }
        var title= document.getElementsByTagName('h1')
        title[0].appendChild(div);
    })

  return coordObj;
};

function error() {
  console.log("Unable to retrieve your location");
};

navigator.geolocation.getCurrentPosition(success, error);
