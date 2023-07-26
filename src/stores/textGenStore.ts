import {defineStore} from 'pinia'
import {ref} from 'vue'
import { useCharacterStore } from '../stores/characterStore'
import axois from 'axios'
import  { Configuration, OpenAIApi } from 'openai'


export const useTextGenStore = defineStore('textGent', () => {

    const characterStore = useCharacterStore()
    const characterPromp  = characterStore.characterPrompt

    const genDescription = async () => {
        const prompt = characterStore.characterPrompt
        console.log(prompt)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{"role": "system", "content": `In Polish langague generate character description with given details${prompt}`}]                
        })
        }
      try{
            console.log(options);
            
            const res = await  fetch('https://api.openai.com/v1/chat/completions', options)
            const data = await res.json()
            characterStore.setPrompt(data.choices[0].message.content)
            
      }catch(error){
        console.error(error)
      }  
    }
    return {genDescription}

})