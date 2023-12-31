
import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {


  let matchingCharacters = [];
  const [characters, setCharacters] = document.querySelector("#charactersList")

  document.addEventListener('DOMContentLoaded', getCharacters)

  async function getCharacters() {
    let url = 'https://swapi2.azurewebsites.net/api/characters';

    try {
      const fetchedCharacters = await fetch(url)
        .then(res => res.json())
      characters.push(...fetchedCharacters);
    }
    catch (ex) {
      console.error("Error reading characters.", ex.message);
    }
    console.log("All the characters are ", characters)
    renderCharacters(characters);
  }

  const filterCharacters = () => {
    const searchString = document.querySelector("#searchString").value;
    const re = new RegExp(searchString, "i");
    matchingCharacters = characters.filter(character => re.test(character.name))
    renderCharacters(matchingCharacters);
  }

  // const renderCharacters = characters => {
  //   const divs = characters.map(character => {
  //     const el = document.createElement('div');
  //     el.addEventListener('click', () => goToCharacterPage(character.id));
  //     el.textContent = character.name;
  //     return el;
  //   })
  //   charactersList.replaceChildren(...divs)
  // }

 // const goToCharacterPage = id => window.location = `/character.html?id=${id}`
  return (
    <div className="App">
      <body>
        <div>
          <h1>Star Wars Universe Lookup</h1>
          <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
            here)</span></label>
          <input id="searchString" oninput="filterCharacters()" autocomplete="off" />
        </div>
        <section id="charactersList">
          {characters.map((character) => (
            <Link key={character.id} to={'/character/${character.id}'}>
              <div className="character"> {character.name}

              </div>
            </Link>
          ))}
        </section>
      </body>
    </div>
  );
}

export default App;
