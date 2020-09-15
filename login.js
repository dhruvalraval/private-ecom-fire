const firebaseConfig = {
    apiKey: "AIzaSyCELspb5D7Q6xaFsHh5tCVYlYadd5H9R_0",
    authDomain: "upasana-metals.firebaseapp.com",
    databaseURL: "https://upasana-metals.firebaseio.com",
    projectId: "upasana-metals",
};
   
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
// firebase firestore
const auth = firebase.auth();
const db = firebase.firestore();

const logform = document.querySelector('#log-form');
const box = document.querySelector('.box');
const msg = `<p style="color:red">user not registered</p>`; 
logform.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = logform.email.value;
    const password = logform.password.value;
        

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const suid = `s${cred.user.uid}`;
        db.collection('salesCompany').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if(doc.id === suid){
                    window.location.href = './sales/sales.html';
                    logform.reset();
                }
                else{
                    const puid = `p${cred.user.uid}`;
                    db.collection('purchaseCompany').get().then((snapshot) => {
                        snapshot.docs.forEach(doc => {
                            if(doc.id === puid){
                                console.log(doc.id);
                                window.location.href = './purchase/purchase.html';
                                logform.reset();
                            }
                            else{
                                console.log('not registered');
                            }
                        });    
                    })
                }
            })
        })
    })
    .catch((error) => {
        box.innerHTML += `<p style="color:red">${error.message} or not registered</p>
                            <a href="./reg2.html"> click here to register </a>
                        `
    });    

});