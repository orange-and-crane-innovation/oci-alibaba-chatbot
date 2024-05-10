export const successResponseBody = (content: { [key: string]: any }): string => {
  return JSON.stringify({
    data: content,
  });
};

export const errorResponseBody = (message: string): string => {
  return JSON.stringify({
    error: {
      message,
    },
  });
};
