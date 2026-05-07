import { UnauthorizedError } from "../handleErrors/errors.js";

export const requireAuth = (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      throw new UnauthorizedError("No esta autenticado");
    }

    next();
  } catch (e) {
    if (e instanceof UnauthorizedError) {
      return res.status(e.statusCode).json({
        type: e.name,
        message: e.message,
      });
    }
    next(e);
  }
};
