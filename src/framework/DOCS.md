# Guia de Documentação do Framework (DOCS)

Este guia detalha a API de componentes e as melhores práticas para construir aplicações ricas do tipo "Desktop Web" usando o nosso mini-framework React.

---

## 1. Declarando Layouts (Border Layout)

O layout base funciona de forma vertical e horizontal usando componentes flexbox configurados no `theme.css`. Para criar uma tela dividida clássica:

```jsx
import { Viewport, Region, Panel } from './framework/Layout';

function MeuApp() {
  return (
    <Viewport>
      {/* Região Norte: Topo fixo */}
      <Region region="north" height={40} style={{ background: '#333', color: '#fff' }}>
        Barra Superior / Logo
      </Region>

      {/* Área Central: Onde colocamos o layout horizontal de colunas */}
      <div className="x-border-layout">
        
        {/* Região Oeste: Barra lateral esquerda */}
        <Region region="west" width={200}>
          <Panel title="Navegação">
            <p>Links da árvore aqui...</p>
          </Panel>
        </Region>

        {/* Região Centro: Área principal que expande e consome o resto da tela */}
        <Region region="center">
          <Panel title="Área de Trabalho Principal">
            <p>Conteúdo principal...</p>
          </Panel>
        </Region>
        
      </div>

      {/* Região Sul: Rodapé / Logs */}
      <Region region="south" height={150}>
        <div style={{ padding: '10px' }}>Task Logs / Saída</div>
      </Region>
    </Viewport>
  );
}
```

---

## 2. Tabelas e Listagens (Grids)

O componente `<Grid>` é projetado para exibir dados em formato tabular denso, com colunas fixas e suporte a scroll local.

### Estrutura de Colunas
Cada objeto em `columns` define a exibição de uma coluna:
- `text` (String): Título exibido no cabeçalho.
- `dataIndex` (String): Chave do objeto de dados correspondente a essa célula.
- `width` (Number/String - opcional): Largura fixa em pixels.
- `flex` (Number - opcional): Proporção flexível para ocupar o espaço restante (ex: `flex: 1`).

### Exemplo de Uso
```jsx
import { Grid } from './framework/Grid';

const colunas = [
  { text: 'ID', dataIndex: 'id', width: 60 },
  { text: 'Nome do Recurso', dataIndex: 'name', flex: 1 },
  { text: 'Uso de CPU', dataIndex: 'cpu', width: 100 },
];

const dados = [
  { id: '101', name: 'Servidor Web', cpu: '1.2%' },
  { id: '102', name: 'Banco de Dados', cpu: '15.4%' },
];

function ExemploGrid() {
  return (
    <div style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
      <Grid 
        columns={colunas} 
        data={dados} 
        onSelectionChange={(item) => console.log('Selecionado:', item)} 
      />
    </div>
  );
}
```

---

## 3. Formulários e Botões (Forms & Buttons)

Os inputs são compactos (`height: 22px`) e as labels são alinhadas à direita por padrão para assemelharem-se a formulários nativos de sistemas operacionais.

```jsx
import { Form, TextField, Button } from './framework/Form';

function ExemploForm() {
  const [nome, setNome] = React.useState('');

  return (
    <Form>
      <TextField 
        label="Nome da VM" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        placeholder="ex: web-server"
      />
      <TextField 
        label="Memória (MB)" 
        value="2048" 
        onChange={() => {}} 
      />
      
      {/* Alinhamento de botões (deve-se compensar a largura da label de 100px + gap de 8px = 108px) */}
      <div style={{ display: 'flex', gap: '8px', paddingLeft: '108px', marginTop: '10px' }}>
        <Button text="Salvar" primary={true} onClick={() => alert('Salvo!')} />
        <Button text="Limpar" onClick={() => setNome('')} />
      </div>
    </Form>
  );
}
```

---

## 4. Janelas Flutuantes e Modais Arrastáveis (Windows)

O componente `<Window>` abre uma modal por cima da aplicação. Ela é arrastável por clique e arraste no cabeçalho, mas seu movimento é delimitado fisicamente dentro das bordas do elemento pai que renderiza a máscara `.x-window-mask`.

### Propriedades (Props):
- `title` (String): Título exibido no cabeçalho da janela.
- `width` (Number): Largura da janela em pixels (padrão: `400`).
- `height` (Number): Altura da janela em pixels (padrão: `300`).
- `onClose` (Function): Callback disparado ao clicar no botão "✕" de fechar.
- `buttons` (JSX): Elementos de ação exibidos na barra de ferramentas inferior da janela.

### Exemplo de Uso
```jsx
import React, { useState } from 'react';
import { Window } from './framework/Window';
import { Form, TextField, Button } from './framework/Form';

function MeuPainelComModal() {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      <Button text="Abrir Modal" onClick={() => setAberto(true)} />

      {aberto && (
        <Window 
          title="Configuração do Cluster" 
          width={450} 
          height={280} 
          onClose={() => setAberto(false)}
          buttons={
            <>
              <Button text="Cancelar" onClick={() => setAberto(false)} />
              <Button text="Confirmar" primary={true} onClick={() => setAberto(false)} />
            </>
          }
        >
          <Form>
            <TextField label="Endereço IP" value="192.168.1.10" onChange={() => {}} />
            <TextField label="Porta" value="8006" onChange={() => {}} />
          </Form>
        </Window>
      )}
    </div>
  );
}
```

## 5. Melhores Práticas de Estilização
- **Variáveis CSS:** Utilize as variáveis definidas no `:root` do `theme.css` (ex: `var(--pve-blue-selection)`, `var(--pve-border-color)`) para manter a fidelidade visual com o tema Crisp do Proxmox.
- **Scrolls:** Certifique-se de que os containers principais tenham a propriedade `overflow: hidden` e defina alturas fixas com `overflow-y: auto` nos elementos de conteúdo.
- **Badge Tags:** Para aplicar badges como as do Proxmox, use a classe `.pve-tag` associada a classes específicas de cores de fundo do `theme.css` (ex: `pve-tag-backup`, `pve-tag-adblock`).
