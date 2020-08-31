function loadChannels() {
    chrome.storage.sync.get(defaults, function (e) {
        var n = serializeChannels(e.quickAccessChannels);
        return firstLoad && (firstLoad = !1, 1 === n.length) ? void chrome.tabs.create({url: chrome.extension.getURL("main.html?channel=" + n[0])}) : (channelsContainer.innerHTML = n.map(function (e) {
            var n = chrome.extension.getURL("main.html?channel=" + e);
            return '<a href="' + n + '" target="_blank">' + e + "</a>"
        }).join(""), void(n.length > 0 && q("#help").remove()))
    })
}

function serializeChannels(e) {
    return String(e || "").split("\n").map(function (e) {
        return e.trim().toLowerCase()
    }).filter(function (e) {
        return !!e
    })
}

var q = document.querySelector.bind(document), defaults = {quickAccessChannels: ""}, channelsContainer = q("#channels"),
    firstLoad = !0;
loadChannels(), chrome.storage.onChanged.addListener(loadChannels), document.addEventListener("DOMContentLoaded", loadChannels), document.querySelector("#to-options").addEventListener("click", function (e) {
    e.preventDefault(), chrome.runtime.openOptionsPage()
});