<template>
    <div class="character_conteiner">
        <div v-if="characterStore.charImageURL.length > 1 && characterStore.charDesc2.length > 1 " class="character">
            <img :src="characterStore.charImageURL" alt="character">
            <p>Nazwa postaci: {{ characterStore.character.name }}</p>
            <p>{{ characterStore.charDesc2 }}</p>
        </div>
        <div v-else>
          
            <Loader/>

        </div>

    </div>
</template>

<script setup lang="ts">
import { useGenImageStore } from '@/stores/genImageStore';
import { useCharacterStore } from '@/stores/characterStore';
import { useTextGenStore } from '@/stores/textGenStore';
import Loader from '@/components/Loader.vue';
import { ref, computed } from 'vue';

const genImageStore = useGenImageStore();
const characterStore = useCharacterStore();
const textGenStore = useTextGenStore();




</script>

<style lang="scss" scoped>

</style>