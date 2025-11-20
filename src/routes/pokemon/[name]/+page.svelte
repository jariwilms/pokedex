<script lang="ts">
    import { capitalize } from "$lib/capitalize.js";
    import Stats from "$lib/components/stats.svelte";

    let { data } = $props();
    let pokemon = data.pokemon;
    let species = data.species;
    let evolutionChain = data.evolutionChain;
    let moves = data.pokemon.moves;
    let englishGenus = species.genera.filter((element) => {
        return element.language.name == "en";
    })[0].genus;

    let evolutions: string[] = [];
    evolutions.push(evolutionChain.chain.species.name);
    let current = evolutionChain.chain.evolves_to[0];
    while (current) {
        evolutions.push(current.species.name);
        current = current.evolves_to[0];
    }

    let height = pokemon.height / 10;
    let weight = pokemon.weight / 10;
    let flavorTexts = species.flavor_text_entries
        .filter((value) => value.language.name === "en")
        .map((value) => ({ version: value.version.name, flavorText: value.flavor_text }));

    let moveData = pokemon.moves
        // .filter((element) => { 
        //     return element.version_group_details[0].move_learn_method.name == "level-up"; 
        // })
        .map((element, index) => {
            return {
                name: element.move.name,
                level: element.version_group_details[0].level_learned_at,
                type: data.moves[index].type, 
                category: data.moves[index].damage_class.name, 
                power: data.moves[index].power, 
                accuracy: data.moves[index].accuracy, 
                pp: data.moves[index].pp,
            }
        })
        .sort((first, second) => {
            return first.level - second.level;
        });
    const levelUpMoves = moveData.filter((element) => {
        return element.level == 1;
    });

    let res = pokemon.stats.filter((stat) => {
        return stat.effort > 0;
    });

    const empoleonImage = pokemon.sprites.other["official-artwork"].front_default;
    const genderWidths  = ["w-0", "w-1/8", "w-2/8", "w-3/8", "w-4/8", "w-5/8", "w-6/8", "w-7/8", "w-full"];

    console.log(pokemon.moves);
    console.log(data.moves);
    // console.log(moveData);
    // console.log(levelUpMoves);
</script>

<div class="flex flex-col space-y-12">
    <div class="flex flex-col">
        <div>
            <div class="flex flex-row space-x-2">
                <span class="text-4xl">#{pokemon.id}</span>
                <span class="text-4xl">{capitalize(pokemon.name)}</span>
                <div class="flex flex-row">
                    {#if pokemon.types.length == 1}
                        <span
                            class="bg-type-{pokemon.types[0].type.name} rounded-sm text-sm w-16 text-center mt-auto text-white font-medium mb-1 hover:cursor-pointer select-none">
                            {pokemon.types[0].type.name.toUpperCase()}
                        </span>
                    {:else if pokemon.types.length == 2}
                        <span 
                            class="bg-type-{pokemon.types[0].type.name} rounded-l-sm text-sm w-16 text-center mt-auto text-white font-medium mb-1 hover:cursor-pointer select-none">
                            {pokemon.types[0].type.name.toUpperCase()}
                        </span>
                        <span 
                            class="bg-type-{pokemon.types[1].type.name} rounded-r-sm text-sm w-16 text-center mt-auto text-white font-medium mb-1 hover:cursor-pointer select-none">
                            {pokemon.types[1].type.name.toUpperCase()}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-row space-x-2">
                <span class="text-4xl invisible">#{pokemon.id}</span>
                <span class="ml-[3px]">The {englishGenus}</span>
            </div>
        </div>
        <div class="flex flex-row justify-between">
            <div class="grid grid-cols-2 space-x-10 pt-8">
                <div>
                    <span class="text-xl">General Information</span>
                    <div class="grid grid-cols-2 *:text-gray-600 space-y-1">
                        <span>Height </span><span>{height} m </span>
                        <span>Weight </span><span>{weight} kg</span>
                        <span>Abilities </span>
                        <div class="grid space-y-1">
                            {#each pokemon.abilities as ability}
                                <span>
                                    {capitalize(ability.ability.name)}
                                    {#if ability.is_hidden}
                                        <span
                                            class="bg-green-600 rounded-sm px-1 text-white text-sm font-medium text-center hover:cursor-pointer select-none"
                                            >H</span>
                                    {/if}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="grid grid-rows-2 space-y-4">
                    <div>
                        <span class="text-xl">Training</span>
                        <div class="grid grid-cols-2 *:text-gray-600 space-y-1">
                            <span>EV Yield </span>
                            <div class="flex flex-col">
                                {#each res as r}
                                    <span>{capitalize(r.stat.name, "-")}&nbsp{r.effort}</span>
                                {/each}
                            </div>
                            <span>Base Experience</span><span>{pokemon.base_experience}</span>
                            <span>Base Happiness</span><span>{species.base_happiness}</span>
                            <span>Capture Rate</span><span>{species.capture_rate}</span>
                            <span>Growth Rate</span><span>{capitalize(species.growth_rate.name, "-")}</span>
                        </div>
                    </div>
                    <div>
                        <span class="text-xl">Breeding</span>
                        <div class="grid grid-cols-2 *:text-gray-600 space-y-1">
                            <span>Gender Ratio</span>
                            <div class="flex flex-row h-3 mt-2">
                                <span class="bg-blue-500 rounded-l-sm {genderWidths[8 - species.gender_rate]}">&nbsp;</span>
                                <span class="bg-pink-500 rounded-r-sm {genderWidths[species.gender_rate]}">&nbsp;</span>
                            </div>
                            <span>Egg groups</span>
                            <div class="grid grid-cols-1">
                                {#each species.egg_groups as egg_goup}
                                    <span>{capitalize(egg_goup.name)}</span>
                                {/each}
                            </div>
                            <span>Egg cycles </span><span>{species.hatch_counter}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center min-w-4/12 max-w-5/12">
                <img src={empoleonImage} alt="empoleon" class="w-full border-2 rounded-sm border-green-500" />
            </div>
        </div>
    </div>

    <div class="flex flex-col">
        <h2 class="text-2xl">Evolution Line</h2>
        <div class="border-x-3 border-x-blue-500 rounded-lg flex flex-row space-x-4 justify-center">
            {#each evolutions as evolution, index}
                <div class="flex flex-col items-center justify-center p-4">
                    <img src={empoleonImage} alt="empoleon" class="max-h-32" />
                    <span>{capitalize(evolution)}</span>
                </div>
                {#if index < evolutions.length - 1}
                    <div class="flex flex-col items-center justify-center">
                        <span>🍬</span>
                        <span>→</span>
                    </div>
                {/if}
            {/each}
        </div>
    </div>

    <Stats {pokemon}></Stats>

    <div>
        <h2 class="text-2xl">Level-Up Moves</h2>
        <table class="table-auto w-full">
            <thead>
                <tr class="text-right">
                    <td>Level</td>
                    <td>Move</td>
                    <td>Type</td>
                    <td>Category</td>
                    <td>Power</td>
                    <td>Accuracy</td>
                    <td>PP</td>
                </tr>
            </thead>
            <tbody>
                {#each moveData as move}
                    <tr class="text-right">
                        <td>{move.level}</td>
                        <td>{capitalize(move.name, "-")}</td>
                        <td>{move.type.name}</td>
                        <td>{move.category}</td>
                        <td>{move.power || "---"}</td>
                        <td>{move.accuracy || "---"}</td>
                        <td>{move.pp}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div>
        <h2 class="text-2xl">Entries</h2>
        <table class="border-separate">
            <tbody>
                {#each flavorTexts as flavorText}
                    <tr>
                        <td class="bg-amber-400 rounded-sm">
                            {capitalize(flavorText.version)}
                        </td>
                        <td class="border border-blue-300 rounded-sm p-1">
                            {flavorText.flavorText}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div>
        <h2 class="text-2xl">Encounters</h2>
        <span>https://pokeapi.co/docs/v2#pokemon-location-areas</span>
    </div>
</div>

<style>
    /* 
    bg-type-normal
    bg-type-fighting
    bg-type-flying
    bg-type-poison
    bg-type-ground
    bg-type-rock
    bg-type-bug
    bg-type-ghost
    bg-type-steel
    bg-type-fire
    bg-type-water
    bg-type-grass
    bg-type-electric
    bg-type-psychic
    bg-type-ice
    bg-type-dragon
    bg-type-dark
    bg-type-fairy
    bg-type-stellar
    bg-type-unknown 
    */
</style>