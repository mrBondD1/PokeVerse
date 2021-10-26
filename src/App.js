import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {

  const [ pokemonName, setPokemonName ] = useState('');
  const [ choosenPokemon, setChoosenPokemon ] = useState(false);
  const [ pokemonInfo, setPokemonInfo ] = useState({
        name: "",
        species:"",
        img: "",
        hp:"",
        attack: "",
        defence: "",
        type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
      setPokemonInfo({
        name: pokemonName,
        species: res.data.species.name,
        img: res.data.sprites.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defence: res.data.stats[2].base_stat,
        type: res.data.types[0].type.name,
      })
      setChoosenPokemon(true);
    })
  }

  return (
    <div className="App">
      <div className="title">
      <h1>PokiVerse</h1>
      <input type="text" onChange={(e) => {
        setPokemonName(e.target.value);
      }}/>
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="displayInfo">
      {!choosenPokemon ? (
        <h1>Please choose a valid pokemon!</h1>
      ) : (
        <>
        <h1>{pokemonInfo.name}</h1>
        <img src={pokemonInfo.img} alt="" />
        <h3> Species: {pokemonInfo.species}</h3>
        <h3> Type: {pokemonInfo.type}</h3>
        <h4> Hp: {pokemonInfo.hp}</h4>
        <h4> Attack: {pokemonInfo.attack}</h4>
        <h4> Defense: {pokemonInfo.defence}</h4>
        </>
      )
    }
      </div>
    </div>
  );
}

export default App;
