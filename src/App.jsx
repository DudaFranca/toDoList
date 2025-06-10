import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]); // um array com as tarefas
  const [novaTarefa, setNovaTarefa] = useState(''); // texto que o usuário está digitando no input
  const primeiraRenderizacao = useRef(true);

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('minhasTarefas');
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    // .trim() remove espaços do começo e do fim.
    if (novaTarefa.trim() === '') {
      return;
    }

    const novaLista = [...tarefas, { texto: novaTarefa, concluida: false }];
    setTarefas(novaLista);
    setNovaTarefa('');
  };

  const removerTarefa = (indexParaRemover) => {
    const novaLista = tarefas.filter((_, index) => index !== indexParaRemover);
    setTarefas(novaLista);
  };

  const alternarConclusao = (index) => {
    const novaLista = [...tarefas];
    novaLista[index].concluida = !novaLista[index].concluida;
    console.log(novaLista);
    setTarefas(novaLista);
  };

  return (
    <div className="container">
      <h1>📝 Minha Lista de Tarefas</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li
            key={index}
            className={`tarefa ${tarefa.concluida ? 'concluida' : ''}`}
            onClick={() => alternarConclusao(index)}
          >
            {tarefa.texto}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita conflito com clique no texto
                removerTarefa(index);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
