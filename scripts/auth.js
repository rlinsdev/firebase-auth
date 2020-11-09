// singup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user Info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  //console.log(email, password)

  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    //console.log(cred.user);

    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {});
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get user Info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then((response) => {
    console.log(response);
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});
