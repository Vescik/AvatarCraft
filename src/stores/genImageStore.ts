import {defineStore} from 'pinia'
import { useCharacterStore } from '../stores/characterStore'



export const useGenImageStore = defineStore('genImage', () => {

    const characterStore = useCharacterStore()

    const genImage = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ',
            },
            body: JSON.stringify({
                "prompt": characterStore.characterPrompt,
                "n": 1,
                "size": "512x512"
        })
        }
        
      try{
            console.log(options);
            
            const res = await  fetch('https://api.openai.com/v1/images/generations', options)
            const data = await res.json()
             await characterStore.setCharImage(data.data[0].url)
      }catch(error){
        console.error(error)
      }
        
    
    }


    return {genImage}

})