import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoDqq2DvVtinhSurbSH5KvB8u-zA_wnyo",
    authDomain: "gofetchtest.firebaseapp.com",
    projectId: "gofetchtest",
    storageBucket: "gofetchtest.appspot.com",
    messagingSenderId: "465473015075",
    appId: "1:465473015075:web:4882d3c77f5faa6dd61096"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);