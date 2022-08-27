import axios from 'axios';

export async function fetchPics(searchQuery) {
  const params = {
    key: '29482011-99768188be0395583a9f1e73d',

    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: `${searchQuery}`,
    per_page: 40,
  };
  try {
    return await axios
      .get('https://pixabay.com/api/', { params })
      .then(res => res.data);
  } catch (err) {
    console.error(err);
  }
}
