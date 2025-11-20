<script lang="ts">
    const PokemonType = {
        normal  : "normal"  ,
        fighting: "fighting",
        flying  : "flying"  ,
        poison  : "poison"  ,
        ground  : "ground"  ,
        rock    : "rock"    ,
        bug     : "bug"     ,
        ghost   : "ghost"   ,
        steel   : "steel"   ,
        fire    : "fire"    ,
        water   : "water"   ,
        grass   : "grass"   ,
        electric: "electric",
        psychic : "psychic" ,
        ice     : "ice"     ,
        dragon  : "dragon"  ,
        dark    : "dark"    ,
        fairy   : "fairy"   ,
        stellar : "stellar" ,
    };
    const pokemonTypeColors = Object.freeze({
        normal  : "#a8a878",
        fighting: "#c03028",
        flying  : "#a890f0",
        poison  : "#a040a0",
        ground  : "#e0c068",
        rock    : "#b8a038",
        bug     : "#a8b820",
        ghost   : "#705898",
        steel   : "#b8b8d0",
        fire    : "#f08030",
        water   : "#6890f0",
        grass   : "#78c850",
        electric: "#f8d030",
        psychic : "#f85888",
        ice     : "#98d8d8",
        dragon  : "#7038f8",
        dark    : "#705848",
        fairy   : "#ee99ac",
        stellar : "#40b5a5",
    });
    class Pokemon {
        constructor(params: Partial<Pokemon> = {}) {
            Object.assign(this, params);
        }

        id           : Number =  0;
        name         : String = "";
        primaryType  : String = "";
        secondaryType: String = "";
    }

    const pokemonData = [
        { id:   1, name: "Bulbasaur" , type: ["grass"   , "poison"], hp:  45, attack:  49, defense:  49, generation: 1 },
        { id:   4, name: "Charmander", type: ["fire"              ], hp:  39, attack:  52, defense:  43, generation: 1 },
        { id:   7, name: "Squirtle"  , type: ["water"             ], hp:  44, attack:  48, defense:  65, generation: 1 },
        { id:  25, name: "Pikachu"   , type: ["electric"          ], hp:  35, attack:  55, defense:  40, generation: 1 },
        { id:  39, name: "Jigglypuff", type: ["normal"  , "fairy" ], hp: 115, attack:  45, defense:  20, generation: 1 },
        { id:  94, name: "Gengar"    , type: ["ghost"   , "poison"], hp:  60, attack:  65, defense:  60, generation: 1 },
        { id: 131, name: "Lapras"    , type: ["water"   , "ice"   ], hp: 130, attack:  85, defense:  80, generation: 1 },
        { id: 143, name: "Snorlax"   , type: ["normal"            ], hp: 160, attack: 110, defense:  65, generation: 1 },
        { id: 150, name: "Mewtwo"    , type: ["psychic"           ], hp: 106, attack: 110, defense:  90, generation: 1 },
        { id: 152, name: "Chikorita" , type: ["grass"             ], hp:  45, attack:  49, defense:  65, generation: 2 },
        { id: 155, name: "Cyndaquil" , type: ["fire"              ], hp:  39, attack:  52, defense:  43, generation: 2 },
        { id: 158, name: "Totodile"  , type: ["water"             ], hp:  50, attack:  65, defense:  64, generation: 2 },
        { id: 197, name: "Umbreon"   , type: ["dark"              ], hp:  95, attack:  65, defense: 110, generation: 2 },
        { id: 248, name: "Tyranitar" , type: ["rock"    , "dark"  ], hp: 100, attack: 134, defense: 110, generation: 2 },
        { id: 282, name: "Gardevoir" , type: ["psychic" , "fairy" ], hp:  68, attack:  65, defense:  65, generation: 3 },
        { id: 445, name: "Garchomp"  , type: ["dragon"  , "ground"], hp: 108, attack: 130, defense:  95, generation: 4 },
        { id: 448, name: "Lucario"   , type: ["fighting", "steel" ], hp:  70, attack: 110, defense:  70, generation: 4 },
        { id: 491, name: "Darkrai"   , type: ["dark"              ], hp:  70, attack:  90, defense:  90, generation: 4 },
        { id: 635, name: "Hydreigon" , type: ["dark"    , "dragon"], hp:  92, attack: 105, defense:  90, generation: 5 },
        { id: 658, name: "Greninja"  , type: ["water"   , "dark"  ], hp:  72, attack:  95, defense:  67, generation: 6 },
    ];

    

    let searchValue   = $state("");
    let primaryType   = $state("Any");
    let secondaryType = $state("Any");
    let filtered      = $derived.by(() => {
        return pokemonData.filter((poke) => {
            return poke.name.toLowerCase().includes(searchValue)
                && (poke.type.includes(primaryType)   || primaryType   == "Any")
                && (poke.type.includes(secondaryType) || secondaryType == "Any")
        })
    })

    function resetValues() {
        searchValue   = "";
        primaryType   = "Any";
        secondaryType = "Any";
    }
</script>

<div class="container mx-auto mt-8">
    <search class="bg-white p-2 rounded-lg flex items-center gap-1">
        <input
            type="text"
            placeholder="Search by name..."
            class="w-full border border-gray-300 rounded-lg focus:outline-none px-2 h-8"
            bind:value={searchValue}
        />

        <select bind:value={primaryType} id="primary-type" class="border border-gray-300 rounded-lg focus:outline-none bg-white text-gray-700 h-8 w-60">
            <option selected>Any</option>
            {#each Object.values(PokemonType) as pokemonType }
                <option value={pokemonType}>{pokemonType}</option>
            {/each}
        </select>
        <select bind:value={secondaryType} id="secondary-type" class="border border-gray-300 rounded-lg focus:outline-none bg-white text-gray-700 h-8 w-60">
            <option selected>Any</option>
            {#each Object.values(PokemonType) as pokemonType }
                <option value={pokemonType}>{pokemonType}</option>
            {/each}
        </select>
        <button onclick={resetValues} class="bg-pokeball-top text-white rounded-lg h-8 w-32 hover:cursor-pointer">Reset</button>
    </search>

    <div class="[&>a]: mt-8">
        <table class="w-full table-fixed">
            <thead>
                <tr>
                    <th class="w-32">#</th>
                    <th>Name</th>
                    <th>Primary Type</th>
                    <th>Secondary Type</th>
                </tr>
            </thead>
            <tbody>
                {#each filtered as p}
                <tr class="even:bg-gray-100 odd:bg-gray-200">
                    <th>{p.id}</th>
                    <td><a href="/pokemon/{p.name.toLowerCase()}" class="hover:underline">{p.name}</a></td>
                    <td class="bg-[(--type-background)]" style="--type-background: {pokemonTypeColors["fire"]}">{p.type[0]}</td>
                    <td>{p.type[1]}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
