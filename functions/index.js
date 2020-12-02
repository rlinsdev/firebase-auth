const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check request is made by admin
  if (context.auth.token.admin != true) {
    return { error: 'only admins can add othre admins' };
  }

  // Get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `success! ${data.email} has been made a admin`,
      };
    })
    .catch((err) => {
      return err;
    });
});
