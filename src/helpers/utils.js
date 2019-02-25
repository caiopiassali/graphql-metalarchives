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

module.exports = {
    getReviewAlbumId,
    formatDate
};
