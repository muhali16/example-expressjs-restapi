const jsonResponse = (status, data, errors = null) => {
  return {
    status,
    data,
    errors,
  }
}

module.exports = jsonResponse;