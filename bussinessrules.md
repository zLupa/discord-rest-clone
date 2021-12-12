## Cadastro de usuário

**RF**
Deve ser possível cadastrar um usuário

**RNF**  
Não deve ser possível cadastrar um usuário se o email já existir

## Criar nova Guild

**RF**
Deve ser possível cadastrar uma Guild.

**RNF**
O usuário deve estar logado.
O usuário que está logado deve ser o dono da Guild.

## Criar convite de uma Guild

**RF**
Deve ser possível criar um convite de uma Guild

**RNF**
Os convites devem ter uma expiração.
Não deve ser possível criar convites já expirados.
O usuário precisa estar logado.
O usuário precisa ser parte da Guild para criar um convite para ela.

## Aceitar convite de uma Guild

**RF**
Deve ser possivel aceitar o convite de uma Guild

**RNF**
Não deve ser possível aceitar o convite de uma Guild se estiver expirado.
Não deve ser possível aceitar o convite se o usuário já estiver dentro da Guild.
O usuário precisa estar logado.
O usuário ao aceitar, deve entrar automaticamente na Guild.

# Criar canal

**RF**
Deve ser possível criar um canal.

**RNF**
Não deve ser possível criar um canal para uma Guild não existente
O usuário precisar estar logado.
O usuário precisa ser o dono da Guild para criar o canal.

# Criar mensagem no canal

**RF**
Deve ser possível criar uma mensagem

**RNF**
O usuário precisa estar logado.
O usuário precisa fazer parte da guild para mandar mensagem no canal
O canal deve existir e a Guild também.
não deve ser possível mandar uma mensagem em branco.