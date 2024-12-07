import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .minUppercase(1)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1),
});
