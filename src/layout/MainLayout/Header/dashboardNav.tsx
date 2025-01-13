// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// project imports
// import { IconMenu2 } from '@tabler/icons';
import Link from 'next/link';
import Image from 'next/image';

import LogoSection from '../LogoSection';

// import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import MobileSection from './MobileSection';

// import NotificationSection from './NotificationSection';
// import LocalizationSection from './LocalizationSection';
// import MegaMenuSection from './MegaMenuSection';

// assets

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const DashbordNavbar = ({ mainLogo }: { mainLogo?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: !mainLogo ? 'none' : 'block', md: 'block' }, flexGrow: 1 }}>
          <LogoSection mainLogo={mainLogo} />
        </Box>

        <Link href="\" className="logo_Box mobile">
          <Image src="/assets/images/logo.webp" alt="alt" width={100} height={100} />
        </Link>
      </Box>
      <ProfileSection hideMenuIcon={mainLogo} />

      {/* mobile header */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default DashbordNavbar;
