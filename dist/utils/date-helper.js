var isAfter = function (first, second) { return first.getTime() > second.getTime(); };
var isAfterOrEqual = function (first, second) { return first.getTime() >= second.getTime(); };
var isBefore = function (first, second) { return first.getTime() < second.getTime(); };
var isBeforeOrEqual = function (first, second) { return first.getTime() <= second.getTime(); };
export var dateHelper = {
    isAfter: isAfter,
    isBefore: isBefore,
    isBeforeOrEqual: isBeforeOrEqual,
    isAfterOrEqual: isAfterOrEqual
};
//# sourceMappingURL=date-helper.js.map