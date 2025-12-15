import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App(){
  const [princess, setPrincess] = useState("");
  const [queen, setQueen] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(130);


  useEffect(() => {
    let abortController = new AbortController();

    const loadQueen = async () => {
      try{
        setLoading(true);
        let response = await axios.get(`https://api.disneyapi.dev/character/2099`, {
          signal: abortController.signal
        });
        setQueen(response.data);
      
        setError("");

      } catch(error) {
        setError("Something Wrong", error);
      } finally {
        setLoading(false);
      }
    }
    loadQueen();

    const loadPrincess = async () => {
      try{
        setLoading(true);
        let response = await axios.get(`https://api.disneyapi.dev/character/${number}`, {
          signal: abortController.signal
        });
        setPrincess(response.data);
      
        setError("");

      } catch(error) {
        setError("Something Wrong", error);
      } finally {
        setLoading(false);
      }
    }
    loadPrincess();


    return () => abortController.abort();

  }, [number])

  console.log(princess);

  const prevPrincess = () => {
    setNumber((number) => number - 1);
  }

  const nextPrincess = () => {
    setNumber((number) => number + 1);
    
  }

  return (
    <div>
      <div><h1>{queen?.data?.name}</h1></div>
      <div><img src={queen?.data?.imageUrl} alt={princess?.data?.name} /></div>
      <ul>
        {queen?.data?.films.map((film, idx) => (
          <li key={idx}> {film} </li>
        ))}
      </ul>

      {/* <div><h1>{princess?.data?.name}</h1></div>
      <div><img src={princess?.data?.imageUrl} alt={princess?.data?.name} /></div>
      <ul>
        {princess?.data?.films.map((film, idx) => (
          <li key={idx}> {film} </li>
        ))}
      </ul>
      <button onClick={prevPrincess}>previous</button>
      <button onClick={nextPrincess}>Next</button> */}
    </div>
    
  )

}



export default App
