const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Modal window search
const modal = document.querySelector('.modal');
const editBtn = document.querySelector('.profile__edit');
const closeBtn = modal.querySelector('.modal__close');

// Form search
const form = modal.querySelector('.form');
const formUsername = form.querySelector('.form__text-input_data_username');
const formAbout = form.querySelector('.form__text-input_data_about');
// Profile search
const profile = document.querySelector('.profile');
const profileUserName = profile.querySelector('.profile__username');
const profileAbout = profile.querySelector('.profile__about');
// Template search
const cardTemplate = document.querySelector('#element-template').content;
// Cards list search
const cards = document.querySelector('.elements');

// Card render handler
function renderCard({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');
  const cardLikeButton = card.querySelector('.element__like');
  const cardDeleteButton = card.querySelector('.element__delete');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Фото достопримечательностей с места: ${name}`;

  addClickEventTo(cardLikeButton, () => {
    cardLikeButton.classList.toggle('element__like_active')
  });
  addClickEventTo(cardDeleteButton, () => {
    const parentCard = cardDeleteButton.closest('.element');
    parentCard.remove();
  });
  addClickEventTo(cardImage, () => {
    const parentCard = cardDeleteButton.closest('.element');
    parentCard.remove();
  });

  cards.prepend(card);
};

// Add click event to target node
function addClickEventTo(target, handler) {
  target.addEventListener('click', handler);
}

// Cards from array render handler
function renderCardsFromArray(arr) {
  arr.forEach(renderCard);
}

// Modal open handler
function openModal() {
  formUsername.value = profileUserName.textContent; // Copy username from info to form username text field
  formAbout.value = profileAbout.textContent; // Copy 'about' text from info to form 'about' text field
  modal.classList.add('modal_opened');
  formUsername.focus(); // Focus on username field after modal open
};

// Modal close handler
function closeModal() {
  modal.classList.remove('modal_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault(); // Prevent form sending
  profileUserName.textContent = formUsername.value;
  profileAbout.textContent = formAbout.value;
  closeModal(); // Close modal after save
};

// Modal open/close handle
addClickEventTo(editBtn, openModal);
addClickEventTo(closeBtn, closeModal);

// Profile info change handle
form.addEventListener('submit', formSubmitHandler);

// Render Initial cards
renderCardsFromArray(initialCards);
