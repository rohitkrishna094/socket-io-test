// const baseUrl = 'http://localhost:4000/';
const baseUrl = 'https://chat7654.herokuapp.com/';
let socket = io.connect(baseUrl);

let message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

handle.placeholder = 'User-' + Math.floor(Math.random() * 60000);
// click button on Enter
message.addEventListener('keyup', e => {
  // e.preventDefault;
  if (e.keyCode === 13) {
    btn.click();
  }
});

btn.addEventListener('click', e => {
  if (message.value.length !== 0) {
    message.classList.remove('error');
    socket.emit('chat', {
      message: message.value,
      handle: handle.value.length === 0 ? handle.placeholder : handle.value
    });
    message.value = '';
  } else {
    message.classList.add('error');
  }
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

socket.on('chat', data => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
  // feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  feedback.innerHTML = '<p><em>' + 'Someone' + ' is typing a message...</em></p>';
});
