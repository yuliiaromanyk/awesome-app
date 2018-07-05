import firebase from "firebase";

export const config = {
    apiKey: "AIzaSyB_XwTaQvXJzqNmzqfsXC2PfWg-eEpnx8w",
    authDomain: "awesome-app-7a5b3.firebaseapp.com",
    databaseURL: "https://awesome-app-7a5b3.firebaseio.com",
    projectId: "awesome-app-7a5b3",
    storageBucket: "awesome-app-7a5b3.appspot.com",
    messagingSenderId: "589768711626"
  };

  firebase.initializeApp(config);
  export default firebase;
