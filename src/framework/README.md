# React Desktop Framework (ExtJS 6 Crisp Clone)

Este é um mini-framework em React focado no desenvolvimento de aplicações ricas de alta densidade visual (estilo "Desktop App"), inspirado na interface administrativa do Proxmox VE (baseada em ExtJS 6).

O framework permite criar telas complexas divididas em regiões delimitadas (Border Layout), grids de dados estruturados com zebra striping, formulários compactos e janelas modais flutuantes que são arrastáveis e automaticamente limitadas ao tamanho da janela do navegador.

## 📂 Estrutura do Framework

A biblioteca está estruturada no diretório `src/framework/` contendo os seguintes arquivos:

- **`theme.css`**: Contém as variáveis CSS, fontes, reset global (`overflow: hidden` para emular aplicações de sistema operacional), tags coloridas e classes de utilidades de layout.
- **`Layout.jsx`**: Expõe componentes para divisão de telas: `<Viewport>`, `<Region>` e `<Panel>`.
- **`Grid.jsx`**: Fornece tabelas densas, com scroll interno independente e destaque na linha selecionada.
- **`Form.jsx`**: Expõe componentes para formulários alinhados e botões compactos (`<Form>`, `<TextField>`, `<Button>`).
- **`Window.jsx`**: Fornece uma janela modal `<Window>` totalmente arrastável (draggable), projetada com restrições físicas para nunca sair da tela útil do usuário.

## 🚀 Como Executar

Para rodar o projeto de demonstração e ver o framework em ação:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Abra o endereço retornado no terminal (por padrão `http://localhost:5173`) para ver o clone do Proxmox VE em funcionamento.

Para um guia completo sobre como utilizar cada componente e criar seus próprios layouts, consulte o arquivo [DOCS.md](file:///l:/source/admin-ux/src/framework/DOCS.md).
