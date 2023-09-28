"use client";

import { useSession } from "next-auth/react";

export const ClientAuth = () => {
    const { data } = useSession();
    const user = JSON.stringify(data)

    return (
        <>
            <h1>Client Session</h1>
            <pre>{user}</pre>
        </>
    );
};