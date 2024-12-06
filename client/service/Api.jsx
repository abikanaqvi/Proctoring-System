import { BACKEND_URL } from "./Helper";
import { commanrequest } from "./ApiCall";
// import axios from "axios";

export const signup = async(data) => {
    return await commanrequest("POST", `${BACKEND_URL}/SIGNUP`, data)
}

