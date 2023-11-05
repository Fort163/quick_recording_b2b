import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {
    }
})
export default class Login extends Vue {

    /*created(){
        let payload = new FormData()
        payload.append('grant_type', 'authorization_code')
        payload.append('code', code)
        payload.append('redirect_uri', redirectUri)
        payload.append('client_id', clientId)

        return axios.post('/oauth2/token', payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': authHeaderValue
                }
            }
        ).then(response => {

            // получаем токены, кладем access token в LocalStorage
            console.log("Result getting tokens: " + response.data)
            window.sessionStorage.setItem(ACCESS_TOKEN_KEY, response.data[ACCESS_TOKEN_KEY]);
        })
    }*/

    public tryLoginGoogle() {
        window.location.href = this.createUrl(process.env.VUE_APP_OAUTH_GOOGLE);
    }

    public tryLoginYandex() {
        window.location.href = this.createUrl(process.env.VUE_APP_OAUTH_YANDEX);
    }

    public tryLoginQR() {
        window.location.href = this.createUrl(process.env.VUE_APP_OAUTH_QR);
    }

    private createUrl(oauthUrl: string): string {
        const requestParams = new URLSearchParams({
            response_type: "code",
            client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
            redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URI,
            scope: 'read.scope write.scope'
        });
        return process.env.VUE_APP_BASE_URL_SSO + oauthUrl +'?'+ requestParams;
    }

}
