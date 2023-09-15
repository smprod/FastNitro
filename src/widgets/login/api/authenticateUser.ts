import {api} from "@api";

export const authenticateUser = (username: string, password: string) => {
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    return api.post("/auth/email/login/", data)
}