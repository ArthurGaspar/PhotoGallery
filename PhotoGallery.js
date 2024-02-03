// Button and Image Logic

const buttons = document.querySelectorAll('.button');
const photos = document.querySelectorAll('.photo-wrapper');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    button.classList.toggle('active');
    filterPhotos(filter);
  });
});

function filterPhotos(filter) {
  photos.forEach(photo => {
    const categories = photo.getAttribute('data-category').split(' ');
    if (categories.indexOf(filter) !== -1) {
      const isActive = document.querySelector(`button[data-filter="${filter}"]`).classList.contains('active');
      if (isActive) {
        if (!photo.classList.contains('visible')) {
          photo.style.opacity = '0';
          photo.classList.add('visible');
          photo.classList.remove('hidden');
          photo.querySelector('img').classList.add('visible');
          photo.querySelector('img').classList.remove('hidden');
          setTimeout(() => {
            photo.style.opacity = '1';
          }, 200);
        }
      } else {
        let hasActiveCategory = false;
        categories.forEach(cat => {
          if (document.querySelector(`button[data-filter="${cat}"]`).classList.contains('active')) {
            hasActiveCategory = true;
          }
        });
        if (hasActiveCategory) {
          if (photo.classList.contains('hidden')) {
            photo.style.opacity = '0';
            photo.classList.add('visible');
            photo.classList.remove('hidden');
            photo.querySelector('img').classList.add('visible');
            photo.querySelector('img').classList.remove('hidden');
            setTimeout(() => {
              photo.style.opacity = '1';
            }, 50);
          }
        } else {
          if (photo.classList.contains('visible')) {
            photo.style.opacity = '0';
            setTimeout(() => {
              photo.classList.remove('visible');
              photo.classList.add('hidden');
              photo.querySelector('img').classList.remove('visible');
              photo.querySelector('img').classList.add('hidden');
              photo.style.opacity = '1';
            }, 500);
          }
        }
      }
    }
  });
}

// Image Modal

photos.forEach(container => {
  container.addEventListener('click', () => {
    const imgSrc = container.querySelector('img').getAttribute('src');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalImg = document.createElement('img');
    modalImg.setAttribute('src', imgSrc);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        modal.remove();
      }
    });
  });
});