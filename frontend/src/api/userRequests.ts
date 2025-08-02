import api from "./config";

type User = {
    name: string; email: string; password: string
}

export const apiCreateAccount = async (data: User) => {
    try {
        const account = await api.post("auth/signup", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return account;
    } catch (error) {
        throw error;
    }
};


interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export const apiLogin = async (data: LoginPayload): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("auth/signin", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export interface UserProfile {
    name: string;
    email: string;
}

export const apiGetUserInfo = async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>("/user/me");
    return response.data;
};
