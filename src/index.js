import { Notify } from 'notiflix';
import OnlyScroll from 'only-scrollbar';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import search from './js/search';

import { fetchPics } from './js/fetch-img';
import gap from './templates/gap.hbs';
import refs from './js/refs';

refs.form.addEventListener('submit', onFormSbmt);

let page = 1;
let nameRequest = '';

const scroll = new OnlyScroll(document.scrollingElement);
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  showCounter: false,
});

const observOptions = {
  root: null,
  rootMargin: '100px',
  threshold: 0.5,
};

function updateGallery(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pixabayAPI(nameRequest, (page += 1));
    }
  });
}
const observer = new IntersectionObserver(updateGallery, observOptions);

function onFormSbmt(evt) {
  evt.preventDefault();

  if (!evt.currentTarget.elements.input.value) {
    Notify.warning('Please, enter a search term!');
    return;
  }
  if (nameRequest === evt.currentTarget.elements.input.value) {
    Notify.warning(`It's already found! May be another one?`);
    return;
  }
  nameRequest = evt.currentTarget.elements.input.value;

  evt.target.reset();
  refs.form.classList.remove('open');
  refs.galleryRef.innerHTML = '';
  page = 1;

  pixabayAPI(nameRequest, page);
}

async function pixabayAPI(nameRequest, page) {
  observer.unobserve(refs.guard); //если новый поиск вернет не более одной страницы

  try {
    const { hits, totalHits } = await fetchPics(nameRequest, page);

    if (!hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    gap(hits);
    gallery.refresh();

    if (hits.length === 40) {
      observer.observe(refs.guard);
    }

    if (page === 1 && hits.length > 1) {
      Notify.info(`Hooray! We found ${totalHits} images.`);
    }
  } catch (error) {
    Notify.warning(
      `We're sorry, but you've reached the end of search results.`
    );
    observer.unobserve(refs.guard);
  }
}
