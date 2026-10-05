const textarea = document.getElementById("text-area");
const translateButton = document.getElementById("translate-button");
const resposta = document.getElementById("translate-result");
const language = document.getElementById("language");
const voiceButton = document.getElementById("voice-button");


translateButton.addEventListener("click", async function () {
    console.log("Botão clicado!");
    console.log(textarea.value);
    resposta.textContent = textarea.value;
    console.log(language.value); // mostra o valor do select no console

    
    if (textarea.value === "") {
        resposta.textContent = "Digite alguma coisa!";
    }

    else {
        resposta.textContent = textarea.value;
    }

    
    try {
        const url = "https://api.mymemory.translated.net/get?q="
            + textarea.value
            + "&langpair=pt-br|"
            + language.value;

        const resultado = await fetch(url)

        const dados = await resultado.json();
        dados.responseData.translatedText = dados.responseData.translatedText.replace(/<[^>]*>/g, "");
        resposta.textContent = dados.responseData.translatedText;

    } catch (erro) {
        console.log(erro);
        resposta.textContent = "Erro na tradução!";
    }

});

voiceButton.addEventListener("click", function () {

    const voz = new SpeechRecognition();
    voz.lang = language.value;
    voz.start();

    voz.onresult = function (evento) {
        const fala = evento.results[0][0].transcript;
        textarea.value = fala;

        speechUtterance = new SpeechSynthesisUtterance(resposta.textContent);



    }

});

textarea.addEventListener("keydown", function (evento) {

    if (evento.key == "Enter") {
        translateButton.click()
    }

});


console.log(textarea);
console.log(translateButton);
console.log(resposta);
console.log(voiceButton);








