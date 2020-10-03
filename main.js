
// Main file that calls on other functions from lab three
var getinfo = require('./lab-three');

// Define function that calls getdayoftheweek based on user input date
function getDayOfTheWeekForUserDate() {
    console.log(getinfo.getDayOfTheWeek()[2]);
}

// Calls function
getDayOfTheWeekForUserDate();

// Asking question if the user wants to print calendar list of day of week for every day of the year based off the year input by the user
var readlineSync = require("readline-sync");
var questionforcal = readlineSync.question("Do you want to print the calendar for the entire year? (yes/no)")

if(questionforcal == "yes") {
    var dayofweekinfo = getinfo.getDayOfTheWeek();
    console.log(getinfo.makeCalendar(dayofweekinfo[0],dayofweekinfo[1],dayofweekinfo[2]));
}