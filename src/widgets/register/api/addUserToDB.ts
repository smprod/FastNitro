import { api } from "@api"

export const addUserToDB = (username: string,
                        email: string,
                        password: string,
) => {
    return api.post<string>("/auth/email/sign-up/", {username: username, email: email, password: password})
}