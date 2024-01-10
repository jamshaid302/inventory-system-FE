import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBos3A51IdqVrncIg6ThCYSq1HDySGfDT8",
  authDomain: "butt-sanitary.firebaseapp.com",
  projectId: "butt-sanitary",
  storageBucket: "butt-sanitary.appspot.com",
  messagingSenderId: "411838110760",
  appId: "1:411838110760:web:c904ef252c8af9bf2aa91d",
  measurementId: "G-6MJS2JBMBX",
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
          vapidKey:
            "BAmhRwjygvdH4j5vElgOVyhbmVNEow85nkeq4vRb1jzY0AYcIeq1t5o4Ex2YZkq-YSLupkuRv8DiRRhpDgW2enw",
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
