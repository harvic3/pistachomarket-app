export default function Result() {
  let _data = null,
    _message = null,
    _success = true,
    _statusCode = 200;

  function setError(message, statusCode = 404) {
    _message = message;
    _statusCode = Number(statusCode);
    _success = false;
  }

  function setSuccess(data, statusCode = 200) {
    _data = data;
    _statusCode = Number(statusCode);
    _success = true;
  }

  function setMessage(message, statusCode) {
    _message = message;
    _statusCode = Number(statusCode);
    _success = true;
  }

  function resolve() {
    return {
      data: _data,
      message: _message,
      success: _success,
      statusCode: _statusCode,
    };
  }

  return {
    setError,
    setSuccess,
    resolve,
    setMessage,
  };
}