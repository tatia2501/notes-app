const register_btn = document.getElementById('register_btn');
const auth_input = document.getElementById('auth_input');
const auth_btn = document.getElementById('auth_btn');

function checkCode() {
  const code = localStorage.getItem('notes_code');
  if (code != null) {
    auth_input.value = code;
  }
}

checkCode();

const postUser = async () => {
  return await fetch(`/user`, {
    method: 'POST',
    headers: {
      accept: '*/*',
    },
  })
    .then((response) => response.json())
    .then((user) => {
      localStorage.setItem('notes_code', user.code);
      window.location.href = '/notes';
    });
};

register_btn.addEventListener('click', async () => {
  await postUser();
});

const checkUser = async (code) => {
  return await fetch(`/user/${code}`).then(async function (response) {
    if (response.status === 404) {
      alert(
        'Пользователя с таким кодом не существует, проверьте правильность введенного кода',
      );
    } else {
      console.log(code);
      localStorage.setItem('notes_code', code);
      window.location.href = '/notes';
    }
  });
};

auth_btn.addEventListener('click', async () => {
  if (auth_input.value === '') {
    alert('Введите код, чтобы перейти к своим заметкам');
  } else await checkUser(auth_input.value);
});
