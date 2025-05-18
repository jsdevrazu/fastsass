"use client"

import SocketsEventsConstant from "@/constants/sockets"
import { useSocketStore } from "@/hooks/use-socket-store"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query";


const SocketsEvents = () => {

    const { socket } = useSocketStore()
    const queryClient = useQueryClient();


    useEffect(() => {
        if (!socket) return;

        socket.on(SocketsEventsConstant.JOB_VIEW_UPDATE, (data) => {
            queryClient.setQueryData<EmployerStats>(["employer_stats"], (oldData) => {

                if (!oldData) return oldData;

                return {
                    ...oldData,
                    jobs_view: oldData.jobs_view + data?.job_view,
                };
            });
        });

        return () => {
            socket.off(SocketsEventsConstant.JOB_VIEW_UPDATE);
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on(SocketsEventsConstant.NEW_APPLICATION, (data) => {
            queryClient.setQueryData<EmployerStats>(["employer_stats"], (oldData) => {

                if (!oldData) return oldData;

                return {
                    ...oldData,
                    total_application: oldData.total_application + data?.application,
                };
            });
        });

        return () => {
            socket.off(SocketsEventsConstant.NEW_APPLICATION);
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on(SocketsEventsConstant.APPLICATION_STATUS, (data) => {
            queryClient.setQueryData<StatsResponse>(["seeker-dashboard-stats"], (oldData) => {

                if (!oldData) return oldData;

                return {
                    ...oldData,
                    interviewed: oldData.interviewed + data?.interviewed,
                };
            });
        });

        return () => {
            socket.off(SocketsEventsConstant.APPLICATION_STATUS);
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on(SocketsEventsConstant.PROFILE_VIEW, (data) => {
            queryClient.setQueryData<StatsResponse>(["seeker-dashboard-stats"], (oldData) => {

                if (!oldData) return oldData;

                return {
                    ...oldData,
                    profile_views: oldData.profile_views + data?.view,
                };
            });
        });

        return () => {
            socket.off(SocketsEventsConstant.PROFILE_VIEW);
        };
    }, [socket]);


    useEffect(() => {
        if (!socket) return;

        socket.on(SocketsEventsConstant.NOTIFICATION, (notification) => {

            console.log("notification", notification)
            queryClient.setQueryData(["get_notifications"], (oldData: NotificationResponse) => {
                if (!oldData || !Array.isArray(oldData.notifications)) {
                    return {
                        message: "success",
                        notifications: [notification],
                    };
                }

                return {
                    ...oldData,
                    notifications: [...oldData.notifications, notification],
                };
            });

        });

        return () => {
            socket.off(SocketsEventsConstant.NOTIFICATION);
        };
    }, [socket]);


    useEffect(() => {
        if (!socket) return;

        socket.on(SocketsEventsConstant.NEW_APPLICATION_SUBMIT, (notification) => {

            console.log("notification", notification)
            queryClient.setQueryData(["get_notifications"], (oldData: NotificationResponse) => {
                if (!oldData || !Array.isArray(oldData.notifications)) {
                    return {
                        message: "success",
                        notifications: [notification],
                    };
                }

                return {
                    ...oldData,
                    notifications: [...oldData.notifications, notification],
                };
            });

        });

        return () => {
            socket.off(SocketsEventsConstant.NEW_APPLICATION_SUBMIT);
        };
    }, [socket]);

    return null
}

export default SocketsEvents