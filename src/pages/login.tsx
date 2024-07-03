import Login from 'modules/login';

import { NextPageWithLayout } from './_app';

export default Login;

(Login as NextPageWithLayout).getLayout = (page) => {
  return page;
};
