
// Obtain data from user input ("month day, year")
function getUserData() {
    var readlineSync = require("readline-sync");
    var usertyped = readlineSync.question("Enter any date to find out the day of the week (format example: January 1, 1990): ");
    
    var commaindex = usertyped.indexOf(",");
    var day = usertyped.substring(commaindex-2, commaindex);
    var month = usertyped.substring(0,3);
    var lenOfData = usertyped.length;
    var year = usertyped.substring(lenOfData-4);

    return [year, month, day, lenOfData, usertyped, commaindex];
}

const USERCONST = getUserData()

function getDayOfTheWeek(year=USERCONST[0], month=USERCONST[1], day=USERCONST[2]){

    var lenOfData = USERCONST[3];
    var endingofyear = USERCONST[4].substring(lenOfData-2);
    var twelveinyear = parseInt(endingofyear/12);
    var remainder = endingofyear-(twelveinyear*12)
    var intofour = parseInt(remainder/4);
    var commaindex = USERCONST[5];
    var userday = day;
    var firstthreeletters = month.toLowerCase();
    var useryear = year;

    // console.log(lenOfData)
    // console.log(endingofyear)
    // console.log(twelveinyear)
    // console.log(remainder)
    // console.log(intofour)
    // console.log(commaindex)
    // console.log(month)
    // console.log(firstthreeletters);


    // console.log(year)

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


    var leapyear = 0;

    // console.log(leapyear);
    
    if(useryear%4 !=0) {
        leapyear =0;
    } else if(useryear%100 !=0) {
        leapyear =1;
    } else if(useryear%400 !=0) {
        leapyear =0;
    } else {
        leapyear =1;
    }
    


    if(leapyear == 1) {
        //monthCode = monthCode-1;
        if (firstthreeletters == "jan") {
            monthCode = monthCode-1; // this is fucked upo fix this
        } else if (firstthreeletters == "feb") {
            monthCode = monthCode-1;
        }
    }
    
    // moding 100's - Adding the offset here, 4 digit year code is selected using substring and offest is added here
    var yearadjust = useryear.substring(0,2)

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

function makeCalendar(year, leapyear, dayofweek) {
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
    
    if(leapyear == 1) {
         daysinmonth[1] = 29;
    }

    // Loop to print out the entire calendar
    // The 4 variables below we want to start at 0 for the loop
    var count;
    var count2;
    var daycount; // Keeps track of count for days
    var dayoftheweekloop;
    for (count = 0; count < daysinmonth.length; count++) {
        // console.log(daysinmonth[count])
        daycount=daysinmonth[count];
        for (count2 = 0; count2 < daycount; count2++) { //add one to
            dayoftheweekloop = getDayOfTheWeek(USERCONST[0], monthVal[count], count2+1)[2]
            console.log(String(count+1) + "-" + String(count2 + 1) + "-" + String(year) + " is a " + dayoftheweekloop); 
        }
    }

}

// userStuff = getUserData()
// console.log(makeCalendar(getDayOfTheWeek(userStuff)[0],getDayOfTheWeek(userStuff)[1]));
module.exports.getDayOfTheWeek = getDayOfTheWeek;
module.exports.makeCalendar = makeCalendar;
module.exports.getUserData = getUserData;
