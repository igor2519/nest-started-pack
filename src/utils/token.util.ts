import { sign, verify } from 'jsonwebtoken';

import { ITokenData } from '@interfaces';

export const createJwtToken = (
  data: ITokenData,
  expirationTime: string = process.env.JWT_LIFE_TIME,
) => {
  const token = sign(
    {
      ...data,
    },
    process.env.JWT_SECRET,
    { expiresIn: expirationTime },
  );

  return token;
};

export const verifyJwtToken = (token: string) =>
  verify(token, process.env.JWT_SECRET) as ITokenData;

export default {
  createJwtToken,
  verifyJwtToken,
};
