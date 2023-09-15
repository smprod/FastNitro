import {ReactElement, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {sessionState} from "../model";
import jwt from "jwt-decode";

export const SessionProvider = (props: {children: ReactElement | ReactElement[] }) => {
    const [session, setSession] = useRecoilState(sessionState)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem("access_token")
    useEffect(() => {
        if (session) return setLoading(false)
        if (token) {
            const data = jwt(token).subject
            setSession(data)
        }
        else if (!token) setLoading(false)
    }, [session, setSession, token]);
    return loading ? <>Loading...</> : props.children
}