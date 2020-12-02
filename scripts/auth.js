// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e) =>{
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail}).then(result =>{
    console.log(result);
  });
})

// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult =>{
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    })
    db.collection('guides')
      .onSnapshot((snapshot) => {
        setupGuides(snapshot.docs);
        
      });
  } else {
    setupUI();
    setupGuides([]);
  }
});

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('guides')
    .add({
      title: createForm.title.value,
      content: createForm.content.value,
    })
    .then(() => {
      // Close modal and reset form
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// singup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user Info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  //sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      db.collection('users').doc(cred.user.uid).set({
        bio: signupForm['signup-bio'].value,
      });
    })
    .then(() => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  console.log('loged out');
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get user Info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then((response) => {
    //console.log(response);
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});
