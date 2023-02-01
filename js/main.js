const btnHeader = document.querySelectorAll(".btn");
const random = document.getElementById("random");
const pokemonList = document.getElementById("container");

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

const fetchPokemon = async (id) => {
    try{
        const fetchURL = await fetch(URL + `${id}`)
        const resp = await fetchURL.json()
        return renderPokemonData(resp);
    } catch(err){
        console.log(err);
        renderNotFound();
    }
}

async function fetchAllPokemon(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    await fetchPokemon(i);
  }
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
    const statCont = document.createElement("div");
    statCont.classList.add("stats-cont");
    const allStats = document.createElement("details");
    allStats.classList.add("pokemon-stats");
    allStats.style.background = `linear-gradient(70deg, ${colorTwo} -10%, ${colorOne} 50%, ${colorTwo} 150%)`;
    allStats.innerHTML = `<summary class="pokemon-stat">STATS</summary>`;

    stats.forEach(stat => {
        const statElement = document.createElement("div");
        statElement.classList.add("stat");

        const statElementName = document.createElement("div");
        statElementName.classList.add("stat-name");

        const statElementAmount = document.createElement("div");
        statElementAmount.classList.add("stat-amount");

        statElementName.textContent = stat.stat.name.replace("special-", "SP ");
        statElementAmount.textContent = stat.base_stat;

        statElement.append(statElementName);
        statElement.append(statElementAmount);
        statCont.append(statElement);
        allStats.append(statCont);
    });

    container.appendChild(allStats);
    pokemonList.appendChild(container);
}

const searchPokemon = event => {
    pokemonList.innerHTML = "";
    event.preventDefault();
    const {value} = (event.target.pokemon);

    fetchPokemon(value.toLowerCase());
    container.classList.add("search");
}

//Buttons
let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
    container.classList.remove("search");
    pokemonList.innerHTML = "";
    fetchAllPokemon(offset, limit);

    if (offset != 1) {
        offset -= 9;
        fetchAllPokemon(offset, limit);
    }
});

next.addEventListener("click", () => {
    container.classList.remove("search");
    pokemonList.innerHTML = "";
    offset += 9;
    fetchAllPokemon(offset, limit);
});

btnHeader.forEach(btn => btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;
    pokemonList.innerHTML = "";
    container.classList.remove("search");

    if(btnId === "see-all"){
        fetchAllPokemon(offset, limit);
    };

    const filter = async (id) => {
        pokemonList.innerHTML = "";
        const fetchURL = await fetch(URL + `${id}`);
        const resp = await fetchURL.json();
        const types = await resp.types.map(type => type.type.name);

        try{
            if(types.some(type => type.includes(btnId))){
                return renderPokemonData(resp);
            }
        } catch(err){
            renderNotFound();
        }
    }

    for(let i = 1; i < Math.max(1300); i++){
        filter(i);
    }
}
));

random.addEventListener("click", () => {
    const randomInt = Math.floor(Math.random() * (1100 - 1)) + 1;
    pokemonList.innerHTML = "";
    container.classList.add("search");

    fetchPokemon(randomInt);
});

fetchAllPokemon(offset, limit);