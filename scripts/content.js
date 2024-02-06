// Receiving a message
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === 'textToCopy') {
            copyHyperlink(request, sender, sendResponse);
        }
    }
);


function copyHyperlink(request, sender, sendResponse) {
    const h1 = document.getElementsByTagName('h1')[0];

    let { url, title, addDate, useHeading } = request;

    let range;
    if (window.getSelection() && window.getSelection().toString().length > 0) {
        range = window.getSelection().getRangeAt(0);
    }

    if (useHeading && h1) {
        title = h1.innerText;
    }

    console.log("Use heading: ", useHeading);
    console.log("Add date: ", addDate);

    let div = document.createElement('div');

    // Using DocumentFragment to preserve line breaks
    let fragment;
    if (range) {
        fragment = range.cloneContents();
    } else {
        fragment = document.createElement('p');
    }

    console.log("Fragment: ");
    console.log(fragment);
    let linkEl;
    let elType;

    // If more than one child element in fragment, add link as p; otherwise as span
    if (fragment.childElementCount > 1) {
        elType = 'p';
    } else {
        elType = 'span';
    }

    linkEl = document.createElement(elType);

    if (addDate) {
        const date = new Date().toLocaleDateString();
        linkEl.innerHTML = (`${range? ' - ':''}<a href="${url}">${title}</a> - ${date}`);
    } else {
        linkEl.innerHTML = (`${range? ' - ':''}<a href="${url}">${title}</a>`);
    }

    fragment.append(linkEl);

    // Add extra line break at the end by wrapping span in <p> element
    if (elType === 'span') {
        let p = document.createElement('p');
        p.append(fragment);
        div.append(p);
    } else {
        div.append(fragment);
    }

    console.log(div);
    const HTML = div.outerHTML;

    sendToClipboard(sendResponse, HTML);
}


function sendToClipboard(sendResponse, html) {
    const TYPE = "text/html";
    const BLOB = new Blob([html], {type: TYPE});
    const data = [new ClipboardItem({ [TYPE]: BLOB})];

    navigator.clipboard.write(data).then(
        () => {
            sendResponse({ confirmation: "Successfully copied to clipboard"});
        // clipboard successfully set
        },
        (err) => {
            console.log(err);
            sendResponse({ confirmation: "Something went wrong"});
        // clipboard write failed
        });
}


// <a href="https://www.flaticon.com/free-icons/copy-link" title="copy link icons">Copy link icons created by Freepik - Flaticon</a>
