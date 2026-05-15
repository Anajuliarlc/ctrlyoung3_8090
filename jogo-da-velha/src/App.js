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
  //const [empate, setEmpate] = useState(false);

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

    if (jogadorAtual === "X"){
      setJogadorAtual("O");
    } else{
      setJogadorAtual("X");
    }
  }

  function reiniciarJogo(){
    setTabuleiro([
      null, null, null,
      null, null, null,
      null, null, null
    ])

    setJogadorAtual("X");
    setVencedor(null);
    setEmpate(false);
  }

  return (
    <div>
      <h1>Jogo da Velha</h1>

      {vencedor && <h2>Vencedor: {vencedor}</h2>}
      {empate && <h2>Deu velha</h2>}

      <p> Vez do Jogador: {jogadorAtual}</p>
      <div className="tabuleiro">
        {tabuleiro.map((valor, indice) => (
          <button key={indice} className="casa" onClick={()=> jogar(indice)}>
            {valor}     
          </button>        
        ))}
      </div>
      <button onClick={reiniciarJogo}>
        Reiniciar
      </button>
    </div>
  );
}

export default App;
