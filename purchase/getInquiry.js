const form = document.querySelector('#inquiry-form');

const metal = document.querySelector('#metal');
const grade = document.querySelector('#grade');
const size = document.querySelector('#size');
const quantity = document.querySelector('#quantity');
const shape = document.querySelector('#shape');

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
                        metal.value = doc.data().metal;
                        grade.value = doc.data().grade;
                        quantity.value = doc.data().quantity;
                        shape.value = doc.data().shape;
                        size.value = doc.data().sizes;
                    })
                })
            })
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = "./purchaseQuotation.html";
        })  
    }
    else{
        section.forEach(sect => {
            sect.innerHTML = `<h2>Please log-in to view details</h2>`
        }) 
    }
});
