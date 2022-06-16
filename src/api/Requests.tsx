import { apiHost } from "../constants/Api";
import { deleteRequest, getRequest, postRequest } from "./BaseRequests";

export const getAllGames = async () => {
    const url = `${apiHost}/games`;
    const resp = await getRequest(url);
    return resp;
  };