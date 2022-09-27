export const environment = {
  firebase: {
    projectId: 'fundacion-pae',
    appId: '1:352135160412:web:49a1fae945080d15acfc99',
    storageBucket: 'fundacion-pae.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDq8XV08czMp8kzoVAgnwjrB5wQ_e2mHuY',
    authDomain: 'fundacion-pae.firebaseapp.com',
    messagingSenderId: '352135160412',
  },
  production: true,
  url_images: '../assets',
  actionCodeSettings: {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://fundacion-pae.web.app/reset-password',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  }
};
