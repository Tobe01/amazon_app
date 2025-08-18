const xhr = new XMLHttpResponse();

xhr.addEventListener('load', ()=> {
   console.log(xhr.response);
})

xhr.open('GET', 'https://supersimpledev/backend.dev/hello');
xhr.send()