
var browser = chrome || browser;

function onContextCLick(info, tab) {
    browser.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "readSelectedText",
	    "selectedText": info.selectionText
        });
    });
}

function onReadSelectionShortcut() {
    browser.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "readSelectedText"
        });
    });
}

function onGetSelection(info, tab) {
    browser.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "getSelection"
        });
    });
}

function onIconClick(info, tab) {
    browser.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "readFullPage"
        });
    });
}

function onHalveSpeed(info, tab) {
    browser.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "halveSpeed"
        });
    });
}

// Write this in an expandable way in case we want to move beyond selection
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Read Selected Text";
    var id = browser.contextMenus.create({
        "title": title,
        "contexts": [context],
        "onclick": onContextCLick
    });
}

browser.contextMenus.create({
    title: "Select text to read",
    onclick: onGetSelection
})

// Handle clicking on the browser icon
browser.browserAction.onClicked.addListener(function(tab) { onIconClick(); });
browser.commands.onCommand.addListener(function(command) {
    switch (command) {
        case 'read_selection':
            onReadSelectionShortcut();
            break;

        case 'graphical_selection':
            onGetSelection();
            break;

        case 'halve_speed':
            onHalveSpeed();
            break;
    }
});