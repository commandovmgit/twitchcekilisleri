function sendMessage(e) {
    chatArea = document.querySelector('.chat-input');
    chatBox = document.querySelector('.chat-input [data-a-target="chat-input"]');
    chatSend = document.querySelector('.chat-input__buttons-container [data-a-target="chat-send-button"]');

    var nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    nativeTextAreaValueSetter.call(chatBox, e.payload + ' ');

    var messageEvent = new Event('input', { bubbles: true});
    chatBox.dispatchEvent(messageEvent);

    var sendEvent = new KeyboardEvent("keydown", {bubbles: !0, cancelable: !0, key: "Enter", code: "Enter"});
    Object.defineProperty(sendEvent, "keyCode", {value: 13}), Object.defineProperty(sendEvent, "which", {value: 13}), chatBox.dispatchEvent(sendEvent);
}

function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var chatSend, chatArea, chatBox;

postman = document.createElement("div");
postman.id = "twitch-giveaways-message-passing";
postman.style.display = "none";
document.body.appendChild(postman);

var requestHandlers = {"send-message": sendMessage};
var observer = new MutationObserver(function (e) {
    for (var t = 0; t < e.length; t++) {
        var n = e[t];
        if ("data-in" === n.attributeName) {
            var a = postman.getAttribute("data-in");
            try {
                var s = JSON.parse(a), o = requestHandlers[s.type];
                o && o(s)
            } catch (e) {
                console.log("Twitch Giveaways Reloaded: Can't parse data-in message: ", e.message)
            }
        }
    }
});

observer.observe(postman, {attributes: !0});

// loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js", function () {
//     jQuery.noConflict();
//
//     jQuery(document).ready(function ($) {
//
//     });
// });
//
// loadScript("https://cdn.rawgit.com/dwachss/bililiteRange/v2.5.2/bililiteRange.js", function () {});