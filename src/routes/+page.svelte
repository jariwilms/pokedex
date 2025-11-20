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

<div class="flex flex-col space-y-8">
    <h1 class="text-3xl font-bold text-neutral-800">Welcome to Zorua</h1>
    <div class="grid grid-cols-2 gap-2">
        {#each navLinks as navLink }
        <a href={navLink.href} class="p-6 bg-white rounded-sm border-2 border-neutral-800 flex flex-col space-y-2">
            <div class="text-4xl">{navLink.icon}</div>
            <h3 class="text-xl font-medium text-neutral-800">{navLink.name}</h3>
        </a>
        {/each}
    </div>
</div>
