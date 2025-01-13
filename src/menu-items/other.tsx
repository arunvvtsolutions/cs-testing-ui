// third-party
import { FormattedMessage } from 'react-intl';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import RateReviewIcon from '@mui/icons-material/RateReviewOutlined';
// eslint-disable-next-line import/order
import QuizIcon from '@mui/icons-material/QuizOutlined';
// assets
import { IconHelp, IconSitemap } from '@tabler/icons-react';

import { NavItemType } from 'types';
import ShortListIcon from 'ui-component/icons/ShortListIcon';
import DraftIcon from 'ui-component/icons/DraftIcon';
import Reviews from 'ui-component/icons/Reviews';
import ArticleLine from 'ui-component/icons/ArticleLine';
import HistoryIcon from 'ui-component/icons/History';
import ChatBotIcon from 'ui-component/icons/ChatBot';
import ConnectToMentor from 'ui-component/icons/ConnectToMentor';

// constant
const icons = {
  IconHelp,
  IconSitemap,
  FormatListBulletedIcon,
  CompareArrowsIcon,
  GroupIcon,
  HistoryIcon,
  RateReviewIcon,
  QuizIcon,
  ShortListIcon,
  DraftIcon,
  Reviews,
  ArticleLine,
  ChatBotIcon,
  ConnectToMentor
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: NavItemType = {
  id: 'middle-menu',
  icon: IconHelp,
  type: 'group',
  children: [
    {
      id: 'shortlisted-college',
      title: <FormattedMessage id="Shortlisted College" />,
      type: 'item',
      url: '/shortlisted-college',
      icon: icons.ShortListIcon,
      external: true,
      target: false
    },
    {
      id: 'compare-history',
      title: <FormattedMessage id="Compare History" />,
      type: 'item',
      url: '/compare-history',
      icon: icons.DraftIcon,
      external: true,
      target: false
    },
    // {
    //   id: 'connect-to-mentor',
    //   title: <FormattedMessage id="Connect To Mentor" />,
    //   type: 'collapse',
    //   icon: icons.ConnectToMentor,
    //   children: [
    //     {
    //       id: 'schedule-your-appointment',
    //       title: <FormattedMessage id="Schedule Your Appointment" />,
    //       type: 'item',
    //       url: '/schedule-your-appointment',
    //       target: false
    //     },
    //     {
    //       id: 'appointment-details',
    //       title: <FormattedMessage id="Appointment Details" />,
    //       type: 'item',
    //       url: '/appointment-details',
    //       target: false
    //     }
    //   ]
    // },
    {
      id: 'chat-bot',
      title: <FormattedMessage id="NEET ChatBot" />,
      type: 'item',
      url: '/chat-bot',
      icon: icons.ChatBotIcon,
      external: true,
      target: false
    },
    {
      id: 'payment-history',
      title: <FormattedMessage id="Payment History" />,
      type: 'item',
      url: '/payment/payment-history',
      icon: icons.HistoryIcon,
      external: true,
      target: false
    },
    {
      id: 'my-reviews',
      title: <FormattedMessage id="Reviews" />,
      type: 'item',
      url: '/my-reviews',
      icon: icons.Reviews,
      external: true,
      target: false
    },
    {
      id: 'question-and-answer',
      title: <FormattedMessage id="Question & Answer" />,
      type: 'item',
      url: '/question-and-answer',
      icon: icons.ArticleLine,
      external: true,
      target: false
    }
  ]
};

export default other;
