const form = document.querySelector('.form')
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const title = document.querySelector('input[name="title"]').value
  const subtitle = document.querySelector('input[name="subtitle"]').value
  const text = document.querySelector('textarea[name="text"]').value
  const initialBody = { title, subtitle, text }
  const body = {}
  for (let key in initialBody) {
    if (initialBody[key]) {
      body[key] = initialBody[key]
    }
  }

  try {
    const { data: { redirect } } = await axios.patch(`/posts/${form.dataset.id}`, body)
    window.location.href = redirect
  } catch (error) {
    console.log(error.message)
  }
})