"use strict";

//Get the button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
// Get scrollToBottomBtn button
const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");
//show btn when user scroll down
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

//onclick scroll to top function
scrollToTopBtn.onclick = function () {
  document.body.scrollTop = {
    top: 0,
    behavior: "smooth"
  }
  document.documentElement.scrollTop = {
    top: 0,
    behavior: "smooth"
  }
};

// Function to scroll to bottom of body

scrollToBottomBtn.onclick = function () {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth"
  })
};
