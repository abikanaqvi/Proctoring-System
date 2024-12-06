import { BACKEND_URL } from "./Helper";
import { commanrequest } from "./ApiCall";
// import axios from "axios";

export const Loginbackend = async(data) => {
    return await commanrequest("POST", `${BACKEND_URL}/api/signin`, data)
}

