importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBos3A51IdqVrncIg6ThCYSq1HDySGfDT8",
  authDomain: "butt-sanitary.firebaseapp.com",
  projectId: "butt-sanitary",
  storageBucket: "butt-sanitary.appspot.com",
  messagingSenderId: "411838110760",
  appId: "1:411838110760:web:c904ef252c8af9bf2aa91d",
  measurementId: "G-6MJS2JBMBX",
};

firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
