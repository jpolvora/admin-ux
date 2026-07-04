# ExtJS 6 / Proxmox UI Design Guide & Comparison

Este documento consolida as características extraídas das interfaces do **Proxmox Virtual Environment (PVE)** e do **Proxmox Backup Server (PBS)**, servindo como referência para o desenvolvimento de aplicações web ricas baseadas em React com aparência de "Desktop App" (estilo IDE).

---

## 1. Comparativo de Layout: Proxmox VE vs. Proxmox Backup Server

Ambos os sistemas compartilham a mesma biblioteca base (**ExtJS 6 com o tema Crisp**) e utilizam o Proxmox Widget Toolkit comum, porém apresentam arquiteturas de tela ajustadas para seus respectivos objetivos:

| Característica UI | Proxmox VE (PVE) | Proxmox Backup Server (PBS) |
| :--- | :--- | :--- |
| **Identidade Visual** | Tons cinza-claros e azul de seleção, com a logo laranja tradicional e barra de destaque no topo. | Mesma paleta de cores (Crisp Light/Dark), com foco nos logos do PBS e ícones de status específicos. |
| **Região Oeste (Menu)** | **Árvore de Recursos Dinâmica (Tree Panel)**:<br>Navegação hierárquica baseada em Datacenter -> Nodes -> VMs/Containers -> Storage. | **Menu de Navegação Estático**:<br>Lista plana com abas para Dashboard, Datastores, Configuração, Administração e Controle de Acesso. |
| **Região Central** | **Painel de Abas Dinâmico (Tab Panel)**:<br>Muda de abas (Summary, Hardware, Console, Firewall) dinamicamente conforme o item selecionado na árvore de recursos. | **Dashboard de Widgets e Painéis**:<br>Inicia em uma tela de visão geral rica em indicadores de uso de hardware (CPU, RAM, Disco) e lista de tarefas mais longas. |
| **Região Sul (Base)** | **Log de Tarefas Persistente (Task Log Grid)**:<br>Painel fixo e minimizável exibindo as operações em tempo real em todo o cluster. | **Sem Log Persistente**:<br>As tarefas são exibidas no Dashboard de entrada ou clicando em um atalho de tarefas no topo. |
| **Janelas Modais** | Modais flutuantes densos de configuração de VM, Hardware ou Storage. | Modais flutuantes similares para edição de Datastores, Agendamento de Syncs e Criação de Users. |

---

## 2. Padrões de Design de Desktop App na Web

Para implementar sistemas web inspirados nessas arquiteturas (como IDEs e consoles de gerência), as diretrizes do nosso framework React são:

### A. Controle de Fluxo e Scroll
- **Sem Scroll Geral:** O Viewport do sistema ocupa sempre exatamente `100vw` e `100vh` (`overflow: hidden`).
- **Scroll Localizado:** As barras de rolagem ocorrem estritamente dentro das áreas de dados (`.x-grid-body`, `.x-ide-editor`, `.x-ide-terminal`).

### B. Densidade de Informação
- **Fontes Reduzidas:** Uso de fontes sans-serif de `11px` a `13px` com pouca margem interna (padding de `3px` a `5px` em células e linhas).
- **Zebra Grids:** Linhas alternadas em tons suaves (`#ffffff` e `#fafafa`) e destaque azul claro (`#c1ddf1`) na linha selecionada mantendo a visibilidade.
- **Formulários Estruturados:** Rótulos de campos (labels) alinhados à direita com tamanhos fixos para manter os campos (`input`) perfeitamente alinhados na vertical.

### C. Janelas e Diálogos Arrastáveis (Draggable Windows)
- **Arrasto Restrito (Constrained Drag):** As janelas modais devem possuir suporte para clique e arraste no cabeçalho.
- O movimento deve calcular constantemente a área útil do container pai (`getBoundingClientRect()`) para bloquear o arraste para fora dos limites visíveis do aplicativo.

---

## 3. Arquitetura do Framework React Implementada

Nosso aplicativo replica esses padrões em uma estrutura integrada de **IDE**:
1. **Menu & Toolbar (North):** Barra superior de opções clássicas do IDE (File, Edit, etc) e botões rápidos com ícones SVG.
2. **Solution Explorer (West):** Árvore de arquivos inspirada no Tree Panel do PVE.
3. **Editor & Console (Center):** Divisão vertical com abas de arquivos e um Terminal simulado inspirado no Task Log inferior do PVE.
4. **Properties & Grids (East):** Painel lateral com grid de recursos e formulário de dados.
5. **Statusbar (Bottom):** Status em tempo real do Git e posicionamento do cursor.
6. **Window (Modal):** Janela modal totalmente arrastável, travada nos limites do Viewport.
