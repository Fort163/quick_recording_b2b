import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {
    }
})
export default class Login extends Vue {

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
