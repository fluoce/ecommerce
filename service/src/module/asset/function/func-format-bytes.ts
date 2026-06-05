export function funcFormatBytes(bytes: number): string {
    if (bytes <= 0) {
        return '0 B';
    }
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const index = Math.floor(
        Math.log(bytes) / Math.log(1024),
    );
    const value =
        bytes / Math.pow(1024, index);
    return `${parseFloat(
        value.toFixed(2),
    )} ${units[index]}`;
}