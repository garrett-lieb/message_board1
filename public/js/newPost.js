const newposthandler = async (event) => {
  event.preventDefault();

  // const topic = document.querySelector('#topic').value.trim();
  const description = document.querySelector('#post').value.trim();
  if (description) {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify({ description: description }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace('/');

      console.log('Post created');
    } else {
      alert('Failed to create post');
    }

    console.log(response);
  }
};

document.querySelector('form').addEventListener('submit', newposthandler);
