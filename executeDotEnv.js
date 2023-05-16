import * as dotenv from 'dotenv';
export default (() => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config('/.env');
  }
})();
