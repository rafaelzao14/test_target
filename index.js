function calcFaturamento(list) {
  let minValue = 0;
  let maxValue = 0;

  let minDate = null;
  let maxDate = null;

  let sum = 0;
  let dailyWithInvoice = 0;

  let listWithValues = [];

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

const faturamentoTeste = [
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

// opcional: mostrar no HTML
document.getElementById("resultado").innerText =
  JSON.stringify(result, null, 2);