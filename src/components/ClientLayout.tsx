"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import React from "react";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isSharePage = pathname?.startsWith("/share");

    return (
        <>
            {!isSharePage && <Header />}
            <div className={!isSharePage ? "pt-20" : ""}>
                {children}
            </div>
        </>
    );
};
