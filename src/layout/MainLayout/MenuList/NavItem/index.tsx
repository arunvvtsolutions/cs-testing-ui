/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  ButtonBase,
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
// project imports
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { usePathname } from 'next/navigation';

import Link from 'Link';
import { AUTHCONST, LAYOUT_CONST } from 'constant';
import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'store';
import { activeID, activeItem, openDrawer } from 'store/slices/menu';
// assets
import { LinkTarget, NavItemType } from 'types';
import useAuth from 'hooks/useAuth';
import { addCookies, getCookies } from 'utils';
import menuItems from 'menu-items';
import { PREDICTOR_RESULT } from 'ui-component/dashboard/predictors/neet-predictors/predictors-result/constant';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

interface NavItemProps {
  item: NavItemType;
  level: number;
  parentId?: string;
  isParents?: boolean;
  menu?: NavItemType;
}

const NavItem = ({ item, level, parentId, isParents = false, menu }: NavItemProps) => {
  const theme = useTheme();
  const { logout } = useAuth();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { layout, borderRadius } = useConfig();

  const { selectedItem, drawerOpen } = useSelector((state) => state.menu);
  const { neetPredictorFormData } = useSelector((state) => state.neetPredictor);
  const isSelected = selectedItem.findIndex((id) => id === item.id) > -1;
  const isPredictorUrlAccess =
    item.id === PREDICTOR_RESULT.AIQ_PATH || item.id === PREDICTOR_RESULT.STATE_PATH
      ? neetPredictorFormData.neetRank
      : true;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const Icon = item?.icon!;

  const itemIcon = item?.icon ? (
    <item.icon
      component="svg"
      stroke={'1.5'}
      size={drawerOpen ? '20px' : '24px'}
      style={{
        color: isSelected ? '#202124' : '#3C3C43',
        ...((layout === LAYOUT_CONST.HORIZONTAL_LAYOUT || layout === LAYOUT_CONST.VERTICAL_LAYOUT) &&
          isParents && { fontSize: 20, stroke: '1.5' })
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: isSelected ? '#0e3f8d' : theme.palette.text.primary,
        width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem([id]));
    addCookies('activeItem', id);
    if (matchesSM) dispatch(openDrawer(false));
    dispatch(activeID(parentId));
    if (id === AUTHCONST.LOGOUT) logout();
  };

  // active menu item on page load
  useEffect(() => {
    const splittedPaths = document.location.pathname.toString().split('/');
    const currentIndex = splittedPaths.findIndex((id) => id === item.id);

    const containInMenuList = menuItems.items.some(
      (menu) =>
        (menu.id && splittedPaths.includes(menu.id)) ||
        menu.children?.some((subMenu) => subMenu.id && splittedPaths.includes(subMenu.id))
    );

    if (currentIndex > -1) {
      item.id && addCookies('activeItem', item.id);
      dispatch(activeItem([item.id]));
    } else if (!containInMenuList) {
      item.id && addCookies('activeItem', 'dashboard');
      dispatch(activeItem(['dashboard']));
    }
    // eslint-disable-next-line
  }, [pathname]);

  // get activeItem id from cookies
  useEffect(() => {
    const activeItemUrl = getCookies('activeItem');
    dispatch(activeItem([activeItemUrl]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === 'dark' && drawerOpen ? 'text.primary' : 'secondary.main';

  return (
    <>
      {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
        <ListItem style={{ padding: '0px' }}>
          <ListItemButton
            component={Link}
            href={isPredictorUrlAccess ? item.url! : item.redirectUrl!}
            target={itemTarget}
            disabled={item.disabled}
            disableRipple={!drawerOpen}
            className="dashbordLinks"
            sx={{
              zIndex: 1201,
              borderRadius: '0px 25px 25px 0px',
              fontSize: '16px !important',
              mb: 0.5,
              pl: drawerOpen ? '0px' : 1.25,
              ...(drawerOpen &&
                level === 1 &&
                theme.palette.mode !== 'dark' && {
                  '&:hover': {
                    background: '#049c781a'
                  },
                  '&.Mui-selected': {
                    background: '#049c781a',
                    color: '#000',
                    fontSize: '16px !important',

                    '&:hover': {
                      color: '#000',
                      background: '#e6e8ec'
                    }
                  }
                }),
              ...((!drawerOpen || level !== 1) && {
                py: level === 1 ? 0 : 1,
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#000'
                },
                '&.Mui-selected': {
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#000'
                  },
                  bgcolor: 'transparent'
                }
              })
            }}
            selected={isSelected}
            onClick={() => itemHandler(item.id!)}
          >
            <ButtonBase sx={{ borderRadius: `${borderRadius}px` }} disableRipple={drawerOpen} aria-label="theme-icon">
              <Tooltip title={!drawerOpen && level === 1 && item.title} placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: level === 1 ? 36 : 18,
                    color: isSelected ? iconSelectedColor : textColor,
                    ...(!drawerOpen &&
                      level === 1 && {
                        borderRadius: `${borderRadius}px`,
                        width: 46,
                        height: 46,
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? '049c781a' + 25 : '#049c781a'
                        },
                        ...(isSelected && {
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.main + 25 : '#049c781a',
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.main + 30 : '#049c781a'
                          }
                        })
                      })
                  }}
                >
                  {itemIcon}
                </ListItemIcon>
              </Tooltip>
            </ButtonBase>

            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <ListItemText
                primary={
                  <Typography
                    variant={isSelected ? 'h5' : 'body1'}
                    color={isSelected && menu && menu.type === 'collapse' ? '#0e3f8d' : '#3C3C43'}
                    sx={{ fontWeight: isSelected ? '500' : '400' }}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  item.caption && (
                    <Typography
                      variant="caption"
                      sx={{ ...theme.typography.subMenuCaption }}
                      display="block"
                      gutterBottom
                    >
                      {item.caption}
                    </Typography>
                  )
                }
              />
            )}

            {drawerOpen && item.chip && (
              <Chip
                color={item.chip.color}
                variant={item.chip.variant}
                size={item.chip.size}
                label={item.chip.label}
                avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
              />
            )}
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItemButton
          component={Link}
          href={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          {...(isParents && {
            onClick: () => {
              dispatch(activeID(item.id!));
            }
          })}
          sx={{
            borderRadius: isParents ? `${borderRadius}px` : 0,
            mb: isParents ? 0 : 0.5,
            alignItems: 'flex-start',
            backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
            py: 1,
            pl: 2,
            mr: isParents ? 1 : 0
          }}
          selected={isSelected}
          onClick={() => itemHandler(item.id!)}
        >
          <ListItemIcon
            sx={{
              my: 'auto',
              minWidth: !item?.icon ? 18 : 36
            }}
          >
            {itemIcon}
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit" fontWeight="400" fontSize="14px">
                {item.title}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )
            }
          />

          {item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
};

export default NavItem;
