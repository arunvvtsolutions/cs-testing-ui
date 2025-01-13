// This is example of menu item without group for horizontal layout. There will be no children.
// third-party
import { FormattedMessage } from 'react-intl';
// assets
import { IconBrandChrome, IconDashboard } from '@tabler/icons';

// type
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
  IconBrandChrome,
  IconDashboard
};
const samplePage: NavItemType = {
  id: 'dashboard-page',
  title: <FormattedMessage id="Dashboard" />,
  icon: icons.IconDashboard,
  type: 'group',
  url: '/'
};

export default samplePage;
