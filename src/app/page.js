"use client";
import Image from "next/image";
import { useState } from "react";
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
    "Me atrai a ideia de acompanhar obras e resolver problemas no canteiro.",
    "Gosto de entender como são construídos prédios, pontes e estradas.",
    "Me interesso por projetos de obras e planejamento de construções.",
    "Fico empolgado com projetos que envolvem cálculo estrutural e resistência dos materiais.",
    "Tenho curiosidade sobre materiais como concreto, aço e asfalto.",
  ],
  C3: [
    "Me interesso por sistemas automáticos que controlam máquinas e processos industriais.",
    "Me atrai a ideia de trabalhar com sensores, atuadores e sistemas de controle em tempo real.",
    "Gosto de entender como funcionam os sistemas de robótica e automação em fábricas.",
    "Tenho curiosidade sobre como programar e controlar dispositivos eletrônicos e mecânicos.",
    "Fico empolgado com a ideia de criar soluções para melhorar a eficiência de processos automatizados.",
  ],
  C4: [
    "Me interesso por logística, cadeia de suprimentos e controle de qualidade na produção.",
    "Fico empolgado com a ideia de implementar soluções que reduzam custos e aumentem a produtividade.",
    "Me atrai a ideia de melhorar a gestão de recursos, como tempo, materiais e pessoas.",
    "Tenho interesse em planejar e organizar a produção de bens e serviços.",
    "Gosto de entender como otimizar processos e aumentar a eficiência de fábricas e indústrias.",
  ],
  C5: [
    "Tenho interesse por tecnologias que envolvem eletrônica e sistemas de comunicação.",
    "Me atrai a ideia de trabalhar com instalações elétricas e soluções para geração de energia.",
    "Fico empolgado com projetos que envolvem automação e controle de processos elétricos.",
    "Gosto de entender como funcionam circuitos elétricos e sistemas de energia.",
    "Me interesso por inovação em sistemas de eletricidade, como energias renováveis e redes inteligentes.",
  ],
  C6: [
    "Me interesso por cálculos e simulações de sistemas mecânicos e termodinâmicos.",
    "Gosto de entender como funcionam máquinas e dispositivos mecânicos.",
    "Tenho curiosidade sobre o funcionamento de motores, turbinas e mecanismos de movimentação.",
    "Me atrai a ideia de trabalhar com a análise e otimização de processos mecânicos e térmicos.",
    "Fico empolgado com a ideia de projetar e melhorar equipamentos para indústrias e veículos.",
  ],
  C7: [
    "Fico empolgado com a combinação de engenharia mecânica e eletrônica para criar soluções inovadoras.",
    "Me atrai a ideia de trabalhar com sistemas mecatrônicos para melhorar a automação industrial.",
    "Tenho interesse em projetar e controlar robôs e dispositivos automatizados.",
    "Me interesso por tecnologias que envolvem sensores, atuadores e controle em sistemas automatizados.",
    "Gosto de entender como integrar mecânica, eletrônica e computação em sistemas inteligentes.",
  ],
  C8: [
    "Gosto de entender como as coisas são feitas, desde o shampoo até os combustíveis.",
    "Tenho curiosidade sobre como a química é usada na indústria para transformar materiais.",
    "Fico empolgado em desenvolver ou melhorar processos químicos na indústria.",
    "Tenho interesse em entender como funcionam as indústrias de alimentos, combustíveis e medicamentos.",
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


const contagemCursos = {};

const perguntasComTexto = perguntasBase.map((pergunta) => {
  const opcoesComTexto = pergunta.opcoes.map((curso) => {
    contagemCursos[curso] = (contagemCursos[curso] || 0) + 1;
    let texto = textosCursos[curso][contagemCursos[curso] - 1];
    return { texto, curso };
  });
  return { opcoes: opcoesComTexto };
});

function embaralhar(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const perguntas = perguntasComTexto.map((pergunta) => ({
  ...pergunta,
  opcoes: embaralhar(pergunta.opcoes),
}));

export default function TesteVocacional() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [inicio, setInicio] = useState(true);

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
    setInicio(true);
  }

  function iniciarTeste() {
    setInicio(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          {inicio ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Match da Engenharia ❤️
              </h2>
              <p className="mb-6 text-lg">
                Descubra aqui qual curso mais combina com você!
              </p>
              <Button
                onClick={iniciarTeste}
                className="text-lg p-6 bg-[#01446E] text-white"
              >
                Iniciar Teste
              </Button>
            </div>
          ) : etapa < perguntas.length ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Pergunta {etapa + 1} de {perguntas.length}
              </h2>
              <div className="flex flex-col gap-4">
                {perguntas[etapa].opcoes.map((opcao, index) => (
                  <Button
                    key={index}
                    onClick={() => selecionarCurso(opcao.curso)}
                    className="w-full text-left text-lg p-12 bg-[#01446E] text-white"
                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  >
                    {opcao.texto}
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
              {rankingCursos.map(([codigo, _], index) => (
                <p key={codigo} className="text-xl font-semibold mb-2">
                  {index + 1}. {nomesCursos[codigo]}
                </p>
              ))}
              <Button
                onClick={reiniciar}
                className="text-lg p-6 bg-[#01446E] text-white mt-6"
              >
                Refazer teste
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

