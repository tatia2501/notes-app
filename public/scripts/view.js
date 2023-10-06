const edit_view_btn = document.getElementById('edit_view_btn');
const delete_view_btn = document.getElementById('delete_view_btn');
const view_title = document.getElementById('view_title');
const view_text = document.getElementById('view_text');
const return_view_bt = document.getElementById('return_view_bt');

edit_view_btn.addEventListener('click', async () => {
  window.location.href = '/edit';
});

const deleteNote = async (note_id) => {
  await fetch(`/note/${note_id}`, { method: 'DELETE' });
};

delete_view_btn.addEventListener('click', async () => {
  await deleteNote(localStorage.getItem('note_code'));
  localStorage.removeItem('note_code');
  window.location.href = '/notes';
});

const getNote = async (note_id) => {
  await fetch(`/note/${note_id}`, { method: 'GET' })
    .then((response) => response.json())
    .then(async (user) => {
      view_title.textContent = user.title;
      view_text.textContent = user.text;
    });
};

async function getNoteInfo() {
  await getNote(localStorage.getItem('note_code'));
}

return_view_bt.addEventListener('click', async () => {
  window.location.href = '/notes';
});

getNoteInfo();
