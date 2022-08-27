import { fetchPics } from './fetch-img';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import gap from '../templates/gap.hbs';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

form.addEventListener('submit', onFormSbmt);
form.addEventListener('keydown', logKey);

async function onFormSbmt(evt) {
  evt.preventDefault();
  const nameRequest = evt.currentTarget.elements.input.value;

  try {
    const data = await fetchPics(nameRequest);
    const hits = await data.hits;

    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderMarcup(hits);
    simpleGallery();
  } catch (error) {
    Notify.warning('ERROR');
  }
}

function logKey(evt) {
  if (evt.code === 'Enter') {
    form.classList.remove('open');
    // evt.currentTarget.reset();
  }
}

function renderMarcup(data) {
  data.forEach(elem => {
    galleryRef.innerHTML += gap(elem);
  });
}

function simpleGallery() {
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false,
  });
  gallery.on('show.simplelightbox');
}
