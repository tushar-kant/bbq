"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export const HeaderWrapper = () => {
    const pathname = usePathname();

    // Hide header on sharing pages
    if (pathname?.startsWith("/share")) {
        return null;
    }

    return <Header />;
};
