import './App.css'
import { useState } from 'react'

import { Loading } from './components/Loading'
import {
  BiSearch
} from 'react-icons/bi'

function App() {

  const [searchInput, setSearchInput] = useState("")
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)


  function handleInput(e) {

    e.preventDefault();
    setLoading(true)
    searchUserByBi(searchInput)

  }

  async function searchUserByBi(bi) {
    console.log(bi)
    const url = `https://consulta.edgarsingui.ao/consultar/${bi}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.error) {
      setUser(null)
    } else {
      setUser(data)
    }

    setLoading(false)

  }



  return (
    <>
      <main className="main">
        {loading && <Loading />}
        <div className="container">
          <h1>Consulte seu B.I.</h1>
          <p>Digite o número do bilhete de identedade ou NIF</p>
          <form onSubmit={(e) => handleInput(e)}>
            <div className="box">
              <label htmlFor="input-form">
                <BiSearch />
              </label>
              <input
                type="search"
                id='input-form'
                value={searchInput}
                placeholder='Digite aqui o Nº do BI'
                onInput={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </form>

          {user && (
            <section className="user-section">
              <h2>Usuário encontrado</h2>
              <div className="data">

                <div className="box">
                  <span className="name">Nome Completo</span>
                  <span> {user.name}</span>
                </div>

                <div className="box">
                  <span className="bi">Bilhete de identidade</span>
                  <span>{searchInput}</span>
                </div>

                <div className="box">
                  <span className="fathersName">Nome do pai</span>
                  <span>{user.pai}</span>
                </div>

                <div className="box">
                  <span className="mothersName">Nome da mãe</span>
                  <span>{user.mae}</span>
                </div>

                <div className="box">
                  <span className="birth-date">Data de nascimento</span>
                  <span>{user.data_de_nascimento}</span>
                </div>

                <div className="box">
                  <span className="residence">Morada</span>
                  <span>{user.morada}</span>
                </div>

              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}

export default App
