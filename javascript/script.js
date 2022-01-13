import timezones from "./timezones.js";

// get all elements of class timebox
const timeboxes = document.querySelectorAll(".timebox");

// initialize all timeboxes
for (const timebox of timeboxes) {
  // All boxes start with their default timezone as their current timezone
  timebox.dataset.currentTimezone = timebox.dataset.defaultTimezone;
  const select = timebox.querySelector("select");
  // The main box has no select, so we can skip the following
  if (select) {
    // add all timezones to the select
    for (const timezone of timezones) {
      var el = document.createElement("option");
      el.textContent = timezone;
      select.appendChild(el);
    }

    // add a handler that automatically triggers when the value of the select changes
    select.addEventListener("input", () => {
      // for "Vælg" use the default instead
      timebox.dataset.currentTimezone =
        select.value == "Vælg" ? timebox.dataset.defaultTimezone : select.value;
      updateTimeboxName(timebox);
    });
  }
  updateTimeboxName(timebox);
}

function updateTimeboxName(timebox) {
  // The .split("/").pop() gets the part after the last "/" in the name
  // if this is not wanted, just remove that part
  timebox.querySelector(".timezone").textContent =
    timebox.dataset.overwriteName ||
    timebox.dataset.currentTimezone.split("/").pop();
  updateTimebox(timebox);
}

function updateTimebox(timebox) {
  timebox.querySelector(".time").textContent = new Date().toLocaleString(
    "en-US",
    {
      timeZone: timebox.dataset.currentTimezone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hourCycle: "h23",
    }
  );
}

function updateAllTimeboxes() {
  for (const timebox of timeboxes) {
    updateTimebox(timebox);
  }
}

// update all timeboxes every second
setInterval(updateAllTimeboxes, 1000);
