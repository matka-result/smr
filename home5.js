"use strict";

// get today's date and day
var today = new Date();
// get date in d/m/y format
var date =
  today.getDate().toString().padStart(2, "0") +
  "/" +
  (today.getMonth() + 1).toString().padStart(2, "0") +
  "/" +
  today.getFullYear().toString();
// get today's day in a string format
var day = today.toLocaleDateString("en-US", { weekday: "short" });

//   select input having id "inputGameName"
var gameNameSelectOne = document.getElementById("inputGameNameOne");
var gameNameSelectTwo = document.getElementById("inputGameNameTwo");
var gameNameSelectThree = document.getElementById("inputGameNameThree");
// select input game stats
var gameState = document.getElementById("inputGameStats");

// select all gameName
var gameNameOne = document.getElementById("gameNameOne");
var gameNameTwo = document.getElementById("gameNameTwo");

// get all gameStateChanged
var gameStateChangeOne = document.getElementById("gameStateChangeOne");
var gameStateChangeTwo = document.getElementById("gameStateChangeTwo");

// select date by id
var dateInput = document.getElementById("inputDate");
var dayInputOne = document.getElementById("dayInputOne");
var dayInputTwo = document.getElementById("dayInputTwo");
var stateChartTitle = `${gameNameOne.innerHTML.toUpperCase()} BAZAR LOAD CHART`;

var labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var barColors = [
  "red",
  "green",
  "blue",
  "orange",
  "brown",
  "purple",
  "indigo",
  "khaki",
  "pink",
  "black",
];

var ctx = document.getElementById("loadChart");
// topLabels plugin
var topLabels = {
  id: "topLabels",
  afterDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      scales: { x, y },
    } = chart;

    chart.data.datasets[0].data.forEach((datapoint, index) => {
      const datasetArray = [];
      chart.data.datasets.forEach((dataset) => {
        datasetArray.push(dataset.data[index]);
      });
      // function that return values
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "purple";
      ctx.textAlign = "center";
      ctx.fillText(
        datasetArray + "%",
        x.getPixelForValue(index),
        chart.getDatasetMeta(0).data[index].y - 10
      );
    });
  },
};

// function to show game name list for home when page initially loads
document.addEventListener("DOMContentLoaded", function () {
  var gameNameList = document.querySelectorAll("#game_name_list");
  var html  = ''
  // add game names to the dropdown list
  gameNameList.forEach((item) => {
    var option = document.createElement("option");
    option.value = item.innerHTML.slice(2, -2);
    option.textContent = item.innerHTML.slice(2, -2);
    //   check if item.game_name is "KALYAN" and set it as selected
    if (item.innerHTML.slice(2, -2) === "KALYAN") {
      option.selected = true;
      html += `<option value="${option.value}" selected>${option.textContent}</option>`
    } else {
      html += `<option value="${option.value}">${option.textContent}</option>`
    }
  });

  gameNameSelectOne.innerHTML = html;
  gameNameSelectTwo.innerHTML = html;
  gameNameSelectThree.innerHTML = html;

  // set date to current date
  dateInput.innerHTML = "Date: " + date + ` (${day})`;
  dayInputOne.innerHTML = day == "Sun" ? "Mon" : day;
  stateChartTitle = day == "Sun" ? "Today is Sunday, So it is holiday today" : `${gameNameOne.innerHTML.toUpperCase()} BAZAR LOAD CHART`;
  // dayInputThree.innerHTML = data.day;

  // get initial data of game "KALYAN"
  var kalyan_open_data = document.getElementById("load_chart").value;
  var kalyan_data = kalyan_open_data.slice(1, -1).split(", ").map(Number);
  new Chart("loadChart", {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: stateChartTitle,
          data: day == "Sun" ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : kalyan_data,
          borderWidth: 1,
          backgroundColor: barColors,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 5 },
        },
      },
    },
    plugins: [topLabels],
  });

  // select multiple content having id trick_of_day
  var trickOfDay = document.querySelectorAll("#trick_of_day");
  // remove class active from all elements
  trickOfDay.forEach((item) => {
    // replace all 00, 05, 50, 55 with <span class='fiftyfive'>55</span>, <span class='fifty'>50</span>, <span class='five'>5</span>, <span class='zero'>0</span>
    item.innerHTML = item.innerHTML.replaceAll("00", "<span class='fiftyfive'>00</span>");
    item.innerHTML = item.innerHTML.replaceAll("05", "<span class='fiftyfive'>05</span>");
    item.innerHTML = item.innerHTML.replaceAll("50", "<span class='fiftyfive'>50</span>");
    item.innerHTML = item.innerHTML.replaceAll("55", "<span class='fiftyfive'>55</span>");
    // replace all 11, 16, 61, 66 with <span class='eleven'>11</span>, <span class='sixteen'>16</span>, <span class='sixtyone'>61</span>, <span class='sixtysix'>66</span>
    item.innerHTML = item.innerHTML.replaceAll("11", "<span class='eleven'>11</span>");
    item.innerHTML = item.innerHTML.replaceAll("16", "<span class='eleven'>16</span>");
    item.innerHTML = item.innerHTML.replaceAll("61", "<span class='eleven'>61</span>");
    item.innerHTML = item.innerHTML.replaceAll("66", "<span class='eleven'>66</span>");
    // replace all 22, 27, 72, 77 with <span class='twentytwo'>22</span>, <span class='twentyseven'>27</span>, <span class='seventytwo'>72</span>, <span class='seventyseven'>77</span>
    item.innerHTML = item.innerHTML.replaceAll("22", "<span class='twentytwo'>22</span>");
    item.innerHTML = item.innerHTML.replaceAll("27", "<span class='twentytwo'>27</span>");
    item.innerHTML = item.innerHTML.replaceAll("72", "<span class='twentytwo'>72</span>");
    item.innerHTML = item.innerHTML.replaceAll("77", "<span class='twentytwo'>77</span>");
    // replace all 33, 38, 83, 88 with <span class='thirtythree'>33</span>, <span class='thirtyeight'>38</span>, <span class='eightthree'>83</span>, <span class='eighteight'>88</span>
    item.innerHTML = item.innerHTML.replaceAll("33", "<span class='thirtythree'>33</span>");
    item.innerHTML = item.innerHTML.replaceAll("38", "<span class='thirtythree'>38</span>");
    item.innerHTML = item.innerHTML.replaceAll("83", "<span class='thirtythree'>83</span>");
    item.innerHTML = item.innerHTML.replaceAll("88", "<span class='thirtythree'>88</span>");
    // replace all 44, 49, 94, 99 with <span class='fortyfour'>44</span>, <span class='fortynine'>49</span>, <span class='ninetyfour'>94</span>, <span class='ninetynine'>99</span>
    item.innerHTML = item.innerHTML.replaceAll("44", "<span class='fortyfour'>44</span>");
    item.innerHTML = item.innerHTML.replaceAll("49", "<span class='fortyfour'>49</span>");
    item.innerHTML = item.innerHTML.replaceAll("94", "<span class='fortyfour'>94</span>");
    item.innerHTML = item.innerHTML.replaceAll("99", "<span class='fortyfour'>99</span>");
    // replace all 17, 71, 21, 12, 76, 67, 62, 26 with <span class='twentyone'>21</span>, <span class='twelve'>12</span>, <span class='sixtyseven'>67</span>, <span class='sixtytwo'>62</span>, <span class='twentysix'>26</span>
    item.innerHTML = item.innerHTML.replaceAll("17", "<span class='twentyone'>17</span>");
    item.innerHTML = item.innerHTML.replaceAll("71", "<span class='twentyone'>71</span>");
    item.innerHTML = item.innerHTML.replaceAll("21", "<span class='twentyone'>21</span>");
    item.innerHTML = item.innerHTML.replaceAll("12", "<span class='twentyone'>12</span>");
    item.innerHTML = item.innerHTML.replaceAll("76", "<span class='twentyone'>76</span>");
    item.innerHTML = item.innerHTML.replaceAll("67", "<span class='twentyone'>67</span>");
    item.innerHTML = item.innerHTML.replaceAll("62", "<span class='twentyone'>62</span>");
    item.innerHTML = item.innerHTML.replaceAll("26", "<span class='twentyone'>26</span>");
    // replace all 13, 31, 36, 63, 81, 18, 68, 86 with <span class='thirtyone'>13</span>, <span class='thirtysix'>36</span>, <span class='sixthirtyone'>63</span>, <span class='eighteen'>18</span>, <span class='sixtyeight'>68</span>, <span class='eightysix'>86</span>
    item.innerHTML = item.innerHTML.replaceAll("13", "<span class='thirtyone'>13</span>");
    item.innerHTML = item.innerHTML.replaceAll("31", "<span class='thirtyone'>31</span>");
    item.innerHTML = item.innerHTML.replaceAll("36", "<span class='thirtyone'>36</span>");
    item.innerHTML = item.innerHTML.replaceAll("63", "<span class='thirtyone'>63</span>");
    item.innerHTML = item.innerHTML.replaceAll("81", "<span class='thirtyone'>81</span>");
    item.innerHTML = item.innerHTML.replaceAll("18", "<span class='thirtyone'>18</span>");
    item.innerHTML = item.innerHTML.replaceAll("68", "<span class='thirtyone'>68</span>");
    item.innerHTML = item.innerHTML.replaceAll("86", "<span class='thirtyone'>86</span>");
    // replace all 14, 41, 19, 91, 46, 64, 69, 96 with <span class='fortyone'>14</span>, <span class='fortysix'>46</span>, <span class='sixtyfour'>64</span>, <span class='sixtynine'>69</span>, <span class='ninetyone'>91</span>, <span class='ninetysix'>96</span>
    item.innerHTML = item.innerHTML.replaceAll("14", "<span class='fortyone'>14</span>");
    item.innerHTML = item.innerHTML.replaceAll("41", "<span class='fortyone'>41</span>");
    item.innerHTML = item.innerHTML.replaceAll("19", "<span class='fortyone'>19</span>");
    item.innerHTML = item.innerHTML.replaceAll("91", "<span class='fortyone'>91</span>");
    item.innerHTML = item.innerHTML.replaceAll("46", "<span class='fortyone'>46</span>");
    item.innerHTML = item.innerHTML.replaceAll("64", "<span class='fortyone'>64</span>");
    item.innerHTML = item.innerHTML.replaceAll("69", "<span class='fortyone'>69</span>");
    item.innerHTML = item.innerHTML.replaceAll("96", "<span class='fortyone'>96</span>");
    // replace all 15, 51, 56, 65, 10, 01, 60, 06 with <span class='ten'>15</span>, <span class='sixtyfive'>65</span>, <span class='sixty'>60</span>, <span class='six'>06</span>, <span class='one'>01</span>, <span class='zero'>00</span>
    item.innerHTML = item.innerHTML.replaceAll("15", "<span class='ten'>15</span>");
    item.innerHTML = item.innerHTML.replaceAll("51", "<span class='ten'>51</span>");
    item.innerHTML = item.innerHTML.replaceAll("56", "<span class='ten'>56</span>");
    item.innerHTML = item.innerHTML.replaceAll("65", "<span class='ten'>65</span>");
    item.innerHTML = item.innerHTML.replaceAll("10", "<span class='ten'>10</span>");
    item.innerHTML = item.innerHTML.replaceAll("01", "<span class='ten'>01</span>");
    item.innerHTML = item.innerHTML.replaceAll("60", "<span class='ten'>60</span>");
    item.innerHTML = item.innerHTML.replaceAll("06", "<span class='ten'>06</span>");
    // replace all 23, 32, 28, 82, 73, 37, 78, 87 with <span class='thirtytwo'>23</span>, <span class='thirtyeight'>28</span>, <span class='seventythree'>73</span>, <span class='seventyeight'>78</span>, <span class='eightythree'>83</span>, <span class='eightyseven'>87</span>
    item.innerHTML = item.innerHTML.replaceAll("23", "<span class='thirtytwo'>23</span>");
    item.innerHTML = item.innerHTML.replaceAll("32", "<span class='thirtytwo'>32</span>");
    item.innerHTML = item.innerHTML.replaceAll("28", "<span class='thirtytwo'>28</span>");
    item.innerHTML = item.innerHTML.replaceAll("82", "<span class='thirtytwo'>82</span>");
    item.innerHTML = item.innerHTML.replaceAll("73", "<span class='thirtytwo'>73</span>");
    item.innerHTML = item.innerHTML.replaceAll("37", "<span class='thirtytwo'>37</span>");
    item.innerHTML = item.innerHTML.replaceAll("78", "<span class='thirtytwo'>78</span>");
    item.innerHTML = item.innerHTML.replaceAll("87", "<span class='thirtytwo'>87</span>");
    // replace all 24, 42, 84, 48 with <span class='fortytwo'>24</span>, <span class='fortyeight'>48</span>, <span class='eightyfour'>84</span>
    item.innerHTML = item.innerHTML.replaceAll("24", "<span class='fortytwo'>24</span>");
    item.innerHTML = item.innerHTML.replaceAll("42", "<span class='fortytwo'>42</span>");
    item.innerHTML = item.innerHTML.replaceAll("29", "<span class='fortytwo'>29</span>");
    item.innerHTML = item.innerHTML.replaceAll("92", "<span class='fortytwo'>92</span>");
    item.innerHTML = item.innerHTML.replaceAll("74", "<span class='fortytwo'>74</span>");
    item.innerHTML = item.innerHTML.replaceAll("47", "<span class='fortytwo'>47</span>");
    item.innerHTML = item.innerHTML.replaceAll("79", "<span class='fortytwo'>79</span>");
    item.innerHTML = item.innerHTML.replaceAll("97", "<span class='fortytwo'>97</span>");
    // replace 20, 02, 25, 52, 70, 07, 75, 57 with <span class='twenty'>20</span>, <span class='twentysix'>26</span>, <span class='sixtyfive'>65</span>, <span class='sixty'>60</span>, <span class='six'>06</span>, <span class='one'>01</span>, <span class='zero'>00</span>
    item.innerHTML = item.innerHTML.replaceAll("20", "<span class='twenty'>20</span>");
    item.innerHTML = item.innerHTML.replaceAll("02", "<span class='twenty'>02</span>");
    item.innerHTML = item.innerHTML.replaceAll("25", "<span class='twenty'>25</span>");
    item.innerHTML = item.innerHTML.replaceAll("52", "<span class='twenty'>52</span>");
    item.innerHTML = item.innerHTML.replaceAll("70", "<span class='twenty'>70</span>");
    item.innerHTML = item.innerHTML.replaceAll("07", "<span class='twenty'>07</span>");
    item.innerHTML = item.innerHTML.replaceAll("75", "<span class='twenty'>75</span>");
    item.innerHTML = item.innerHTML.replaceAll("57", "<span class='twenty'>57</span>");
    // replace 43, 34, 48, 84, 93, 39, 98, 89 with <span class='fortythree'>43</span>, <span class='thirtyfour'>34</span>, <span class='thirtyeight'>38</span>, <span class='eightyfour'>84</span>, <span class='eightynine'>89</span>
    item.innerHTML = item.innerHTML.replaceAll("43", "<span class='fortythree'>43</span>");
    item.innerHTML = item.innerHTML.replaceAll("34", "<span class='fortythree'>34</span>");
    item.innerHTML = item.innerHTML.replaceAll("48", "<span class='fortythree'>48</span>");
    item.innerHTML = item.innerHTML.replaceAll("84", "<span class='fortythree'>84</span>");
    item.innerHTML = item.innerHTML.replaceAll("93", "<span class='fortythree'>93</span>");
    item.innerHTML = item.innerHTML.replaceAll("39", "<span class='fortythree'>39</span>");
    item.innerHTML = item.innerHTML.replaceAll("98", "<span class='fortythree'>98</span>");
    item.innerHTML = item.innerHTML.replaceAll("89", "<span class='fortythree'>89</span>");
    // replace 30, 03, 03, 03, 03, 03, 03, 03 with <span class='thirty'>30</span>, <span class='thirtythree'>33</span>
    item.innerHTML = item.innerHTML.replaceAll("30", "<span class='thirty'>30</span>");
    item.innerHTML = item.innerHTML.replaceAll("03", "<span class='thirty'>03</span>");
    item.innerHTML = item.innerHTML.replaceAll("35", "<span class='thirty'>35</span>");
    item.innerHTML = item.innerHTML.replaceAll("53", "<span class='thirty'>53</span>");
    item.innerHTML = item.innerHTML.replaceAll("08", "<span class='thirty'>08</span>");
    item.innerHTML = item.innerHTML.replaceAll("80", "<span class='thirty'>80</span>");
    item.innerHTML = item.innerHTML.replaceAll("85", "<span class='thirty'>85</span>");
    item.innerHTML = item.innerHTML.replaceAll("58", "<span class='thirty'>58</span>");
    // replace 40, 04, 45, 54, 90, 09, 95, 59 with <span class='forty'>40</span>, <span class='fortyfive'>45</span>, <span class='fiftyfour'>54</span>, <span class='fiftynine'>59</span>
    item.innerHTML = item.innerHTML.replaceAll("40", "<span class='forty'>40</span>");
    item.innerHTML = item.innerHTML.replaceAll("04", "<span class='forty'>04</span>");
    item.innerHTML = item.innerHTML.replaceAll("45", "<span class='forty'>45</span>");
    item.innerHTML = item.innerHTML.replaceAll("54", "<span class='forty'>54</span>");
    item.innerHTML = item.innerHTML.replaceAll("90", "<span class='forty'>90</span>");
    item.innerHTML = item.innerHTML.replaceAll("09", "<span class='forty'>09</span>");
    item.innerHTML = item.innerHTML.replaceAll("95", "<span class='forty'>95</span>");
    item.innerHTML = item.innerHTML.replaceAll("59", "<span class='forty'>59</span>");
  });
});

// add event listener to select game name value
gameNameSelectOne.addEventListener("change", function () {
  // get value of gameSlug from game name
  var gameSlug = this.value.replaceAll(" ", "-").toLowerCase();
  stateChartTitle = day == "Sun" ? "Today is Sunday, So it is holiday today" : `${this.value} BAZAR LOAD CHART`;
  if (Chart.getChart("loadChart")) {
    Chart.getChart("loadChart")?.destroy();
  }
  fetch(`/result/get_load_chart/${gameSlug}/${gameState.value}/`)
    .then((response) => response.json())
    .then((data) => {
      new Chart("loadChart", {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: stateChartTitle,
              data: day == "Sun" ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : data.load_chart,
              borderWidth: 1,
              backgroundColor: barColors,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 5 },
            },
          },
        },
        plugins: [topLabels],
      });
    });
  //  change gameNameOne, gameNameTwo, gameNameThree to this.value
  gameNameOne.innerHTML = this.value;
  gameNameTwo.innerHTML = this.value;
});

// add event listener to select game state value
gameState.addEventListener("change", function () {
  // get value of gameSlug from game name
  var gameSlug = gameNameSelectOne.value.replaceAll(" ", "-").toLowerCase();
  stateChartTitle = day == "Sun" ? "Today is Sunday, So it is holiday today" : `${gameNameSelectOne.value} BAZAR LOAD CHART`;
  if (Chart.getChart("loadChart")) {
    Chart.getChart("loadChart")?.destroy();
  }
  fetch(`/result/get_load_chart/${gameSlug}/${gameState.value}/`)
    .then((response) => response.json())
    .then((data) => {
      new Chart("loadChart", {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: stateChartTitle,
              data: day == "Sun" ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : data.load_chart,
              borderWidth: 1,
              backgroundColor: barColors,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 5 },
            },
          },
        },
        plugins: [topLabels],
      });
    });
  //  change gameStateChangeOne, gameStateChangeTwo, to gameState.value
  gameStateChangeOne.innerHTML = gameState.value;
  // gameStateChangeTwo.innerHTML = gameState.value;
});


// add event listener to select game name value
gameNameSelectTwo.addEventListener("change", function () {
  // get value of game name
  var gameName = this.value;
  // get value of csrf token
  var fourAnkTable = document.getElementById("four-ank-table");
  var twoAnkTable = document.getElementById("two-ank-table");
  var alertMessage = document.getElementById("alert-message");
  // make ajax call
  fetch(`/result/four-ank-formula/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ game_name: gameName }),
  })
    .then((response) => response.json())
    .then((data) => {
      // show error message is status is 400
      if (data.message) {
        // hide table
        fourAnkTable.style.display = "none";
        twoAnkTable.style.display = "none";
        // remove class d-none from alert message
        alertMessage.classList.remove("d-none");
        // add class d-block to alert message
        alertMessage.classList.add("d-block");
        // add error message to alert message
        alertMessage.textContent = data.message;
        return;
      }
      // check if length of data.initial_jodi_list is empty
      if (data.initial_jodi_list.length === 0) {
        // hide table
        fourAnkTable.style.display = "none";
        twoAnkTable.style.display = "none";
        // remove class alert-danger and d-none
        alertMessage.classList.remove("alert-danger", "d-none");
        // add class d-block to alert message
        alertMessage.classList.add("d-block", "alert-success");
        // add error message to alert message
        alertMessage.textContent = "Sorry chart not prepared, please wait for some time!!";
        return;
      }
      // get all initial date element by id
      var initial_date_one_four = document.getElementById("initial_date_one_four");
      var initial_date_two_four = document.getElementById("initial_date_two_four");
      var initial_date_three_four = document.getElementById("initial_date_three_four");
      var initial_date_four_four = document.getElementById("initial_date_four_four");
      
      // get all date element by id
      var final_date_one_four = document.getElementById("final_date_one_four");
      var final_date_two_four = document.getElementById("final_date_two_four");
      var final_date_three_four = document.getElementById("final_date_three_four");
     
      // get all initial jodi emlement by id
      var initial_jodi_one_four = document.getElementById("initial_jodi_one_four");
      var initial_jodi_two_four = document.getElementById("initial_jodi_two_four");
      var initial_jodi_three_four = document.getElementById("initial_jodi_three_four");
      var initial_jodi_four_four = document.getElementById("initial_jodi_four_four");
      
      // get all final jodi element by id
      var final_jodi_one_four = document.getElementById("final_jodi_one_four");
      var final_jodi_two_four = document.getElementById("final_jodi_two_four");
      var final_jodi_three_four = document.getElementById("final_jodi_three_four");
      
      // get final jodi element by id
      var final_jodi_four = document.getElementById("final_jodi_four");
      // get four ank title
      var fourAnkTitle = document.getElementById("four-ank-title");
      // assign value to initial date element
      initial_date_one_four.innerHTML = data.initial_jodi_list[2].date;
      initial_date_two_four.innerHTML = data.initial_jodi_list[1].date;
      initial_date_three_four.innerHTML = data.initial_jodi_list[0].date;
      initial_date_four_four.innerHTML = data.initial_jodi_list[3].date;
     
      // assign value to date element
      final_date_one_four.innerHTML = data.final_jodi_list[0].date;
      final_date_two_four.innerHTML = data.final_jodi_list[1].date;
      final_date_three_four.innerHTML = data.final_jodi_list[2].date;
      
      // assign value to initial jodi element
      initial_jodi_one_four.innerHTML = `<span class='a${data.initial_jodi_list[2].jodi[0]}'>${data.initial_jodi_list[2].jodi[0]}</span><span class='a${data.initial_jodi_list[2].jodi[1]}'>${data.initial_jodi_list[2].jodi[1]}</span>`
      initial_jodi_two_four.innerHTML = `<span class='a${data.initial_jodi_list[1].jodi[0]}'>${data.initial_jodi_list[1].jodi[0]}</span><span class='a${data.initial_jodi_list[1].jodi[1]}'>${data.initial_jodi_list[1].jodi[1]}</span>`
      initial_jodi_three_four.innerHTML = `<span class='a${data.initial_jodi_list[0].jodi[0]}'>${data.initial_jodi_list[0].jodi[0]}</span><span class='a${data.initial_jodi_list[0].jodi[1]}'>${data.initial_jodi_list[0].jodi[1]}</span>`
      initial_jodi_four_four.innerHTML = `<span class='a${data.initial_jodi_list[3].jodi[0]}'>${data.initial_jodi_list[3].jodi[0]}</span><span class='a${data.initial_jodi_list[3].jodi[1]}'>${data.initial_jodi_list[3].jodi[1]}</span>`
      
      // assign value to jodi element
      final_jodi_one_four.innerHTML = `<span class='a${data.final_jodi_list[0].jodi[0]}'>${data.final_jodi_list[0].jodi[0]}</span><span class='a${data.final_jodi_list[0].jodi[1]}'>${data.final_jodi_list[0].jodi[1]}</span>`
      final_jodi_two_four.innerHTML = `<span class='a${data.final_jodi_list[1].jodi[0]}'>${data.final_jodi_list[1].jodi[0]}</span><span class='a${data.final_jodi_list[1].jodi[1]}'>${data.final_jodi_list[1].jodi[1]}</span>`
      final_jodi_three_four.innerHTML = `<span class='a${data.final_jodi_list[2].jodi[0]}'>${data.final_jodi_list[2].jodi[0]}</span><span class='a${data.final_jodi_list[2].jodi[1]}'>${data.final_jodi_list[2].jodi[1]}</span>`
     
      // update four ank title
      fourAnkTitle.innerHTML = "➥ Four Ank Formula";
      fourAnkTitle.innerHTML += `<br/> <span class="badge bg-success">${gameName}</span>`;
      // get last jodi of final jodi list
      var last_jodi = data.initial_jodi_list[data.initial_jodi_list.length - 2].jodi;
      // get first element of last jodi and also calculate second element by adding 5 and get last digit of result
      var last_jodi_elements = [last_jodi[0], last_jodi[1], (((parseInt(last_jodi[0])) + 5) % 10).toString(), (((parseInt(last_jodi[1])) + 5) % 10).toString()];
      // remove duplicates from last_jodi_elements
      last_jodi_elements = [...new Set(last_jodi_elements)];
      final_jodi_four.innerHTML = "";
      // apply loop to last jodi elements
      for (var i = 0; i < last_jodi_elements.length; i++) {
        // add class bg-primary to last jodi elements
        last_jodi_elements[i] = `<span class="badge bg-primary bg-gradient mx-1 fw-bold">${last_jodi_elements[i]}</span>`;
        // assing value to final jodi
        final_jodi_four.innerHTML += last_jodi_elements[i];
      }
    });

    // make ajax call for two ank table
  fetch(`/result/two-ank-formula/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ game_name: gameName }),
  })
    .then((response) => response.json())
    .then((data) => {
      // get all initial date element by id
      var initial_date_one_two = document.getElementById("initial_date_one_two");
      var initial_date_two_two = document.getElementById("initial_date_two_two");
      var initial_date_three_two = document.getElementById("initial_date_three_two");
  
      // get all date element by id
      var final_date_one_two = document.getElementById("final_date_one_two");
      var final_date_two_two = document.getElementById("final_date_two_two");

      // get all initial jodi emlement by id
      var initial_jodi_one_two = document.getElementById("initial_jodi_one_two");
      var initial_jodi_two_two = document.getElementById("initial_jodi_two_two");
      var initial_jodi_three_two = document.getElementById("initial_jodi_three_two");
      
      // get all final jodi element by id
      var final_jodi_one_two = document.getElementById("final_jodi_one_two");
      var final_jodi_two_two = document.getElementById("final_jodi_two_two");

      // get final jodi element by id
      var final_jodi_two = document.getElementById("final_jodi_two");
      // get four ank title
      var twoAnkTitle = document.getElementById("two-ank-title");
      // assign value to initial date element
      initial_date_one_two.innerHTML = data.initial_jodi_list[1].date;
      initial_date_two_two.innerHTML = data.initial_jodi_list[0].date;
      initial_date_three_two.innerHTML = data.initial_jodi_list[2].date;
     
      // assign value to date element
      final_date_one_two.innerHTML = data.final_jodi_list[0].date;
      final_date_two_two.innerHTML = data.final_jodi_list[1].date;
      
      // assign value to initial jodi element
      initial_jodi_one_two.innerHTML = `<span class='a${data.initial_jodi_list[1].jodi[0]}'>${data.initial_jodi_list[1].jodi[0]}</span><span class='a${data.initial_jodi_list[1].jodi[1]}'>${data.initial_jodi_list[1].jodi[1]}</span>`
      initial_jodi_two_two.innerHTML = `<span class='a${data.initial_jodi_list[0].jodi[0]}'>${data.initial_jodi_list[0].jodi[0]}</span><span class='a${data.initial_jodi_list[0].jodi[1]}'>${data.initial_jodi_list[0].jodi[1]}</span>`
      initial_jodi_three_two.innerHTML = `<span class='a${data.initial_jodi_list[2].jodi[0]}'>${data.initial_jodi_list[2].jodi[0]}</span><span class='a${data.initial_jodi_list[2].jodi[1]}'>${data.initial_jodi_list[2].jodi[1]}</span>`
     
      // assign value to jodi element
      final_jodi_one_two.innerHTML = `<span class='a${data.final_jodi_list[0].jodi[0]}'>${data.final_jodi_list[0].jodi[0]}</span><span class='a${data.final_jodi_list[0].jodi[1]}'>${data.final_jodi_list[0].jodi[1]}</span>`
      final_jodi_two_two.innerHTML = `<span class='a${data.final_jodi_list[1].jodi[0]}'>${data.final_jodi_list[1].jodi[0]}</span><span class='a${data.final_jodi_list[1].jodi[1]}'>${data.final_jodi_list[1].jodi[1]}</span>`
      
      // update four ank title
      twoAnkTitle.innerHTML = "➥ Two Ank Formula";
      twoAnkTitle.innerHTML += `<br/> <span class="badge bg-success">${gameName}</span>`;
      // get last jodi of final jodi list
      var last_jodi = data.initial_jodi_list[data.initial_jodi_list.length - 2].jodi;
      // get first element of last jodi and also calculate second element by adding 5 and get last digit of result
      var last_jodi_elements = [last_jodi[0], last_jodi[1]];
      // remove duplicates from last_jodi_elements
      last_jodi_elements = [...new Set(last_jodi_elements)];
      final_jodi_two.innerHTML = "";
      // apply loop to last jodi elements
      for (var i = 0; i < last_jodi_elements.length; i++) {
        // add class bg-primary to last jodi elements
        last_jodi_elements[i] = `<span class="badge bg-primary bg-gradient mx-1 fw-bold">${last_jodi_elements[i]}</span>`;
        // assing value to final jodi
        final_jodi_two.innerHTML += last_jodi_elements[i];
      }
    });
});

// function to get bhavishyavani chart
gameNameSelectThree.addEventListener("change", function () {
  // select variables
  var gameNameTitle = document.getElementById("b_game_name");
  var weekDate = document.getElementById("b_date");
  var panel = document.getElementById("b_panel");
  var mon = document.getElementById("b_mon");
  var tue = document.getElementById("b_tue");
  var wed = document.getElementById("b_wed");
  var thu = document.getElementById("b_thu");
  var fri = document.getElementById("b_fri");
  var sat = document.getElementById("b_sat");
  var satTitle = document.getElementById("b_sat_title");
  var friTitle = document.getElementById("b_fri_title");
  var monSuccess = document.getElementById("b_mon_success");
  var tueSuccess = document.getElementById("b_tue_success");
  var wedSuccess = document.getElementById("b_wed_success");
  var thuSuccess = document.getElementById("b_thu_success");
  var friSuccess = document.getElementById("b_fri_success");
  var satSuccess = document.getElementById("b_sat_success");
  // show sat and satTitle
  sat.style.display = "block";
  satTitle.style.display = "block";
  satSuccess.style.display = "block";
  // remove colsapn from fri
  fri.removeAttribute("colspan");
  friTitle.removeAttribute("colspan");
  // get value of game_name
  var gameName = gameNameSelectThree.value;
  // get slug from game name
  var slug = gameName.toLowerCase().replace(/ /g, "-");
  // make ajax call to get bhavishyavani data
  fetch(`/result/bhavishyavani-chart/${slug}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  }).then((data) => {
    // assign value to game name title
    gameNameTitle.innerHTML = gameName;
    // assign date
    weekDate.innerHTML = `✹ दिनांक: ${data.start_date || ""} से ${data.end_date || ""} तक मान्य ✹`
    // assing week day values
    mon.innerHTML = `<span class="align-bottom">${data.mon[2] || ""}</span><span class="ab1">${data.mon[0] || ""}</span><span class="align-top">${data.mon[4] || ""}</span> <br/> <span class="align-top">${data.mon[3] || ""}</span><span class="ab1">${data.mon[1] || ""}</span><span class="align-bottom">${data.mon[5] || ""}</span>`
    monSuccess.innerHTML = data.mon.at(-1) || "";
    tue.innerHTML = `<span class="align-top">${data.tue[2] || ""}</span><span class="ab1">${data.tue[0] || ""}</span><span class="align-bottom">${data.tue[4] || ""}</span> <br/> <span class="align-bottom">${data.tue[3] || ""}</span><span class="ab1">${data.tue[1] || ""}</span><span class="align-top">${data.tue[5] || ""}</span>`
    tueSuccess.innerHTML = data.tue.at(-1) || "";
    wed.innerHTML = `<span class="align-bottom">${data.wed[2] || ""}</span><span class="ab1">${data.wed[0] || ""}</span><span class="align-top">${data.wed[4] || ""}</span> <br/> <span class="align-top">${data.wed[3] || ""}</span><span class="ab1">${data.wed[1] || ""}</span><span class="align-bottom">${data.wed[5] || ""}</span>`
    wedSuccess.innerHTML = data.wed.at(-1) || "";
    thu.innerHTML = `<span class="align-top">${data.thu[2] || ""}</span><span class="ab1">${data.thu[0] || ""}</span><span class="align-bottom">${data.thu[4] || ""}</span> <br/> <span class="align-bottom">${data.thu[3] || ""}</span><span class="ab1">${data.thu[1] || ""}</span><span class="align-top">${data.thu[5] || ""}</span>`
    thuSuccess.innerHTML = data.thu.at(-1) || "";
    fri.innerHTML = `<span class="align-bottom">${data.fri[2] || ""}</span><span class="ab1">${data.fri[0] || ""}</span><span class="align-top">${data.fri[4] || ""}</span> <br/> <span class="align-top">${data.fri[3] || ""}</span><span class="ab1">${data.fri[1] || ""}</span><span class="align-bottom">${data.fri[5] || ""}</span>`
    friSuccess.innerHTML = data.fri.at(-1) || "";
    sat.innerHTML = `<span class="align-top">${data.sat[2] || ""}</span><span class="ab1">${data.sat[0] || ""}</span><span class="align-bottom">${data.sat[4] || ""}</span> <br/> <span class="align-bottom">${data.sat[3] || ""}</span><span class="ab1">${data.sat[1] || ""}</span><span class="align-top">${data.sat[5] || ""}</span>`
    satSuccess.innerHTML = data.sat.at(-1) || "";
    // show panel
    panel.innerHTML = `${data.panel[0] || ""} ✤ ${data.panel[1] || ""} ✤ ${data.panel[2] || ""} ✤ ${data.panel[3] || ""}`

    // hide sat if game name is MAIN BAZAR
    if (gameName == "MAIN BAZAR" || gameName == "KALYAN NIGHT" || gameName == "RAJDHANI NIGHT" || gameName == "MAIN PURANA BOMBAY") {
      sat.style.display = "none";
      satTitle.style.display = "none";
      satSuccess.style.display = "none";
      // add colspan 2 to friTitle
      friTitle.setAttribute("colspan", 2);
      fri.setAttribute("colspan", 2);
    }
  })
});
