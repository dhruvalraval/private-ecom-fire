const form = document.querySelector('#purchase-form');

const metal = document.querySelector('#metal');
const rate = document.querySelector('#rate');
const size = document.querySelector('#size');
const cutting = document.querySelector('#cutting');
const loading = document.querySelector('#loading');
const packaging = document.querySelector('#packaging');
const forwarding = document.querySelector('#forwarding');
const payment = document.querySelector('#payment');
const delivery = document.querySelector('#delivery');
const quote = document.querySelector('#quote');
const amount = document.querySelector('#amount');

let timeArray = [];
let metalInq;

auth.onAuthStateChanged((user) => {
    if(user){
        section.innerHTML = content;

        db.collection('metalsInquiry').where('timeId', '<', Date.now()).orderBy('timeId', "desc").get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                timeArray.push(doc.data().timeId);
                console.log(timeArray[0]);
                db.collection('metalsInquiry').where('timeId', '==', timeArray[0]).get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        metalInq = doc.data().metal;
                        metal.value = metalInq;
                    })
                })
            })
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection('purchQuote').add({
                metal: metalInq,
                rate: rate.value,
                size: size.value,
                cutting: cutting.value,
                loading: loading.value,
                packaging: packaging.value,
                forwarding: forwarding.value,
                payment: payment.value,
                delivery: delivery.value,
                quote: quote.value,
                amount: amount.value,
                senderId: timeArray[0],
                purchaseCompany: auth.currentUser.email,
            });
            alert('Order Quotation Sent');
        })  
    }
    else{
        section.forEach(sect => {
            sect.innerHTML = `<h2>Please log-in to view details</h2>`
        }) 
    }
});
