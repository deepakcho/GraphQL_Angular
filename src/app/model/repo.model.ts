export type Repo = {
  name: string;
  stargazerCount: number;
  url: string;
  isPrivate: boolean;
  ownner: { login: string };
};
