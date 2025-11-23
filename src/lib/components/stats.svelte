<script lang="ts">
	import { clamp } from '$lib/clamp';
    import type { Pokemon } from 'pokedex-promise-v2';

	let { pokemon }: { pokemon: Pokemon } = $props();
	let pokemonStats = pokemon.stats;
	let selectedLevel: number = $state(50);

	function hpFormulaGen3(level: number, base: number, iv: number, ev: number): number {
		level = clamp(level, 1, 100);
		base = clamp(base, 0, base);
		iv = clamp(iv, 0, 31);
		ev = clamp(ev, 0, 252);

		return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
	}
	function statFormulaGen3(level: number, base: number, iv: number, ev: number, nature: number) {
		level = clamp(level, 1, 100);
		base = clamp(base, 0, base);
		iv = clamp(iv, 0, 31);
		ev = clamp(ev, 0, 252);

		return Math.floor((Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) * nature);
	}
	function calculateStat(
		level: number,
		base: number,
		iv: number,
		ev: number,
		nature: number,
		isHealth: boolean,
		gen: number = 3
	): number {
		if (isHealth) return hpFormulaGen3(level, base, iv, ev);
		else return statFormulaGen3(level, base, iv, ev, nature);
	}

	let totalStats = pokemonStats.reduce((accumulator, value) => accumulator + value.base_stat, 0);
</script>

<table class="table-fixed w-full">
	<thead>
		<tr>
			<th class="w-32"></th>
			<th class="w-12"></th>
			<th class="w-full"></th>
			<th class="w-12"></th>
			<th class="w-12"></th>
		</tr>
	</thead>
	<tbody>
	{#each pokemonStats as stat, index}
	<tr class="border-b border-b-gray-300">
		<td class="py-1 whitespace-nowrap">{stat.stat.name}</td>
		<td class="text-right pr-2">{stat.base_stat}</td>
		<td>
			<div
				class='h-4 rounded-r-sm border-l border-l-gray-300 bg-stat-{stat.stat.name}'
				style="width: {(stat.base_stat / 255) * 100}%;"
			></div>
		</td>
		<td class="text-right whitespace-nowrap pr-1 border-r-2 border-r-blue-500"
			>{calculateStat(selectedLevel, stat.base_stat, 0, 0, 0.9, stat.stat.name == 'hp')}</td
		>
		<td class="text-right whitespace-nowrap pr-1 border-r-2 border-r-red-500"
			>{calculateStat(selectedLevel, stat.base_stat, 31, 252, 1.1, stat.stat.name == 'hp')}</td
		>
	</tr>
	{/each}
		<tr>
			<td class="py-0.5">total</td>
			<td class="text-right pr-2">{totalStats}</td>
			<td>
				<div class="flex flex-row items-center justify-center">
					<input
						name="selectedLevel"
						type="range"
						min="1"
						max="100"
						bind:value={selectedLevel}
						class="w-full h-4 appearance-none bg-gray-300 rounded-full"
						aria-label="selected level"
					/>
					<div class="flex flex-row pl-3">
						<span>level</span>
						<span class="w-7 text-right">{selectedLevel}</span>
					</div>
				</div>
			</td>
			<td class="text-right pr-1 border-r-2 border-r-blue-500">min</td>
			<td class="text-right pr-1 border-r-2 border-r-red-500">max</td>
		</tr>
	</tbody>
</table>

<style>
	/* 
	bg-stat-hp
	bg-stat-attack
	bg-stat-defense
	bg-stat-special-attack
	bg-stat-special-defense
	bg-stat-speed 
	*/
</style>
