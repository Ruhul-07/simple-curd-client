
import { toast } from 'react-toastify';
import './App.css'

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.insertedId) {
        // alert('Users added succesfully')
        toast.success('Users added succesfully')
        form.reset();
      }
    })
  }

  return (
    <>

      <h1>simple curd</h1>
     <form onSubmit={handleSubmit}>
      <input type="text" name="name" id="" />
      <br />
      <input type="text" name="email" id="" />
      <br />
      <input type="submit" value="Submit" />
     </form>
    </>
  )
}

export default App
