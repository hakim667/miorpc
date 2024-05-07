import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOFUlrJEadpsfQCTGyHFoDg7RPfKPGhLA",
  authDomain: "mio-rpc.firebaseapp.com",
  projectId: "mio-rpc",
  storageBucket: "mio-rpc.appspot.com",
  messagingSenderId: "37985438240",
  appId: "1:37985438240:web:f089c7ef3851c961ec8a45"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
