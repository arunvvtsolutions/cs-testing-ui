import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)<{ padding?: string; customeSx?: object }>(
  ({ theme, padding = '41px 26px', customeSx }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    },
    '& .MuiPaper-root': {
      borderRadius: '20px',
      maxHeight: '100% !important',
      padding: padding,
      height: 'auto !important',
      overFlow: 'unset !important',
      overflowY: 'unset !important',
      width: 'calc(95%) !important',
      margin: 'auto',
      // position: 'fixed',
      // bottom : '15% !important',
      [theme.breakpoints.down('sm')]: {
        padding: '20px'
      }
    },
    ...customeSx
  })
);

interface IDialogProps {
  children: React.ReactNode;
  open: boolean;
  title?: string | React.ReactElement;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  bottomCloseIcon?: boolean;
  customizedHeader?: React.ReactElement;
  padding?: string;
  sx?: object;
  handleClose: () => void;
}

const CustomizedDialogs: React.FC<IDialogProps> = ({
  children,
  handleClose,
  open,
  title,
  maxWidth,
  bottomCloseIcon = true,
  customizedHeader,
  padding,
  sx
}) => {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={maxWidth}
        padding={padding}
        customeSx={sx}
      >
        {customizedHeader}
        <Box sx={{ position: 'relative' }}>
          {title && (
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {title}
            </DialogTitle>
          )}

          {bottomCloseIcon && (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                bottom: '-95px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '40px',
                border: '1px solid #DFE1E6',
                background: '#FFF',
                '&:hover': {
                  background: '#FFF'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          )}

          <DialogContent sx={{ borderRadius: '20px' }}>{children}</DialogContent>
        </Box>
      </BootstrapDialog>
    </>
  );
};

export default CustomizedDialogs;
