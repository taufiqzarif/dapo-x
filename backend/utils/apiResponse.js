const APIResponse = {
  success: (res, data, message) => {
    return res.status(200).json({
      success: true,
      data: data,
      message: message,
    });
  },
  badRequest: (res, message) => {
    return res.status(400).json({
      success: false,
      message: message,
    });
  },
  notFound: (res, message) => {
    return res.status(404).json({
      success: false,
      message: message,
    });
  },
  unauthorized: (res, message) => {
    return res.status(401).json({
      success: false,
      message: message,
    });
  },
  forbidden: (res, message) => {
    return res.status(403).json({
      success: false,
      message: message,
    });
  },
};

export default APIResponse;
