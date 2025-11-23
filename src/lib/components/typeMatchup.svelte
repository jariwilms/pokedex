<script lang="ts">
    import { typeIndex  } from "$lib/pokedex/data/type-index";
    import { typeMatrix } from "$lib/pokedex/data/type-matrix";
    
    const { types }: { types: [number, number?] } = $props();
    const generation   = 6;
    const typeNames    = Object.keys(typeIndex[generation]);
    const firstType    = types[0];
    const secondType   = types[1];
    const interactions = typeMatrix[6].map((element, index) => {
            const type     = typeNames[index];
            let multiplier = element[firstType];
            if (secondType) multiplier *= element[secondType];
            
            return { type: type, multiplier: multiplier };
        });

    const images       = import.meta.glob<{ default: string }>("$lib/assets/icons/types/*", { 
        eager: true 
    });
    const imageUrls    = Object.keys(images)
        .filter((element   ) => { return !element.includes("stellar"); })
        .sort  ((a      , b) => {
            const first  = typeNames.findIndex((element) => a.includes(element));
            const second = typeNames.findIndex((element) => b.includes(element));
            
            return first - second;
        });

    function getBackgroundColor(multiplier: number) {
        if      (multiplier ==   0) return "bg-neutral-" + 700;
        else if (multiplier == 1/4) return "bg-red-"     + 500;
        else if (multiplier == 1/2) return "bg-red-"     + 400;
        else if (multiplier == 1/1) return "bg-neutral-" + 500;
        else if (multiplier == 2/1) return "bg-green-"   + 400;
        else if (multiplier == 4/1) return "bg-green-"   + 500;
    }
</script>

<table class="border-collapse">
    <thead>
        <tr>
            {#each interactions as interaction, index}
                {#if interaction.multiplier != 1}                
                    <th>
                        <div class="m-0.5">
                            <img src={imageUrls[index]} alt={interaction.type + " multiplier"} class="w-10 h-10">
                        </div>
                    </th>
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody>
        <tr>
            {#each interactions as interaction}
                {#if interaction.multiplier != 1}                
                    <td>
                        <div class="{getBackgroundColor(interaction.multiplier)} rounded-sm m-0.5">
                            <span class="w-10 h-10 flex items-center justify-center">
                                {interaction.multiplier}
                            </span>
                        </div>
                    </td>
                {/if}
            {/each}
        </tr>
    </tbody>
</table>

<style>
    /* 
    bg-neutral-300
    bg-red-300
    bg-red-300
    bg-neutral-300
    bg-green-300
    bg-green-300 
    
    bg-neutral-400
    bg-red-400
    bg-red-400
    bg-neutral-400
    bg-green-400
    bg-green-400

    bg-neutral-500
    bg-red-500
    bg-red-500
    bg-neutral-500
    bg-green-500
    bg-green-500 
    */
</style>