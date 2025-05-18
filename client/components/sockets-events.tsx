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

    return null
}

export default SocketsEvents