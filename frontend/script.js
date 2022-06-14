function promocao() {
    var qtd = document.getElementById('qtd').value;
    var indiceTipo = document.getElementById('tipo').value;
    var pgto = document.getElementById('pgto').value;

    var tipo     = ['Alcatra', 'Filé Duplo', 'Picanha'];
    const vAbaixo5 = [45.9, 24.9, 56.9];
    const vAcima5  = [42.8, 23.8, 53.8];
    var resultado;

    console.log('TIPO DE CARNE:' + tipo[indiceTipo]);

    if(qtd < 5) {
        resultado = vAbaixo5[indiceTipo] * qtd;

    }
    else {
        resultado = vAcima5[indiceTipo] * qtd;
    }

    if(pgto == 1) {
        resultado *= 0.95*resultado; 
    }
    document.getElementById('saida').innerHTML = "VOCÊ COMPROU " + qtd + "Kg " + "DE " + tipo[indiceTipo] + " NO VALOR DE R$" + resultado ;
}