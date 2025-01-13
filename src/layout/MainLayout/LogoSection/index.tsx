import { Link as MuiLink } from '@mui/material';
import Image from 'next/image';

import Link from 'Link';
// material-ui
// project imports
import { DASHBOARD_PATH } from 'config';
import { useSelector } from 'store';
// import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ mainLogo }: { mainLogo?: boolean }) => {
  const drawerOpen = useSelector((state) => state.menu.drawerOpen);
  return (
    <MuiLink component={Link} href={DASHBOARD_PATH} aria-label="theme-logo">
      {drawerOpen || mainLogo ? (
        // <Logo />
        <Link href="\" className="logo_Box">
          <Image src="/assets/images/logo.webp" alt="alt" width={100} height={100} />
        </Link>
      ) : (
        <Link href="\" className="logo_Boxsmall">
          <Image src="/assets/images/logomini.webp" alt="alt" width={100} height={100} />
        </Link>
      )}
    </MuiLink>
  );
};

export default LogoSection;
