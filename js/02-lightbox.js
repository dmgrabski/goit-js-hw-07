import { galleryItems } from './gallery-items.js'; // Tylko jeden import

// Utwórz mark-up dla elementu galerii zgodnie z szablonem SimpleLightbox
const createGalleryItemMarkup = ({ preview, original, description }) => `
  <li>
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
  </li>
`;

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join('');
galleryContainer.innerHTML = `<ul class="gallery__items">${galleryMarkup}</ul>`;

// Inicjalizuj SimpleLightbox dla linków w kontenerze .gallery po dodaniu mark-up
document.addEventListener("DOMContentLoaded", function() {
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
});

