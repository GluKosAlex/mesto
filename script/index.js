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
const formProfileEditSubmitBtn = formProfileEdit.querySelector('.form__button');


// Card add form search
const formCardAdd = modalCardAdd.querySelector('.form');
const formCardAddImgTitle = formCardAdd.querySelector('.form__text-input_data_img-title');
const formCardAddImgUrl = formCardAdd.querySelector('.form__text-input_data_img-url');
const formCardAddSubmitBtn = formCardAdd.querySelector('.form__button');

// Template search
const cardTemplate = document.querySelector('#element-template').content;

// Cards list search
const cards = document.querySelector('.elements');

// Add mousedown event to target node
function addClickEventTo(target, handler) {
  // 'mousedown' prevents closing modal on releasing btn after selecting text when the cursor stands on the modal overlay
  target.addEventListener('mousedown', handler);
};

// Focus on input handler
function focusOn(item) {
  setTimeout(() => {
    item.focus();
  }, 100); // Set timeout to prevent problem with visibility modal opening animation
};

// Modal open handler
function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', coseModalByEscHandler);
};

// Modal Profile edit open handler
function openProfileEditModal() {
  formProfileEditUsername.value = profileUserName.textContent;
  formProfileEditAbout.value = profileAbout.textContent;

  disableButton(formProfileEditSubmitBtn, VALIDATION_CONFIG);

  openModal(modalProfileEdit);
  focusOn(formProfileEditUsername);
};

// Modal Card add open handler
function openCardAddModal() {
  formCardAdd.reset();

  disableButton(formCardAddSubmitBtn, VALIDATION_CONFIG);

  openModal(modalCardAdd);
  focusOn(formCardAddImgTitle);
};

// Modal close handler
function closeModal(modal) {
  modal.classList.remove('modal_opened');

  //Solving issue with error message and input decoration save after closing modal
  cleanInputError(modal);

  // Remove listener by keydown to close modal by press Esc
  document.removeEventListener('keydown', coseModalByEscHandler);
};

// Close modal by press Eck handler
function coseModalByEscHandler(evt) {
  if (evt.key === 'Escape') {
    const modal = Array.from(modals).find(item => item.classList.contains('modal_opened'));
    closeModal(modal);
  };
};

// Close modal by click on overlay handler
function coseModalByOverlayHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  };
};

// Add close handler to close buttons and modal overlay
function addCloseHandlerTo(item) {
  // console.log(item);
  const closeBtn = item.querySelector('.modal__close');
  addClickEventTo(closeBtn, () => {
    closeModal(item);
  });
  addClickEventTo(item, coseModalByOverlayHandler);
};

// Add close handlers to modals handler
function addCloseHandlersTo(items) {
  items.forEach(item => {
    addCloseHandlerTo(item);
  });
};

// Clean input error messages
function cleanInputError(item) {
  const inputList = item.querySelectorAll('.form__text-input');
  inputList.forEach(inputElement => {
    hideInputError(item, inputElement, VALIDATION_CONFIG);
  });
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

// Save info from profile edit form inputs to profile content handler
function saveProfileInfo() {
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

// Add close handlers to modals close buttons and overlays
addCloseHandlersTo(modals);
