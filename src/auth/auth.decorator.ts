import { SetMetadata, createParamDecorator } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator((data, req) => {
  return req.args[0].user;
});
