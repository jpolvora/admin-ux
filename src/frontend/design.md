# Requisitos de Design - Migração ExtJS para React

Este documento detalha os requisitos para extrair o comportamento e aparência da interface do Proxmox VE (baseada em ExtJS 4) e construir um mini-framework em React.

## Objetivo Principal
Extrair o conteúdo de `https://192.168.0.100:8006` (HTML, JavaScript, CSS) para aprender e construir um mini-framework básico, replicando a mesma interface de usuário (UI) do ExtJS 4.

## Escopo do Framework
O mini-framework deve cobrir:
* **Estilos e Visuais**
* **Componentes**:
  * Botões
  * Formulários
  * Janelas
  * Grids
  * Menus
  * Áreas/Logo

## Credenciais de Acesso
>   
- **Usuário**: `root`
- **Senha**: `pergunte ao developer ou crie um .env local ignorado`

## Entregável
Entregar no final um arquivo `design.md` com tudo que foi extraído e aprendido, servindo de base para entender e replicar o comportamento em outro projeto com um framework diferente no futuro.

## Especificações Técnicas e Diretrizes
1. **Tecnologia de Destino**: React.js para o novo framework/design.
2. **Declarações Necessárias**:
   - Layouts
   - Forms (Formulários)
   - Grids
   - Botões
3. **Aparência**: Similar a um aplicativo desktop do Windows, porém executado na Web.
