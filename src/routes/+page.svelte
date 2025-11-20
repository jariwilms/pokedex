<script lang="ts">
    const navLinks = [
        { name: 'Regions'  , icon: "🌎", href: '/regions'   },
        { name: 'Pokémon'  , icon: "🏀", href: '/pokemon'   },
        { name: 'Moves'    , icon: "💿", href: '/moves'     },
        { name: 'Abilities', icon: "🎉", href: '/abilities' },
        { name: 'Items'    , icon: "🎈", href: '/items'     },
        { name: 'Other'    , icon: "📦", href: '/items'     },
    ];
</script>

<div>
    <h1 class="mb-6 text-3xl font-bold text-gray-800">Welcome to Zorua</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {#each navLinks as navLink }
        <a href={navLink.href} class="p-6 bg-white rounded-lg border-2 border-red-200">
            <div class="mb-3 text-4xl">{navLink.icon}</div>
            <h3 class="text-xl font-semibold text-gray-800">{navLink.name}</h3>
        </a>
        {/each}
    </div>
</div>
