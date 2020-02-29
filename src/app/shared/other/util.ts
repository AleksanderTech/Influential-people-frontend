import { Urls } from "../constants/urls";

export class Util {
    static buildImageUrl(serverUrl: string, type: string, id: any): string {
        let url = "";
        switch (type) {
            case Urls.USER: {
                url = serverUrl + Urls.USER + "/" + id + Urls.IMAGE;
                break;
            }
            case Urls.HERO: {
                url = serverUrl + Urls.HERO + "/" + id + Urls.IMAGE;
                break;
            }
            case Urls.CATEGORY: {
                url = serverUrl + Urls.CATEGORY + "/" + id + Urls.IMAGE;
                break;
            }
        }
        return url;
    }
}