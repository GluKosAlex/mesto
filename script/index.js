// Profile search
const profileInfo = document.querySelector('.profile');
const profileUserName = profileInfo.querySelector('.profile__username');
const profileAbout = profileInfo.querySelector('.profile__about');

// Modal windows search
//const modals = document.querySelectorAll('.modal');
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

// Add mousedown event to target node
function addClickEventTo(target, handler) {
  // 'mousedown' prevents closing modal on releasing btn after selecting text when the cursor stands on the modal overlay
  target.addEventListener('mousedown', handler);
};

// Modal open handler
function openModal(modal) {

  modal.classList.add('modal_opened');
  addCloseHandlerTo(modal);
};

// Clean input error messages
function cleanInputError(item) {

  const inputErrorList = item.querySelectorAll('.form__input-error');
  inputErrorList.forEach(errorElement => {
    errorElement.classList.remove('form__input-error_visible');
    errorElement.textContent = '';
  });

  const inputList = item.querySelectorAll('.form__text-input');
  inputList.forEach(inputElement => {
    inputElement.classList.remove('form__text-input_type_error');
  });
}

// Modal close handler
function closeModal(modal) {
  modal.classList.remove('modal_opened');

  //Solving issue with error message and input decoration save after closing modal
  cleanInputError(modal);

  // Remove listener by keydown to close modal by press Esc
  modal.removeEventListener('keydown', coseModalByEscHandler);
};

// Close modal by click on overlay handler
function coseModalByOverlayHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  };
};

// Close modal by press Eck handler
function coseModalByEscHandler(modal, evt) {
  console.log(evt.target);
  if (evt.key === 'Escape') {
    closeModal(modal);
  };
};

// Add close handler to close buttons, modal overlay and Esc
function addCloseHandlerTo(item) {
  const closeBtn = item.querySelector('.modal__close');
  addClickEventTo(closeBtn, () => {
    closeModal(item);
  });
  addClickEventTo(item, coseModalByOverlayHandler);
  document.addEventListener('keydown', evt => {
    coseModalByEscHandler(item, evt);
  });
};

// Focus on input handler
function focusOn(item) {
  setTimeout(() => {
    item.focus();
  }, 100); // Set timeout to prevent problem with visibility modal opening animation
};

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
    cardLikeButton.classList.toggle('element__like_active');
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
};

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
  profileUserName.textContent = formProfileEditUsername.value;
  profileAbout.textContent = formProfileEditAbout.value;

  closeModal(modalProfileEdit); // Close modal after save
};

// Save info from card add form inputs handler
function saveCardInfo() {
  const newCardInfo = {};
  newCardInfo.name = formCardAddImgTitle.value;
  newCardInfo.link = formCardAddImgUrl.value;

  renderCard(newCardInfo);

  closeModal(modalCardAdd); // Close modal after save
};

// Render Initial cards
renderCardsFromArray(initialCards);

// Profile info change handle
formProfileEdit.addEventListener('submit', saveProfileInfo);

// Card add handle
formCardAdd.addEventListener('submit', saveCardInfo);

// Modal Profile edit open handle
addClickEventTo(btnProfileEdit, openProfileEditModal);

// Modal Card add open handle
addClickEventTo(btnCardAdd, openCardAddModal);
