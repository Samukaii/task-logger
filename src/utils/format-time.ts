export const formatTime = (date: Date) => {
    return date.toLocaleString('pt', {
        hour: '2-digit',
        minute: '2-digit'
    });
}