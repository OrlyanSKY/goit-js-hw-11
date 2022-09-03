import axios from 'axios';

const API_KEY = '29482011-99768188be0395583a9f1e73d';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPics(q, page) {
  const params = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
    q,
  };

  const response = await axios.get(BASE_URL, { params });
  return await response.data;
}
