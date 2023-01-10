const btnHeader = document.querySelectorAll(".btn-header");
const pokemonList = document.querySelector("#container");

let URL = "https://pokeapi.co/api/v2/pokemon/";

const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    grass: '#78C850',
    water: '#6890F0',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    electric: '#F8D030',
    default: '#0B0B0B'
}

function fetchPokemon(id) {
  fetch(URL + `${id}`)
    .then((res) => res.json())
    .then((data) => {
      renderPokemonData(data);
    });
}

function fetchAllPokemon(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

const searchPokemon = event => {
    pokemonList.innerHTML = "";
    event.preventDefault();
    const {value} = event.target.pokemon;

    fetch(URL + `${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound(err))
        container.classList.add("search");
}

const renderNotFound = () => {
    const notFound = document.createElement("div");
    notFound.classList.add("not-found")
    notFound.innerHTML = `There's no pokemon with that name/id yet...Sorry :(`
    pokemonList.appendChild(notFound);
}

const renderPokemonData = data => {
    const sprite = data.sprites.other["official-artwork"].front_default;
    const pokeName = data.name.replace("-", " ");
    const {stats, types} = data;

    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    let pokeTypes = data.types.map((type) => 
    `<p class="${type.type.name} type">${type.type.name}</p>`);
    pokeTypes = pokeTypes.join('');

    let pokeId = data.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId
    }

    //Render data
    const container = document.createElement("div");
    container.classList.add("pokemon");
    container.innerHTML = `
        <div class="sprite-container" style="background: radial-gradient(${colorTwo} 33%, ${colorOne} 33%);
        background-size: 5px 5px;">
            <img src="${sprite}" alt="${pokeName}" class="pokemon-sprite" loading="lazy">
        </div>
        <div class="pokemon-info">
            <div class="pokemon-id">#${pokeId}</div>
            <div class="pokemon-name">${pokeName}</div>
            <div class="pokemon-type">${pokeTypes}</div>
        </div>
    `;

    //Render stats
    const allStats = document.createElement("div");
    allStats.classList.add("pokemon-stats")
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        statElement.classList.add("stat");
        const statElementName = document.createElement("div");
        statElementName.classList.add("stat-name");
        const statElementAmount = document.createElement("div");
        statElementAmount.classList.add("stat-amount");

        statElementName.textContent = stat.stat.name.replace("special-", "SP ");
        statElementAmount.textContent = stat.base_stat;

        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        allStats.appendChild(statElement);
    });

    container.append(allStats);
    pokemonList.append(container);
}

//Buttons
let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
    container.classList.remove("search");
    if (offset != 1) {
        offset -= 9;
        pokemonList.innerHTML = "";
        fetchAllPokemon(offset, limit);
    }
});

next.addEventListener("click", () => {
    container.classList.remove("search");
    offset += 9;
    pokemonList.innerHTML = "";
    fetchAllPokemon(offset, limit);
});

btnHeader.forEach(btn => btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;
    pokemonList.innerHTML = "";
    container.classList.remove("search");

    if(btnId === "see-all"){
        pokemonList.innerHTML = "";
        fetchAllPokemon(offset, limit);
    }

    for(let i = 1; i < Math.max(1100); i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                const types = data.types.map(type => type.type.name);
                if(types.some(type => type.includes(btnId))){
                    renderPokemonData(data)
                }
            })
        }
    }))

fetchAllPokemon(offset, limit);