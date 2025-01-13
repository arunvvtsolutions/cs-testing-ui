import dynamic from 'next/dynamic';
const MenuList = dynamic(() => import('./MenuList'));

const Header = () => {
  return <MenuList />;
};

export default Header;
