import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

export const createUser = async (data: { email: string; password: string }): Promise<User> => {
  const response = await api.post<ApiResponse<User>>('/users', data);
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to create user');
  }
  return response.data.data!;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<ApiResponse<User[]>>('/users');
  if (!response.data.success) {
    throw new Error('Failed to fetch users');
  }
  return response.data.data!;
};
