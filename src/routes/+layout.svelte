<script lang="ts">
    import "../app.css";
    import pokeballIcon from "$lib/assets/icons/pokeball.svg";
    import githubIcon from "$lib/assets/icons/github-mark-white.svg";

    let { children } = $props();

    const navLinks = [
        { name: "Regions", href: "/regions" },
        { name: "Pokémon", href: "/pokemon" },
        { name: "Moves", href: "/moves" },
        { name: "Abilities", href: "/abilities" },
        { name: "Items", href: "/items" },
    ];

    const headerOutsideWidth = "w-32";
</script>

<svelte:head>
    <title>Zorua</title>
    <link rel="icon" href={pokeballIcon} />
</svelte:head>

<div class="flex flex-col min-h-screen bg-neutral-700">
    <header class="flex flex-row justify-between px-8 text-white h-14 bg-pokeball-top">
        <div class="flex items-center {headerOutsideWidth}">
            <a href="/" class="flex items-center justify-center space-x-2">
                <img src={pokeballIcon} alt="pokeball" class="w-8 h-8" />
                <span class="pb-1 text-2xl font-medium">Zorua</span>
            </a>
        </div>

        <div class="flex items-center">
            <nav>
                {#each navLinks as navLink}
                    <a href={navLink.href} class="inline-block w-24 font-medium text-center transition-colors hover:text-black"
                        >{navLink.name}</a>
                {/each}
            </nav>
        </div>

        <div class="flex items-center justify-end {headerOutsideWidth}">
            <a title="github-repo" href="https://github.com/jariwilms/pokedex" target="_blank"
                ><img src={githubIcon} alt="github-icon" class="w-8 h-8" /></a>
        </div>
    </header>
    <div class="border-b border-b-neutral-400"></div>
    <search class="bg-white">
        <div class="flex flex-row items-center justify-between max-w-3xl mx-auto">
            <input
                name="globalSearch"
                type="text"
                placeholder="Search for Pokémon, Moves, Abilities..."
                class="w-full text-lg h-14 focus:outline-none" />
        </div>
    </search>
    <div class="border-b border-b-neutral-400"></div>

    <main class="flex flex-col w-full mx-auto xl:w-1/2 grow">
        <div class="px-12 pt-8 bg-white grow">
            {@render children()}
        </div>
    </main>

    <footer class="py-2 text-white bg-pokeball-top">
        <div class="text-sm font-medium text-center text-white">
            <p>&copy; 2025 Zorua. All rights reserved. Pokémon is a trademark of Nintendo.</p>
        </div>
    </footer>
</div>
