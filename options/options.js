
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


/*

// Saves options to chrome.storage
const saveOptions = () => {
    const heading = document.getElementById('heading').checked;
    const date = document.getElementById('date').checked;

    chrome.storage.sync.set(
      { useHeading: heading, addDate: date },
      () => {
        // // Update status to let user know options were saved.
        // const status = document.getElementById('status');
        // status.textContent = 'Options saved.';
        // setTimeout(() => {
        //   status.textContent = '';
        // }, 750);
      }
    );
  };

  // Restores checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { useHeading: true, addDate: false },
      (items) => {
        document.getElementById('heading').checked = items.useHeading;
        document.getElementById('date').checked = items.addDate;
      }
    );
  };

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
*/
