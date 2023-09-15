import {api} from "@api";

export const deleteAccount = () => {
    return api.delete("/account/user/delete_user")
}