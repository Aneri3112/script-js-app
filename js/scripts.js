let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');


  //Public functions
  function add(pokemon) {
    pokemonList.push(pokemon)
  }
  function filter(name) {
    return pokemonList.filter(pokemonList => pokemonList.name === name);
  }
  function getAll() {
    return pokemonList;
  }
  
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon.name, pokemon.height, pokemon.imgUrl);
    });
  }

  function showModal(name, height, imgUrl) {
    modalContainer.innerHTML = ''; //clear existing content
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //Adding modal for:- modal-close button, h1, p, img
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h2');
    titleElement.innerText = name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "height: " + height;

    let imgElement = document.createElement('img');
    imgElement.src = imgUrl;

    //append element to parent
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible'); //className to modalContainer
  }

  //hideModal to close modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  //Close when Esc is pressed
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function handleButtonClick(button,pokemon) {
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

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

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
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

  return {
    add: add,
    filter: filter,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    filterPokemon: filterPokemon,
    handleButtonClick: handleButtonClick,
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

