export function renderMarkup(data, ref, markup) {
  data.forEach(elem => {
    ref.insertAdjacentHTML('beforeend', markup(elem));
  });
}
