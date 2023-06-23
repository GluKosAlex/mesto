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

// Profile search
const profileInfo = document.querySelector('.profile');
const profileUserName = profileInfo.querySelector('.profile__username');
const profileAbout = profileInfo.querySelector('.profile__about');

// Modal windows search
const modals = document.querySelectorAll('.modal');
const modalProfileEdit = document.querySelector('.modal_type_profile-edit');
const modalCardAdd = document.querySelector('.modal_type_card-add');
const modalImage = document.querySelector('.modal_type_image');

// Modals open buttons search
const btnProfileEdit = profileInfo.querySelector('.profile__edit');
const btnCardAdd = profileInfo.querySelector('.profile__add-btn');

// Image info search
const image = modalImage.querySelector('.modal__image');
const imageTitle = modalImage.querySelector('.modal__image-title');

// Profile edit form search
const formProfileEdit = modalProfileEdit.querySelector('.form');
const formProfileEditUsername = formProfileEdit.querySelector('.form__text-input_data_username');
const formProfileEditAbout = formProfileEdit.querySelector('.form__text-input_data_about');

// Card add form search
const formCardAdd = modalCardAdd.querySelector('.form');
const formCardAddImgTitle = formCardAdd.querySelector('.form__text-input_data_img-title');
const formCardAddImgUrl = formCardAdd.querySelector('.form__text-input_data_img-url');

// Template search
const cardTemplate = document.querySelector('#element-template').content;

// Cards list search
const cards = document.querySelector('.elements');

// Add click event to target node
function addClickEventTo(target, handler) {
  target.addEventListener('click', handler);
}

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
    openImageModal();
    image.src = cardImage.src;
    imageTitle.textContent = cardTitle.textContent;
  });

  cards.prepend(card);
};

// Cards from array render handler
function renderCardsFromArray(arr) {
  arr.forEach(renderCard);
}

// Modal Profile edit open handler
function openProfileEditModal() {
  formProfileEditUsername.value = profileUserName.textContent;
  formProfileEditAbout.value = profileAbout.textContent;
  modalProfileEdit.classList.add('modal_opened');
  setTimeout(() => {
    formProfileEditUsername.focus(); // Focus on username field after modal open
  }, 100); // Set timeout to prevent problem with visibility animation
};

// Modal Card add open handler
function openCardAddModal() {
  formCardAddImgTitle.value = '';
  formCardAddImgUrl.value = '';
  modalCardAdd.classList.add('modal_opened');
  setTimeout(() => {
    formCardAddImgTitle.focus(); // Focus on image title field after modal open
  }, 100); // Set timeout to prevent problem with visibility animation
};

// Modal Image open handler
function openImageModal() {
  modalImage.classList.add('modal_opened');
};

// Modal close handler
function closeModal(evt) {
  evt.target.closest('.modal').classList.remove('modal_opened');
};

// Add close handler to close buttons
function addCloseHandlerTo(items) {
  for (let item of items) {
    const closeBtn = item.querySelector('.modal__close');
    addClickEventTo(closeBtn, closeModal);
  }
}

// Save info from profile edit form inputs to profile content handler
function saveProfileInfo(evt) {
  evt.preventDefault(); // Prevent form sending

  profileUserName.textContent = formProfileEditUsername.value;
  profileAbout.textContent = formProfileEditAbout.value;

  closeModal(evt); // Close modal after save
};

// Save info from card add form inputs handler
function saveCardInfo(evt) {
  evt.preventDefault(); // Prevent form sending
  const newCardInfo = {};

  newCardInfo.name = formCardAddImgTitle.value;
  newCardInfo.link = formCardAddImgUrl.value;

  renderCard(newCardInfo);

  closeModal(evt); // Close modal after save
};

// Render Initial cards
renderCardsFromArray(initialCards);

// Profile info change handle
formProfileEdit.addEventListener('submit', saveProfileInfo);

// Card add handle
formCardAdd.addEventListener('submit', saveCardInfo);

// Add close handler to close buttons of modal windows
addCloseHandlerTo(modals);

// Modal Profile edit open handle
addClickEventTo(btnProfileEdit, openProfileEditModal);

// Modal Card add open handle
addClickEventTo(btnCardAdd, openCardAddModal);
