import {getTimeDifference} from "./utils/get-time-difference.js";

const workLoad = [
    '08:00',
    '12:30',
    '13:30',
    '17:30',
];

export const getWorkLoad = () => {
    return workLoad.map(time => {
        const [hours, minutes] = time.split(':');
        const date = new Date();

        date.setHours(+hours, +minutes, 0, 0);

        return {
            isAfter: (dateToCompare: Date) => dateToCompare.getTime() < date.getTime(),
            date
        };
    })
}

export const getLunchTime = () => {
    const workLoad = getWorkLoad();
    const lunchStart = workLoad[1];
    const lunchEnd = workLoad[2];

    return getTimeDifference(lunchStart.date, lunchEnd.date)
}
