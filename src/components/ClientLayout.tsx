"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import React from "react";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isSharePage = pathname?.startsWith("/share");
    const isHomePage = pathname === "/";

    // We remove default top padding for Share page and Home page (for immersive hero)
    const shouldAddPadding = !isSharePage && !isHomePage;

    return (
        <>
            {!isSharePage && <Header />}
            <div className={shouldAddPadding ? "pt-20" : ""}>
                {children}
            </div>
        </>
    );
};
