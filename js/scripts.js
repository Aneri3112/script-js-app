let pokemonRepository = (function() {
  let pokemonlist = [
    { name: 'Bulbasaur', height: '0.7', types: ['grass', 'poision']},
    { name: 'Caterpie', height: '0.3', types: ['bug']},
    { name: 'Jihhlypuff', height:'0.5', types: ['fairy', 'normal']},
    { name: 'Dewgong', height:'1.7', types: ['Ice', 'Water']}
  ];
  //Public functions
  function add(pokemon) {
    pokemonlist.push(pokemon);
  }
  
  function getAll() {
    return pokemonlist;
  }

  // Shows pokemon name when clicked
  function showDetails (pokemon) {
    console.log(pokemon.name)
  }

  function addListener (button, pokemon) {
    button.addEventListener ("click", function () {
      showDetails(pokemon)
  })
}  
function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("ul");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  addEventListener(button, pokemon);
}
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails
};
})();

//forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon)
})


