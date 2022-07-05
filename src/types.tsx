export interface GameProps {
  score: number;
  frames: string;
  location?: string;
  id?: number;
  user_id?: number;
}

export interface UserProps {
  id: number;
  username: string;
}
