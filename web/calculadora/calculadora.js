var botones = document.querySelectorAll('div.otro , div.numero, div.cero, div.operador');
var operadores = ['%', '÷', 'x', '+', '-', '='];

function strcmp( s1, s2){
    var result =1;

    for(var i =0; i< s1.length; i++){
        if(s1[i]!=s2[i]){
            result =0;
        }
    }
    return result;
}


for(var i =0; i< botones.length; i++){

    botones[i].onclick = function(e){

        var entrada = document.querySelector('div.display');
        var valEntrada = entrada.innerHTML;
        var valBoton = this.innerHTML;

        if(strcmp("AC", valBoton )==1){
            entrada.innerHTML = '';
        }else if(strcmp("+/-", valBoton)){
            if(valEntrada[0]!='-'){
                entrada.innerHTML = "-" + valEntrada;
            }else{
                entrada.innerHTML= valEntrada.replace('-','');
            }
        }else if(valBoton == '%'){
            entrada.innerHTML= (parseFloat(valEntrada,10)/100);
        }else if(valBoton == ','){
            entrada.innerHTML = (valEntrada+ '.');
        }else if(valBoton == '='){

            var ecuacion = valEntrada;
            var caractFin = valEntrada[valEntrada.length-1];
            var resultado;

            ecuacion = ecuacion.replace('x','*').replace('÷','/');

            if(operadores.indexOf(caractFin)>-1 || caractFin==','){
                ecuacion = ecuacion.replace(/.$/,'');
            }
            

            if(ecuacion){
                try{
                    resultado = eval(ecuacion);
                    if(resultado.toString().indexOf('.')!=-1){
                        resultado = resultado.toFixed(10);
                    }
                    entrada.innerHTML = resultado;
                }catch(error){
                    entrada.innerHTML = "Error";
                }
            }

        }else{
            entrada.innerHTML = valEntrada + valBoton
        }

        








    }


}