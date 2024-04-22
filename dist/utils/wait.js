export var wait = function (time) {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(); }, time);
    });
};
//# sourceMappingURL=wait.js.map