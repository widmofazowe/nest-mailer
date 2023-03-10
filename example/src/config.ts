// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default {
  sendgrid: {
    key: process.env.SENDGRID_KEY,
  },
  email: {
    from: { email: 'contact@pawelwidomski.pl', name: 'Spectral Services' },
  },
};
