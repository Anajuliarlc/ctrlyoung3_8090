import { useState } from "react";
import "./App.css";

function App() {
  const [tabuleirosPequenos, setTabuleirosPequenos] = useState(
    Array(9).fill(null).map(() => Array(9).fill(null))
  );

  const [tabuleiroPrincipal, setTabuleiroPrincipal] = useState(
    Array(9).fill(null)
  );

  const [jogadorAtual, setJogadorAtual] = useState("X");
  const [vencedorFinal, setVencedorFinal] = useState(null);

  const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function verificarVencedor(tabuleiro) {
    for (let combinacao of combinacoes) {
      const [a, b, c] = combinacao;

      if (
        tabuleiro[a] &&
        tabuleiro[a] === tabuleiro[b] &&
        tabuleiro[a] === tabuleiro[c]
      ) {
        return tabuleiro[a];
      }
    }
    return null;
  }

  function jogar(indiceTabuleiro, indiceCasa) {
    if (vencedorFinal) return;

    // se esse tabuleiro pequeno já foi ganho
    if (tabuleiroPrincipal[indiceTabuleiro]) return;

    // se a casa já está preenchida
    if (tabuleirosPequenos[indiceTabuleiro][indiceCasa]) return;

    const novosTabuleiros = tabuleirosPequenos.map((tab) => [...tab]);

    novosTabuleiros[indiceTabuleiro][indiceCasa] = jogadorAtual;

    setTabuleirosPequenos(novosTabuleiros);

    // verifica vitória no tabuleiro pequeno
    const vencedorPequeno = verificarVencedor(
      novosTabuleiros[indiceTabuleiro]
    );

    if (vencedorPequeno) {
      const novoPrincipal = [...tabuleiroPrincipal];
      novoPrincipal[indiceTabuleiro] = vencedorPequeno;

      setTabuleiroPrincipal(novoPrincipal);

      // verifica vitória no tabuleiro principal
      const vencedorJogo = verificarVencedor(novoPrincipal);

      if (vencedorJogo) {
        setVencedorFinal(vencedorJogo);
        return;
      }
    }

    // troca jogador
    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  }

  function reiniciarJogo() {
    setTabuleirosPequenos(
      Array(9).fill(null).map(() => Array(9).fill(null))
    );
    setTabuleiroPrincipal(Array(9).fill(null));
    setJogadorAtual("X");
    setVencedorFinal(null);
  }

  return (
    <div className="container">
      <h1>Jogo da Velha Supremo</h1>

      {vencedorFinal ? (
        <h2>🏆 Vencedor: {vencedorFinal}</h2>
      ) : (
        <p>Vez do jogador: {jogadorAtual}</p>
      )}

      <div className="tabuleiro-principal">
        {tabuleirosPequenos.map((tabuleiroPequeno, i) => (
          <div key={i} className="tabuleiro-pequeno">
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

      <button className="reiniciar" onClick={reiniciarJogo}>
        Reiniciar
      </button>
    </div>
  );
}

export default App;