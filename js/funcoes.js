palavras = [
    {palavra: 'amor', dica: "Um sentimento"},
    {palavra: 'escola', dica: "Um lugar"},
    {palavra: 'cardiologista', dica: "Especialidade médica"},
    {palavra: 'respeito', dica: "Um sentimento"},
    {palavra: 'ventilador', dica: "Um objeto"},
];
embaralhar(palavras);
var palavraEscolhida;
var dica = document.getElementById("dica");
letras = [];
var pretas = 0;
var painelLetrasArriscadas = document.getElementById("painelLetrasArriscadas");
var contadorChances = 12;
var acumuladorChances = 0;
var chances = document.getElementById("chances");
chances.innerHTML = contadorChances + " restantes"

function criarInput(id, name){
    var divAdd = document.getElementById('add');
    var box = document.getElementById('box');
    var elemento = document.createElement('input');
    elemento.setAttribute('type', 'text');
    elemento.setAttribute('id', 'txt' + id);
    elemento.setAttribute('name', 'txt' + name);
    elemento.setAttribute('maxlength', '1');
    elemento.setAttribute('style', 'font-family: Tahoma; font-size: 20px; text-align: center; color: white');
    elemento.setAttribute('class', 'form-control');

    divAdd.addEventListener('click', function(){
    createInput();    
})     
    
    box.append(elemento);
    letras.push(elemento);
    var qtdeLetras = document.getElementById("qtdeLetras");
    qtdeLetras.innerText = "Qtde: " + letras.length + " letras";            
}

function embaralhar(array) {
    var indice_atual = array.length, valor_temporario, indice_aleatorio;
 
    while (0 !== indice_atual) {
 
        indice_aleatorio = Math.floor(Math.random() * indice_atual);
        indice_atual -= 1;
 
        valor_temporario = array[indice_atual];
        array[indice_atual] = array[indice_aleatorio];
        array[indice_aleatorio] = valor_temporario;
    } 
    return array;
}

function criarVariosInput(){
    for(var i=0; i < palavras.length; i++){
        palavraEscolhida = palavras[0].palavra;
        dica.innerHTML = "<strong>Dica: </strong>" + palavras[0].dica;        
    }

    for(var i=0; i < palavraEscolhida.length; i++){
        criarInput(i, i);
    }    
}

function verificarPalavra(){
    for(var i=0; i < palavraEscolhida.length; i++){
        letras[i].value = palavraEscolhida[i];
    }
    var letraDigitada = document.getElementById("letraDigitada").value;    
    var erro = 0;
    if(letraDigitada == ""){
        window.alert('Informe uma letra');
        erro = 1;
    }
    else{
        for(var i=0; i < letras.length; i++){
            if(letras[i].value == letraDigitada){
                letras[i].setAttribute('style', 'font-family: Tahoma; font-size: 20px; text-align: center; color: black');
                erro = 1;
            }     
        }
    }    
    
    if(erro == 0){
        acumuladorChances ++;
    }
    painelLetrasArriscadas.value += letraDigitada + "          ";    
    chances.innerHTML = contadorChances - acumuladorChances + " restantes"    
    document.getElementById("letraDigitada").value = "";
    verificarDerrota();
}

function confirmarAlteracaoPalavra(){
  if (confirm("Deseja mesmo alterar a palavra?")){
      window.location.reload();
  }
}

function verificarDerrota(){
    if((contadorChances - acumuladorChances) == 0){
        window.alert('Você perdeu!');
        painelLetrasArriscadas.value = "";
        window.location.reload();
    }
}