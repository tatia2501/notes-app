const save_edit_btn = document.getElementById('save_edit_btn');
const edit_change_title = document.getElementById('edit_change_title');
const edit_change_text = document.getElementById('edit_change_text');
const edit_show_title = document.getElementById('edit_show_title');
const edit_show_text = document.getElementById('edit_show_text');

const getNote = async (note_id) => {
  await fetch(`/note/${note_id}`, { method: 'GET' })
    .then((response) => response.json())
    .then(async (user) => {
      edit_change_text.value = user.text;
      edit_change_title.value = user.title;
      edit_show_text.textContent = edit_change_text.value;
      edit_show_title.textContent = edit_change_title.value;
    });
};

document.addEventListener('DOMContentLoaded', async () => {
  await getNote(localStorage.getItem('note_code'));
});

function noteEditing() {
  edit_show_text.textContent = edit_change_text.value;
  edit_show_title.textContent = edit_change_title.value;
}

noteEditing();
edit_change_text.addEventListener('input', noteEditing);
edit_change_title.addEventListener('input', noteEditing);

const changeNote = async (note_id, title, text) => {
  await fetch(`/note/${note_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: title,
      text: text,
    }),
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
};

save_edit_btn.addEventListener('click', async () => {
  if (edit_change_title.value === '') {
    alert('Заметка должна иметь название');
  } else if (edit_change_text.value === '') {
    alert('Напишите что-нибудь в тело заметки');
  } else {
    await changeNote(
      localStorage.getItem('note_code'),
      edit_change_title.value,
      edit_change_text.value,
    );
    window.location.href = '/view';
  }
});
