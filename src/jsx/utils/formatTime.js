export const formatToBrasiliaTime = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
};
