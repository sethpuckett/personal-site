$(document).ready(function() {

  var SPREADSHEET_KEY = '0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE';

  Tabletop.init({ 
    key: SPREADSHEET_KEY,
    callback: loadSpreadsheetData
  });

  $(".side-nav a").click(function(event) {
    event.preventDefault();
    var id = $(this).attr("href");

    $(".side-nav li").removeClass("active");
    $(this).parent().addClass("active");

    $(".nav-content .nav-pane").removeClass("active");
    $(id).addClass("active");
  });

});

function loadSpreadsheetData(data, tabletop) {

}

function populateSchedule(scheduleData) {
  $("#schedule-loader").hide();
}

function populateWriting(writingData) {
  $("#writing-loader").hide();
}

function populateProjects(projectsData) {
  $("#projects-loader").hide();
}