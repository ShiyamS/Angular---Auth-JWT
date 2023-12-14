export const createError = (statusCode, messageCode) => {
    const err = new Error();
    err.status = statusCode;
    err.message = messageCode;
    return err;
}