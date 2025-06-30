import './style.css'

// Imports de elementos do DOM
const celulas = document.querySelectorAll('.celula')!;
const resetar = document.querySelector<HTMLInputElement>('.resetar')!;
// Adiciona o evento de clique no botão de resetar
resetar.addEventListener('click', () => {
    // Reseta o jogo, removendo as classes das células
    for (let i = 0; i < celulas.length; i++) {
        celulas[i].classList.remove('celula-azul', 'celula-vermelha', 'jogoFinalizado');
    }
    // Reseta o tabuleiro e o jogador
    tabuleiro = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    jogador = "Azul";
    venceu = false;
    atualizarJogadorAtual(jogador);
})
const jogadorAtual = document.querySelector('.jogador-atual')!;
const overlay = document.querySelector('.overlay')!;
const textoMensagem = document.querySelector('.texto-mensagem')!;
const botaoFechar = document.querySelector('.botao-fechar')!;

let venceu: boolean = false;

let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


//Funções necessarias

function atualizarJogadorAtual(jogador: string) {
    // Atualiza o texto do jogador atual
    jogadorAtual.innerHTML = `<span class="${jogador === 'Azul' ? 'jogador-azul' : 'jogador-vermelho'}">${jogador}</span>`;
}

function exibirOverlay(mensagem: string) {
    textoMensagem.innerHTML = mensagem;
    (overlay as HTMLElement).style.visibility = 'visible';
    botaoFechar.addEventListener('click', () => {
        (overlay as HTMLElement).style.visibility = 'hidden';
    });
}

function verificarDiagonais(tabuleiro: string[][], jogador: string) {
    if (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] && tabuleiro[0][0] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    if (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] && tabuleiro[0][2] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    return null;
}
function verificarLinhas(tabuleiro: string[][], jogador: string) {
    if (tabuleiro[0][0] === tabuleiro[0][1] && tabuleiro[0][1] === tabuleiro[0][2] && tabuleiro[0][0] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    if (tabuleiro[1][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[1][2] && tabuleiro[1][0] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    if (tabuleiro[2][0] === tabuleiro[2][1] && tabuleiro[2][1] === tabuleiro[2][2] && tabuleiro[2][0] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    return null;
}
function verificarColunas(tabuleiro: string[][], jogador: string) {
    if (tabuleiro[0][0] === tabuleiro[1][0] && tabuleiro[1][0] === tabuleiro[2][0] && tabuleiro[0][0] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    if (tabuleiro[0][1] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][1] && tabuleiro[0][1] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    if (tabuleiro[0][2] === tabuleiro[1][2] && tabuleiro[1][2] === tabuleiro[2][2] && tabuleiro[0][2] !== '') {
        venceu = true;
        return console.log(`Jogador(a) ${jogador} venceu!`);
    }
    return null;
}

// Lógica do jogo
let jogador = "Azul";
atualizarJogadorAtual(jogador);
// Adiciona o evento de clique em cada célula
celulas.forEach((celula, indice) => {
    celula.addEventListener('click', () => {

        const linha = Math.floor(indice / 3);
        const coluna = indice % 3;

        console.log(`Clicou em ${linha},${coluna}`)

        //Verificar se a celula clicada já está preenchida
        if (tabuleiro[linha][coluna] !== '') {
            // Se estiver preenchida, exibe mensagem de erro e retorna
            exibirOverlay('Selecione uma célula vazia!');
            return;
        } else {
            // Se estiver vazia, faz a jogada
            tabuleiro[linha][coluna] = jogador;
            if (jogador === 'Azul') {
                celula.classList.add('celula-azul')
            } else {
                celula.classList.add('celula-vermelha')
            }
        }
        // Verifica se o jogador venceu
        verificarColunas(tabuleiro, jogador);
        verificarLinhas(tabuleiro, jogador);
        verificarDiagonais(tabuleiro, jogador);
        // Se venceu, exibe mensagem de vitória e desabilita o jogo
        if (venceu) {
            const classe = jogador === 'Azul' ? 'jogador-azul' : 'jogador-vermelho';
            // Se houve um vencedor, exibe mensagem de fim de jogo estilizado pela cor do jogador
            exibirOverlay(`Fim de jogo! Jogador(a) <span class="${classe}">${jogador}</span> venceu!`);
            // Adiciona a classe 'jogoFinalizado' a todas as células para desabilitar o jogo
            for (let i = 0; i < celulas.length; i++) {
                celulas[i].classList.add('jogoFinalizado');
            }
            return;
        }
        // Verifica se houve empate
        for (let i = 0; i < celulas.length; i++) {
            // Se encontrar uma célula preenchida com azul ou vermelho, continua verificando
            // Se chegar na última célula e não encontrar nenhuma célula vazia, é empate
            if (celulas[i].classList.contains('celula-azul') || celulas[i].classList.contains('celula-vermelha')) {
                if (i === celulas.length - 1) {
                    console.log('Empate!');
                    exibirOverlay('Empate! Ninguém venceu!');
                    // Adiciona a classe 'jogoFinalizado' a todas as células para desabilitar o jogo
                    for (let j = 0; j < celulas.length; j++) {
                        celulas[j].classList.add('jogoFinalizado');
                    }
                }
            } else {
                // Se encontrar uma célula vazia, alterna o jogador e sai do loop
                
                jogador = jogador === 'Azul' ? 'Vermelho' : 'Azul';
                atualizarJogadorAtual(jogador);
                return
            }
        }
        
    })
})