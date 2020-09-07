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

function saveOptions() {
    var n = {quickAccessChannels: sanitizeChannels(q("#quick-access-channels").value)};
    chrome.storage.sync.set(n, didSave)
}

function restoreOptions() {
    chrome.storage.sync.get(defaults, function (n) {
        q("#quick-access-channels").value = n.quickAccessChannels
    })
}

function sanitizeChannels(n) {
    return String(n || "").split("\n").map(function (n) {
        return n.trim().toLowerCase()
    }).filter(function (n) {
        return !!n
    }).join("\n")
}

function debounce(n, e) {
    function t() {
        c = 0, a = n.apply(i, s), i = null, s = null
    }

    var i, s, a, c;
    return function () {
        return i = this, s = arguments, c && clearTimeout(c), c = setTimeout(t, e), a
    }
}

var q = document.querySelector.bind(document), defaults = {quickAccessChannels: ""}, didSave = function () {
    function n() {
        var a = i;
        i = Math.max(0, i - s), a !== i && (t.style.opacity = String(i)), e = i > 0 ? requestAnimationFrame(n) : 0
    }

    var e, t = q("#saved"), i = 0, s = .01;
    return t.style.opacity = "0", function () {
        i = 1, e || (e = requestAnimationFrame(n))
    }
}();
document.addEventListener("DOMContentLoaded", restoreOptions), q("body").addEventListener("input", debounce(saveOptions, 200));