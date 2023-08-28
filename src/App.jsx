import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [repos, setRepos] = useState([])
  const [query, setQuery] = useState('')

  const fetchData = (query) => {
    fetch(`https://api.github.com/search/repositories?q=${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response error!');
      }
      return response.json();
    })
    .then(resData => setRepos(resData.items))
    .catch(error => console.error('Fetch error!', error))
    }

  useEffect(() => {
    fetchData(query)
  }, [query])

  const inputChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
    <h1>Repositories</h1>
    <input value={query} placeholder="Type for search..." onChange={inputChange}>
    </input>
    <button onClick={() => fetchData(query)}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {repos.map(repo => (
            <tr key={repo.id}>
              <td>{repo.full_name}</td>
              <td><a href={repo.html_url} target="_blank">{repo.html_url}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App
