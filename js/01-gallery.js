import { galleryItems } from './gallery-items.js'; // Tylko jeden import

// Utwórz mark-up dla elementu galerii
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

// Referencja do obecnie otwartego modala
let instance;

// Obsługa zamknięcia modalu za pomocą klawisza Escape
function onEscapePress(event) {
  if (event.key === 'Escape' && instance && instance.visible()) {
    instance.close();
  }
}

// Ustawianie event listenerów dla otwarcia modalu i obsługi klawisza Escape
galleryContainer.addEventListener('click', (event) => {
  event.preventDefault(); 
  let target = event.target;
  let link = target.closest('.gallery__link');
  if (!link) {
    return; // Przerwij jeśli kliknięto poza linkiem
  }

  // Pobierz atrybuty dla modala
  const source = link.getAttribute('data-source');
  const description = target.alt;

  // Tworzenie instancji basicLightbox
  instance = basicLightbox.create(`
      <img src="${source}" width="800" height="600" alt="${description}">
  `, {
    onShow: (instance) => {
      // Dodaj listener klawisza Escape kiedy modal jest pokazywany
      document.addEventListener('keydown', onEscapePress);
    },
    onClose: (instance) => {
      // Usuń listener klawisza Escape kiedy modal jest zamykany
      document.removeEventListener('keydown', onEscapePress);
    }
  });

  instance.show();
});
