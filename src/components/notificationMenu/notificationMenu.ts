import Component from "vue-class-component";
import Vue from "vue";
import {NotificationMessage} from "@/models/notification-service";
import {MessageType} from "@/models/message";
import {Page} from "@/models/main";
import {notificationApi, qrB2BApi} from "@/api/apiUtil";
import {Inject} from "vue-property-decorator";
import {ApiB2B} from "@/api/api";
import {AuthProvider} from "@/auth/AuthProvider";
import {Company} from "@/models/company-service";

@Component({
    components: {}
})
export default class NotificationMenu extends Vue {

    @Inject('api') api: ApiB2B | undefined;
    private side: boolean = false
    private notifications: Array<NotificationMessage> = this.$store.getters.notifications

    created() {
    }

    public doNotification(value: NotificationMessage): void {
        const param = {
            "uuid": value.uuid,
            "received": true
        }
        this.api?.putApi<NotificationMessage>(notificationApi("/notification/message/patch"), param).then(value => {
            this.$store.commit("removeNotification", value);
            switch (value.messageType) {
                case MessageType.INFO: {
                    if (value.path) {
                        this.$router.push(value.path)
                    }
                    break;
                }
                case MessageType.WARNING: {
                    if (value.path) {
                        this.$router.push(value.path)
                    }
                    break;
                }
                case MessageType.LOGOUT: {
                    this.api?.deleteApi<Boolean>(qrB2BApi('/session')).then(response => {
                        AuthProvider.init().logout();
                    }).catch(reason => {
                        AuthProvider.init().logout();
                    });
                    break;
                }
                case MessageType.REDIRECT: {
                    if (value.path) {
                        window.open(value.path, '_blank');
                    }
                    break;
                }
                case MessageType.ACTION: {

                    break;
                }
            }
        });
    }

    public messageNotification(value: NotificationMessage): string {
        if (value.messageCode) {
            return this.$t(value.messageCode).toString();
        }
        if(value.message){
            return value.message;
        }
        return "";
    }

    get notificationInfo(): Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.INFO);
    }

    get notificationLogout(): Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.LOGOUT);
    }

    get notificationWarning(): Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.WARNING);
    }

    get notificationAction(): Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.ACTION);
    }

    get notificationRedirect(): Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.REDIRECT);
    }

}