export const formatCurrency = (amount) => {
    return `R$ ${amount.toFixed(2)}`.replace('.', ',');
  };
  