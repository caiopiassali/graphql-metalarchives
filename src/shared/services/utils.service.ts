import {Injectable} from "@nestjs/common";

@Injectable()
export class UtilsService {
    constructor() {
    }

    getAlbumReviewId(url: string): string {
        let indices = [];
        for (let i = 0; i < url.length; i++) {
            if (url[i] === "/") indices.push(i);
        }
        return url.substring(indices[indices.length - 3] + 1, indices[indices.length - 2]);
    }

    getFormattedAlbumReviewDate(date: string, year: number): string {
        const ln = date.substring(date.length - 1);
        date = date.concat(ln == '1' ? 'st' : ln == '2' ? 'nd' : ln == '3' ? 'rd' : 'th');
        return `${date}, ${year}`;
    }
}
