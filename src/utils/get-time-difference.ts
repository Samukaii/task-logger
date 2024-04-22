export const getTimeDifference = (first: Date, second: Date) => {
    const newFirst = new Date(first);
    const newSecond = new Date(second);

    newFirst.setSeconds(0, 0);
    newSecond.setSeconds(0, 0);

    return Math.abs(newSecond.getTime() - newFirst.getTime());
}