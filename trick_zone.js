"use strict";

//Pagination function
$(document).ready(function () {
  $("#loadMore").click(function () {
    const loadMoreBtn = document.getElementById("loadMore")
    const new_text = loadMoreBtn.innerHTML.split(" ")[4] * 1
    const new_text_plus = new_text + 1;
    const slug = window.location.pathname.split("/")[2];
    //start ajax request
    $.ajax({
      url: `/forum/comment-list/${slug}/`,
      data: {
        page_number: new_text,
      },
      type: "GET",
      dataType: "json",
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        $("#loadMore").attr("disabled", true);
        $("#loadMore").text("Loading...");
      },
      success: function (res) {
        try {
          if (res.data === "No More Posts to show !!") {
            $("#loadMore").attr("disabled", true);
            $("#loadMore").text("No More Posts to show!!");
          } else {
            if (res.data) {
              $("#loadMore").attr("disabled", false);
              $("#loadMore").text(`Load More ↻ ( ${new_text_plus} )`);
              document
                .getElementById("comment-list")
                .insertAdjacentHTML("beforeend", res.data);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  })
})


// user profile function
function userProfile(username) {
  // select elements
  const modalTitle = document.getElementById("userProfileTitle");
  const user = document.getElementsByClassName("author_name")[0];
  const userImage = document.getElementById("user_image")
  const userRole = document.getElementsByClassName("user_role")[0];
  const posts = document.getElementById("posts");
  const followers = document.getElementById("followers");
  const tricks = document.getElementById("tricks");
  const followBtn = document.getElementById("followBtn");
  const unFollowBtn = document.getElementById("unFollowBtn");
  // fetch data using ajax request
  $.ajax({
    url: `/account/userprofile/${username}/`,
    type: "GET",
    dataType: "json", // added data type
    crossDomain: true,
    success: function (res) {
     if (res.error) {
       alert(res.error);
       return;
     }
     modalTitle.innerHTML = `Profile Page Of : ${res.username}`;
     user.innerHTML = res.username;
     userImage.src = res.image;
     userImage.alt = res.username;
     userRole.innerHTML = `<span class="badge ${res.badge_color} ${res.badge_bg}">${res.badge}</span>`;
     posts.innerHTML = res.posts;
     followers.innerHTML = res.followers;
     tricks.innerHTML = res.tricks;
    //  if res.liked_user is true then disable like button else enable it
     followBtn.disabled = res.followed_user;
     unFollowBtn.disabled = !res.followed_user;
    },
  });
}

// function to submit follow button form
$("#userProfileForm").submit(function (e) {
  e.preventDefault();
  const user = document.getElementById("userInput").value;
  const follower = document.getElementById("follower").value;
  const value = document.getElementById("buttonValue").value;
  const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  $.ajax({
    url: "/account/followerscount/",
    type: "POST",
    dataType: "json", // added data type
    crossDomain: true,
    data: {
      user: user,
      follower: follower,
      value: value,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function (res) {
      alert(`Congratulations! You have successfully ${value} user - ${user}.`);
      window.location.reload(true);
    },
  });
});
