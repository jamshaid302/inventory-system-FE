import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

async function loadMessaging() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      if (typeof window !== "undefined") {
        const { getMessaging, getToken, onMessage, isSupported } = await import(
          "@firebase/messaging"
        );
        const isSupportedBrowser = await isSupported();
        if (!isSupportedBrowser) {
          alert(
            "Firebase push notifications are not supported in this browser"
          );
          return;
        }
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        onMessage(messaging, (payload) => {
          console.log("Message received. ", payload);
          // ...
        });
        getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
        })
          .then((token) => {
            console.log({ token });
            // if (userId) {
            //   mutate({
            //     userId,
            //     token,
            //   });
            // }
          })
          .catch((err) => {
            console.log("User did not grant permission.", err);
          });
      }
    } else if (permission === "denied") {
      return;
    } else {
      return;
    }
  } catch (error) {
    console.log("Error in allowing permission", error);
  }
}

export default loadMessaging;
