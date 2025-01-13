export const ErrorSnackbar = (message: string, subMessage?: string) => ({
  open: true,
  message: message,
  subMessage: subMessage,
  variant: 'alert',
  alert: {
    color: 'error'
  },
  severity: 'error',
  close: false
});

export const SuccessSnackbar = (message: string, subMessage?: string) => ({
  open: true,
  message: message,
  subMessage: subMessage,
  variant: 'alert',
  color: 'white',
  alert: {
    color: 'success'
  },
  close: false,
  severity: 'success'
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
