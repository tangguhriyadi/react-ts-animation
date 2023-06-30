import React, { createContext, useContext, useState } from "react";

interface Notification {
    message: string;
    type?: "success" | "error";
}

interface NotificationContextType {
    notification?: Notification;
    setNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType>({
    setNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

type Props = {
    children: React.ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
    const [notification, setNotification] = useState<Notification>();

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
