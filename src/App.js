import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([])


  // update webpage
  function getRepositories() {
    api.get('/repositories').then(res => {
      // call setRepository to update repositories with database info
      setRepository(res.data)
      // console.log(res)
    })
  }

  // repositories info loaded while loading the page
  useEffect(() => {
    getRepositories();
  }, [])

  async function handleAddRepository() {

    const res = await api.post('repositories', {
      title: `Desafio react-native.js - ${Date.now()}`,
      url: "http://github.com/banjos/react-native",
      techs: ["Node.js", "react-native.js"]
    })

    const repository = res.data;
    // call setRepository to update repositories with repository info
    setRepository([...repositories, repository])
    // console.log(repositories)
  }

  async function handleRemoveRepository(id) {

    // console.log(id)

    // delete repository by id
    await api.delete(`repositories/${id}`);

    // update webpage
    getRepositories();

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
            {repository.title}
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
