import axios from "axios";
import {AuthProvider} from "@/auth/AuthProvider";

export function initAxios(): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
        try {
            axios.interceptors.request.use(function (config) {
                const provider = AuthProvider.init()
                const token = provider.getToken()?.token_type + ' ' + provider.getToken()?.access_token;
                config.headers.Authorization =  token;
                config.withCredentials = true
                return config;
            })
            resolve(true);
        }
        catch (exception){
            resolve(false);
        }
    });
}