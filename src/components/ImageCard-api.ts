import axios from 'axios';

const myApiKey = '8oNwi0OXqhtc_VusPDYLuJtezcuprtzlaHWsvb61_YA';
axios.defaults.headers.common['Authorization'] = `Client-ID ${myApiKey}`;
axios.defaults.baseURL = 'https://api.unsplash.com/search';

type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};

export const fetchImages = async (searchReq: string, page: number): Promise<Image[]> => {
  const response = await axios.get(`/photos`, {
    params: {
      query: searchReq,
      page: page,
      per_page: 5,
    },
  });

  return response.data.results;
};
