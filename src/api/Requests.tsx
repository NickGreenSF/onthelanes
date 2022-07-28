import { apiHost } from '../constants/Api';
import { getRequest, postRequest, deleteRequest } from './BaseRequests';
import { GameProps, UserProps } from '../types';

type GetGamesReponse = {
  games: GameProps[];
};

export const getAllGames = async () => {
  const url = `${apiHost}/games`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resp = await getRequest(url);
  return resp as GetGamesReponse;
};

export const getUserGames = async (firebaseId: string) => {
  const url = `${apiHost}/users/${firebaseId}`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resp = await getRequest(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return resp.games;
};

export const postGame = async (data: {
  score: number;
  frames: string;
  location?: string;
  description?: string;
  date?: string;
  uid: string;
  splits?: string;
}) => {
  const url = `${apiHost}/games`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resp: GameProps = await postRequest(url, data);
  return resp;
};

export const postUser = async (data: {
  username: string;
  firebase_id: string;
}) => {
  const url = `${apiHost}/users`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resp: UserProps = await postRequest(url, data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return resp;
};

export const deleteGame = async (data: { id: number }) => {
  const url = `${apiHost}/games`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resp: boolean = await deleteRequest(url, data);
  return resp;
};
