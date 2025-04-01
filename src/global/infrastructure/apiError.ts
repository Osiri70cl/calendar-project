export interface ApiError {
  success: boolean;
  message: string;
  status: number;
}

export const handleApiError = (error: any): any => {
  const defaultError: ApiError = {
    message: "Une erreur est survenue.",
    status: 500,
    success: false,
  };

  const status = error?.status;
  const messageError = error?.error;

  if (status && messageError) {
    const data = {
      message: messageError,
      success: false,
      status: status,
    };
    return data;
  } else {
    return defaultError;
  }
};
