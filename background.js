
!(function (e, a, t, c, n, o, s) {
    (e.GoogleAnalyticsObject = n),
      (e[n] =
        e[n] ||
        function () {
          (e[n].q = e[n].q || []).push(arguments);
        }),
      (e[n].l = 1 * new Date()),
      (o = a.createElement(t)),
      (s = a.getElementsByTagName(t)[0]),
      (o.async = 1),
      (o.src = "https://www.google-analytics.com/analytics.js"),
      s.parentNode.insertBefore(o, s);
  })(window, document, "script", 0, "ga"),
    ga("create", "UA-158032727-2", "auto"),
    ga("set", "checkProtocolTask", null),
    ga("set", { page: "/background", title: chrome.i18n.getMessage("BACKGROUND_TITLE") }),
    ga("send", "pageview", "/background");