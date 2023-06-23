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

// Modal open handler
function openModal(modal) {
  modal.classList.add('modal_opened');
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

// Focus on input handler
function focusOn(item) {
  setTimeout(() => {
    item.focus();
  }, 100); // Set timeout to prevent problem with visibility modal opening animation
}

// Card create handler
function createCard({name, link}) {
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
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    imageTitle.textContent = cardTitle.textContent;

    openModal(modalImage);
  });

  return card;
};

// Card render handler
function renderCard(card) {
  cards.prepend(createCard(card));
}

// Cards from array render handler
function renderCardsFromArray(arr) {
  for (let item of arr) {
    renderCard(item);
  };
};

// Modal Profile edit open handler
function openProfileEditModal() {
  formProfileEditUsername.value = profileUserName.textContent;
  formProfileEditAbout.value = profileAbout.textContent;

  openModal(modalProfileEdit);

  focusOn(formProfileEditUsername);
};

// Modal Card add open handler
function openCardAddModal() {
  formCardAddImgTitle.value = '';
  formCardAddImgUrl.value = '';

  openModal(modalCardAdd);

  focusOn(formCardAddImgTitle);
};

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
