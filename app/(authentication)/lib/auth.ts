import api from "../lib/axios";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  role?: "admin" | "Job seeker" | "employer";
}

export interface LoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}
export type UserRole ="Job seeker" | "employer"

export interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}


export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    {
      username,
      password,
      expiresInMins: 30,
    }
  );

  return response.data;
}


export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api.get<AuthUser>(
    "/auth/me"
  );

  return response.data;
}


export async function signup(
  data: SignupData
) {
  const response = await api.post(
    "/users/add",
    data
  );

  return response.data;
}


export async function refreshToken(
  refreshToken: string
) {
  const response = await api.post(
    "/auth/refresh",
    {
      refreshToken,
      expiresInMins: 30,
    }
  );

  return response.data;
}