const clocks = [
    "clock-time-1-outline",
    "clock-time-2-outline",
    "clock-time-3-outline",
    "clock-time-4-outline",
    "clock-time-5-outline",
    "clock-time-6-outline",
    "clock-time-7-outline",
    "clock-time-8-outline",
    "clock-time-9-outline",
    "clock-time-10-outline",
    "clock-time-11-outline",
    "clock-time-12-outline",
];
export function registerClock(handler: (icon: string, time: string)=>void) {
    const interval = 50;
    setInterval(() => {
        let date = new Date();
        let iconIndex = Math.floor(date.getTime()/interval)%clocks.length;
        let icon = clocks[iconIndex];
        let time = getTimeString(date);
        console.log(date, iconIndex, icon, time);
        handler(icon, time);
    }, interval);
}
function getTimeString(date: Date) {
    return (date.getHours()+"").padStart(2, "0")
        + ":" +
        (date.getMinutes()+"").padStart(2, "0")
        + ":" +
        (date.getSeconds()+"").padStart(2, "0");
}