import { IRequestError } from "greenpeace";

export const getErrorByCode = (error: string | number): IRequestError => {
  switch(error) {
    default:
      return {
        status: 500,
        errorMessage: 'Internal Server Error',
      }
  }
}