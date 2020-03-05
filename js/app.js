$(document).ready(function () {
  var themeIndex = 0;

  setCopyrightYear();

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

  $('#pictures-compact').slick({
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

function setCopyrightYear() {
  $('#current-year').text(new Date().getFullYear());
}

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
  populateProjects(data.projects);
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

function populateProjects(projects) {
  $("#projects-loader").hide();
  var list = $("#projects ul");

  for (var i = projects.elements.length - 1; i >= 0; i--) {
    var title = projects.elements[i].title;
    var date = projects.elements[i].date;
    var info = projects.elements[i].info;
    var link = projects.elements[i].link;

    var li = "<li><a href='" + link + "' target='_blank'><div class='title'>" + title + "</div><div class='info'>" + info + "</div></a></li>";

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


