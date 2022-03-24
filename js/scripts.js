let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Public functions
  function add(pokemon) {
    pokemonList.push(pokemon)
  }
  function getAll() {
    return pokemonList;
  }
  //Filter the pokemon for Search 
  function filterPokemon(event) { 
    keyword = event.target.value.toLowerCase();
    let pokemonElements = document.querySelectorAll('.pokemon-list > *')
    pokemonList.forEach((p, index) => {
      if (p.name.indexOf(keyword) < 0) {
        pokemonElements[index].classList.add('hide')
      } else {
        pokemonElements[index].classList.remove('hide')
      }
    });
  }
  
  function addListener (button, pokemon) {
    button.addEventListener ("click", function () {
      showDetails(pokemon)
    })
  }
  //Adding pokemon to ul as button 
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    addListener(button, pokemon);
  }
  //loadlist
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
        console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function (e) {
        console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    filterPokemon: filterPokemon
  };
})();

let input = document.getElementById('my-input')
input.addEventListener('keyup', pokemonRepository.filterPokemon);

//forEach loop
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
