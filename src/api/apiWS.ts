import SockJS from "sockjs-client";
import Stomp, {Client} from "webstomp-client";
import {AuthProvider} from "@/auth/AuthProvider";
import {notificationApi} from "@/api/apiUtil";

export class ApiWS {

    private provider : AuthProvider = AuthProvider.init();

    get ws(): WebSocket | null {
        return this._ws;
    }

    set ws(value: WebSocket | null) {
        this._ws = value;
    }

    get socket(): Client | null {
        return this._socket;
    }

    set socket(value: Client | null) {
        this._socket = value;
    }

    private _URL : string = 'http://localhost:8050/api/v1/notification/socket' //+ notificationApi('/notification/socket')
    private _ws : WebSocket | null = null;
    private _socket : Client | null = null;
    private _isConnect = false;

    get isConnect(): boolean {
        return this._isConnect;
    }

    set isConnect(value: boolean) {
        this._isConnect = value;
    }

    get URL(): string {
        return this._URL;
    }

    set URL(value: string) {
        this._URL = value;
    }

    get accessToken(): string {
        const token = this.provider.getToken();
        if(token != null){
            return token.access_token;
        }
        throw new Error("accessToken not set");
    }

    public connect(){
        this._ws = new SockJS(this.URL);
        this._socket = Stomp.over(this._ws);
        //this._socket.debug = () => {}
        this._socket.connect( {
            Authorization : 'Bearer ' + this.accessToken,
        },frame => {
            this._isConnect = true;
        },frame => {
           this.provider.logout()
        });
    }



}