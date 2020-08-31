function processMessage(channel, userstate, message, self) {
    if (self) {
        return;
    }
    sendToContent({
        type: "chat-message",
        payload: {
            user: {
                name: userstate.username,
                displayName: userstate["display-name"],
                badges: userstate.badges,
                staff: userstate.staff || false,
                admin: userstate.admin || false,
                broadcaster: (typeof userstate.badges !== 'undefined' && userstate.badges && typeof userstate.badges.broadcaster !== 'undefined' && userstate.badges.broadcaster === '1') || false,
                subscriber: userstate.subscriber,
                mod: userstate.mod,
                vip: (typeof userstate.badges !== 'undefined' && userstate.badges && typeof userstate.badges.vip !== 'undefined' && userstate.badges.vip === '1') || false,
                turbo: userstate.turbo,
                prime: (typeof userstate.badges !== 'undefined' && userstate.badges && typeof userstate.badges.premium !== 'undefined' && userstate.badges.premium === '1') || false,
                subscribedTime: userstate.subscriber ? userstate.badges.subscriber : null,
                bits: (typeof userstate.badges !== 'undefined' && userstate.badges && typeof userstate.badges.bits !== 'undefined') ? parseInt(userstate.badges.bits) : 0
            },
            text: message.trim(),
            html: emotify({
                tags: {emotes: (typeof userstate.emotes !== 'undefined' && userstate.emotes) ? userstate.emotes : []},
                message: message
            }).trim()
        },
        meta: {channel: channel.match(/#?(.+)/)[1]}
    });
}

function emotify(e) {
    var t = e.message, n = [], a = [];
    Object.keys(e.tags.emotes).forEach(function (t) {
        for (var a = 0; a < e.tags.emotes[t].length; a++) {
            var ep = e.tags.emotes[t][a].split('-');
            n.push({
                id: t,
                start: ep[0],
                end: ep[1]
            });
        }
    }), n.sort(emoteSorter);
    for (var s = 0, o = 0; o < n.length; o++) {
        var r = n[o];
        r.start > 0 && a.push(t.slice(s, r.start));
        var i = t.slice(r.start, r.end + 1), c = "https://static-cdn.jtvnw.net/emoticons/v1/" + r.id + "/1.0";
        a.push('<img class="emoticon" src="' + c + '" alt="' + i + '" title="' + i + '">'), s = r.end + 1
    }
    return t.length > s && a.push(t.slice(s)), a.join("")
}

function emoteSorter(e, t) {
    return e.start < t.start ? -1 : 1
}

function sendToContent(e) {
    postman.setAttribute("data-out", JSON.stringify(e))
}

cns = window.location.search.match(/channel=([^&]+)(&|$)/);
channelname = cns ? cns[1].toLowerCase() : null;
ignoredSenders = ["twitchnotify", "jtv"];

var postman;
postman = document.createElement("div");
postman.id = "twitch-giveaways-message-passing";
postman.style.display = "none";
document.body.appendChild(postman);

var observer = new MutationObserver(function (e) {
    for (var t = 0; t < e.length; t++) {
        var n = e[t];
        if ("data-out" === n.attributeName) {
            try {
                var a = postman.getAttribute("data-out");
                document.getElementById('tgr').dispatchEvent(new CustomEvent('chat-data', {detail: JSON.parse(a)}));
            } catch (e) {
                console.log("Twitch Giveaways Reloaded: Can't parse data-out message: ", e.message)
            }
        }
        if ("data-in" === n.attributeName) {
            try {
                var a = postman.getAttribute("data-in");
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, JSON.parse(a));
                });
            } catch (e) {
                console.log("Twitch Giveaways Reloaded: Can't parse data-in message: ", e.message)
            }
        }
    }
});
observer.observe(postman, {attributes: !0});

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

var TJS, TJSClient;

function startChatListener() {

    if (channelname === null) {
        return;
    }

    // In this example, TwitchJS is included via a <script /> tag, so we can access
    // the library from window.
    TJS = window.TwitchJS;

    // Define client options.
    var options = {
        options: {
            // Debugging information will be outputted to the console.
            debug: true
        },
        connection: {
            reconnect: true,
            secure: true
        },
        channels: [`#${channelname}`]
    };

    TJSClient = new TwitchJS.client(options);

    // Add listeners for events, e.g. a chat event.
    TJSClient.on('chat', processMessage);

    // Finally, connect to the Twitch channel.
    TJSClient.connect();

}

setTimeout(startChatListener, 500);