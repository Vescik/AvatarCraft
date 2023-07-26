import { defineStore } from 'pinia'
import { ref } from 'vue'

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

export const useCharacterStore = defineStore('character', () => {
    const character = ref<Character>({})
    const characterPrompt = ref<string>("")
    const characterDescription = ref<string>("")
    const charImageURL = ref<string>("")
    const charDesc2 = ref<string>("")

    const characterTemplate: Character = {
        name: ["Thunder", "Shadow", "Ember", "Storm", "Frost", "Iron", "Nightshade", "Darkthorn", "Raven", "Moon", "Blade", "Fireheart", "Bloodfang", "Silvermoon", "Windrider", "Blaze", "Steel", "Viper", "Swift", "Void", "Frostbite", "Shadowstrike", "Phoenix", "Thunderbolt", "Reaper"],
        gender: ["male", "female", "non-binary", "other"],
        age: 0,
        race: ["elf", "human", "dwarf", "orc", "gnome", "halfling", "murzyn"],
        class: ["warrior", "mage", "rogue", "priest", "paladin", "druid", "hunter", "shaman", "warlock"],
        hairStyle: ["short", "long", "curly", "straight", "bald", "undercut", "quiff", "side part", "pompadour", "buzz cut", "Adrian Bieniek", "middle part"],
        hairColor: ["black", "brown", "blonde", "red", "white", "grey", "blue", "green", "purple", "pink", "orange", "yellow"],
        skinColor: ["white", "black", "brown", "yellow", "green", "blue", "purple", "red", "orange", "pink"],
        eyeColor: ["black", "brown", "blue", "green", "grey", "hazel", "amber"],
        facialHair: ["none", "beard", "mustache", "goatee", "soul patch", "sideburns", "mutton chops", "chinstrap", "stubble"],
        tattoos: ["none", "face", "neck", "chest", "back", "arms", "legs", "full body"],
        scars: ["none", "face", "neck", "chest", "back", "arms", "legs", "full body"]
    }

    const setCharacter = (newCharacter: Character) => {
        character.value = newCharacter
    }
    const setCharacterPromt = (prompt:string) => {
        characterPrompt.value = prompt
    }
    const setCharacterProfile = (characterArgs,prompt, description) => {
        character.value = characterArgs
        characterPrompt.value = prompt
        characterDescription.value = description
    }
    const setCharImage = (image:string[]) => {
        charImageURL.value = ""
        charImageURL.value = image
    }
   const setPrompt = (desc:string) => {
        charDesc2.value = desc
   }
   const resetState = () => {
        character.value = {}
        characterPrompt.value = ""
        characterDescription.value = ""
        charImageURL.value = ""
        charDesc2.value = ""
    }

    return { character,setCharacterProfile,characterTemplate,setCharacterPromt,characterDescription,characterPrompt,setCharImage,charImageURL,charDesc2,setPrompt,resetState }
})