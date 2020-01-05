import {Injectable} from "@nestjs/common";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {cacheAdapterEnhancer} from 'axios-extensions';

@Injectable()
export class ApiService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: 'https://www.metal-archives.com',
            // headers: {'Cache-Control': 'no-cache'},
            adapter: cacheAdapterEnhancer(axios.defaults.adapter)
        });
    }

    async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await this.axios.get(url, config);
    }
}
