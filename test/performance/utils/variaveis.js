const configLocal = JSON.parse(open('../config/config.local.json'));
//const names = open('../fixtures/names.json');
const nomes = JSON.parse(open('../fixtures/names.json'));

export function pegarBaseUrl() {
  const url = __ENV.BASE_URL || configLocal.baseUrl;

  if (!url) {
    throw new Error('Base URL não configurada. Defina BASE_URL no ambiente ou em config.local.json.');
  }

  return url;
}

export function pegarNome() { 

  // Escolhe um nome aleatório da lista
  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
 
  // Gera um número aleatório de 1 a 9999
  const numeroAleatorio = Math.floor(Math.random() * 10000);

  return `${nomeAleatorio}${numeroAleatorio}`;
}
