import React from 'react';
import './App.css';
import TravelMap from './TravelMap';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBD_kBMKYuaiVbP_O8d4nm1vVGGtWFoZNI",
  authDomain: "goertzensonthego.firebaseapp.com",
  databaseURL: "https://goertzensonthego.firebaseio.com",
  projectId: "goertzensonthego",
  storageBucket: "goertzensonthego.appspot.com",
  messagingSenderId: "696043264490",
  appId: "1:696043264490:web:4b20e1e07ed75e5f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

interface travelLocation {
    name: string,
    lat: number,
    lng: number,
    arrive?: Date,
    depart?: Date
}
const locations: travelLocation[] = [
    { name: 'Ohio', lat: 41.1740136, lng: -81.519837, arrive: new Date('2000-01-01T03:24:00'), depart: new Date('2012-01-01T03:24:00') },
    { name: 'Lafayette, CA', lat: 37.8937188, lng: -122.1579631, arrive: new Date('2012-01-01T03:24:00'), depart: new Date('2019-07-28T03:24:00') },
    { name: 'Cuba', lat: 21.5001927, lng: -81.8118274, arrive: new Date('2019-07-28T03:24:00'), depart: new Date('2019-08-06T03:24:00') },
    { name: 'France', lat: 48.8588376, lng: 2.2768492, arrive: new Date('2019-08-06T03:24:00'), depart: new Date('2019-09-06T03:24:00') }
];

const App: React.FC = () => {
<<<<<<< HEAD
    return (
        <div className="App">
            <TravelMap locations={locations} />
        </div>
    );
=======
  var db = firebase.firestore();
  db.collection("locations").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
  });

  return (
    <div className="App">
      <TravelMap locations={locations}/>
    </div>
  );
>>>>>>> Pulling data from firestore!
}

export default App;
