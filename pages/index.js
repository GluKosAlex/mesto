// Modal window search
const modal = document.querySelector('.modal');
const editBtn = document.querySelector('.profile__edit');
const closeBtn = modal.querySelector('.modal__close');
// Form search
const form = modal.querySelector('.form');
const formUsername = form.querySelector('[name=username]');
const formDesc = form.querySelector('[name=desc]');
const formSubmit = form.querySelector('[type=submit]');
// Profile search
const profile = document.querySelector('.profile');
const profileUserName = profile.querySelector('.profile__username');
const profileDesc = profile.querySelector('.profile__desc');

// Modal open handler
function openModal(evt) {
  if (evt.target === evt.currentTarget) {
    formUsername.value = profileUserName.textContent; // Copy username from info to form username text field
    formDesc.value = profileDesc.textContent; // Copy description from info to form description text field
    modal.classList.add('modal_show');
    formUsername.focus(); // Focus on username field after modal open
  }
};

// Modal close handler
function closeModal(evt) {
  if (evt.target === evt.currentTarget) {
    modal.classList.remove('modal_show');
  }
};

// Modal open/close handle
editBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('mousedown', closeModal); // Add mousedown to prevent the window from closing after selecting text by dragging the cursor and releasing the button when the cursor is outside the modal content element

// Profile info change handle
form.addEventListener('submit', evt => {
  evt.preventDefault(); // Prevent form sending
  if (formUsername.value && formDesc.value) {
    profileUserName.textContent = formUsername.value;
    profileDesc.textContent = formDesc.value;
    closeModal(evt); // Close modal after save
  } else {
    console.log('Заполните все поля!');
  }
});
