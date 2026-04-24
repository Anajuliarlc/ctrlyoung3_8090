import { useState } from "react";
import "./App.css";

function App() {
  const[tabuleiro, setTabuleiro] = useState([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);

  const [jogadorAtual, setJogadorAtual] = useState("X");
  const [vencedor, setVencedor] = useState(null);
  const [empate, setEmpate] = useState(false);

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

  function verificarVencedor(tabuleiroAtual){
    for (let combinacao of combinacoesVitoria){
      const [a, b, c] = combinacao;

      if (
        tabuleiroAtual[a] &&
        tabuleiroAtual[a] === tabuleiroAtual[b] &&
        tabuleiroAtual[a] === tabuleiroAtual[c])
        {
          return tabuleiroAtual[a];
        }
    }
    return null;
  }

  function jogar(indice){
    if (tabuleiro[indice] !== null || vencedor !== null){
      return;
    }

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = jogadorAtual;

    setTabuleiro(novoTabuleiro);

    const resultado = verificarVencedor(novoTabuleiro)

    if (resultado !== null) {
      setVencedor(resultado);
      return;
    }

    if (!novoTabuleiro.includes(null)) {
      setEmpate(true);
      return;
    }

    if (jogadorAtual === "X"){
      setJogadorAtual("O");
    } else{
      setJogadorAtual("X");
    }
  }

  return (
    <div>
      <h1>Jogo da Velha</h1>

      {vencedor && <h2>Vencedor: {vencedor}</h2>}
      {empate && <h2>Deu velha</h2>}

      <p> Vez do Jogador: {jogadorAtual}</p>
      <div className="tabuleiro">
        {tabuleiro.map((valor, indice) => (
          <button key={indice} onClick={()=> jogar(indice)}>
            {valor}     
          </button>        
        ))}
      </div>
    </div>
  );
}

export default App;
