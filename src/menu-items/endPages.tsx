// third-party
import { FormattedMessage } from 'react-intl';
// assets
import { IconHelp, IconSitemap } from '@tabler/icons';

import { NavItemType } from 'types';
import { BASE_URL } from 'config';
import UserIcon from 'ui-component/icons/UserIcon';
import LogoutIcon from 'ui-component/icons/LogoutIcon';
import EditIcon from 'ui-component/icons/EditIcon';

// constant
const icons = {
  IconHelp,
  IconSitemap,
  UserIcon,
  LogoutIcon,
  EditIcon
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: NavItemType = {
  id: 'bottom-menu',
  icon: IconHelp,
  type: 'end',
  children: [
    {
      id: 'my-account',
      title: <FormattedMessage id="My Account" />,
      type: 'item',
      url: '/my-account',
      icon: icons.UserIcon,
      external: true,
      target: false
    },
    {
      id: 'Predictor-NEET-edit',
      title: <FormattedMessage id="Edit NEET Predictor" />,
      type: 'item',
      url: '/predictor/neet-predictor-form',
      icon: EditIcon,
      external: true,
      target: false
    },
    {
      id: 'logout',
      title: <FormattedMessage id="Logout" />,
      type: 'item',
      url: BASE_URL,
      icon: icons.LogoutIcon,
      external: true,
      target: false
    }
  ]
};

export default other;
