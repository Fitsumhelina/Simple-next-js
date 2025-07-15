import api from './api';
import { User, LoginData, RegisterData, AuthResponse } from '@/types';

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/api/register', data);
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/api/login', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/logout');
  },

  async getUser(): Promise<User> {
    const response = await api.get('/api/user');
    return response.data;
  },

  async checkAuth(): Promise<User | null> {
    try {
      const user = await this.getUser();
      return user;
    } catch (error) {
      return null;
    }
  }
};