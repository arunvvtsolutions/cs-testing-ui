'use client';

import { ReactNode } from 'react';
// third-party
import { Provider } from 'react-redux';

// project-import
import Locales from 'ui-component/Locales';
import Snackbar from 'ui-component/extended/Snackbar';
// import Notistack from 'ui-component/third-party/Notistack';
import ThemeCustomization from 'themes';
import { store } from 'store';
import NavigationScroll from 'layout/NavigationScroll';
// import { ConfigProvider } from 'contexts/ConfigContext';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import Link from 'next/link';

const MyApp = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <ConfigProvider> */}
        <ThemeCustomization>
          <Locales>
            <NavigationScroll>
              {/* <Layout> */}
              <AuthProvider>
                {/* <Notistack> */}
                <>
          
                <Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target='blank'>Click w3</Link>

                  {children}
                  <Snackbar />
                </>
                {/* </Notistack> */}
              </AuthProvider>
              {/* </Layout> */}
            </NavigationScroll>
          </Locales>
        </ThemeCustomization>
      {/* </ConfigProvider> */}
    </Provider>
  );
};

export default MyApp;
