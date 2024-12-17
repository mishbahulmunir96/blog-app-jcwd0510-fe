import WritePage from "@/features/write";
import AuthGuard from "@/hoc/AuthGuard";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

const Write = async () => {
  // dibawah ini dipindah ke hoc/AuthGuard
  // // protect write login, harus login jika masuk page ini
  // const session = await auth();

  // if (!session) return redirect("/login");
  // // protect end

  return <WritePage />;
};

export default AuthGuard(Write);
