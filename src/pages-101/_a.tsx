/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode } from 'react';

// global styles
// import '../styles/globals.css';

// next
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
// third-party
import { Provider } from 'react-redux';

// project-import
import Locales from 'ui-component/Locales';
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';
import ThemeCustomization from 'themes';
import { store } from 'store';
// import { ConfigProvider } from 'contexts/ConfigContext';
import NavigationScroll from 'layout/NavigationScroll';
// import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';

// types
type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
}

function MyApp({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <Provider store={store}>
      {/* <ConfigProvider> */}
      <ThemeCustomization>
        {/* <RTLLayout> */}
        <Locales>
          <NavigationScroll>
            <Notistack>
              {getLayout(<Component {...pageProps} />)}
              <Snackbar />
            </Notistack>
          </NavigationScroll>
        </Locales>
        {/* </RTLLayout> */}
      </ThemeCustomization>
      {/* </ConfigProvider> */}
    </Provider>
  );
}

export default MyApp;
