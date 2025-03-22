import Component from "vue-class-component";
import Vue from "vue";
import {MessageType, NotificationMessage, SendType} from "@/store/model";

@Component({
    components: {
    }
})
export default class NotificationMenu extends Vue {

    private side : boolean = false
    private notifications : Array<NotificationMessage> = this.$store.getters.notifications

    created(){
    }

    public doNotification(value : NotificationMessage) : void{
       switch (value.messageType){
           case MessageType.INFO:{

               break;
           }
           case MessageType.WARNING:{

               break;
           }
           case MessageType.LOGOUT:{

               break;
           }
           case MessageType.REDIRECT:{

               break;
           }
           case MessageType.ACTION:{

               break;
           }
       }
    }

    public messageNotification(value: NotificationMessage) : string{
        console.log(value)
        if(value.messageCode){
            return this.$t(value.messageCode).toString();
        }
        return value.message;
    }

    get notificationInfo() : Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.INFO);
    }

    get notificationLogout() : Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.LOGOUT);
    }

    get notificationWarning() : Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.WARNING);
    }

    get notificationAction() : Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.ACTION);
    }

    get notificationRedirect() : Array<NotificationMessage> {
        return this.notifications.filter(item => item.messageType === MessageType.REDIRECT);
    }

}