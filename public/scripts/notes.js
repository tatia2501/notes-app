const add_note_btn = document.getElementById('add_note_btn');
const container = document.getElementById('note_container');
const note_template = document.getElementById('note_template');

const deleteNote = async (note_id) => {
  await fetch(`/note/${note_id}`, { method: 'DELETE' });
};

const getNotes = async (user_id) => {
  return await fetch(`/note/user/${user_id}`, { method: 'GET' }).then(
    (response) => response.json(),
  );
};

const getUser = async (user_code) => {
  await fetch(`/user/${user_code}`, { method: 'GET' })
    .then((response) => response.json())
    .then(async (user) => {
      const data = (await getNotes(user.id)).slice();
      container.innerHTML = '';
      for (const item of data) {
        const note = note_template.content.cloneNode(true);
        const date = note.getElementById('note_data');
        date.textContent = item.date;
        const delete_note_btn = note.getElementById('delete_note_btn');
        delete_note_btn.addEventListener('click', async () => {
          await deleteNote(item.id);
          window.location.reload();
        });
        const title = note.getElementById('note_title');
        title.textContent = item.title;
        const text = note.getElementById('note_text');
        text.textContent = item.text;
        container.appendChild(note);
      }
    });
};

async function getAllNotes() {
  await getUser(localStorage.getItem('notes_code'));
}

const postNote = async (user_id) => {
  await fetch(`/note/${user_id}`, {
    method: 'POST',
    headers: {
      accept: '*/*',
    },
  })
    .then((response) => response.json())
    .then(async (user) => {
      localStorage.setItem('note_code', user.id);
      window.location.href = '/view';
    });
};

const getUserForPost = async (user_code) => {
  await fetch(`/user/${user_code}`, { method: 'GET' })
    .then((response) => response.json())
    .then(async (user) => {
      await postNote(user.id);
    });
};

add_note_btn.addEventListener('click', async () => {
  await getUserForPost(localStorage.getItem('notes_code'));
});

getAllNotes();
