"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data } = useSession();

  const user = data?.user;

  const logout = () => signOut();

  return (
    <nav className="sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="" className="text-xl font-bold">
            BlogHub
          </Link>

          <div className="flex items-center gap-8 font-medium">
            <Link href="">Home</Link>
            <Link href="">Profile</Link>
            {/* menampilkan button sign in saat logout, dan menampilkan button logout saat login */}
            {!user?.id && <Link href="/login">Sing In</Link>}
            {!!user?.id && (
              <>
                <p onClick={() => router.push("/write")}>Write</p>
                <p onClick={logout}>Logout</p>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
