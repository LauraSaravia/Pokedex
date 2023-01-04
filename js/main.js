const pokemonList = document.querySelector("#pokemonList");
const btnHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
}

function fetchPokemon(num){
    for(let i = 1; i <= num; i++){
        fetchPokemon(i);
    }
}

function showPokemon(poke){

    let types = poke.types.map((type) => 
    `<p class="${type.type.name} type">${type.type.name}</p>`);
    types = types.join('');

    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">${pokeId}</p>
        <p class="pokemon-id">#${pokeId}</p>
        <div class="pokemon-image">
            <img src="${poke.sprites.front_default}" alt="Pikachu">
        </div>
        <div class="pokemon-info">
            <div class="cont-name">
                <h2 class="pokemon-name">${poke.name}</h2>
            </div>
            <div class="pokemon-type">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}M</p>
                <p class="stat">${poke.weight}KG</p>
            </div>
        </div>
    `;

    pokemonList.append(div);
}

btnHeader.forEach(btn => btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for(let i = 1; i < 151; i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(btnId === "see-all"){
                    showPokemon(data)
                } else {
                    const types = data.types.map(type => type.type.name);
                    if(types.some(type => type.includes(btnId))){
                        showPokemon(data)
                    }
                }

            })
    }
}))