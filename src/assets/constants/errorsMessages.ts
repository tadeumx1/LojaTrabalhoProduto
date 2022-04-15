import { ALERT_ERRORS } from '../../protocols';

type CONSTANTS_ERROS_MESSAGES = {
  [T in ALERT_ERRORS]: {
    TITLE: string;
    DESCRIPTION?: string;
  };
};

export const ERRORS_MESSAGES: CONSTANTS_ERROS_MESSAGES = {
  NOT_FOUND: {
    TITLE: 'Não encontrado',
    DESCRIPTION:
      'Não encontramos sua solicitação. Verifique seus dados e tente novamente.',
  },
  SERVER_ERROR: {
    TITLE: 'Ops, algo deu errado',
    DESCRIPTION:
      'Desculpe, algo deu errado aqui do nosso lado 😕 Tente novamente mais tarde',
  },
  UNAUTHORIZED: {
    TITLE: 'Você não está autenticado',
    DESCRIPTION: 'Tente se autenticar primeiro, para prosseguir',
  },
};
