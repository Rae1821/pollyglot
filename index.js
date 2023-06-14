
import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'


const configuration = new Configuration({
    //organization: 'org-XC0s1PRokBlhgvcw6fyI5iQa',
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)


const chatbotConversation = document.getElementById('chatbot-conversation-container')


document.addEventListener('submit', (e) => {
    console.log("clicked")
    e.preventDefault()
    const userInput = document.getElementById('user-input')
    const selectedLanguage = document.querySelector('input[name="language"]:checked')
    const userSelectedLanguage = selectedLanguage.value
 
    fetchBotTranslation(userInput.value, userSelectedLanguage)
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})


async function fetchBotTranslation(phrase, language) {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Translate the phrase from English to the checked language.
        ###
        userInput: Hello, how are you today?
        translation in japanese: こんにちは元気ですか
        ###
        userInput: Hello, what is your name?
        translation in spanish: Hola Cuál es su nombre?
        ###
        userInput: Can you tell me where the bathroom is?
        translation in french: ¿Puedes decirme dónde está el baño?
        ###
        userInput: ${phrase}
        translation in ${language}: 
        
        `,
    })
    renderTypewriterText(response.data.choices[0].text.trim())
   
}



function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i - 1, i)
        if(text.length === i){
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}


