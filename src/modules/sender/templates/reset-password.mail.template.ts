import { IMailTemplate } from '../interfaces/mail-template.interface';

export const resetPasswordTemplate = (link): IMailTemplate => ({
  text: `Reset password link: ${link}`,
  html: `
    <div>
      <h3>Leasing Offers</h3>
      <p>
      <a href="${link}">Click here to reset your password</a>
      </p>
    </div>
  `
});
