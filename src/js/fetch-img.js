import axios from 'axios';

const API_KEY = '29482011-99768188be0395583a9f1e73d';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPics(searchQuery, page) {
  const params = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: `${searchQuery}`,
    per_page: 40,
    page: `${page}`,
  };

  const response = await axios.get(BASE_URL, { params });
  return await response.data;
}
