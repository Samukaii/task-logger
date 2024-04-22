export var timestampToTime = function (timestamp) {
    var hours = Math.floor(timestamp / 3600000);
    var minutes = Math.floor((timestamp % 3600000) / 60000);
    if (!hours)
        return "".concat(minutes, "m");
    if (!minutes)
        return "".concat(hours, "h");
    return "".concat(hours, "h ").concat(minutes, "m");
};
//# sourceMappingURL=timestamp-to-time.js.map