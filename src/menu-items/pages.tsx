// third-party
import { FormattedMessage } from 'react-intl';
// assets
import { IconKey, IconBug } from '@tabler/icons';
import ListAltIcon from '@mui/icons-material/Dashboard';

import { NavItemType } from 'types';
import PredictorIcon from 'ui-component/icons/PredictorIcon';
import DashboardIcon from 'ui-component/icons/DashboardIcon';
// constant
const icons = {
  IconKey,
  IconBug,
  DashboardIcon,
  ListAltIcon,
  PredictorIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages: NavItemType = {
  id: 'mainmenu',
  title: <FormattedMessage id="Main menu" />,
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="Dashboard" />,
      type: 'item',
      icon: icons.DashboardIcon,
      url: '/dashboard'
      // children: [
      //   {
      //     id: 'error',
      //     title: <FormattedMessage id="error-404" />,
      //     type: 'item',
      //     url: '/pages/maintenance/error1',
      //     target: true
      //   },
      //   {
      //     id: 'coming-soon',
      //     title: <FormattedMessage id="coming-soon" />,
      //     type: 'collapse',
      //     children: [
      //       {
      //         id: 'coming-soon1',
      //         title: (
      //           <>
      //             <FormattedMessage id="coming-soon" /> 01
      //           </>
      //         ),
      //         type: 'item',
      //         url: '/pages/maintenance/coming-soon/coming-soon1',
      //         target: true
      //       },
      //       {
      //         id: 'coming-soon2',
      //         title: (
      //           <>
      //             <FormattedMessage id="coming-soon" /> 02
      //           </>
      //         ),
      //         type: 'item',
      //         url: '/pages/maintenance/coming-soon/coming-soon2',
      //         target: true
      //       }
      //     ]
      //   },
      //   {
      //     id: 'under-construction',
      //     title: <FormattedMessage id="under-construction" />,
      //     type: 'item',
      //     url: '/pages/maintenance/under-construction',
      //     target: true
      //   }
      // ]
    },
    {
      id: 'predictor',
      title: <FormattedMessage id="Predictor" />,
      type: 'collapse',
      icon: icons.PredictorIcon,
      children: [
        // {
        //   id: 'jeePredictor',
        //   title: <FormattedMessage id="JEE Predictor" />,
        //   type: 'item',
        //   url: '#',
        //   target: true,
        // },
        {
          id: 'aiq',
          title: <FormattedMessage id="NEET Predictor" />,
          type: 'item',
          url: '/predictor/neet-predictor-result/aiq',
          redirectUrl: '/predictor/neet-predictor-form',
          target: false
          // children: [
          //   {
          //     id: 'coming-soon1',
          //     title: (
          //       <>
          //         <FormattedMessage id="coming-soon" /> 01
          //       </>
          //     ),
          //     type: 'item',
          //     url: '/pages/maintenance/coming-soon/coming-soon1',
          //     target: true
          //   },
          //   {
          //     id: 'coming-soon2',
          //     title: (
          //       <>
          //         <FormattedMessage id="coming-soon" /> 02
          //       </>
          //     ),
          //     type: 'item',
          //     url: '/pages/maintenance/coming-soon/coming-soon2',
          //     target: true
          //   }
          // ]
        },
        {
          id: 'state',
          title: <FormattedMessage id="NEET State Predictor" />,
          type: 'item',
          url: '/predictor/neet-predictor-result/state',
          target: false,
          redirectUrl: '/predictor/neet-predictor-form'
        }
      ]
    }
  ]
};

export default pages;
