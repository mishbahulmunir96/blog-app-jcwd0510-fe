import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("password is required")
    .minUppercase(1)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1),
  confirmPassword: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password")], "Your password ora podo"),
});
