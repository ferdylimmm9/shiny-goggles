import ExamplePage from 'modules/example';

import { NextPageWithLayout } from './_app';

(ExamplePage as NextPageWithLayout).getLayout = (page) => {
  return page;
};

export default ExamplePage;
