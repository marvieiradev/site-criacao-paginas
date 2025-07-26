# Meu Doce - Landing Page

Uma landing page moderna e responsiva para doceria, com sistema de temas Chocolate e Morango, animações fluidas e formulário de contato integrado ao WhatsApp.

## 🍰 Características

### Design e Visual
- **Temas Duplos**: Sistema de cores Chocolate (marrom/bege) e Morango (rosa/vermelho)
- **Responsivo**: Adaptável para desktop, tablet e mobile
- **Animações Modernas**: Efeitos suaves e chamativos usando AOS (Animate On Scroll)
- **Imagens Temáticas**: Fotos reais de doces e sobremesas
- **Tipografia**: Fontes Google Fonts (Poppins + Dancing Script)

### Funcionalidades
- **Troca de Tema**: Botão para alternar entre temas Chocolate e Morango
- **Menu Responsivo**: Navegação mobile com hamburger menu
- **Formulário WhatsApp**: Integração direta com WhatsApp para contato
- **Scroll Suave**: Navegação fluida entre seções
- **Botão Voltar ao Topo**: Aparece automaticamente ao rolar a página

### Seções
1. **Hero**: Apresentação principal com call-to-action
2. **Sobre**: História da doceria e diferenciais
3. **Cardápio**: Mini cardápio com 6 produtos e preços
4. **Depoimentos**: Avaliações de clientes com estrelas
5. **Contato**: Formulário integrado ao WhatsApp
6. **Footer**: Links e informações de contato

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Variáveis CSS, Grid, Flexbox, animações
- **JavaScript ES6**: Interatividade e funcionalidades modernas
- **Font Awesome**: Ícones vetoriais
- **AOS Library**: Animações on scroll
- **Google Fonts**: Tipografia profissional

## 📱 Responsividade

O site foi desenvolvido com abordagem mobile-first e é totalmente responsivo:

- **Desktop**: Layout em duas colunas, navegação horizontal
- **Tablet**: Adaptação automática dos grids
- **Mobile**: Menu hamburger, layout em coluna única

## 🎨 Personalização Fácil

### Alterando Cores dos Temas

No arquivo `style.css`, modifique as variáveis CSS:

```css
:root {
    /* Tema Chocolate */
    --primary-color: #6B4423;
    --secondary-color: #8B4513;
    --accent-color: #D2691E;
    /* ... */
}

[data-theme="strawberry"] {
    /* Tema Morango */
    --primary-color: #E91E63;
    --secondary-color: #C2185B;
    --accent-color: #FF4081;
    /* ... */
}
```

### Alterando Conteúdo

1. **Textos**: Edite diretamente no `index.html`
2. **Imagens**: Substitua os arquivos na pasta `images/`
3. **Cardápio**: Modifique os itens na seção `.menu-items`
4. **Contato**: Altere o número do WhatsApp no `script.js`

### Alterando Estilos

- **Espaçamentos**: Modifique as variáveis `--spacing-*`
- **Bordas**: Ajuste as variáveis `--border-radius-*`
- **Fontes**: Altere as variáveis `--font-*`

## 📞 Configuração do WhatsApp

No arquivo `script.js`, linha 142, altere o número:

```javascript
const whatsappNumber = '5511999999999'; // Substitua pelo número real
```

## 🚀 Como Usar

1. **Desenvolvimento Local**:
   - Abra o arquivo `index.html` em um navegador
   - Ou use um servidor local (Live Server, Python, etc.)

2. **Deploy**:
   - Faça upload de todos os arquivos para seu servidor
   - Certifique-se de que a estrutura de pastas seja mantida

## 📁 Estrutura de Arquivos

```
meu-doce-landing-page/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # JavaScript
├── README.md           # Documentação
└── images/             # Imagens do projeto
    ├── hero-sweet.jpg
    ├── about-us.jpg
    ├── chocolate_brigadeiro.jpg
    ├── strawberry_cupcake.jpg
    └── chocolate_cake.jpg
```

## 🎯 Template para Outras Docerias

Este projeto foi desenvolvido como template reutilizável. Para adaptar:

1. **Substitua as imagens** por fotos dos seus produtos
2. **Altere os textos** para refletir sua marca
3. **Modifique as cores** se necessário
4. **Atualize as informações de contato**
5. **Ajuste o cardápio** com seus produtos e preços

## 🔧 Manutenção

- **Performance**: Otimize imagens para web (WebP recomendado)
- **SEO**: Atualize meta tags e alt texts das imagens
- **Analytics**: Adicione Google Analytics se necessário
- **Backup**: Mantenha backups regulares dos arquivos

## 📝 Licença

Este projeto é um template livre para uso comercial e pessoal.

---

**Desenvolvido com ❤️ para adoçar seu negócio!**

