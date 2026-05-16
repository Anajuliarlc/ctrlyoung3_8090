import { useState } from "react";
import "./App.css";

function App() {
  const[tabuleiroPequenos, setTabuleiroPequenos] = useState([
    Array(9).fill(null).map(() => Array(9).fill(null))
  ]);

  const[tabuleiroPrincipal, setTabuleiroPrincipal] = useState([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);

  const [jogadorAtual, setJogadorAtual] = useState("X");
  const [vencedorFinal, setVencedorFinal] = useState(null);
  const [empateFinal, setEmpateFinal] = useState(false);

  const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function verificarVencedor(tabuleiro){
    for (let combinacao of combinacoesVitoria){
      const [a, b, c] = combinacao;

      if (
        tabuleiro[a] &&
        tabuleiro[a] === tabuleiro[b] &&
        tabuleiro[a] === tabuleiro[c])
        {
          return tabuleiro[a];
        }
    }
    return null;
  }

  function jogar(indiceTabuleiro, indiceCasa){
    if (vencedorFinal) return;

    // se esse tabuleiro pequeno já foi ganho
    if (tabuleiroPrincipal[indiceTabuleiro]) return;

    // se a casa já está preenchida
    if (tabuleiroPequenos[indiceTabuleiro][indiceCasa]) return; 

    const novosTabuleiros = tabuleiroPequenos.map((tab) => [...tab]);

    novosTabuleiros[indiceTabuleiro][indiceCasa] = jogadorAtual;

    setTabuleiroPequenos(novosTabuleiros);

    //verifica vitoria no tab pequeno
    const vencedorPequeno = verificarVencedor(
      novosTabuleiros[indiceTabuleiro]
    );

    if (vencedorPequeno){
      const novoPrincipal = [...tabuleiroPrincipal];
      novoPrincipal[indiceTabuleiro] = vencedorPequeno;

      setTabuleiroPrincipal(novoPrincipal);

      //verifica vitoria no tabuleiro principal
      const vencedorJogo = verificarVencedor(novoPrincipal);

      if (vencedorJogo){
        setVencedorFinal(vencedorJogo);
        return;
      }
    }

    let novoPrincipal = [...tabuleiroPrincipal];

    // empate no tabuleiro pequeno
    if (!novosTabuleiros[indiceTabuleiro].includes(null) && !vencedorPequeno) {
      novoPrincipal[indiceTabuleiro] = "E";
    }

    // vitória no tabuleiro pequeno
    if (vencedorPequeno) {
      novoPrincipal[indiceTabuleiro] = vencedorPequeno;
    }

    setTabuleiroPrincipal(novoPrincipal);

    // verifica vitória geral
    const vencedorJogo = verificarVencedor(novoPrincipal);

    if (vencedorJogo) {
      setVencedorFinal(vencedorJogo);
      return;
    }

    // verifica empate geral
    const cheio = novoPrincipal.every(casa => casa !== null);

    if (cheio) {
      setEmpateFinal(true);
      return;
    }

    if (jogadorAtual === "X"){
      setJogadorAtual("O");
    } else{
      setJogadorAtual("X");
    }
  }

  function reiniciarJogo(){
    setTabuleiroPequenos(
      Array(9).fill(null).map(() => Array(9).fill(null))
    );
    setTabuleiroPrincipal(Array(9).fill(null));
    setJogadorAtual("X");
    setVencedorFinal(null);
    setEmpateFinal(false);
  }

  return (
    <div className = "container">
      <h1>Jogo da Velha 2.0</h1>

       {vencedorFinal ? (
        <h2>🏆 Vencedor: {vencedorFinal}</h2>
        ) : empateFinal ? (
          <h2>Deu velha!</h2>
        ) : (
          <p>Vez do jogador: {jogadorAtual}</p>
        )}

      <div className="tabuleiro-principal">
        {tabuleiroPequenos.map((tabuleiroPequeno, i) => (
          <div key = {i} className="tabuleiro-pequeno">
            {tabuleiroPrincipal[i] ? (
              <div className="vencedor-pequeno">
                {tabuleiroPrincipal[i]}
              </div>
            ) : (
              tabuleiroPequeno.map((valor, j) => (
                <button
                  key={j}
                  className="casa-pequena"
                  onClick={() => jogar(i, j)}
                >
                  {valor}
                </button>
              ))
            )}
          </div>
        ))}
      </div>
      <button onClick={reiniciarJogo}>
        Reiniciar
      </button>
    </div>
  );
}

export default App;
