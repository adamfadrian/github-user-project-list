export interface Users {
  avatar_url: string;
  login: string;
  id: number;
}

export interface UserRepo {
  id: number;
  name: string;
  visibility: string;
  html_url:string;
  languages_url?:string;
}

export type Languages = {
  [key: string]: {
    [key: string]: number;
  };
};
