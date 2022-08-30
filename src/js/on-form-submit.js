import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPics } from './fetch-img';
import { renderMarkup } from './renderMarkup';
import gap from '../templates/gap.hbs';

//Refs
const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

form.addEventListener('submit', onFormSbmt);

let page = 1;
let nameRequest = '';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  showCounter: false,
});

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0.5,
};
const observer = new IntersectionObserver(updateGallery, options);

function onFormSbmt(evt) {
  evt.preventDefault();

  if (nameRequest === evt.currentTarget.elements.input.value) {
    Notify.warning(`It's already found! May be another one?`);
    return;
  }

  nameRequest = evt.currentTarget.elements.input.value;
  evt.target.reset();
  form.classList.remove('open');
  galleryRef.innerHTML = '';
  page = 1;

  if (!nameRequest) {
    Notify.warning('Please, enter a search term!');
    evt.preventDefault();
    return false;
  }

  pixabayAPI(nameRequest, page);
}

async function pixabayAPI(nameRequest, page) {
  try {
    const data = await fetchPics(nameRequest, page);
    const hits = await data.hits;

    renderMarkup(hits, galleryRef, gap);
    gallery.refresh();
    if (hits.length >= 40) {
      observer.observe(guard);
    }
    if (page === 1 && hits.length > 1) {
      Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }
    if (!hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
  } catch (error) {
    // Notify.warning(
    //   `We're sorry, but you've reached the end of search results.`
    // );
  }
}

function updateGallery(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pixabayAPI(nameRequest, (page += 1));
    }
  });
}
