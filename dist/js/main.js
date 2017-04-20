// General function to detect whether a given element is in viewport
// By DEFAULT, only checks whether TOP of element is in view. Pass in second attribute to check for top and bottom (not approp. for elements SMALLER than the page)
function inView(el, both){
  // Calculate the distance of the element's top and bottom from the top of the viewport
  var elT = el.getBoundingClientRect().top;
  // Get the height of the viewport
  var vH = document.documentElement.clientHeight;
  // Check whether both is true or false
  if (both) {
    // If the user wants both top and bottom, then additionally get the bottom of the element
    var elB = el.getBoundingClientRect().bottom;
    // Check that top AND bottom are close to the ends of the viewport OR beyond it
    if ((vH*0.2) > elT && elB > vH-(vH*0.2)) {
      return true;
    } else {
      return false;
    }
  } else {
    // Check ONLY if top is in view
    if (0 < elT && elT < vH) {
      return true;
    } else {
      return false;
    }
  }
// End the function
}

///////////////////////////////////////////////////////
// Animate numbers up to their specified value from zero
///////////////////////////////////////////////////////

// Grab all the numbers on the document
var numbers = document.querySelectorAll('span');
// For each number element, do stuff
numbers.forEach(function(element){
  // Grab the value (target value) of each number and save as a var
  var value = element.childNodes[0].nodeValue;
  // If there are commas, currency marks or some other stuff in the value, ignore it entirely
  if (isNaN(value)) {
    return;
  }
  // Set the inner text value to 0
  element.childNodes[0].nodeValue = 0;
  // Get the height of the number in ther document
  var elementHeight = element.getBoundingClientRect().top;
  // While scrolling, do things
  window.addEventListener('scroll', function(){
    // Does the element already have the loaded class? If so, do naught
    if (element.classList.contains('loaded')){
      return;
    }
    // Get the bottom ov the viewport in px
    var viewportEnd = document.body.scrollTop + document.documentElement.clientHeight;
    // Has the element scrolled into view yet?
    if (viewportEnd > elementHeight) {
      // Add the loaded class
      element.classList += " loaded";
      // Now, chop the animation range into fifty integer steps, adding 1 to avoid the trap if value/50 is less than 1
      var stepValue = Math.floor(value/50)+1;
      // Run the following every 50 milliseconds, so the whole animation takes three seconds
      setInterval(function(){
        // Add the step value to the original value
        var newValue = parseInt(element.childNodes[0].nodeValue) + stepValue;
        // If we've reached the original value, then stop and set the final value
        if (newValue >= value) {
          clearInterval();
          element.childNodes[0].nodeValue = value;
        }else{
          // Otherwise, set the value to the new value
          element.childNodes[0].nodeValue = newValue;
        }
      // End interval loop
    },50)
    // End check whether element in view
    }
  // End event listener
  })
// End foreach function
})

//////////////////////////////////
// Bring the navigation into view
//////////////////////////////////

// Grab the nav
var navigation = document.querySelector('nav');
// While scrolling, do things
window.addEventListener('scroll', function(){
  // If the user has scrolled beyond the first viewport-worth of height and is more than one viewport from the bottom, then do things
  var topTrigger = parseInt(document.documentElement.clientHeight);
  var bottomTrigger = parseInt(document.documentElement.scrollHeight) - topTrigger * 2;
  var currentPos = document.body.scrollTop;
  // Act
  if (bottomTrigger > currentPos && currentPos > topTrigger) {
    navigation.style.left = "0px";
  } else {
    navigation.style.left = "-250px";
  }
// End scroll listener
});

///////////////////////////
// Trigger image animations
///////////////////////////

// Grab all the image tags
var images = document.querySelectorAll('img');
// For each image, check whether it's in view, and if it is, apply the 'animate' class
images.forEach(function(image){
  window.addEventListener('scroll', function(){
    if (inView(image) && !image.classList.contains('animating')) {
        image.classList.add("animating");
    }
  })
})

///////////////////////////////////////////////
// Animate section titles and navigation colors
///////////////////////////////////////////////

// Grab all the articles
var articles = document.querySelectorAll('article');
// For each article, do stuff
articles.forEach(function(article){
  window.addEventListener('scroll', function(){
    // Get the id of the visible section for the nav
    var navClass = article.id;
    // Check whether the section is in view and add the visible class, else lose it
    if (inView(article, 1)) {
      if (!article.classList.contains("visible")) {
        article.classList.add("visible");
        // And add a class to the navigation
        navigation.classList.add(navClass);
        // Also fix the colours of the nav for better text contrast
        if (window.getComputedStyle(article).backgroundColor !== 'rgba(0, 0, 0, 0)') {
          navigation.classList.add('inverted');
        } else {
          navigation.classList.remove('inverted');
        }
      }
    } else {
      article.classList.remove("visible");
      navigation.classList.remove(navClass);
    }
  });
});


// MOVE THE MONEY PIE on big screens

if (document.documentElement.clientWidth>700) {
  document.querySelector('article#money').addEventListener('mousemove', function(e){
    var rotationX = -((e.clientX/document.documentElement.clientWidth)*30)+30;
    var rotationY = ((e.clientY/document.documentElement.clientHeight)*30)-15;
    var chart = document.querySelector('svg#money');
    chart.style.transform = 'rotate3d(0,1,0,'+rotationX+'deg) rotate3d(1,0,0,'+rotationY+'deg)';
  })
}

if (document.documentElement.clientWidth>700) {
  document.querySelector('article#advice').addEventListener('mousemove', function(e){
    var rotationX = -((e.clientX/document.documentElement.clientWidth)*30)+30;
    var rotationY = ((e.clientY/document.documentElement.clientHeight)*30)-15;
    var chart = document.querySelector('svg#advice');
    chart.style.transform = 'rotate3d(0,1,0,'+rotationX+'deg) rotate3d(1,0,0,'+rotationY+'deg)';
  })
}
