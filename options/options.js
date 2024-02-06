const options = {}
const optionsForm = document.getElementById("optionsForm");

// Store updated useHeading setting
optionsForm.heading.addEventListener("change", (event) => {
  options.useHeading = event.target.checked;
  chrome.storage.sync.set({ options });
});

// Store updated addDate setting
optionsForm.date.addEventListener("change", (event) => {
  options.addDate = event.target.checked;
  chrome.storage.sync.set({ options });
});

async function displayChosenOptions() {
  const data = await chrome.storage.sync.get("options");
  Object.assign(options, data.options);
  optionsForm.heading.checked = Boolean(options.useHeading);
  optionsForm.date.checked = Boolean(options.addDate);
}

// Display currently selected options when document is loaded
document.addEventListener('DOMContentLoaded', displayChosenOptions);

// Close options window when "OK" button clicked
document.getElementById('confirm').addEventListener('click', () => {
  window.close();
});
