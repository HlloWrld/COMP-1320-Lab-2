// Main file that calls on other functions from other file

// Call functions from lab-three
var getinfo = require('./lab-three');

function getDayOfTheWeekForUserDate() {
    console.log(getinfo.getDayOfTheWeek()[2]);
} 


getDayOfTheWeekForUserDate();

var readlineSync = require("readline-sync");
var questionforcal = readlineSync.question("Do you want to print the calendar for the entire year? (yes/no)")

if(questionforcal == "yes") {
    var dayofweekinfo = getinfo.getDayOfTheWeek();
    console.log(getinfo.makeCalendar(dayofweekinfo[0],dayofweekinfo[1],dayofweekinfo[2]));
} 
