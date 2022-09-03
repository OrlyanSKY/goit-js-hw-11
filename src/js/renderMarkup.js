export function renderMarkup(data, obj, markup) {
  data.forEach(elem => {
    obj.insertAdjacentHTML('beforeend', markup(elem));
  });
}
