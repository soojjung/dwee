import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        auth: {
          bg: '#FDE2EF',
          button: '#353434',
          buttonText: '#FFFDFE',
        },
      },
    },
  },
  plugins: [],
};

export default config;
