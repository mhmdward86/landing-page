/**
*
* Manipulating the DOM exercise.
* Exercise programmatically builds navigation,
* scrolls to anchors from navigation,
* and highlights section in viewport upon scrolling.
*
* Dependencies: None
*
* JS Version: ES2015/ES6
*
* JS Standard: ESlint
*
*/

/**
* Define Global Variables
*
*/
// define teh active setcion number which will be used to avoid repainting the viw as long as the active section doesn't change
let activeSection="1";
// Configure variables that will control the timout to hide teh Navigation bar
const TimeoutPeriod=5000;
let timeoutHandle = window.setTimeout(hideNavBar,TimeoutPeriod);

/**
* End Global Variables
* Start Helper Functions
*
*/
//
// Respond to user clicks for different sections
function respondToNavClick(event){
  // Check if a link was clicked or another area in the navigaton bar

  if(event.target.nodeName==="A")
  {
    //remove the word link from ID and retunt the ID no.
    const sectionNum=event.target.id.slice(4);
    scrollToSection(sectionNum);
    repaintSection(sectionNum);
  }

}
// Show Navigaton BAr if it is hidden
function showNavBar(){
  // Show Nav Bar if it is hidden
  if(navBar.style.display=="none")
  navBar.style.display="block";
  // Reset Visibility timer of the Navigation bar
  window.clearTimeout(timeoutHandle);
  timeoutHandle = window.setTimeout(hideNavBar,TimeoutPeriod);
}
// Show top bottom if it is hidden
function showTopButton(){
  if (document.body.scrollTop > 0 && toTopButton.style.display == "none") {
    toTopButton.style.display = "block";
  } else if (document.body.scrollTop <= 0){
    toTopButton.style.display = "none";
  }
}
// Hide the Navigation bar after timeout Period
function hideNavBar()
{
  navBar.style.display="none";
}
// Scrolling to thr top of the page
function toTop(){
  document.body.scrollTo({
  top: 0,
  behavior: 'smooth',
});
  repaintSection(1);
}
/**
* End Helper Functions
* Begin Main Functions
*
*/

// build the nav
// Create a div Element to contain the Navigation BAr which will be useful to show the Navabr when mouse moves over its location
const navBarContainer=document.createElement('div');
navBarContainer.setAttribute("class","nav-container");
// Create Navigation Bar
const navBar=document.createElement('ul');

// Get No. of sections in the Page
const sectionCount=document.querySelectorAll("section").length;
// create Navigation Bar item for each section (starting from section 1 )
for(let i=1;i<sectionCount+1;i++)
{
  let navItem=document.createElement('li');
  //  navItem.innerHTML=`<a id="link${i}" href="#section${i}">Section ${i}</a>`;
  navItem.innerHTML=`<a id="link${i}" >Section ${i}</a>`;
  navBar.appendChild(navItem);
}

// Append the Navigation Bar to the body of the DOM ()
navBarContainer.appendChild(navBar);
document.body.appendChild(navBarContainer);
// Create toTop Button
const toTopButton=document.createElement('button');
toTopButton.setAttribute("id","topBtn");
toTopButton.setAttribute("onclick","toTop()");
toTopButton.textContent="Back to Top";
document.body.appendChild(toTopButton);
// Add class 'active' to section when near top of viewport
document.getElementById("link1").setAttribute("class","active");
//scroll to the pagetop
toTop();
// Scroll to anchor ID using scrollTO event
function  scrollToSection(sectionNum){
  const section=document.getElementById("section"+sectionNum);
//  document.body.scrollTo(0,section.offsetTop-navBar.getBoundingClientRect().height);
  document.body.scrollTo({
  top: section.offsetTop-navBar.getBoundingClientRect().height,
  behavior: 'smooth',
});
}
// Collapse section Contents
function collapse(index){
  const section=document.getElementById(`section${index}`);
  const button=document.getElementById(`collapse${index}`);
  if(button.innerHTML=="+"){
    button.innerHTML="-";
  }
  else{
    button.innerHTML="+";
  }
  const paragarphs=section.querySelectorAll("p");
  for(const pargarph of paragarphs)
  {
    if(pargarph.style.display=="none")
    {
      pargarph.style.display="block";
    }
    else{
      pargarph.style.display="none";
    }
  }
}

/**
* End Main Functions
* Begin Events
*
*/
// respond to mouse Over to show the Navigation Bar
navBarContainer.addEventListener("mouseover",showNavBar);
// Respond to Navigation Bar Clicks
navBar.addEventListener("click",respondToNavClick);
// Respond to Scroll Events
document.addEventListener("scroll",respondToScroll);

//set first menu item as active at initial state
document.querySelector("#link1").setAttribute("class","active");
//
// Scroll to section on link click
// The 1st section with least one visible line  below the navigation bar will be selected as the current active section
function respondToScroll(){
  // Show Navigation Bar if it is hidden
  showNavBar();
  // Show Back to Top buttton if it is hidden
  showTopButton();
  const sectionsList=document.querySelectorAll("section");
  let count=1;
  for (const section of sectionsList)
  {
    const paragraphs= section.querySelectorAll("p");
    // the section Bottom was set to the bottom of the last pargraph element instead of section bottom to avoid the case when the last text line is invisible but the margin around the section is still visible
    const sectionBottom=paragraphs[paragraphs.length-1].getBoundingClientRect().bottom;
    if(sectionBottom>=navBar.getBoundingClientRect().height)
    {
      if(count!=activeSection)
      {
        repaintSection(count);
      }
      break;
    }
    count++;
  }
}
// Set sections as active
// This Function is used to style the active section and reset the inactive section
function repaintSection(sectionNum){

  if(sectionNum!=activeSection)
  {
    document.getElementById("link"+activeSection).setAttribute("class","inactive");
    document.getElementById("link"+sectionNum).setAttribute("class","active");
    document.getElementById("section"+activeSection).setAttribute("class","inactive");
    document.getElementById("section"+sectionNum).setAttribute("class","your-active-class");
    activeSection=sectionNum;
  }
}
