"use strict";

//Reset filter function
const resetBtn = document.getElementById("reset-filter");

resetBtn.addEventListener("click", function () {
  window.location.reload();
});

//toggle chacked input
const checkBtn = document.getElementById("quotes-search-input");
checkBtn.addEventListener("change", function () {
  checkBtn.value = checkBtn.checked ? "True" : "False";
});

// filter function
$(document).ready(function () {
  $(".filter-btn").click(function () {
    const query = document.getElementById("search-input").value;
    const gameQuery = document.getElementById("game-search-input").value;
    const quotesQuery = document.getElementById("quotes-search-input").value;
    const slug = window.location.pathname.split("/")[2];
    const box = document.getElementById("comment-list");
    const newBox = document.getElementById("comment-list-new");
    const loadMoreBtn = document.getElementById("loadMore");
    loadMoreBtn.textContent = `Load More ↻ ( 2 )`;
    loadMoreBtn.removeAttribute("disabled");
    //start ajax request
    $.ajax({
      url: `/forum/comment-list/${slug}/`,
      data: {
        author: query,
        game: gameQuery,
        quote: quotesQuery,
      },
      type: "GET",
      dataType: "json",
      crossDomain: true,
      beforeSend: function () {
        box.style.display = "none";
      },
      success: function (res) {
        if (res.data) {
          newBox.innerHTML = res.data;
        }
      },
    });
  });
});

//Pagination function
$(document).ready(function () {
  $("#loadMore").click(function () {
    const query = document.getElementById("search-input").value;
    const gameQuery = document.getElementById("game-search-input").value;
    const quotesQuery = document.getElementById("quotes-search-input").value;
    const loadMoreBtn = document.getElementById("loadMore");
    const new_text = loadMoreBtn.innerHTML.split(" ")[4] * 1;
    const new_text_plus = new_text + 1;
    const slug = window.location.pathname.split("/")[2];
    //start ajax request
    $.ajax({
      url: `/forum/comment-list/${slug}/`,
      data: {
        author: query,
        game: gameQuery,
        quote: quotesQuery,
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
              ((query || gameQuery || quotesQuery) &&
                document
                  .getElementById("comment-list-new")
                  .insertAdjacentHTML("beforeend", res.data)) ||
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
  });
});

function insertEmoji(event) {
  let emoji = event.target.outerHTML;
  // replace emoji
  let newEmoji = emoji.replace('onclick="insertEmoji(event)"', "");
  const textAreaContent = document.getElementById("id_comment_content");
  textAreaContent.value += newEmoji;
}

// define function block user
function blockUser(username) {
  // show confirmation dialog box
  var confirmation = confirm(
    `Are you sure you want to block user - ${username} from this forum? This action is irreversible.`
  );
  if (!confirmation) {
    return;
  }
  // get value of csrf token
  var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  // make ajax request to block user
  $.ajax({
    url: "/account/block_user/",
    type: "POST",
    dataType: "json", // added data type
    crossDomain: true,
    data: {
      username: username,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function (res) {
      // show modal box
      $("#myModal").modal("show");
      // add block heading
      $("#block_heading").text("✅ Great Job!");
      // display success message and add class success color
      $(".material-icons").innerHTML = "check_circle";
      $(".modal-title").addClass("text-success");
      $(".modal-body").addClass("text-success");
      $("#block_message").text(
        `User ${username} has been blocked successfully and all his posts have been removed.`
      );
      // page reload when click on modal ok button
      $("#block_ok").click(function () {
        location.reload(true);
      });
    },
    error: function (xhr, status, error) {
      $("#myModal").modal("show");
      // add block heading
      $("#block_heading").text("❌ Oops! Something went wrong.");
      // display error message and add class danger color
      $(".material-icons").innerHTML = "❌";
      $(".modal-title").addClass("text-danger");
      $(".modal-body").addClass("text-danger");
      $("#block_message").text(xhr.responseJSON.error);
    },
  });
}


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
  // const unFollowBtn = document.getElementById("unFollowBtn");
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
    //  unFollowBtn.disabled = !res.followed_user;
    },
  });
}

//  function to like user
$("#followBtn").click(function () {
  // get value of input having id followedUser
  var followedUser = document.getElementsByClassName("author_name")[0].innerHTML;
  // get value of csrf token
  var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  // make ajax request to like user
  $.ajax({
    url: "/forum/matka-guessing/",
    type: "POST",
    dataType: "json", // added data type
    crossDomain: true,
    data: {
      followedUser: followedUser,
      csrfmiddlewaretoken: csrftoken,
      follow: "follow",
    },
    success: function (res) {
      if (res.success === true) {
        alert(`${res.message} - ${followedUser}.`);
        // refresh window
        location.reload(true);
      }
    },
    error: function (xhr, status, error) {
      alert("An error occurred while following user.");
    },
  });
});

//  function to dislike user
// $("#unFollowBtn").click(function () {
//   // get value of input having id dislikedUser
//   var unFollowedUser = document.getElementsByClassName("author_name")[0].innerHTML;
//   // get value of csrf token
//   var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
//   // make ajax request to like user
//   $.ajax({
//     url: "/forum/matka-guessing/",
//     type: "POST",
//     dataType: "json", // added data type
//     crossDomain: true,
//     data: {
//       unFollowedUser: unFollowedUser,
//       csrfmiddlewaretoken: csrftoken,
//       unfollow: "unfollow",
//     },
//     success: function (res) {
//       if (res.success === true) {
//         alert(`${res.message} - ${unFollowedUser}.`);
//         // refresh window
//         location.reload(true);
//       }
//     },
//     error: function (xhr, status, error) {
//       alert("An error occurred while unfollowing user.");
//     },
//   });
// });

// show to home function
function showToHome(id) {
  // get value of csrf token
  var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  // make ajax call
  $.ajax({
    url: `/forum/add-comment-to-home/`,
    type: "POST",
    dataType: "json", // added data type
    crossDomain: true,
    data: {
      comment_id: id,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function (res) {
      if (res.success === true) {
        alert("Comment added to home page successfully.");
      }
      if (res.success === false) {
        alert("Comment for this user is already added to home page.");
      }
    },
  });
}
