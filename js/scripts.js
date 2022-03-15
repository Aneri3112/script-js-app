let pokemonRepository = (function() {
  let pokemonlist = [
    { name: 'Bulbasaur', height: '0.7', types: ['grass', 'poision']},
    { name: 'caterpie', height: '0.3', types: ['bug']},
    { name: 'jihhlypuff', height:'0.5', types: ['fairy', 'normal']}
  ];
  //Public functions
  function add(pokemon) {
    pokemonlist.push(pokemon);
  }
  
  function getAll() {
    return pokemonlist;
  }

  return {
    add: add,
    getAll: getAll
  }
})();

//Updated for loop to foorEach loop
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<p>" +  pokemon.name + ", " +  "height: " + pokemon.height + "</p>")
});

//add object
console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Seel', height: 1.1, types: ['water']})
console.log(pokemonRepository.getAll());
