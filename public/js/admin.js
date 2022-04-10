
const form = document.querySelector('.add-form');
const removeForm = document.querySelector('#btn-cancel');
const addBtn = document.querySelector('#add-btn')

addBtn.addEventListener('click', () =>{
   form.style.display = 'block';
})
removeForm.addEventListener('click', () =>{
    form.style.display = 'none'
})

// useredit
