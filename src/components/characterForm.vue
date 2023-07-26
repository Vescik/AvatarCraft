<template>
    <div>
        <form action="">
            <label for="name">Nazwa postaci: {{ character.name }}</label>
            <span>
                <input type="text" id="name" v-model="character.name">
                <button @click="handleRandName" type="button">Losuj</button>
            </span>
            <label for="age">Wiek postaci</label>
            <input type="number" id="age" v-model="character.age">
            <label for="race">Wybierz rase postaci</label>
            <select v-model="character.race" name="characterRace" id="race-select">
                <option v-for="race in characterStore.characterTemplate.race" :value="race" :key="race">{{ race }}</option>
            </select>
            <label for="race">Wybierz kolor skóry</label>
            <select v-model="character.skinColor" name="characterRace" id="race-select">
                <option v-for="color in characterStore.characterTemplate.skinColor" :value="color" :key="color">{{ color }}</option>
            </select>
            <label for="race">Wybierz klasę postaci</label>
            <select v-model="character.class" name="characterRace" id="race-select">
                <option v-for="charClass in characterStore.characterTemplate.class" :value="charClass" :key="charClass">{{ charClass }}</option>
            </select>
            <label for="race">Wybierz styl włosów </label>
            <select v-model="character.hairStyle" name="characterRace" id="race-select">
                <option  v-for="hairStyle in characterStore.characterTemplate.hairStyle" :value="hairStyle" :key="hairStyle">{{ hairStyle }}</option>
            </select>
            <label for="race">Kolor włosów:</label>
            <select v-model="character.hairColor" name="characterRace" id="race-select">
                <option v-for="charClass in characterStore.characterTemplate.hairColor" :value="charClass" :key="charClass">{{ charClass }}</option>
            </select>
            <label for="race">Kolor oczu</label>
            <select v-model="character.eyeColor" name="characterRace" id="race-select">
                <option v-for="charClass in characterStore.characterTemplate.eyeColor" :value="charClass" :key="charClass">{{ charClass }}</option>
            </select>
            <label for="race">Zarost</label>
            <select v-model="character.facialHair" name="characterRace" id="race-select">
                <option v-for="charClass in characterStore.characterTemplate.facialHair" :value="charClass" :key="charClass">{{ charClass }}</option>
            </select>
            <label for="race">Tatuaże:</label>
            <select v-model="character.tattoos" name="characterRace" id="race-select">
                <option v-for="charClass in characterStore.characterTemplate.tattoos" :value="charClass" :key="charClass">{{ charClass }}</option>
            </select>
            <label for="race">Blizny</label>
            <select v-model="character.scars" name="characterRace" id="race-select">
                <option v-for="scar in characterStore.characterTemplate.scars" :value="scar" :key="scar">{{ scar }}</option>
            </select>
            <button @click.prevent="handleAddCharacter" >Stwórz postać</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore';
import { useGenImageStore } from '@/stores/genImageStore';
import { useTextGenStore } from '@/stores/textGenStore';
import {ref, computed} from 'vue';
import { useRouter } from 'vue-router';
interface Character {
    name: string
    gender: string
    age: number
    race: string
    skinColor: string
    class: string
    hairStyle: string
    hairColor: string
    eyeColor: string
    facialHair: string
    tattoos: string
    scars: string
}


const characterStore = useCharacterStore();
const genImageStore = useGenImageStore();
const textGenStore = useTextGenStore();
const character = ref({
    name: "",
    gender: "",
    age: 0,
    race: "",
    skinColor: "",
    class: "",
    hairStyle: "",
    hairColor: "",
    eyeColor: "",
    facialHair: "",
    tattoos: "",
    scars: "",
})

const handleRandName = () => {
    const randNum = Math.floor(Math.random() * 24);
    const randName = characterStore.characterTemplate.name[randNum];
    character.value.name = randName
}

function generateCharacterPrompt(character:Character) {
  const prompt =
  `Create an image of a game character.\n` +
  `Name: ${character.name.value}`



  return prompt;
}
function generateCharacterDescription(character:Character) {
  const description = 
    `${character.name} is a ${character.age}-year-old ${character.gender} ${character.race} ${character.class}.`
    + ` have ${character.skinColor} skin, ${character.hairColor} hair styled in ${character.hairStyle}, and ${character.eyeColor} eyes.`
    + ` ${character.facialHair ? `have ${character.facialHair} facial hair` : `do not have any facial hair`}.`
    + ` ${character.tattoos ? `have tattoos on their body` : `do not have any tattoos`}.`
    + ` ${character.scars ? `have scars on their body` : `do not have any scars`}.`;

  return description;
}
const router = useRouter();
const desc = generateCharacterPrompt(character.value)
const description = generateCharacterDescription(character.value)

const handleAddCharacter = () => {
    const prompt = JSON.stringify(character.value)
    console.log(prompt);
    
  
    characterStore.resetState()
    characterStore.setCharacterPromt(prompt)
    genImageStore.genImage()
    textGenStore.genDescription()
    characterStore.setCharacterProfile(character.value, prompt, description)
    router.push('/character')
}




</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
select {
  padding: 8px;
  margin-bottom: 10px;
  width: 250px;
}

button {
  padding: 10px 20px;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--vt-c-indigo);
  opacity: 0.8;
}

p {
  margin-top: 10px;
  font-style: italic;
}

</style>