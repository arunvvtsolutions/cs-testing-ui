'use client';

import { ReactNode } from 'react';
// third-party
import { Provider } from 'react-redux';

// project-import
// import Locales from 'ui-component/Locales';
// import Snackbar from 'ui-component/extended/Snackbar';
// import Notistack from 'ui-component/third-party/Notistack';
import ThemeCustomization from 'themes';
import { store } from 'store';
// import NavigationScroll from 'layout/NavigationScroll';
// import { ConfigProvider } from 'contexts/ConfigContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import Link from 'next/link';
// import SamplePage from './sample-page/page';

const DummyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
    <h1>dsfsdsdf</h1>
    <Provider store={store}>
      <ThemeCustomization>
        <h1>thi is</h1>
        <Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target='blank'>Touch me</Link>
        <Link href="https://bitbucket.org/vvt-solutions/cs_ui/src/development/" target='blank'>Touch me</Link>
      </ThemeCustomization>
    </Provider>
    </>
  );
};

export default DummyLayout;
