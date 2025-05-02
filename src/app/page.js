"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/Card.jsx";
import { Button } from "./components/ui/Button";

const nomesCursos = {
  C1: "Engenharia Aeronáutica",
  C2: "Engenharia Civil",
  C3: "Engenharia de Controle e Automação",
  C4: "Engenharia de Produção",
  C5: "Engenharia Elétrica",
  C6: "Engenharia Mecânica",
  C7: "Engenharia Mecatrônica",
  C8: "Engenharia Química",
};

const textosCursos = {
  C1: [
    "Gosto de aprender sobre motores, turbinas e sistemas de uma aeronave.",
    "Me interesso por normas e procedimentos de segurança no setor de aviação.",
    "Tenho interesse em entender como funcionam aviões e helicópteros.",
    "Me atrai a ideia de trabalhar com a manutenção e inspeção de aeronaves.",
    "Fico empolgado com projetos e tecnologias voltadas para o setor aéreo.",
  ],
  C2: [
    "Gosto da ideia de participar de obras que transformam cidades, como edifícios, pontes e estradas.",
    "Tenho interesse em entender como funcionam os sistemas que levam água até as casas, e os que cuidam do esgoto e do lixo.",
    "Acho interessante planejar formas de organizar o trânsito, melhorar ruas e pensar em soluções para o transporte urbano.",
    "Me chama atenção como o solo influencia nas construções e como lidar com isso para garantir segurança e evitar desmoronamentos.",
    "Tenho curiosidade para saber como garantir que uma construção seja segura e dure por muitos anos, sem cair.",
  ],
  C3: [
    "Me interesso por sistemas automáticos para o controle de iluminação, climatização e segurança em edifícios.",
    "Me atrai a ideia de trabalhar com a criação de programas para colocar em funcionamento veículos autônomos (sem motorista).",
    "Gosto de entender como funcionam os sistemas de robótica e como programar robôs para automação em fábricas.",
    "Tenho curiosidade sobre como programar e controlar dispositivos eletrônicos e mecânicos.",
    "Fico empolgado com a ideia de criar soluções para melhorar a eficiência de processos automatizados.",
  ],
  C4: [
    "Tenho interesse por processos e produtividade – adoro pensar em como melhorar o funcionamento das coisas!",
    "Fico empolgado por dados e gráficos – curto tomar decisões com base em números.",
    "Me chama a atenção tudo que envolve projetos, metas e prazos – planejamento é comigo mesmo!",
    "Tenho interesse por pessoas e como elas trabalham – gosto de entender e melhorar o ambiente de trabalho.",
    "Fico empolgado com a ideia de empreender e inovar – quero criar soluções que impactem o mercado e o mundo.",
  ],
  C5: [
    "Tenho interesse por tecnologias que envolvem eletricidade, eletrônica e sistemas computacionais.",
    "Me atrai a ideia de trabalhar com instalações elétricas e soluções para geração de energia.",
    "Fico empolgado com projetos que envolvem automação e controle de sistemas elétricos.",
    "Gosto de entender como funcionam circuitos elétricos e sistemas de energia elétrica.",
    "Me interesso por inovação, como energias renováveis (eólica e solar) e redes inteligentes.",
  ],
  C6: [
    "Gosto de desmontar e montar objetos como brinquedos, ventiladores ou eletrodomésticos, para entender como funcionam.",
    "Me interesso por coisas como carros, bicicletas, motores ou qualquer tipo de máquina.",
    "Tenho facilidade com matemática e física e gosto de usar isso para resolver problemas práticos.",
    "Gosto da ideia de criar ou melhorar objetos como ferramentas, máquinas ou sistemas.",
    "Me imagino trabalhando em equipe para resolver desafios usando tecnologia e criatividade.",
  ],
  C7: [
    "Adoro usar tecnologia e inovação para criar robôs e sistemas que facilitam a nossa vida.",
    "Tenho interesse em programar e desenvolver inteligência artificial para fazer máquinas aprenderem sozinhas.",
    "Gosto de trabalhar com robôs móveis e sistemas automatizados que podem se mover e tomar decisões por conta própria.",
    "Quero aprender a combinar eletrônica, software e mecânica para criar soluções inteligentes e modernas.",
    "Me fascina pensar em máquinas que usam sensores, inteligência artificial e automação para funcionar de forma inteligente.",
  ],
  C8: [
    "Me atrai a ideia de melhorar processos complexos para torná-los mais rápidos, seguros e eficientes em indústrias de todos os tipos.",
    "Quero encontrar soluções para reduzir impactos ambientais, tratando resíduos, reaproveitando energia e protegendo recursos naturais.",
    "Gosto da ideia de trabalhar em laboratório e desenvolver novas tecnologias que possam transformar o futuro.",
    "Gosto da ideia de transformar matérias-primas em produtos que mudam o mundo, como medicamentos, cosméticos, combustíveis e alimentos.",
    "Me empolga a ideia de melhorar a eficiência de processos químicos, tornando-os mais sustentáveis.",
  ],
};

const perguntasBase = [
  { opcoes: ["C1", "C2", "C3", "C4"] },
  { opcoes: ["C5", "C6", "C7", "C8"] },
  { opcoes: ["C1", "C2", "C5", "C6"] },
  { opcoes: ["C3", "C4", "C7", "C8"] },
  { opcoes: ["C1", "C3", "C5", "C7"] },
  { opcoes: ["C2", "C4", "C6", "C8"] },
  { opcoes: ["C1", "C4", "C6", "C7"] },
  { opcoes: ["C2", "C3", "C5", "C8"] },
  { opcoes: ["C1", "C2", "C7", "C8"] },
  { opcoes: ["C3", "C4", "C5", "C6"] },
];

function embaralhar(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function TesteVocacional() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    const perguntasComTexto = perguntasBase.map((pergunta) => {
      const contagemCursos = {};
      const opcoesComTexto = pergunta.opcoes.map((curso) => {
        contagemCursos[curso] = (contagemCursos[curso] || 0) + 1;
        const index = contagemCursos[curso] - 1;
        return { texto: textosCursos[curso][index], curso };
      });

      return {
        ...pergunta,
        opcoes: embaralhar(opcoesComTexto),
      };
    });

    setPerguntas(perguntasComTexto);
  }, []);

  if (!perguntas.length) {
    return null;
  }

  const cursos = {};
  respostas.forEach((r) => {
    cursos[r] = (cursos[r] || 0) + 1;
  });

  const rankingCursos = Object.entries(cursos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  function selecionarCurso(curso) {
    setRespostas([...respostas, curso]);
    setEtapa(etapa + 1);
  }

  function reiniciar() {
    setEtapa(0);
    setRespostas([]);
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Match da Engenharia ❤️
          </h2>

          {etapa < perguntas.length ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Pergunta {etapa + 1} de {perguntas.length}
              </h3>
              <div className="space-y-4">
                {perguntas[etapa]?.opcoes.map(({ texto, curso }, idx) => (
                  <Button
                    key={idx}
                    onClick={() => selecionarCurso(curso)}
                    className="w-full"
                  >
                    {texto}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Resultado</h2>
              <p className="mb-4 text-lg">
                Aqui estão os três cursos com que você tem mais afinidade!
              </p>
              <ol className="list-decimal list-inside font-bold">
                {rankingCursos.map(([codigo]) => (
                  <li key={codigo} className="text-xl font-semibold mb-2">
                    {nomesCursos[codigo]}
                  </li>
                ))}
              </ol>
              <Button onClick={reiniciar} className="mt-6">
                Refazer Teste
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
