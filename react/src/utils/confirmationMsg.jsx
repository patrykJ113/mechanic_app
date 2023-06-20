import TYPE from '../enums/type.jsx';

export default (type ,data) => {
    switch(type) {
      case TYPE.MECHANICS:
        return {
          create: `użytkownik ${data.name} ${data.last_name} został dodany `,
          update: `użytkownik ${data.name} ${data.last_name} został zaktualizowany `,
          delete: `użytkownik ${data.name} ${data.last_name} został usunięty `,
          beforeDelete: `czy chcesz usunąć użytkonika ${data.name} ${data.last_name} ? `
        }
      break;
      case TYPE.ORDERS:
        return {
          create: `Zlecenie nr: ${data.id} zostało dodane `,
          update: `Zlecenie nr: ${data.id} zostało zaktualizowane `,
          delete: `Zlecenie  nr: ${data.id} zostało usunięte `,
          beforeDelete: `czy chcesz usunąć zlecenie nr: ${data.id} ? `
        }
      break;
      case TYPE.OFFERS:
        return {
          create: `Oferta ${data.name} została dodana `,
          update: `Oferta ${data.name} została zaktualizowana `,
          delete: `Oferta ${data.name} została usunięta`,
          beforeDelete: `czy chcesz usunąć ofertę ${data.name} ? `
        }
      break;
      default:
          return ''
    }
  }