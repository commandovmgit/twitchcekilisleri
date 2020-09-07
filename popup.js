function localizeHtmlPage()
{
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++)
    {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH)
        {
            obj.innerHTML = valNewH;
        }
    }
}

localizeHtmlPage();

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