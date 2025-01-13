export const ErrorSnackbar = (
  message: string,
  anchorOrigin?: { vertical: string; horizontal: string },
  subMessage?: string
) => ({
  open: true,
  message: message,
  subMessage: subMessage,
  variant: 'alert',
  alert: {
    color: 'error'
  },
  severity: 'error',
  close: false,
  anchorOrigin: anchorOrigin
});

export const SuccessSnackbar = (message: string, subMessage?: string) => ({
  open: true,
  message: message,
  subMessage: subMessage,
  variant: 'alert',
  alert: {
    color: 'success'
  },
  close: false
});
export const WarningSnackbar = (message: string) => ({
  open: true,
  message: message,
  variant: 'alert',
  alert: {
    color: 'warning'
  },
  close: true
});
