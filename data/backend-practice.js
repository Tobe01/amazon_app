const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

xhr.open('Get', 'https://supersimplebackend.dev/images/apple.jpg');
xhr.send();