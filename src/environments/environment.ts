// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_images: '../assets',
  firebase: {
    projectId: 'fundacion-pae',
    appId: '1:352135160412:web:49a1fae945080d15acfc99',
    storageBucket: 'fundacion-pae.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDq8XV08czMp8kzoVAgnwjrB5wQ_e2mHuY',
    authDomain: 'fundacion-pae.firebaseapp.com',
    messagingSenderId: '352135160412',
  },
  actionCodeSettings: {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:4200/reset-password',
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

// Import the functions you need from the SDKs you need

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
