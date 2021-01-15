const trashIcon = document.querySelector('.trash-icon')

trashIcon.addEventListener('click', async () => {
  try {
    const { data: { redirect } } = await axios.delete(`/posts/${trashIcon.dataset.id}`)
    window.location.href = redirect
  } catch (error) {
    console.log(error.message)
  }
})