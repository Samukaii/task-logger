export const timestampToTime = (timestamp: number) => {
    const hours = Math.floor(timestamp / 3_600_000);
    const minutes = Math.floor((timestamp % 3_600_000) / 60_000);

    if (!hours) return `${minutes}m`;
    if (!minutes) return `${hours}h`;

    return `${hours}h ${minutes}m`;
}