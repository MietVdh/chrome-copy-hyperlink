document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("copy-hyperlink").addEventListener("click", () => {
        window.close();
        copyLink();

    });

    document.getElementById("copy-all-tabs").addEventListener("click", () => {
        window.close();
        copyAllTabs();
    });
});


// Copy the title/heading of the webpage as hyperlink
async function copyLink() {
    const options = {};
    const data = await chrome.storage.sync.get("options");
    Object.assign(options, data.options);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const thisTab = tabs[0];
        console.log(thisTab);
        chrome.tabs.sendMessage(thisTab.id, {
            type: 'textToCopy',
            url: thisTab.url,
            title: thisTab.title,
            addDate: options.addDate,
            useHeading: options.useHeading
        });
    });
};


// Copy the titles of all open tabs as hyperlink
async function copyAllTabs() {
    const options = {};
    const data = await chrome.storage.sync.get("options");
    Object.assign(options, data.options);

    chrome.tabs.query({currentWindow: true}, function(tabs) {
        let activeTab;
        const message = {};
        message.type = "allTabs";
        const links = [];
        for (let tab of tabs) {
            if (tab.active) {
                activeTab = tab;
                message.activeTab = activeTab;
            }
            console.log(tab);
            links.push({
                url: tab.url,
                title: tab.title
            });
        };

        message.links = links;
        chrome.tabs.sendMessage(activeTab.id, message);
    });
};
