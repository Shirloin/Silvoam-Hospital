const admin = require('firebase-admin');

// Initialize the Admin SDK
const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const deleteUserByUid = async (uid: string) => {
  try {
    await admin.auth().deleteUser(uid);
    console.log('Successfully deleted user');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

module.exports = deleteUserByUid;