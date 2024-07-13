import axios from 'axios';
import { createContext } from 'react';
import React, { ReactNode, useMemo } from 'react';

export interface ApiContextInterface {
  get: (url: string) => Promise<any>;
  post: (url: string, body: any) => Promise<any>;
  put: (url: string, body: any) => Promise<any>;
  erase: (url: string, userId: string, id: string) => Promise<any>;
}

export const ApiContext = createContext<ApiContextInterface | undefined>({
  get: () => Promise.resolve(),
  post: () => Promise.resolve(),
  put: () => Promise.resolve(),
  erase: () => Promise.resolve(),
});

interface ApiProviderProps {
  children: ReactNode;
}

interface body {
  login: string;
  password: string;
}

const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const URL_BASE = 'http://localhost:30000';

  const apiContextValue: ApiContextInterface = useMemo(
    () => ({
      get: async (endpoint: string) => {
        try {
          const data = await axios.get(`${URL_BASE}/${endpoint}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          return data;
        } catch (error) {
          console.error('Error on GET request:', error);
          throw error;
        }
      },
      post: async (endpoint: string, body: body) => {
        try {
          const data = await axios.post(`${URL_BASE}/${endpoint}`, body, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          return data;
        } catch (error) {
          console.error('Error on POST request:', error);
          throw error;
        }
      },
      put: async (endpoint: string, body: body) => {
        try {
          const data = await axios.post(`${URL_BASE}/${endpoint}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          return data;
        } catch (error) {
          console.error('Error on POST request:', error);
          throw error;
        }
      },
      erase: async (endpoint: string, userId?: string | null, id?: string | null) => {
        try {
          const data = await axios.delete(`${URL_BASE}/${endpoint}/${userId}/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          return data;
        } catch (error) {
          console.error('Error on DELETE request:', error);
          throw error;
        }
      },
    }),
    []
  );

  return <ApiContext.Provider value={apiContextValue}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
