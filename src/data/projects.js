// src/data/projects.js
// `badges` usa os ids de src/data/tech.js, então a cor vem da tecnologia.
// Se a imagem não existir, o card mostra um placeholder com a cor do primeiro badge.
// `repo` (opcional): link do repositório no GitHub. Com ele o card mostra o botão "GitHub";
// sem ele, mostra só a seta e o clique leva ao site (`url`).

import { GITHUB_URL } from "./contact";

export { GITHUB_URL };

export const projects = [
  {
    title: "Tuctuc",
    description:
      "Aplicativo mobile de caronas para estudantes, desenvolvido como projeto de TCC.",
    image: "/projects/tuctuc.webp",
    url: "",
    repo: "",
    badges: ["react-native", "expo", "socketio", "mysql"],
  },
  {
    title: "Decko Bot",
    description:
      "Chatbot de IA para TCG. Refatoramento e redesign completo da UI. Implementação de auth e integração com API python",
    image: "../../public/decko-chatbot.jpg",
    url: "https://tcg-chatbot-frontend.vercel.app/chat",
    repo: "",
    badges: ["react", "tailwind", "Freelance"],
  },
  {
    title: "API Amigo Secreto",
    description:
      "Sistema para realizar sorteios de amigo secreto com autenticação, usuários não retiram a si mesmos. Visualização individual dos resultados.",
    image: "/projects/project-03.webp",
    url: "#",
    repo: "https://github.com/derick-rufino/api-amigo-secreto",
    badges: ["node", "express", "jwt", "swagger", "api"],
  },
];

// Itens que "saem" da pasta. Troque pelos seus repositórios.
export const moreProjects = [
  { id: "github", title: "Meu GitHub", url: GITHUB_URL },
];
