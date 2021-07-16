import React from "react";
import 'bootstrap/dist/css/bootstrap.css'

import SpellTest from "../components/spelling/spelltest";

import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_ENV_apiKey,
    authDomain: process.env.NEXT_PUBLIC_ENV_authDomain,
    databaseURL: process.env.NEXT_PUBLIC_ENV_databaseURL,
    projectId: process.env.NEXT_PUBLIC_ENV_projectId,
    storageBucket: process.env.NEXT_PUBLIC_ENV_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_ENV_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_ENV_appId,
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const SpellingGame = () => {
  return <SpellTest />;
};

export default SpellingGame;
