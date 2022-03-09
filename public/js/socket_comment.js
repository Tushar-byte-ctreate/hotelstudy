let socket = io()

const textarea = document.querySelector('#comment')
const postId = document.querySelector('#postId')
const username = document.querySelector('#username')
const adminId = document.querySelector('#adminId')
const submitBtn = document.querySelector('#submitBtn')
const commentBox = document.querySelector('#pushComments')
const flassmessage = document.querySelector('#flassmessage')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let comment = { postId : postId.value,
                    adminId:adminId.value,
                     textarea: textarea.value,
                    name:username.value}
    console.log(comment)

    if(!comment) {
        return
    }
    postComment(comment)
})

function postComment(comment) {
    // Append to dom
    let data = comment
    console.log(data)
    appendToDom(data)
    
    textarea.value = ''
    // Broadcast
    broadcastComment(data)
    // Sync with Mongo Db
    syncWithDb(data)
}

function appendToDom(data) {

    console.log(data)
    let lTag = document.createElement('li')
    lTag.classList.add('comment')
    const date= new Date()

    let markup = `
    <div class="comments" id='pushComments'>
    <h3> <i class='fas fa-user'></i>${data.name}</h3>
    <p><i class="far fa-clock"></i> ${date}</p>
    <p>${data.textarea}</p>
    
    </div>
    `
    lTag.innerHTML = markup
     document.querySelector('.pushCom').prepend(lTag)
   
}

function broadcastComment(data) {
    // Socket
    socket.emit('comment', data)
}

socket.on('comment', (data) => {
    appendToDom(data)
})
let timerId = null
function debounce(func, timer) {
    if(timerId) {
        clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
        func()
    }, timer)
}

function syncWithDb(data) {
    const headers = {
        'Content-Type': 'application/json'
    }
    fetch('/api/comments', { method: 'Post', body:  JSON.stringify(data), headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
}
      const url =window.location.pathname
function fetchComments () {
   console.log(url)
fetch('/api/comments/' ,{method:'get'})
        .then(res => res.json())
        .then(result => {
            result.forEach((comment) => {
                comment.time = comment.createdAt
                appendToDom(comment)
            })
        })
}

window.onload = fetchComments