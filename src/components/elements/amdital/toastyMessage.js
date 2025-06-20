import he from 'he';


export function tokenExpireLogoutHandler(message){

  const keyword ="cannot be accessed without authentication"

  if(message.includes(keyword)){
      setTimeout(() => {
        window.location.href = '/logout';
      },0);
      return false;
  }
}

export function errorMessageHandler(enqueueSnackbar, defaultErrorMessage = "An unexpected error occurred") {
  const errorMsg = he.decode(defaultErrorMessage);
  tokenExpireLogoutHandler(defaultErrorMessage);
  enqueueSnackbar(errorMsg, {
    variant: 'error',
    autoHideDuration: 1500,
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    style: {
      background: "#FF0000",
      fontSize: "16px",
      fontWeight: "500",
      color: "#FFFFFF"
    }
  });
}

export function successfullMessageHandler(enqueueSnackbar, successMessage = "Successfully updated!") {
  const decodedMessage = he.decode(successMessage);

  enqueueSnackbar(decodedMessage, {
    variant: 'success',
    autoHideDuration: 1500,
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    style: {
      background: "#FFFFFF",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "20px",
      color: "#26212E"
    }
  });
}


