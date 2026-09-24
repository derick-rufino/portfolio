// src/data/tech.js
// Fonte única das tecnologias: nome, cor da marca, ícone e link.
// A stack e as badges dos projetos leem daqui, então a cor é sempre a mesma.

const dev = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export const TECH = {
  // Linguagens
  html: {
    name: "HTML",
    color: "#E34F26",
    icon: dev("html5"),
    url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
    role: "Estrutura das páginas",
  },
  css: {
    name: "CSS",
    color: "#1572B6",
    icon: dev("css3"),
    url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
    role: "Estilo e layout",
  },
  javascript: {
    name: "JavaScript",
    color: "#F7DF1E",
    icon: dev("javascript"),
    url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    role: "Linguagem principal",
  },
  c: {
    name: "C",
    color: "#659AD2",
    icon: dev("c"),
    url: "https://en.cppreference.com/w/c",
    role: "Lógica e fundamentos",
  },

  // Frameworks, bibliotecas e runtime
  react: {
    name: "React",
    color: "#61DAFB",
    icon: dev("react"),
    url: "https://react.dev",
    role: "Interfaces web",
  },
  "react-native": {
    name: "React Native",
    color: "#61DAFB",
    icon: dev("react"),
    url: "https://reactnative.dev",
    role: "Apps mobile",
  },
  expo: {
    name: "Expo",
    color: "#E5E7EB",
    icon: dev("expo"),
    iconClass: "invert", // ícone escuro: inverte pra aparecer no fundo escuro
    url: "https://expo.dev",
    role: "Ferramentas para React Native",
  },
  tailwind: {
    name: "Tailwind CSS",
    color: "#38BDF8",
    icon: dev("tailwindcss"),
    url: "https://tailwindcss.com",
    role: "Estilização utilitária",
  },
  node: {
    name: "Node.js",
    color: "#5FA04E",
    icon: dev("nodejs"),
    url: "https://nodejs.org",
    role: "JavaScript no servidor",
  },
  socketio: {
    name: "Socket.io",
    color: "#E5E7EB",
    icon: dev("socketio"),
    iconClass: "invert",
    url: "https://socket.io",
    role: "Tempo real com WebSocket",
  },

  // Bancos de dados
  mysql: {
    name: "MySQL",
    color: "#4479A1",
    icon: dev("mysql"),
    iconClass: "brightness-150", // azul escuro: clareia um pouco
    url: "https://www.mysql.com",
    role: "Banco relacional",
  },
  sqlserver: {
    name: "SQL Server",
    color: "#CC2927",
    icon: dev("microsoftsqlserver", "plain"),
    url: "https://www.microsoft.com/pt-br/sql-server",
    role: "Banco relacional",
  },

  // Ferramentas
  figma: {
    name: "Figma",
    color: "#A259FF",
    icon: dev("figma"),
    url: "https://figma.com",
    role: "Design de interfaces",
  },
  git: {
    name: "Git",
    color: "#F05032",
    icon: dev("git"),
    url: "https://git-scm.com",
    role: "Versionamento",
  },
  github: {
    name: "GitHub",
    color: "#E5E7EB",
    icon: dev("github"),
    iconClass: "invert",
    url: "https://github.com",
    role: "Repositórios e colaboração",
  },
  vite: {
    name: "Vite",
    color: "#646CFF",
    icon: dev("vitejs"),
    url: "https://vite.dev",
    role: "Build e servidor de desenvolvimento",
  },
  webstorm: {
    name: "WebStorm",
    color: "#07C3F2",
    icon: dev("webstorm"),
    url: "https://www.jetbrains.com/webstorm/",
    role: "IDE para JavaScript",
  },
  claudecode: {
    name: "Claude Code",
    color: "#D97757",
    icon: "https://cdn.simpleicons.org/claude/D97757", // devicon não tem o Claude
    url: "https://claude.com/product/claude-code",
    role: "Programação com IA no terminal",
  },

  // Só para badges de projeto (sem ícone nem link)
  uiux: { name: "UI/UX", color: "#F472B6" },
  api: { name: "API", color: "#34D399" },
};

// Grupos exibidos na seção Stack, na ordem em que aparecem.
export const STACK_GROUPS = [
  {
    id: "linguagens",
    title: "Linguagens",
    description: "A base de tudo que eu construo.",
    items: ["html", "css", "javascript", "c"],
  },
  {
    id: "frameworks",
    title: "Frameworks e bibliotecas",
    description: "Web, mobile e o servidor por trás.",
    items: ["react", "react-native", "expo", "tailwind", "node", "socketio"],
  },
  {
    id: "dados",
    title: "Bancos de dados",
    description: "Onde a informação mora.",
    items: ["mysql", "sqlserver"],
  },
  {
    id: "ferramentas",
    title: "Ferramentas",
    description: "Do protótipo ao deploy.",
    items: ["figma", "git", "github", "vite", "webstorm", "claudecode"],
  },
];
