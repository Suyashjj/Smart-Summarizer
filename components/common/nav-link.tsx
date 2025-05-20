"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navlink({
    href,
    children,
    className,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
    return (
        <Link href={href} 
        onClick={onClick}
        className={cn("transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500", className, isActive && "text-rose-500")}>
        {children}
        </Link>
    );
}


