import {api} from "@api";

export const changePassword = (username: string,
                            old_password: string,
                            new_password: string,
) => {
    return api.put("auth/email/change_password/", {
        username: username,
        old_password: old_password,
        new_password: new_password,
    })
}