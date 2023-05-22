require('dotenv').config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const bcryptConstants = {
  saltRounds: Number(process.env.SALT_ROUNDS),
};
