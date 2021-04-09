let ul = document.querySelector('#ul');
let carregando = document.querySelector('#carregando');
let nome = localStorage.getItem('nome');
let semMensagem = document.querySelector('#semMensagem');
let url = 'http://localhost:8282';

function buscarNome() {

    if(!nome) {
        nome = prompt('Seu nome');
        localStorage.setItem('nome', nome);
    }

}buscarNome();

async function buscarDados() {

    try {

        let dados = await fetch(`${url}/buscar`);

        dados = await dados.json();

        if(dados.length == 0) {

            temMensagem(false);
            carredando(true);

            return;

        }

        dados.forEach(dados => {
            criarLi(dados, true, true);
        });

    }catch(e) {
        alert(e);
    }

}buscarDados();

async function enviarDados(event) {

    try {

        event.preventDefault();

        let msg = document.querySelector('#msg').value;
        document.querySelector('#msg').value = '';

        let dados = await fetch(`${url}/save`, {
            method: 'POST',
            body: JSON.stringify({ nome, msg: msg }),
            headers: { 'Content-Type': 'application/json' }
        });

        dados = await dados.json();
        criarLi(dados, true, true);
        return;
        
    }catch(e) {
        alert(`${e}`);
    }

}

function criarLi(dados, Carredando, TemMensagem) {

    let li = document.createElement('li');
    li.innerHTML = `<strong> ${dados.nome}: </strong> ${dados.msg}`;
    ul.appendChild(li);

    carredando(Carredando);
    temMensagem(TemMensagem);

    return;

}

function carredando(element) {

    if(element) {
        carregando.style.display = 'none';
        return;
    }

    carregando.style.display = 'list-item';
    return;
}

function temMensagem(element) {

    if(element) {
        semMensagem.style.display = 'none';
        return;
    }

    semMensagem.style.display = 'list-item';
    return;

}