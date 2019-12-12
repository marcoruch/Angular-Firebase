

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

    static ToddMMyyyy(date: Date) {
        let day: number = date.getDate();
        let month: number = date.getMonth();
        let strDay: string;
        let strMonth: string;
        month = month + 1;
        if ((String(day)).length == 1) {
            strDay = '0' + day;

        } else {

            strDay = day.toString();
        }
        if ((String(month)).length == 1) {
            strMonth = '0' + month;

        } else {
            strMonth = month.toString();
        }

        return strDay + '.' + strMonth + '.' + date.getFullYear();
    }
}