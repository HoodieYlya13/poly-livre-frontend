export interface AuthResponse {
  id: string;
  username: string | null;
  email: string;
  token: string;
  expiresIn: number;
};
