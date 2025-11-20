<script lang="ts">
	import '../app.css';
	import pokeballIcon from '$lib/assets/icons/pokeball_icon_resized.png';

	let { children } = $props();

	const navLinks = [
		{ name: 'Regions', href: '/regions' },
		{ name: 'Pokémon', href: '/pokemon' },
		{ name: 'Moves', href: '/moves' },
		{ name: 'Abilities', href: '/abilities' },
		{ name: 'Items', href: '/items' }
	];
</script>

<svelte:head>
	<link rel="icon" href={pokeballIcon} />
</svelte:head>

<div class="flex flex-col min-h-screen bg-neutral-600">
	<header>
		<div class="grid h-14 grid-cols-3-equal-center bg-pokeball-top text-white">
			<div class="flex items-center justify-center">
				<a href="/" class="flex items-center justify-center space-x-2">
					<div class="w-12 h-12 bg-white rounded-full">
						<img src={pokeballIcon} alt="pokeball" />
					</div>
					<span class="text-3xl font-bold">Zorua</span>
				</a>
			</div>

			<div class="flex items-center justify-center">
				<nav>
					{#each navLinks as navLink}
						<a
							href={navLink.href}
							class="inline-block w-24 font-medium text-center transition-colors hover:text-black"
							>{navLink.name}</a
						>
					{/each}
				</nav>
			</div>

			<div class="flex items-center justify-center">
				<button class="font-medium transition-colors hover:text-black hover:cursor-pointer"> Login </button>
			</div>
		</div>
		<div class="border-b"></div>
		<div class="bg-white">
			<div class="max-w-3xl mx-auto flex flex-row w-full items-center justify-between">
				<input
					name="globalSearch"
					type="text"
					placeholder="Search for Pokémon, moves, abilities..."
					class="h-14 w-full text-lg rounded-lg focus:outline-none"
				/>
				<span class="text-gray-500">Ctrl+K</span>
			</div>
		</div>
		<div class="border-b"></div>
	</header>

	<main class="sm:w-full xl:w-1/2 mx-auto flex-1 flex flex-col">
		<div class="pt-8 px-12 bg-neutral-50 flex-1">
			{@render children()}
		</div>
	</main>

	<footer class="text-white bg-[#ff1616] py-2">
		<div class="font-medium text-sm text-center text-white">
			<p>&copy; 2025 Zorua. All rights reserved. Pokémon is a trademark of Nintendo.</p>
		</div>
	</footer>
</div>
