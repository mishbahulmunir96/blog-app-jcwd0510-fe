import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

export default function AuthGuard(Components: any) {
  return function isAuth(props: any) {
    const { id } = useAppSelector((state) => state.user);

    if (!id) {
      return redirect("/login");
    }

    return <Components {...props} />;
  };
}
