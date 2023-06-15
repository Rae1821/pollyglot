


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

    const url = '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'

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "text/plain"
        },
        body:  
        `Translate the phrase from English to the checked language.
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

   const data = await response.json()

    renderTypewriterText(data.choices[0].text)
   
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


