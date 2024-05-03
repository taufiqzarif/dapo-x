const APIResponse = {
  success: (res, data, message) => {
    return res.status(200).json({
      success: true,
      data: data,
      message: message || 'Success',
    });
  },
  created: (res, data, message) => {
    return res.status(201).json({
      success: true,
      data: data,
      message: message || 'Created',
    });
  },
  badRequest: (res, message) => {
    return res.status(400).json({
      success: false,
      message: message || 'Bad request',
    });
  },
  notFound: (res, message) => {
    return res.status(404).json({
      success: false,
      message: message || 'Not found',
    });
  },
  unauthorized: (res, message) => {
    return res.status(401).json({
      success: false,
      message: message || 'Unauthorized',
    });
  },
  forbidden: (res, message) => {
    return res.status(403).json({
      success: false,
      message: message || 'Forbidden',
    });
  },
};

export default APIResponse;
