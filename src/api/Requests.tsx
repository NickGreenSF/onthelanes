import { apiHost } from "../constants/Api";
import { deleteRequest, getRequest, postRequest } from "./BaseRequests";

export const getAllGames = async () => {
    const url = `${apiHost}/games`;
    const resp = await getRequest(url);
    return resp;
};

export const samplePostGame = async (data : Object) => {
  const url = `${apiHost}/games`;
  const resp = await postRequest(url, data);
  return resp;
}