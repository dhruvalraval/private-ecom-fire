//Sales to UM-ST
const metals = document.querySelector('#metal');
const shapes = document.querySelector('#shape');
const grades = document.querySelector('#grade');
const sizes = document.querySelector('#size');
const quants = document.querySelector('#quantity');
const usages = document.querySelector('#usage');
const wishbutton = document.querySelector('#wishlistbutton');




wishbutton.addEventListener('submit', (e) => {
    e.preventDefault();
    var salesFlag = salesValidation();
    if(salesFlag){
    db.collection('metalsInquiry').add({
        metal: metals.value,
        grade: grades.value,
        shape: shapes.value,
        sizes: sizes.value,
        quantity: quants.value,
        usage: usages.value,
        timeId: Date.now(),
    });
    quants.value = null;
    usages.value = null;
    sizes.value = null; 
    alert('Inquiry Stored! You will be responded shortly');
}
});


function salesValidation(salesFlag){
    console.log('HEY');
    const metaLS = document.querySelector('#metal').value;
    const gradES = document.querySelector('#grade').value;
    const sizES = document.querySelector('#size').value;
    const quanTS = document.querySelector('#quantity').value;
    const usagES = document.querySelector('#usage').value;
    const shapES = document.querySelector('#shape').value;
    if(metaLS == null){
        alert('Enter details of metal');
        return false;
    }
    else if(gradES == null){
        alert('Enter details of Grades');
        return false;
    }
    else if(sizES == ''){
        alert('Enter details of Sizes');
        return false;
    }
    else if(quanTS == ''){
        alert('Enter details of Quantity');
        return false;
    }
    else if(usagES == ''){
        alert('Enter details of Usage');
        return false;
    }
    else if(shapES == null){
        alert('Enter details of Shapes');
        return false;
    }
    else {
      return true; 
    }
}