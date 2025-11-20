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
    <link rel="icon" href={pokeballIcon} />
</svelte:head>

<div class="flex flex-col min-h-screen bg-neutral-700">
    <header class="h-14 flex flex-row justify-between bg-pokeball-top text-white px-8">
        <div class="flex items-center {headerOutsideWidth}">
            <a href="/" class="flex items-center justify-center space-x-2">
                <img src={pokeballIcon} alt="pokeball" class="w-8 h-8" />
                <span class="font-medium text-2xl pb-1">Zorua</span>
            </a>
        </div>

        <div class="flex items-center">
            <nav>
                {#each navLinks as navLink}
                    <a href={navLink.href} class="inline-block w-24 text-center font-medium transition-colors hover:text-black"
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
        <div class="max-w-3xl mx-auto flex flex-row items-center justify-between">
            <input
                name="globalSearch"
                type="text"
                placeholder="Search for Pokémon, Moves, Abilities..."
                class="w-full h-14 text-lg focus:outline-none" />
            <span class="text-gray-500">Ctrl+K</span>
        </div>
    </search>
    <div class="border-b border-b-neutral-400"></div>

    <main class="w-full 2xl:w-1/2 mx-auto flex flex-col grow">
        <div class="pt-8 px-12 bg-white grow">
            {@render children()}
        </div>
    </main>

    <footer class="text-white bg-pokeball-top py-2">
        <div class="font-medium text-sm text-center text-white">
            <p>&copy; 2025 Zorua. All rights reserved. Pokémon is a trademark of Nintendo.</p>
        </div>
    </footer>
</div>
