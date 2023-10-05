const copy_code_btn = document.getElementById('copy_code_btn');
const logout_btn = document.getElementById('logout_btn');
const delete_account_btn = document.getElementById('delete_account_btn');

copy_code_btn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(localStorage.getItem('notes_code'));
});
logout_btn.addEventListener('click', async () => {
  window.location.href = '/';
});
const deleteNotes = async (user_id) => {
  await fetch(`/note/user/${user_id}`, { method: 'DELETE' });
};

const deleteUser = async (user_code) => {
  await fetch(`/user/${user_code}`, { method: 'DELETE' });
};

const getUser = async (user_code) => {
  await fetch(`/user/${user_code}`, { method: 'GET' })
    .then((response) => response.json())
    .then(async (user) => {
      await deleteNotes(user.id);
      await deleteUser(user.code);
    });
};
delete_account_btn.addEventListener('click', async () => {
  await getUser(localStorage.getItem('notes_code'));
  localStorage.removeItem('notes_code');
  window.location.href = '/';
});
