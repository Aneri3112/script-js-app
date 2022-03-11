let pokemonlist = [
 { name: 'Bulbasaur', height: '0.7', types: ['grass', 'poision']},
 { name: 'caterpie', height: '0.3', types: ['bug']},
 { name: 'jihhlypuff', height:'0.5', types: ['fairy', 'normal']}
];

//creating for-loop for pokemonlist    
for(let i=0; i < pokemonlist.length; i++) {
    if (pokemonlist[i].height > 0.5){
        document.write( `${pokemonlist[i].name + " "} (height: ${ pokemonlist[i].height}) - Wow, that's big!` + " ");
    }else {
       document.write( `${pokemonlist[i].name + " " } (height: ${ pokemonlist[i].height}) ` + " "); 
    }
}