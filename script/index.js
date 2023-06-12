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
}

// Modal open/close handle
editBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Profile info change handle
form.addEventListener('submit', formSubmitHandler);
