export var getTimeDifference = function (first, second) {
    var newFirst = new Date(first);
    var newSecond = new Date(second);
    newFirst.setSeconds(0, 0);
    newSecond.setSeconds(0, 0);
    return Math.abs(newSecond.getTime() - newFirst.getTime());
};
//# sourceMappingURL=get-time-difference.js.map