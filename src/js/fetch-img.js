import axios from 'axios';

export async function fetchPics(searchQuery, page) {
  const params = {
    key: '29482011-99768188be0395583a9f1e73d',

    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: `${searchQuery}`,
    per_page: 40,
    page: `${page}`,
  };

  const response = await axios.get('https://pixabay.com/api/', { params });
  return await response.data;
}
