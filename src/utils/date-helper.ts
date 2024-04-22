
const isAfter = (first: Date, second: Date) => first.getTime() > second.getTime();
const isBefore = (first: Date, second: Date) => first.getTime() < second.getTime();


export const dateHelper = {
    isAfter,
    isBefore
}
