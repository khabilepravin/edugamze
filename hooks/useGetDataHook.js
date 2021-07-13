import React from "react";
import firebase from "firebase";

export const useGetData = (numberRandomRecords) => {
    const [documents, setDocuments] = React.useState([]);
    const db = firebase.firestore();
    const max = 871;
    let recordIndexes = [];
    for (let i = 0; i < numberRandomRecords; i++) {
      recordIndexes.push(getRandomInt(max));
    }
  
    React.useEffect(() => {
      db.collection("spellingwords")
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.docs.map((doc) =>
            arr.push({ id: doc.id, value: doc.data() })
          );
  
          let resultArr = [];
          recordIndexes.map((i) => {
            resultArr.push({ wordData: arr[i].value });
          });
  
          setDocuments(resultArr);
        });
    }, [db]);
    return [documents];
  };

  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  