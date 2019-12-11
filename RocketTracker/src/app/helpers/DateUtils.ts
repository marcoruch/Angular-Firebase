

export default class DateUtils {
    static GetDateByDaysOffset = function (date: Date, days: number) {
        console.log("==> ", date);
        date.setDate(date.getDate() + days);
        return date;
    }

    static addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }
}