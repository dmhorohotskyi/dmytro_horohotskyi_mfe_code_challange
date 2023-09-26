export default {
    deferClosure(callback) {
        let called = 0;
        let resolved = 0;

        const callCallback = () => {
            resolved += 1;
            if(called === resolved) {
                callback();
            }
        }

        return function (timeout) {
            called += 1;

            setTimeout(
                callCallback,
                timeout
            );
        }

    },

    formatDateInYYYYMMDD(date) {
        const valueDate = new Date(date);
        const year = valueDate.getFullYear();
        const month = valueDate.getMonth() + 1;
        const formattedMonth = this.formatNumberTwoDigit(month);
        const day = valueDate.getUTCDate() + 1;
        const formattedDay = this.formatNumberTwoDigit(day);

        return `${year} - ${formattedMonth} - ${formattedDay}`;
    },

    formatDateInDDMMYYYY(date) {
        const valueDate = new Date(date);
        const year = valueDate.getFullYear();
        const month = valueDate.getMonth() + 1;
        const formattedMonth = this.formatNumberTwoDigit(month);
        const day = valueDate.getUTCDate() + 1;
        const formattedDay = this.formatNumberTwoDigit(day);

        return `${formattedDay}.${formattedMonth}.${year}`;
    },

    formatNumberTwoDigit(number) {
        return number > 9 ? number : `0${number}`;
    }
}