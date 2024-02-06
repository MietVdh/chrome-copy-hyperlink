const options = {};

chrome.runtime.onInstalled.addListener(() => {
    // Create context menu
    chrome.contextMenus.create(
        {
            id: "copy-hyperlink",
            title: "Copy with hyperlink",
            contexts: ["all"],
        }
    );


    // Set default options
    options.addDate = false;
    options.useHeading = true;
    chrome.storage.sync.set({ options });
});

// Listener for option changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.options.newValue) {
        Object.assign(options, changes.options.newValue);
    }
});

// Listener for context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'copy-hyperlink') {
        selectInfoAndSend(info, tab);
    }
});

// Listener for command
chrome.commands.onCommand.addListener((command, tab) => {
    console.log(command);
    if (command === 'copy-selection-hyperlink') {
        selectInfoAndSend(info = null, tab);
    }
});

chrome.action.onClicked.addListener((tab) => {
    selectInfoAndSend(info = null, tab);
});


const selectInfoAndSend = (info, tab) => {
    retrieveOptions();
    // Get preferences
    console.log(options);
    let { useHeading, addDate } = options;

    const url = tab.url;
    const title = tab.title;

    // Sending a message
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'textToCopy',
            url: url,
            title: title,
            addDate: addDate,
            useHeading: useHeading
         });
    });
}


async function retrieveOptions() {
    const data = await chrome.storage.sync.get("options");
    Object.assign(options, data.options);
}
