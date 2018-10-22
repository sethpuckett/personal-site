$(document).ready(function () {
  var themeIndex = 0;

  var SPREADSHEET_KEY = '1LPsEpOMl2bfK_leLCJRL5LEXnutoOoTv1mMiln7IytE';

  Tabletop.init({
    key: SPREADSHEET_KEY,
    callback: loadSpreadsheetData
  });

  $('#pictures').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  });

  $("#nav a").on("click", updateTab);

  $(".theme-change").on("click", function () {
    themeIndex++;
    setTheme(themeIndex);
  });

  $(window).on("load resize scroll", updateThemeChangePosition);

});

function updateTab(event) {
  event.preventDefault();
  var id = $(this).attr("href");

  $("#nav li").removeClass("active");
  $(this).parent().addClass("active");

  $("#nav-content .nav-pane").removeClass("active");
  $(id).addClass("active");

  updateThemeChangePosition();
}

function updateThemeChangePosition() {
  var windowBottom = $(window).scrollTop() + $(window).height();
  var pageHeight = $("#wrapper").height();

  var diff = pageHeight - windowBottom;

  if (diff < 65) {
    $("#theme-change-bottom").css("bottom", 85 - diff);

  } else {
    $("#theme-change-bottom").css("bottom", 20);
  }
}

function loadSpreadsheetData(data, tabletop) {
  populateGeneral(data.general);
  populateSchedule(data.schedule);
  populateWriting(data.writing);
  populateProjects(data.projects);
  populatephotos(data.photos);
}

function populateGeneral(general) {
  for (var i = general.elements.length - 1; i >= 0; i--) {
    var field = general.elements[i].field;
    var value = general.elements[i].value;

    if (field === "location") {
      $("#location-text").text(value);
    } else if (field === "location-url") {
      $("#location-url").attr("href", value);
    } else if (field === 'resume-url') {
      $("#resume-loader").hide();
      $("#resume-content").html(value);
    }

    updateThemeChangePosition();
  }
}

function populateSchedule(schedule) {
  $("#schedule-loader").hide();
  var list = $("#schedule ul");

  for (var i = schedule.elements.length - 1; i >= 0; i--) {
    var title = schedule.elements[i].title;
    var date = schedule.elements[i].date;
    var venue = schedule.elements[i].venue;
    var link = schedule.elements[i].link;

    var li = "<li><a href='" + link + "'><div class='title'>" + title + "</div><div class='info'>" + venue + ", " + date + "</div></a></li>";

    list.append(li);
  }
}

function populateWriting(writing) {
  $("#writing-loader").hide();
  var list = $("#writing ul");

  for (var i = writing.elements.length - 1; i >= 0; i--) {
    var title = writing.elements[i].title;
    var date = writing.elements[i].date;
    var link = writing.elements[i].link;

    var li = "<li><a href='" + link + "'><div class='title'>" + title + "</div><div class='date'>" + date + "</div></a></li>";

    list.append(li);
  }
}

function populateProjects(projects) {
  $("#projects-loader").hide();
  var list = $("#projects ul");

  for (var i = projects.elements.length - 1; i >= 0; i--) {
    var title = projects.elements[i].title;
    var description = projects.elements[i].description;
    var link = projects.elements[i].link;

    var li = "<li><a href='" + link + "'><div class='title'>" + title + "</div><div class='description'>" + description + "</div></a></li>";

    list.append(li);
  }
}

function setTheme(themeIndex) {
  removeAllThemes();

  switch (themeIndex % 3) {
    case 0:
      $("html, body").addClass("mega");
      break;
    case 1:
      $("html, body").addClass("bionic");
      break;
    case 2:
      $("html, body").addClass("pac");
      break;
  }
}

function removeAllThemes() {
  $("html").removeClass();
  $("body").removeClass();
}


