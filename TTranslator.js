/*
Lógica de programação
    - falar a linguagem do computador
Algoritmo
    - receita de bolo. Os passos certos na sequência correta.

JavaScript
    - Variáveis: pedacinho da memória do computador que vc pode guardar
    o que quiser.
    - Funções : pedaço de código que só executa quando chama.
    - Como se conectar com o HTML
    - Manipular a DOM 
console.log() mostra o que quiser na tela/ console do navegador.
*/
/* const fala = "Olá, mundo!";
console.log(fala); */

// Eu criei variaveis para guardar elementos do html.
// dentro dela, utilizei o document.getElementById() para pegar o elemento do html pelo id.
const textarea = document.getElementById("text-area");
const translateButton = document.getElementById("translate-button");
const resposta = document.getElementById("translate-result");
const language = document.getElementById("language");
const voiceButton = document.getElementById("voice-button");

// em seguida, eu criei um evento de click no botão, que quando clicado, vai executar a função que está dentro do addEventListener.
//além disso, utilizei o console.log() para mostrar os resultados no console do chrome.
// utilizei tambem o textContent para mostrar o que está escrito na textarea dentro do elemento resposta.
// o value é importante para pegar o que está escrito na textarea, pois o textContent não funciona com textarea.
// a função serve para mostrarr no elemento resposta.
translateButton.addEventListener("click", async function () {
    console.log("Botão clicado!");
    console.log(textarea.value);
    resposta.textContent = textarea.value;
    console.log(language.value); // mostra o valor do select no console

    //Um único = serve para guardar/atribuir um valor em uma variável (let x = 10).
    //Três = servem para comparar se o lado esquerdo é exatamente igual ao lado direito em conteúdo e tipo
    if (textarea.value === "") {
        resposta.textContent = "Digite alguma coisa!";
    }

    else {
        resposta.textContent = textarea.value;
    }

    //resposta.textContent = textarea.value.toUpperCase(); // transforma o texto em maiúsculo

    /*  if (language.value === "espanhol") {
        resposta.textContent = "Hola, mundo!";
    }
 
    else if (language.value === "francês") {
        resposta.textContent = "Bonjour, le monde!";
    }
 
    else if (language.value === "inglês") {
        resposta.textContent = "Hello, world!";
    }
    else { resposta.textContent = "Idioma não suportado!"; }
 
 
    if (textarea.value === "Olá" && language.value === "espanhol") {
        resposta.textContent = "Hola!";
    }
 
    else if (textarea.value === "Olá" && language.value === "francês") {
        resposta.textContent = "Bonjour!";
    }
 
    else if (textarea.value === "Olá" && language.value === "inglês") {
        resposta.textContent = "Hello!";
    }
 
    else { resposta.textContent = "Idioma não suportado!"; } */

    /* fetch("https://api.mymemory.translated.net/get?q=" 
        + textarea.value 
        + "&langpair=pt-br|" 
        + language.value)
            .then(function (respostaAPI) {
                console.log(respostaAPI);
                return respostaAPI.json();
            })
            .then(function (respostaAPI) {
                console.log(respostaAPI);
    
                const traducao = respostaAPI.responseData.translatedText;
    
                resposta.textContent = traducao.replace(/<[^>]*>/g, "");
            })
            .catch(function (erro) {
                console.log(erro);
                resposta.textContent = "Erro na tradução!";
            }); */
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








