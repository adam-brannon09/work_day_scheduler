//.ready added so that the Javascript wont run until the DOM is safe to manipulate.
$(document).ready(function () {
//Day JS added to retrieve today's date in the requested format.
let today = dayjs().format('dddd, MMMM D');
  let headerDate = document.getElementById('currentDay')
//Puts todays date on targeted element in the web page. 
headerDate.textContent = today;
// Get the current time and assign it to a variable.
  let curHour = dayjs().hour();
  console.log(curHour + "curHour is working");
// Target the time-block classes and create rules designating what past, present future class to assign at what time.
  $('.time-block').each(function () {
    let timeBlock = parseInt($(this).attr("id").split("hour-")[1]);
  //The parseInt method parses a value as a string and returns the first integer. $(this) targets the elements with the .time-block class. The .attr method gets the attribute value ("id") for all elements with the .time-block class. The .split method uses a (separator) to split a string into an array. This was all done to retrieve the numeric value of the hour in the id. Ex: hour-9, only the 9 is needed.
    console.log(timeBlock + "timeBlock is working")
    //If's below give parameters for what color scheme will be applied depending on if the time-block is in the past(gray) present (red) or future (green).

    //PRESENT: if the current hour is equal to the timeblock the text area will be red.
    
    if (curHour === timeBlock) { 
      $(this).removeClass('past');
      $(this).removeClass('future');
      $(this).addClass('present');

      //FUTURE: If the current hour is less than the timeblock the text area will be green.

    } else if (curHour < timeBlock) { 
      $(this).removeClass('past');
      $(this).removeClass('present');
      $(this).addClass('future');
      //PAST: since both of the other 2 conditions havent been met, the timeblock has to be in the past. 
    } else {                      
      $(this).removeClass('present');
      $(this).removeClass('future');
      $(this).addClass('past');
    }
  });
   //Event listner to add key and user input to local storage.
  $('.saveBtn').on('click', function () {
    //workHour will be the key stored in local storage, ex hour-3, hour-4, hour-5....
    let workHour = $(this).parent().attr('id');
    //userInput is the value stored in local storage containing what the user types in the timeblock
    let userInput = $(this).siblings('.description').val();
    //.setItem passes the key name and value to local storage.
    localStorage.setItem(workHour, userInput);
  });
  
  
  $('.time-block').each(function () {
    //hourBlock retrieves the name of the id's: hour-1,hour-2 etc.
    let hourBlock = $(this).attr('id');
    console.log(hourBlock + "hourBlock is working");
    //hourBlock contains the key name and is passed into the variable loadUserInput so that the correct key name can retrieve the user input from local storage then display it on the page in the correct location, even after the user refreshes the screen. 
    let loadUserInput = localStorage.getItem(hourBlock);
    console.log(loadUserInput + "loadUserInput is working");
    
    //Targets the text area element and displays the user input pulled from local storage.
    $(this).children('.description').text(loadUserInput);
  });

});