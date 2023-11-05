import { galleryItems } from './gallery-items.js';

const createGalleryItemMarkup = ({ preview, original, description }) => `
  <div class="gallery__item">
    <a class="gallery__link" href="${original}" data-source="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>
`;

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join('');
galleryContainer.innerHTML = galleryMarkup;

let instance;
function onEscapePress(event) {
  if (event.key === 'Escape' && instance && instance.visible()) {
    instance.close();
  }
}

galleryContainer.addEventListener('click', (event) => {
  event.preventDefault(); 
  let target = event.target;
  let link = target.closest('.gallery__link');
  if (!link) {
    return; // Przerwij jeśli kliknięto poza linkiem
  }

  const source = link.getAttribute('data-source');
  const description = target.alt;

  instance = basicLightbox.create(`
      <img src="${source}" width="800" height="600" alt="${description}">
  `, {
    onShow: (instance) => {
      document.addEventListener('keydown', onEscapePress);
    },
    onClose: (instance) => {
      document.removeEventListener('keydown', onEscapePress);
    }
  });

  instance.show();
});
