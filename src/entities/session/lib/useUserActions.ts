import jwt from "jwt-decode";
import {useSetRecoilState} from "recoil";
import {sessionState} from "../model";
import { useNavigate } from "react-router-dom";
import {set} from "react-hook-form";

export const useUserActions = () => {
    const setSession = useSetRecoilState(sessionState)
    const navigate = useNavigate();
    const afterLogin = (token) => {
        const access_token = token.data.access_token
        localStorage.setItem("access_token", access_token)
        const data = jwt(access_token).subject
        setSession(data)
        return navigate("/")
    }
    const logOut = () => {
        localStorage.removeItem("access_token")
        setSession(null)
        return navigate("/")
    }
    return {
        afterLogin,
        logOut,
    }
}
