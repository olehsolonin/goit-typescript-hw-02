import axios from 'axios';
import { Image } from './App/App'; // Імплементуйте тип з файлу types.ts

const myApiKey = '8oNwi0OXqhtc_VusPDYLuJtezcuprtzlaHWsvb61_YA';
axios.defaults.headers.common['Authorization'] = `Client-ID ${myApiKey}`;
axios.defaults.baseURL = 'https://api.unsplash.com/search';

export const fetchImages = async (searchReq: string, page: number): Promise<Image[]> => {
  const response = await axios.get('/photos', {
    params: {
      query: searchReq,
      page: page,
      per_page: 5
    }
  });
  return response.data.results;
};
