import { User, UserProps } from "./User";

export interface Notification {
    id: string;
    name: string;
    userid: string
}

export interface NotificationProps {
    notification: Notification;
}

export function NotificationConstructor(name: string, userid:string) {
    const notification: Notification = {
        id: "",
        name: name,
        userid: userid
    }
    return notification
}