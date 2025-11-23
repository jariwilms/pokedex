<script>
    import TypeMatchup from "$lib/components/typeMatchup.svelte";
    import { typeIndex } from "$lib/pokedex/data/type-index";


</script>

<div>
    <TypeMatchup types={[typeIndex[6].water, typeIndex[6].steel]}></TypeMatchup>
</div>
