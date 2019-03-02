const getReviewAlbumId = (str) => {
    let indices = [];
    for(let i = 0; i < str.length; i++) {
        if (str[i] === "/") indices.push(i);
    }
    return str.substring(indices[indices.length - 3] + 1, indices[indices.length - 2]);
};

const formatDate = (date, year) => {
    let ln = date.substring(date.length - 1);
    date = date.concat(ln == 1 ? 'st' : ln == 2 ? 'nd' : ln == 3 ? 'rd' : 'th');
    return `${date}, ${year}`;
};

const getMonthNumber = (monthName) => {
    const months = [{long: 'January', short: 'Jan'},
        {long: 'February', short: 'Feb'},
        {long: 'March', short: 'Mar'},
        {long: 'April', short: 'Apr'},
        {long: 'May', short: 'May'},
        {long: 'June', short: 'June'},
        {long: 'July', short: 'July'},
        {long: 'August', short: 'Aug'},
        {long: 'September', short: 'Sept'},
        {long: 'October', short: 'Oct'},
        {long: 'November', short: 'Nov'},
        {long: 'December', short: 'Dec'}];

    let n = months.findIndex(el => el.long.toLowerCase() === monthName.toLowerCase() || el.short.toLowerCase() === monthName.toLowerCase());
    n = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(n + 1);
    return n !== -1 ? n : new Date().getMonth() + 1;
};

module.exports = {
    getReviewAlbumId,
    formatDate,
    getMonthNumber
};
