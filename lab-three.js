
// Obtain data from user input ("month, day, year")
function getUserData() {
    
    var readlineSync = require("readline-sync");
    var usertyped = readlineSync.question("Enter any date to find out the day of the week (format example: January 1, 1990): ");

    // Identify place of comma from user input
    var commaindex = usertyped.indexOf(",");

    // Identify day of month from user input
    var day = usertyped.substring(commaindex-2, commaindex);

    // Identify month using user input
    var month = usertyped.substring(0,3);

    // Length of characters in user input
    var lenOfData = usertyped.length;

    //Identify year using substring of user input
    var year = usertyped.substring(lenOfData-4);

    return [year, month, day, lenOfData, usertyped, commaindex];
}

const USERCONST = getUserData()

// Get the day of the week based on user input from answering question 
function getDayOfTheWeek(year=USERCONST[0], month=USERCONST[1], day=USERCONST[2]){

    // Length of characters from user input date question
    var lenOfData = USERCONST[3];

    // Last 2 digits of year from user input date quetsion
    var endingofyear = USERCONST[4].substring(lenOfData-2);

    // Algorithm 
    var twelveinyear = parseInt(endingofyear/12);
    var remainder = endingofyear-(twelveinyear*12)
    var intofour = parseInt(remainder/4);
    var userday = day;

    // Identify month by using first 3 letters of user input
    var firstthreeletters = month.toLowerCase();
    var useryear = year;

    //Month using algorithm offset
    var ourMonth = new Array(12);
        ourMonth["jan"] = 1;
        ourMonth["feb"] = 4;
        ourMonth["mar"] = 4;
        ourMonth["apr"] = 0;
        ourMonth["may"] = 2;
        ourMonth["jun"] = 5;
        ourMonth["jul"] = 0;
        ourMonth["aug"] = 3;
        ourMonth["sep"] = 6;
        ourMonth["oct"] = 1;
        ourMonth["nov"] = 4;
        ourMonth["dec"] = 6;

    var monthCode = ourMonth[firstthreeletters];

    // Define leapyear to 0
    var leapyear = 0;

    //Leap year function
    if(useryear%4 !=0) {
        leapyear =0;
    } else if(useryear%100 !=0) {
        leapyear =1;
    } else if(useryear%400 !=0) {
        leapyear =0;
    } else {
        leapyear =1;
    }


    //Using leap year function
    if(leapyear == 1) {
        if (firstthreeletters == "jan") {
            monthCode = monthCode-1; 
        } else if (firstthreeletters == "feb") {
            monthCode = monthCode-1;
        }
    }

    //Adding the offset here, 4 digit year code is selected using substring and offest is added. We take the first two digits of the year (ex: 1955->19) 
    var yearadjust = useryear.substring(0,2)

    // Adjusting year using algorithm based on first two digits of year input by user
    if(yearadjust == 16) {
        monthCode = monthCode+6;
        } else if(yearadjust == 17) {
            monthCode = monthCode+4;
        } else if(yearadjust == 18) {
            monthCode = monthCode+2;
        } else if(yearadjust == 20) {
            monthCode = monthCode+6;
        }else if(yearadjust ==21) {
            monthCode = monthCode+4;
    }

    // Totals for year adjustment algorithm
    var totals = parseInt(twelveinyear) + parseInt(remainder) + parseInt(intofour) + parseInt(userday) + parseInt(monthCode);


    var dayindex = (totals%7);

    var dayweeknumber = new Array(7)
        dayweeknumber[0] = "saturday";
        dayweeknumber[1] = "sunday";
        dayweeknumber[2] = "monday";
        dayweeknumber[3] = "tuesday";
        dayweeknumber[4] = "wednesday";
        dayweeknumber[5] = "thursday";
        dayweeknumber[6] = "friday";

    var dayofweek = dayweeknumber[dayindex];

    return [useryear, leapyear, dayofweek];

}

// Printing Calendar that shows a list of every day of the year and the day of the week for each day
function makeCalendar(year, leapyear, dayofweek) {

    // Specifcy each month by numerical value so print loop can count from 0-11 thorugh every month
    var monthVal = new Array(12);
        monthVal[0] = 'jan';
        monthVal[1] = 'feb';
        monthVal[2] = 'mar';
        monthVal[3] = 'apr';
        monthVal[4] = 'may';
        monthVal[5] = 'jun';
        monthVal[6] = 'jul';
        monthVal[7] = 'aug';
        monthVal[8] = 'sep';
        monthVal[9] = 'oct';
        monthVal[10] = 'nov';
        monthVal[11] = 'dec';

    // Number of days in the month for counting purposes
    var daysinmonth = new Array(12);
        daysinmonth[0] = 31;
        daysinmonth[1] = 28;
        daysinmonth[2] = 31;
        daysinmonth[3] = 30;
        daysinmonth[4] = 31;
        daysinmonth[5] = 30;
        daysinmonth[6] = 31;
        daysinmonth[7] = 31;
        daysinmonth[8] = 30;
        daysinmonth[9] = 31;
        daysinmonth[10] = 30;
        daysinmonth[11] = 31;

    //if leapyear is true, change feb # of days to 29. Counts 29 for feb in leap years only.
    if(leapyear == 1) {         
         daysinmonth[1] = 29;
    }

    // Defining variables below for calendar print loop
    // Print variable for when loop reaches the end of count
    var Ending = "End of calendar year. Happy new year!"

    //First starting Count
    var count;

    // Second count
    var count2;

    // Keeps track of count for days
    var daycount; 

    //Defining dayoftheweekloop befor begining loop function for printing calendar
    var dayoftheweekloop;

    // Calendar Loop to print out the entire calendar
    for (count = 0; count < daysinmonth.length; count++) {
        // console.log(daysinmonth[count])
        daycount=daysinmonth[count];
        for (count2 = 0; count2 < daycount; count2++) { 
            dayoftheweekloop = getDayOfTheWeek(USERCONST[0], monthVal[count], count2+1)[2]
            console.log(String(count+1) + "-" + String(count2 + 1) + "-" + String(year) + " is a " + dayoftheweekloop);
        }
    }

    // Prints the ending notification once the calendar is done printing
    return Ending;

}

module.exports.getDayOfTheWeek = getDayOfTheWeek;
module.exports.makeCalendar = makeCalendar;
module.exports.getUserData = getUserData;