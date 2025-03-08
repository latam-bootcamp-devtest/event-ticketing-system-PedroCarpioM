export const commonHTTPResponses = {
  401: {
    description: "Unauthorized request, please provide a valid API key",
    type: "null",
  },
  400: {
    description: "Bad request, please check your request body",
    type: "null",
  },
  500: {
    description: "Internal server error, please try again later",
    type: "null",
  },
};
