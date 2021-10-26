const prod = {
  url: {
   API_URL: 'https://erp-test.sistema.ru',
   FILE_URL: 'https://sps-test.sistema.ru'
   }
};

const dev = {
  url: {
   API_URL: 'http://localhost:3005',
   FILE_URL: 'https://sps-test.sistema.ru'
  }
};

// API_URL: 'http://localhost:8000',
// FILE_URL: 'https://erp-sps01.sistema.jsfc'

export const serviceUrl = {
  url: {
    CountProject: '/0/rest/UsrCustomConfigurationService/GetCountProject',
    GetAcounts: '/0/rest/UsrCustomConfigurationService/GetAccounts',
    GetInvestments: '/0/rest/UsrCustomConfigurationService/GetInvestments',
    GetNews: '/0/rest/UsrCustomConfigurationService/GetNews',
    GetEvents: '/0/rest/UsrCustomConfigurationService/GetEvents'
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;