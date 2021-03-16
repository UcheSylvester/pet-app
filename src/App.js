import './App.css';
import {useState} from 'react';



function App() {
  const [value, setValue] = useState("");
  const [petName, setPetName] = useState();
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const {value} = event.target;

    setValue(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const petEndpoint = `https://petstore3.swagger.io/api/v3/pet/${value}`

    // Resetting state on each network call
    setIsError(false);
    setPetName("");

    // Setting the loading state to true
    setIsLoading(true)

    try{
      const response = await fetch(petEndpoint);

      setIsLoading(false)

      if(!response?.ok) return setIsError(true);

      const data = await response.json();
      const {name} = data || {}

      setPetName(name)
    } catch (e) {
      setIsError(true)
      setIsLoading(false)
    }

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange}  />
        <button type="submit" disabled={!value}>Submit</button>
      </form>


      <div className="container">
        {isLoading ?
          <p>loading...</p> :
          isError ? <p style={{color: 'red'}}>Error</p> :
            <p>{petName}</p>
        }
      </div>

    </div>
  );
}

export default App;
