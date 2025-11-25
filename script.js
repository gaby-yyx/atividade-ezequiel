const board = document.getElementById('board')
const statusText = document.getElementById('status')
const contador = document.getElementById('contador')

let jogoAtivo = true
let jogadorAtual = 'X'
let celulas = Array(9).fill(null)
let contadorText = 0

function voltarJogo() {
    jogoAtivo = true
    jogadorAtual = 'X'
    celulas = Array(9).fill(null)
    statusText.textContent = `turno do jogador X`
    contador.textContent = `numero de jogadas: ${contador}`
    criar()
}

function criar() {
    board.innerHTML = ``
    celulas.forEach((celula, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.index = index;
        div.addEventListener('click', clickCelula)
        if (celula) {
            div.textContent = celula
            div.classList.add(celula)
            div.classList.add(celula.toLowerCase())
        }
        board.appendChild(div);
    });
}

function clickCelula(e) {

    const index = e.target.dataset.index
//    console.log(e)
//    console.log(index)
contadorText ++

    if (celulas[index] || !jogoAtivo) {
        return
    }

    celulas[index] = jogadorAtual
    criar()
    if (verificarVitoria()) {
        statusText.textContent = `O jogador ${jogadorAtual} venceu!`
        jogoAtivo = false
    } else if (!celulas.includes(null)) {
        // empate
        jogoAtivo = false
        statusText.textContent = `O jogo empatou!`
    } else {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
        statusText.textContent = `turno do jogador ${jogadorAtual}`
        contador.textContent = `numero de jogadas: ${contadorText}`
    }
}

function verificarVitoria() {
    const combinacoes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [2, 5, 8],
        [0, 3, 6],
        [1, 4, 7],

        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < combinacoes.length; i++) {
        const [a, b, c] = combinacoes[i]
        const valorA = celulas[a]
        const valorB = celulas[b]
        const valorC = celulas[c]
        if (valorA && valorA === valorB && valorA === valorC) {
            console.log('Vitoria!')
            return true
        }
       

    }
    return false
}
voltarJogo()