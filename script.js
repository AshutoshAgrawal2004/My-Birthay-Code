// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCcTGiaSu-1MVRs6_dX2k0ZAYDSYysOY5Q",
  authDomain: "my-birthday-666b2.firebaseapp.com",
  databaseURL: "https://my-birthday-666b2.firebaseio.com",
  projectId: "my-birthday-666b2",
  storageBucket: "",
  messagingSenderId: "892038861110",
  appId: "1:892038861110:web:300e01b050b0c381"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var wishdb = db.collection('Wishes');
var wishbtn = $('#submit');
wishbtn.click(addWish);
var wishcontainer = $('#wishcontainer')[0]
console.log(wishcontainer)

function addWish() {
  let name = $('#name').val();
  let wish = $('#wish').val();
  let wishdata = {
    sender: name,
    wish: wish
  }
  wishdb.add(wishdata).then(docRef => {
    wishdb.doc(docRef.id).update({
      docid: docRef.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      console.log('saved to fb')
    });
  }).catch(error => console.log('an error occured', error));
}

function showWishes() {
  wishdb.orderBy('timestamp', 'desc').get().then((querySnapshot) => {
    while(wishcontainer.firstChild) wishcontainer.removeChild(wishcontainer.firstChild);
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      let json = doc.data();
      let wishhtml = `
      <p>${json.wish} <br> <span>${json.sender}</span></p>
      `
      wishcontainer.innerHTML += wishhtml;
    })
  }).then(() => console.log('success')).catch(error => console.error(error))
}