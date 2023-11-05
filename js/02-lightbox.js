import { galleryItems } from './gallery-items.js';

// Tworzenie znacznika dla każdego elementu galerii
const createGalleryItemMarkup = ({ preview, original, description }) => `
  <li>
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
  </li>
`;

// Wyszukiwanie kontenera dla galerii
const galleryContainer = document.querySelector('.gallery');
// Tworzenie znaczników dla całej galerii i dołączanie ich do kontenera
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join('');
galleryContainer.innerHTML = galleryMarkup; // Poprawione, usunięcie dodatkowego <ul>

// Inicjalizacja SimpleLightbox po załadowaniu DOM i dodaniu elementów galerii
document.addEventListener("DOMContentLoaded", () => {
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
});

