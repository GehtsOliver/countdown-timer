// UI Vars
const minutesLabel = document.body.querySelector("#minutes"),
  hoursLabel = document.body.querySelector("#hours"),
  daysLabel = document.body.querySelector("#days"),
  secondsLabel = document.body.querySelector("#seconds"),
  dateInput = document.body.querySelector("#date"),
  resetBtn = document.body.querySelector("#reset");

// Interval Var
let interval = null;

// Check LS if prior date input exists; if exists, call function with LS date;
if(localStorage.getItem("input")){
  const storedDate = localStorage.getItem("input");
  dateInput.value = storedDate;
  
  dateDifference(storedDate);
}

// Function to calculate time difference
function dateDifference(inputDate) { 

  // populate LS with date if LS empty or not equal to input date
 if(!localStorage.getItem("input")||localStorage.getItem("input")!=inputDate){
   localStorage.setItem("input", inputDate);
   clearInterval(interval);
   console.log(interval);
   interval = setInterval(() => dateDifference(inputDate), 1000)
 }

//  Date vars; turn date string into date object if necessary
  let curTime = new Date();
  let getDate = null;

    if(typeof inputDate !== "object"){
      getDate = new Date(inputDate);
    };

  // Check whether interval is already set; if not, set it
  if (!interval) {
    interval = setInterval(() => dateDifference(inputDate), 1000);
  }

  //   variable for Milliseconds in a day

  const millSecDay = 1000 * 60 * 60 * 24;

  // Difference between current Date and Date Input in MS
  const difference = getDate.getTime() - curTime.getTime();

  // Calculations of the differences in Days, Hours, Minutes and Seconds
  const days = Math.floor(difference / millSecDay).toFixed(0);
  const hours = Math.floor(
    Math.floor(difference % millSecDay) / (1000 * 60 * 60) - 1
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Update labels
  daysLabel.innerText = days;
  hoursLabel.innerText = hours;
  minutesLabel.innerText = minutes;
  secondsLabel.innerText = seconds;
}

// Reset button - reset input, interval and LS

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  dateInput.value = "";
  clearInterval(interval);
  daysLabel.innerText = "0";
  hoursLabel.innerText = "0";
  minutesLabel.innerText = "0";
  secondsLabel.innerText = "0";
})
