export interface GameProps {
  score: number;
  frames: string;
  location?: string;
  id: number;
  user_id: string;
  username: string;
  description?: string;
  date?: string;
  splits?: string;
}

export interface UserProps {
  id: number;
  username: string;
}
