import { apiHost } from '../constants/Api';
import { deleteRequest, getRequest, postRequest } from './BaseRequests';
import { GameProps } from '../types';

type GetGamesReponse = {
  games: GameProps[];
};

export const getAllGames = async () => {
  const url = `${apiHost}/games`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resp = await getRequest(url);
  return resp as GetGamesReponse;
};

export const samplePostGame = async (data: {
  score: number;
  frames: string;
  location?: string;
}) => {
  const url = `${apiHost}/games`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resp: GameProps = await postRequest(url, data);
  return resp;
};
