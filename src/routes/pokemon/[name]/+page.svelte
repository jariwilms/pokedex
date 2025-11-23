<script lang="ts">
    import { capitalize } from "$lib/capitalize.js";
    import Stats from "$lib/components/stats.svelte";
    import type { Chain } from "pokedex-promise-v2";
    import physicalImage from "$lib/assets/images/damage-class/physical.png";
    import specialImage  from "$lib/assets/images/damage-class/special.png";
    import statusImage   from "$lib/assets/images/damage-class/status.png";
    import TypeMatchup from "$lib/components/typeMatchup.svelte";
    import { typeIndex } from "$lib/pokedex/data/type-index";
    
    const evolutionTypes = [
        "none",
        "linear",
        "branch",
        "converge",
        "regional",
        "split",
        "conditional",
    ]
    function flattenEvolutionChain(node: Chain): any {
        return [
            {
                name             : node.species.name     , 
                is_baby          : node.is_baby          , 
                evolves_to       : node.evolves_to       , 
            }, 
            ...node.evolves_to.flatMap(flattenEvolutionChain),
        ];
    }
    function getTypeBadgeRounding(typeCount: number, typeIndex: number) {
        if      (typeCount == 0) return "";
        else if (typeCount == 1) return "rounded-sm";
        else {
            if      (typeIndex == 0)             return "rounded-l-sm";
            else if (typeIndex == typeCount - 1) return "rounded-r-sm";
            else                                 return "";
        }
    }

    const { data }                                    = $props();
    const { pokemon, species, evolutionChain, moves } = data;
    const pokemonImage                                = pokemon.sprites.other["official-artwork"].front_default;
    
    const genderWidths                                = ["w-0", "w-1/8", "w-2/8", "w-3/8", "w-4/8", "w-5/8", "w-6/8", "w-7/8", "w-full"];
    const selectedLanguage                            = $state("en");
    const genus                                       = $derived(species.genera.find((element) => {
        return element.language.name == selectedLanguage;
    })?.genus);
    const evYields                                    = pokemon.stats.filter((element) => {
        return element.effort > 0;
    });
    const height                                      = pokemon.height / 10;
    const weight                                      = pokemon.weight / 10;
    const flavorTexts                                 = $derived(species.flavor_text_entries
        .filter((element) => element.language.name === selectedLanguage)
        .map   ((element) => ({ version: element.version.name, flavorText: element.flavor_text })
    ));
    const evolutions                                  = flattenEvolutionChain(evolutionChain.chain);
    const combinedMoves                               = pokemon.moves.map((element, index) => ({
        ...element     , 
        ...moves[index], 
    }));
    const levelUpMoves                                = combinedMoves
        .filter((element) => {
            
            const vgd = element.version_group_details[0];
            return vgd.move_learn_method.name == "level-up" && vgd.order < 5;
        })
        .map((element) => {
            return { 
                name          : element.move.name                                , 
                level         : element.version_group_details[0].level_learned_at, 
                power         : element.power                                    , 
                accuracy      : element.accuracy                                 , 
                pp            : element.pp                                       , 
                type          : element.type.name                                , 
                damageCategory: element.damage_class.name                        , 
            };
        })
        .sort((first, second) => {
            return first.level - second.level;
        });
    const tmMoves                                     = combinedMoves
        .filter((element) => {
            
            const vgd = element.version_group_details[0];
            return vgd.move_learn_method.name == "machine";
        })
        .map((element) => {
            return { 
                name          : element.move.name                                , 
                power         : element.power                                    , 
                accuracy      : element.accuracy                                 , 
                pp            : element.pp                                       , 
                type          : element.type.name                                , 
                damageCategory: element.damage_class.name                        , 
            };
        })
    
    const damageCategoryImages = {
        physical: physicalImage, 
        special : specialImage , 
        status  : statusImage  , 
    };

    const firstTypeIndex  = typeIndex[6][pokemon.types[0].type.name as keyof typeof typeIndex[6]];
    const secondTypeIndex = pokemon.types.length > 1 ? typeIndex[6][pokemon.types[1].type.name as keyof typeof typeIndex[6]] : undefined;
</script>
<div class="flex flex-col space-y-8">
    <div class="">
        <div class="flex flex-col space-x-2 md:flex-row">
            <span class="text-4xl">#{pokemon.id}</span>
            <h1 class="text-4xl">{capitalize(pokemon.name)}</h1>
            <div class="flex flex-row">
                {#each pokemon.types as type, index}
                    <a 
                        href="/"
                        class="bg-type-{type.type.name} {getTypeBadgeRounding(pokemon.types.length, index)} 
                        text-sm w-16 text-center text-white mt-auto font-medium mb-1">
                        {type.type.name.toUpperCase()}
                    </a>
                {/each}
            </div>
        </div>
        <div class="flex flex-row space-x-2">
            <span class="invisible text-4xl">#{pokemon.id}</span>
            <span class="ml-[3px]">The {genus}</span>
        </div>
    </div>
    <div class="flex flex-col space-y-2">
        <h2 class="text-2xl">Pokedex entry</h2>
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div class="flex flex-col items-center border-x-2 border-x-red-500 xl:order-3">
                <img src={pokemonImage} alt="empoleon" fetchpriority="high"/>
                <span>other versions</span>
            </div>
            
            <div class="border-x-2 border-x-blue-500 xl:order-1">
                <h3 class="text-xl">Biology</h3>
                <div class="grid grid-cols-2">
                    <span>Height   </span><span>{height} m </span>
                    <span>Weight   </span><span>{weight} kg</span>
                    <span>Abilities</span>
                    <div class="grid">
                        {#each pokemon.abilities as ability}
                            <span>
                                {capitalize(ability.ability.name.replace("-", " "), " ")}
                                {#if ability.is_hidden}
                                    <span
                                        class="px-1 text-sm font-medium text-center text-white bg-green-600 rounded-sm select-none hover:cursor-pointer"
                                        >H</span>
                                {/if}
                            </span>
                        {/each}
                    </div>
                </div>

                <div>
                    <h3 class="text-xl">Training</h3>
                    <div class="grid grid-cols-2">
                        <span>EV Yield </span>
                        <div class="flex flex-col">
                            {#each evYields as r}
                                <span>{capitalize(r.stat.name, "-")}&nbsp{r.effort}</span>
                            {/each}
                        </div>
                        <span>Base Experience</span><span>{pokemon.base_experience}</span>
                        <span>Base Happiness</span><span>{species.base_happiness}</span>
                        <span>Capture Rate</span><span>{species.capture_rate}</span>
                        <span>Growth Rate</span><span>{capitalize(species.growth_rate.name, "-")}</span>
                    </div>
                </div>
            </div>
            
            <div class="border-x-2 border-x-green-500 lg:order-2">
                <div>
                    <h3 class="text-xl">Breeding</h3>
                    <div class="grid grid-cols-2">
                        <span>Gender Ratio</span>
                        <div class="flex flex-row h-3 mt-2 max-w-1/2">
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
    </div>

    <div class="border-x-2 border-x-red-500">
        <h2 class="text-2xl">Evolution Chain</h2>
        <div class="flex flex-row items-center justify-center gap-4">
            {#each evolutions as evolution, index}
            <div class="flex flex-col items-center">
                <img src={pokemonImage} alt={evolution.name} class="max-h-42">
                {capitalize(evolution.name)}
            </div>
                {#if index < evolutions.length - 1}
                    <div class="flex flex-col items-center justify-center">
                        <span>🍬</span>
                        <span class="text-xl">→</span>
                        {#each evolution.evolves_to[0].evolution_details as ev}
                            <span>{ev.trigger.name}</span>
                        {/each}
                    </div>
                {/if}
            {/each}
        </div>
    </div>

    <div>
        <h2 class="text-2xl">Type Matchups</h2>
        <div class="flex items-center justify-center">
            <TypeMatchup 
                types={[firstTypeIndex, secondTypeIndex]}>
            </TypeMatchup>
        </div>
    </div>

    <div>
        <h2 class="text-2xl">Stats</h2>
        <Stats {pokemon}></Stats>
    </div>

    <div>
        <h2 class="text-2xl">Learnset</h2>
        <div class="space-y-8">
            <div>
                <h3 class="text-xl">Level up</h3>
                <div>
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="text-right">
                                <th class="w-1/12 pr-4">Level</th>
                                <th class="w-2/12 text-left">Name</th>
                                <th class="w-20 text-center">Type</th>
                                <th>Class</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                                <th>PP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each levelUpMoves as levelUpMove}
                                <tr class="text-right">
                                    <td><span class="pr-4">{levelUpMove.level || "—"}</span></td>
                                    <td class="text-left">{capitalize(levelUpMove.name, "-").replace("-", " ") || "—"}</td>
                                    <td>
                                        <a href="/" class="block bg-type-{levelUpMove.type} rounded-sm text-sm text-center text-white font-medium border border-neutral-500">
                                            {levelUpMove.type.toUpperCase()}
                                        </a>
                                    </td>
                                    <td>
                                        <img 
                                        src={damageCategoryImages[levelUpMove.damageCategory as keyof typeof damageCategoryImages]} alt={levelUpMove.damageCategory + " damage category"}
                                        class="ml-auto"
                                        >
                                    </td>
                                    <td>{levelUpMove.power || "—"}</td>
                                    <td>{levelUpMove.accuracy || "—"}</td>
                                    <td>{levelUpMove.pp || "—"}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h3 class="text-xl">Technical Machine</h3>
                <div>
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="text-right">
                                <th class="w-1/12 pr-4">Level</th>
                                <th class="w-2/12 text-left">Name</th>
                                <th class="w-20 text-center">Type</th>
                                <th>Class</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                                <th>PP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each tmMoves as tmMove}
                                <tr class="text-right">
                                    <td class="pr-4">{0}</td>
                                    <td class="text-left">{capitalize(tmMove.name, "-").replace("-", " ") || "—"}</td>
                                    <td>
                                        <a href="/" class="block bg-type-{tmMove.type} rounded-sm text-sm text-center text-white font-medium border border-neutral-500">
                                            {tmMove.type.toUpperCase()}
                                        </a>
                                    </td>
                                    <td>
                                        <img 
                                        src={damageCategoryImages[tmMove.damageCategory as keyof typeof damageCategoryImages]} alt={tmMove.damageCategory + " damage category"}
                                        class="ml-auto"
                                        >
                                    </td>
                                    <td>{tmMove.power || "—"}</td>
                                    <td>{tmMove.accuracy || "—"}</td>
                                    <td>{tmMove.pp || "—"}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h3 class="text-xl">Egg moves</h3>
            </div>
        </div>
    </div>

    <div>
        <h2 class="text-2xl">Entries</h2>
        <table class="border-separate">
            <tbody>
                {#each flavorTexts as flavorText}
                    <tr>
                        <td class="rounded-sm bg-amber-400">
                            {capitalize(flavorText.version)}
                        </td>
                        <td class="p-1 border border-blue-300 rounded-sm">
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

    border-type-normal
    border-type-fighting
    border-type-flying
    border-type-poison
    border-type-ground
    border-type-rock
    border-type-bug
    border-type-ghost
    border-type-steel
    border-type-fire
    border-type-water
    border-type-grass
    border-type-electric
    border-type-psychic
    border-type-ice
    border-type-dragon
    border-type-dark
    border-type-fairy
    border-type-stellar
    border-type-unknown 
    */
</style>
