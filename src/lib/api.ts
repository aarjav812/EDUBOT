const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

class ApiClient {
  private getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      
      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid response from server');
      }
      throw error;
    }
  }

  private async makeRequest<T>(
    url: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, options);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      // Network error or fetch failed
      if (error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please ensure backend is running on port 5000.');
      }
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    university?: string;
    course?: string;
    year?: number;
  }): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });
  }

  async getMe(token: string): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/auth/me`, {
      headers: this.getHeaders(token),
    });
  }

  async updateProfile(token: string, data: any): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });
  }

  // Chat endpoints
  async sendMessage(
    token: string,
    message: string,
    conversationId: string
  ): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ message, conversationId }),
    });
  }

  async getChatHistory(
    token: string,
    conversationId?: string
  ): Promise<ApiResponse> {
    const url = conversationId
      ? `${API_URL}/chat/history/${conversationId}`
      : `${API_URL}/chat/history`;
    
    return this.makeRequest(url, {
      headers: this.getHeaders(token),
    });
  }

  async deleteConversation(
    token: string,
    conversationId: string
  ): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/chat/conversation/${conversationId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });
  }

  // Reminder endpoints
  async getReminders(token: string, filters?: {
    type?: string;
    completed?: boolean;
  }): Promise<ApiResponse> {
    let url = `${API_URL}/reminders`;
    if (filters) {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.completed !== undefined) {
        params.append('completed', filters.completed.toString());
      }
      url += `?${params.toString()}`;
    }
    
    return this.makeRequest(url, {
      headers: this.getHeaders(token),
    });
  }

  async createReminder(token: string, reminderData: {
    title: string;
    description?: string;
    type: string;
    dueDate: string;
    reminderTime: string;
    priority?: string;
    course?: string;
    tags?: string[];
  }): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/reminders`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(reminderData),
    });
  }

  async updateReminder(
    token: string,
    id: string,
    updates: any
  ): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/reminders/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(updates),
    });
  }

  async deleteReminder(token: string, id: string): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/reminders/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });
  }

  async completeReminder(token: string, id: string): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/reminders/${id}/complete`, {
      method: 'PATCH',
      headers: this.getHeaders(token),
    });
  }

  // Push notification endpoints
  async subscribeToPush(token: string, subscription: PushSubscription): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/reminders/subscribe`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ subscription }),
    });
  }

  async unsubscribeFromPush(token: string): Promise<ApiResponse> {
    return this.makeRequest(`${API_URL}/reminders/unsubscribe`, {
      method: 'POST',
      headers: this.getHeaders(token),
    });
  }
}

const apiClient = new ApiClient();

// Export namespaced API
const api = {
  auth: {
    register: (userData: Parameters<ApiClient['register']>[0]) => apiClient.register(userData),
    login: (credentials: Parameters<ApiClient['login']>[0]) => apiClient.login(credentials),
    getMe: (token: string) => apiClient.getMe(token),
    updateProfile: (data: any, token: string) => apiClient.updateProfile(token, data),
  },
  chat: {
    sendMessage: (message: string, conversationId: string, token: string) => 
      apiClient.sendMessage(token, message, conversationId),
    getHistory: (token: string, conversationId?: string) => 
      apiClient.getChatHistory(token, conversationId),
    deleteConversation: (conversationId: string, token: string) => 
      apiClient.deleteConversation(token, conversationId),
  },
  reminders: {
    getAll: (token: string, filters?: Parameters<ApiClient['getReminders']>[1]) => 
      apiClient.getReminders(token, filters),
    create: (data: Parameters<ApiClient['createReminder']>[1], token: string) => 
      apiClient.createReminder(token, data),
    update: (id: string, updates: any, token: string) => 
      apiClient.updateReminder(token, id, updates),
    delete: (id: string, token: string) => apiClient.deleteReminder(token, id),
    complete: (id: string, token: string) => apiClient.completeReminder(token, id),
  },
  notifications: {
    subscribe: (subscription: PushSubscription, token: string) => 
      apiClient.subscribeToPush(token, subscription),
    unsubscribe: (token: string) => apiClient.unsubscribeFromPush(token),
  },
};

export default api;
