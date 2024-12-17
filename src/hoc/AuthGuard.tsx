import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AuthGuard(Components: any) {
  return async function isAuth(props: any) {
    const session = await auth();

    if (!session) return redirect("/login");

    return <Components {...props} />;
  };
}
