export const formatErrorToString = (error: string | Error) => {
  if (error instanceof Error) return `${error.message}`
  return error
}
