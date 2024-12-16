"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlices";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("blog-storage");
    // action ketika logout di klik
    dispatch(logoutAction());
  };

  return (
    <nav className="bg-slate-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="" className="text-xl font-bold">
            Logo
          </Link>

          <div className="flex items-center gap-8 font-medium">
            <Link href="">Home</Link>
            <Link href="">Profile</Link>
            {/* menampilkan button sign in saat logout, dan menampilkan button logout saat login */}
            {!user.id && <Link href="/login">Sing In</Link>}
            {!!user.id && (
              <>
                <p onClick={() => router.push("/write")}>Write</p>
                <p onClick={logout}>Logout</p>
              </>
            )}

            {/* cara kedua, fungsi sama */}
            {/* {user.id ? <p onClick={logout}>Logout</p> : <Link href="/login">Sing In</Link>} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
