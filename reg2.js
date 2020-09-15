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


  
const signupform = document.querySelector('#signup-form');
let div = document.querySelector('.box');
const msg = `<p style="color: red; font-size: 1rem">Check both password</p>`;
let id;


signupform.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupform.coemail.value;
    const pass = signupform.pass.value;
    const cpass = signupform.cpass.value;
    
    if( pass === cpass){
      if(signupform.compType.value === 'purchaseCompany'){
          auth.createUserWithEmailAndPassword(email, pass).then(cred => {
            id = `p${cred.user.uid}`;
            return db.collection('purchaseCompany').doc(id).set({
                id: cred.user.uid,
                companyName: signupform.coname.value,
                companyNumber: signupform.conumber.value,
                companyEmail: signupform.coemail.value,
                companyAddress: signupform.coadd.value,
                companyType: signupform.compType.value,
            });   
            
          }).then(() => {
            window.location.href = "./purchase/purchase.html";
            signupform.reset();
          });  
        }
        else if(signupform.compType.value === 'salesCompany'){
          auth.createUserWithEmailAndPassword(email, pass).then(cred => {
            id = `s${cred.user.uid}`;
            return db.collection('salesCompany').doc(id).set({
                id:cred.user.uid,
                companyName: signupform.coname.value,
                companyNumber: signupform.conumber.value,
                companyEmail: signupform.coemail.value,
                companyAddress: signupform.coadd.value,
                companyType: signupform.compType.value,
            });
          }).then(() => {
            window.location.href = "./sales/sales.html";
            signupform.reset();
          }); 
        }
    }
    else{
      div.innerHTML += msg;
    }
}); 


       
    



  

