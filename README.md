## *Desafio Concluído 🤯*

* [x] Aplicação deve permitir que checklists sejam criados ou atualizados;
* [x] Aplicação deve conter uma tela inicial, contendo todos os checklists (contendo o nome do fazendeiro, nome e cidade da fazenda, além da data de criação do checklist) já cadastrados na API. Além de conter ícones com call actions para excluir o checklist, atualizar ou visualizar.
* [x] Aplicação deve conter uma tela para visualizar todas as informações do checklist selecionado (exceto updated_at e id) e um mini mapa contendo uma marcador na localização da fazenda e nome da fazenda ao clicar no Marker. 
* [x] Aplicação deve conter uma tela para cadastro do checklist, e por fim, outra tela para atualização dos dados.
* [x] Para criação do checklist será necessário fornecer os seguintes dados: Nome do fazendeiro, nome e cidade da fazenda, nome do supervisor, tipo do checklist (BPA, Antibiótico, BPF), quantidade de leite produzida no mês, quantidade de cabeça de gado, um booleano informando se teve supervisão no mês em curso e latitude e longitude da fazenda. A captura da lat. e long. da fazenda deve ser feita através do mapa, onde irá clicar na posição da fazenda e adicionar um Marker no local.
* [x] Para atualização do checklist será necessário fornecer os seguintes dados: Nome do fazendeiro, nome e cidade da fazenda, nome do supervisor, quantidade de leite produzida no mês, quantidade de cabeça de gado.
* [x] A exclusão do checklist fica a critério do desenvolvedor (usando modal, notificação, etc).

## API do desafio

- [API](http://challenge-front-end.bovcontrol.com/documents/#/). Disponível para envio e consulta de checklists.

## Variavel de Ambiente
```env
NEXT_PUBLIC_ENV_VARIABLE=http://challenge-front-end.bovcontrol.com/v1
```

## Preview
[Visualização do Teste](https://bovcontrol-checklist.vercel.app/)