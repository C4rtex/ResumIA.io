chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "get_body_content") {
    var selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
        sendResponse(selectedText);
        return;
    }
    var text = document.body.innerText || document.body.textContent;
    sendResponse(text);
    }
});
