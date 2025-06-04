import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <Link href="/">RMS</Link>
            <AuthButton />
        </div>
    </nav>
  );
};

export default Header;