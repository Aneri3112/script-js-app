let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=52';

  //Public functions
  function add(pokemon) {
    pokemonList.push(pokemon)
  }
  function getAll() {
    return pokemonList;
  }
  // Search function
  function filterPokemon(event) { 
    keyword = event.target.value.toLowerCase();
    let pokemonElements = document.querySelectorAll('.list-group > *')
    pokemonList.forEach((p, index) => {
      if (p.name.indexOf(keyword) < 0) {
        pokemonElements[index].classList.add('hide')
      } else {
        pokemonElements[index].classList.remove('hide')
      }
    });
  }

  //Adding pokemon to ul as button 
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add('btn-primary');
    listpokemon.classList.add('group-list-item');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })  
  }

  //Show details  function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //loadlist function
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: capitalizeFirstLetter(item.name),
          detailsUrl: item.url
        };
        add(pokemon)
        hideLoadingMessage();
        console.log(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  //loadDetails function
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Add details to item
      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
      hideLoadingMessage();
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showLoadingMessage() {
    const loadingMessage = document.getElementById('loading_message');
    loadingMessage.removeAttribute('style', 'display:none');
  }

  function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading_message');
    loadingMessage.setAttribute('style', 'display:none');
  }

  //Capitalize first letter of Pokemon
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   // showModal function
  function showModal(item) {
    let modalTitle = $('.modal-title'); 
    let modalBody = $('.modal-body'); 
    
    let pokemonName = $('<h2>' + item.name + '</h2>');

    let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');

    let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities   + '</p>');

    let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
    pokemonImage.attr('src', item.imgUrl); 

    modalTitle.empty(); 
    modalBody.empty(); 
    modalTitle.append(pokemonName); 
    modalBody.append(pokemonImage); 
    modalBody.append(pokemonHeight); 
    modalBody.append(pokemonWeight); 
    modalBody.append(pokemonAbilities); 
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    filterPokemon: filterPokemon,
  };
})();
let input = document.getElementById('myinput')
input.addEventListener('keyup', pokemonRepository.filterPokemon);

//forEach loop
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
   });
});

