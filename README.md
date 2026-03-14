# Instruções para executar o código do desafio

1. Abrir o arquivo HTML diretamente da pasta **ou usar a extensão Live Server via VSCode**:  
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer.

2. O código original está em **TypeScript** e pode ser executado em um sandbox como o site:  
https://www.typescriptlang.org/play

Abaixo segue em formato **Markdown** o desafio e também anexado o documento original enviado.

---

# DESAFIO

Resolva as questões a seguir, da forma como achar mais interessante.

---

# 1)

Observe o trecho de código:

```text
int INDICE = 12, SOMA = 0, K = 1;

enquanto K < INDICE faça

{ K = K + 1; SOMA = SOMA + K;}

imprimir(SOMA);
```

Ao final do processamento, qual será o valor da variável **SOMA**?

## Resposta

Temos um loop aqui com a condição de ocorrer enquanto o valor da variavel **K** for menor que da variavel **indice**, entao seguindo a incrementação que e em cada volta pega o valor de **K** e incrementa 1 e depois faz a atribuição do valor a varíavel do valor de soma a adição de: **SOMA + K**, no final do loop o valor da varíavel **SOMA** vai ser **77**.

---

# 2)

Descubra a lógica e complete o próximo elemento:

### a)
1, 3, 5, 7, ___  
Números impares em sequencia

### b)
2, 4, 8, 16, 32, 64, ____  
O proximo número dobro do numero antecedente

### c)
0, 1, 4, 9, 16, 25, 36, ____  
Quadro perfeito, zero elevado a 2, 1 elevado a 2 …

### d)
4, 16, 36, 64, ____  
Aqui é o quadro dos números pares, ex, 2 elevado a 2, 4 elevado a 2 …

### e)
1, 1, 2, 3, 5, 8, 13___  
Essa é a sequencia de fibonacci, onde cada novo numero é a soma dos dois anteriores, entao o proximo é **5 + 8 = 13**

### f)
2,10, 12, 16, 17, 18, 19, 200__  
Todos os numeros que quando escritos de forma extensão começam com a letra **d**

---

# 3)

Dado um vetor que guarda o valor de faturamento diário de uma distribuidora
de todos os dias de um ano, faça um programa, na linguagem que desejar, que
calcule e retorne:

- O menor valor de faturamento ocorrido em um dia do ano;
- O maior valor de faturamento ocorrido em um dia do ano;
- Número de dias no ano em que o valor de faturamento diário foi superior à média
anual.

### Requisitos

**a)** Considerar o vetor já carregado com as informações de valor de faturamento.
**b)** Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes
dias devem ser ignorados no cálculo da média.
**c)** Utilize o algoritmo mais veloz que puder definir.

---
### Solução
```ts
type faturamentoDto = {
  dailyValue: number;
  date: Date;
};

type faturamentoDtoOutput = {
  menorValor: {
    valor: number;
    dia: string;
  };
  maiorValor: {
    valor: number;
    dia: string;
  };
  diasAcimaMedia: number;
};

function calcFaturamento(list: faturamentoDto[]): faturamentoDtoOutput | null {
  let minValue: number = 0;
  let maxValue: number = 0;

  let minDate: Date | null = null;
  let maxDate: Date | null = null;

  let sum: number = 0;
  let dailyWithInvoice: number = 0;

  let listWithValues: faturamentoDto[] = [];

  if (!list.length) {
    console.error("Lista vazia ou inválida");
    return null;
  }

  list.forEach((item) => {
    const invoiceValue = item.dailyValue;

    if (invoiceValue > 0) {
      if (minValue === 0 || invoiceValue < minValue) {
        minValue = invoiceValue;
        minDate = item.date;
      }

      if (invoiceValue > maxValue) {
        maxValue = invoiceValue;
        maxDate = item.date;
      }

      sum += invoiceValue;
      dailyWithInvoice++;

      listWithValues.push(item);
    }
  });

  const media = sum / dailyWithInvoice;

  let diasAcimaMedia = 0;

  listWithValues.forEach((item) => {
    if (item.dailyValue > media) {
      diasAcimaMedia++;
    }
  });

  return {
    menorValor: {
      valor: minValue,
      dia: minDate ? minDate.toISOString().split("T")[0] : "",
    },
    maiorValor: {
      valor: maxValue,
      dia: maxDate ? maxDate.toISOString().split("T")[0] : "",
    },
    diasAcimaMedia,
  };
}

const faturamentoTeste: faturamentoDto[] = [
  { dailyValue: 0, date: new Date("2024-01-01") },
  { dailyValue: 1200, date: new Date("2024-01-02") },
  { dailyValue: 3000, date: new Date("2024-01-03") },
  { dailyValue: 0, date: new Date("2024-01-04") },
  { dailyValue: 1500, date: new Date("2024-01-05") },
  { dailyValue: 800, date: new Date("2024-01-06") },
  { dailyValue: 0, date: new Date("2024-01-07") },
  { dailyValue: 2300, date: new Date("2024-01-08") },
  { dailyValue: 4000, date: new Date("2024-01-09") },
  { dailyValue: 1700, date: new Date("2024-01-10") },
  { dailyValue: 0, date: new Date("2024-01-11") },
  { dailyValue: 2900, date: new Date("2024-01-12") },
  { dailyValue: 3100, date: new Date("2024-01-13") },
  { dailyValue: 2600, date: new Date("2024-01-14") }
];

const result = calcFaturamento(faturamentoTeste);
console.log(result);
```

Fiz em TypeScript, me baseando que poderia receber um vetor com mais detalhes para percorrer mas mantendo o escopo do solicitado e usei IA para gerar o faturamento teste.

---

# 4) Banco de dados

Uma empresa solicitou a você um aplicativo para manutenção de um cadastro de clientes. Após a reunião de definição dos requisitos, as conclusões foram as seguintes:

- Um cliente pode ter um número ilimitado de telefones;
- Cada telefone de cliente tem um tipo, por exemplo: comercial, residencial, celular,
etc. O sistema deve permitir cadastrar novos tipos de telefone;
- A princípio, é necessário saber apenas em qual estado brasileiro cada cliente se
encontra. O sistema deve permitir cadastrar novos estados;

Você ficou responsável pela parte da **estrutura de banco de dados** que será usada pelo aplicativo. Assim sendo:

- Proponha um modelo lógico para o banco de dados que vai atender a aplicação.
Desenhe as tabelas necessárias, os campos de cada uma e marque com setas os
relacionamentos existentes entre as tabelas;
- Aponte os campos que são chave primária (PK) e chave estrangeira (FK);
- Faça uma busca utilizando comando SQL que traga o código, a razão social e o(s)
telefone(s) de todos os clientes do estado de São Paulo (código “SP”);

**IMPORTANTE:** Diagrama das tabelas está no arquivo docx.


Criei as tabelas **estados**, **clientes**, **telefones** e **tipos_telefone**.

- Um estado pode ter vários clientes
- Um cliente pode ter vários telefones
- Cada telefone possui um tipo

### Chaves

**PK:** campo `id` das tabelas

**FK:**

```
clientes.estado_id => estados.id
telefones.cliente_id => clientes.id
telefones.tipo_id => tipos_telefone.id
```

### Query para buscar clientes de São Paulo

```sql
SELECT 
  clientes.id,
  clientes.razao_social,
  telefones.numero
FROM clientes, estados, telefones
WHERE clientes.estado_id = estados.id
AND telefones.cliente_id = clientes.id
AND estados.codigo = 'SP';
```

---

# 5)

Dois veículos, um carro e um caminhão, saem respectivamente de cidades
opostas pela mesma rodovia. O carro, de Ribeirão Preto em direção a Barretos, a
uma velocidade constante de 90 km/h, e o caminhão, de Barretos em direção a
Ribeirão Preto, a uma velocidade constante de 80 km/h. Quando eles se cruzarem
no percurso, qual estará mais próximo da cidade de Ribeirão Preto?

### Condições

**a)** Considerar a distância de **125 km**  entre a cidade de Ribeirão Preto &lt;-&gt; Barretos.  
**b)** Considerar **3 pedágios** como obstáculo e que leva  **5 minutos a mais** para
passar em cada um deles, pois ele não possui dispositivo de cobrança de pedágio.
**c)** Explique como chegou no resultado

### Resposta

Na verdade **nenhum**. A distância é a mesma para os dois porque eles estarão no **mesmo ponto da rodovia** quando se cruzarem. Portanto, até Ribeirão Preto a distância será a mesma para ambos.