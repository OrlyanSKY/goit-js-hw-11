import { fetchPics } from './fetch-img';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import gap from '../templates/gap.hbs';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

form.addEventListener('submit', onFormSbmt);
// form.addEventListener('keydown', logKey);

let page = 1;
let nameRequest = '';

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1,
};
const observer = new IntersectionObserver(updateGallery, options);

function onFormSbmt(evt) {
  evt.preventDefault();
  nameRequest = evt.currentTarget.elements.input.value;

  pixabayAPI(nameRequest, page);
}

async function pixabayAPI(nameRequest, page) {
  try {
    const data = await fetchPics(nameRequest, page);
    const hits = await data.hits;
    console.log(hits.length);
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderMarcup(hits);
    observer.observe(guard);
    simpleGallery();
  } catch (error) {
    Notify.warning(
      `We're sorry, but you've reached the end of search results.`
    );
  }
}

function renderMarcup(data) {
  data.forEach(elem => {
    galleryRef.insertAdjacentHTML('beforeend', gap(elem));
  });
}
function updateGallery(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pixabayAPI(nameRequest, (page += 1));
    }
  });
}
function simpleGallery() {
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false,
  });
  gallery.on('show.simplelightbox', function () {
    gallery.refresh();
  });
}
// function logKey(evt) {
//   if (evt.code === 'Enter') {
//     form.classList.remove('open');
//     evt.currentTarget.reset();
//   }
// }
