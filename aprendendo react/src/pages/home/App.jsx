import { useEffect, useState, useRef } from "react"
import "./app.css"
import Trash from "../../assets/Trash.svg"
import api from "../../services/api"

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios")

    setUsers(usersFromApi.data)
    // console.log(users)
  }
  async function createUsers() {
    console.log(inputAge)
    const name =  inputName.current.value
    const Age = inputAge.current.value
    const email = inputEmail.current.value
    if(!name || !Age || !email){
      alert("Por favor, preencha todos os campos")
      return
    }
    await api.post("/usuarios", {
      name: name,
      age: Age,
      email: email
      
    })
    
    

    getUsers()
    inputName.current.value = ""
    inputAge.current.value = ""
    inputEmail.current.value = ""
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()

  }, [])

  return (



    <div className="container">
      <form action="">
        <div>
          <h1>Cadastro de Usuarios</h1>
          <div id="loading"></div>
        </div>
        <input id="name" name="nome" type="text" placeholder="Nome" ref={inputName} />
        <input name="idade" type="number" placeholder="Idade" ref={inputAge} />
        <input name="email" type="email" placeholder="Email" ref={inputEmail} />
        <button type="button" id="cadastrar" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div className="users" key={user.id}>
          <div>{console.log(user)}
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>



      ))}

    </div>

  )
}

export default Home
