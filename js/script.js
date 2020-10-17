//pega os dois botões e define o de pause como desativado
var btn_play = document.querySelector('#btn-play');
var btn_stop = document.querySelector('#btn-stop');
document.getElementById('btn-stop').disabled = true;

//testa a disponibilidade da API no navegador
if( window.webkitSpeechRecognition ){
	console.log('compatível');

	//recebe API e inicia
	var API = window.webkitSpeechRecognition;
	var recognition = new API();

	//define lígua e reconhecimento contínuo de voz
	recognition.continuous = 'true';
	recognition.lang = 'pt-BR';
	
	//função que inicia o recebimento do áudio
	recognition.onstart = () => {
		console.log('botao start');
	};

	//função que finaliza o recebimento do áudio
	recognition.onend = () => {
		console.log('botao Stop');
	};


	//função que recebe o resultado do áudio (e o recebe como parâmetro)
	recognition.onresult = (e) => {

		//for que "desempacota" o resultado
		for (var i = e.resultIndex; i < e.results.length; i++) {
			var resultado = e.results[i][0].transcript;
			//passa os valores para a tela
			document.querySelector('.form-control').innerHTML = resultado;
		}

		//pega o main e muda a cor (caso haja uma no resultado)
		var main = document.getElementById('nevs');
		if (resultado == "azul" || resultado == "Azul")
			main.style.backgroundColor = "#13334c";
		if (resultado == "branco" || resultado == "Branco")
			main.style.backgroundColor = "#f6f5f3";
		if (resultado == "laranja" || resultado == "Laranja")
			main.style.backgroundColor = "#FF4C3B";
		if (resultado == "vermelho" || resultado == "Vermelho")
			main.style.backgroundColor = "#c12127";
		if (resultado == "amarelo" || resultado == "Amarelo")
			main.style.backgroundColor = "#FFE869";
		if (resultado == "preto" || resultado == "Preto")
			main.style.backgroundColor = "#000";
		if (resultado == "cinza" || resultado == "Cinza")
			main.style.backgroundColor = "#252A34";
		if (resultado == "verde" || resultado == "Verde")
			main.style.backgroundColor = "#037365";
	};

	//função que executa no clique do botão de início
	btn_play.addEventListener('click', () => {
			//chama função de início
			recognition.start();
			//altera a disponibilidade dos botões
			document.getElementById('btn-stop').disabled = false;
			document.getElementById('btn-play').disabled = true;
		},false);

	//função que executa no clique do botão de parada
	btn_stop.addEventListener('click', () => {
			//chama função de parada
			recognition.stop();
			//altera a disponibilidade dos botões
			document.getElementById('btn-play').disabled = false;
			document.getElementById('btn-stop').disabled = true;
		},false );



}else{ //caso não haja compatibilidade...
	console.log('não compatível');
}