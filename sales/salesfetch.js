//Fetching
const metal = document.querySelector('#recmetal');
const quan = document.querySelector('#recquan');
const delivery = document.querySelector('#recdel');
const amount = document.querySelector('#recamt');
const ibutton  = document.querySelector('#button-buy');
let sect = document.querySelector('section');
let content = sect.innerHTML;
let senderArray = [];
let timeArray= [];
let purchCompany;

auth.onAuthStateChanged(user => {

    if(user){
        
        db.collection('purchQuote').where('senderId' , '<' , Date.now()).orderBy('senderId' , "desc").get().then( (snapshot) =>{
            snapshot.docs.forEach( (doc) => {
                senderArray.push(doc.data().senderId);
                console.log(senderArray[0]);
                db.collection('purchQuote').where('senderId', '==', senderArray[0]).get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        metal.value = doc.data().metal;
                        delivery.value = doc.data().delivery;
                        amount.value = doc.data().amount * 1.05;
                        purchCompany = doc.data().purchaseCompany;
                    })
                })
            })
        })
        db.collection('metalsInquiry').where('timeId', '<', Date.now()).orderBy('timeId', "desc").get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                timeArray.push(doc.data().timeId);
                db.collection('metalsInquiry').where('timeId', '==', timeArray[0]).get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        quan.value = doc.data().quantity;
                    })
                })
            })
        });

        const salesComapny = auth.currentUser.email;
        ibutton.addEventListener('click' , (e) =>{
            e.preventDefault();
            db.collection('confirmOrder').add({
                metal: metal.value,
                Quantity: quan.value,
                Delivery: delivery.value,
                Amount: amount.value,
                salesComapny: salesComapny,
                purchaseCompany: purchCompany,
                orderId: senderArray[0]
            })
            alert('Order Confirmed!');
        })
    }
    else{
        sect.innerHTML = `<h2>Please Log-in</h2>`;
    }
})
            
        