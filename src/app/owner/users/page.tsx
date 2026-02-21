"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shield, Crown, User as UserIcon, Calendar, Mail, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: "owner" | "premium" | "user";
    createdAt: string;
}

export default function OwnerUsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"users" | "analytics">("users");
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (session?.user && (session.user as any).role !== "owner") {
            router.push("/");
        } else if (status === "authenticated") {
            fetchUsers();
        }
    }, [status, session]);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/owner/users");
            const data = await res.json();
            if (Array.isArray(data)) {
                setUsers(data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        setUpdatingUserId(userId);
        try {
            const res = await fetch("/api/owner/users/update-role", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, newRole }),
            });

            if (res.ok) {
                setUsers(users.map(u => u._id === userId ? { ...u, role: newRole as any } : u));
            } else {
                const err = await res.json();
                alert(err.error || "Failed to update role");
            }
        } catch (error) {
            console.error("Error updating role:", error);
        } finally {
            setUpdatingUserId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-t-2 border-pink-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground py-32 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[10px] font-bold uppercase tracking-widest">
                                <Shield className="w-3 h-3" /> Owner Administration
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif">Owner <br /><span className="italic text-pink-500">Dashboard</span></h1>
                        </div>

                        {/* Tabs */}
                        <div className="flex bg-foreground/5 p-1 rounded-2xl backdrop-blur-xl border border-white/5">
                            <button
                                onClick={() => setActiveTab("users")}
                                className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "users" ? "bg-background text-pink-500 shadow-xl" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                Users Registry
                            </button>
                            <button
                                onClick={() => setActiveTab("analytics")}
                                className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "analytics" ? "bg-background text-pink-500 shadow-xl" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                System Stats
                            </button>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {activeTab === "users" ? (
                        <motion.div
                            key="users-tab"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {users.map((user, i) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group p-6 rounded-[2.5rem] bg-card/50 backdrop-blur-3xl border border-white/5 hover:border-pink-500/20 transition-all relative overflow-hidden flex flex-col h-full"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="relative">
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/5"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                                        </div>
                                        <div className="text-right">
                                            {user.role === "owner" ? (
                                                <Crown className="w-6 h-6 text-amber-500 ml-auto mb-1" />
                                            ) : user.role === "premium" ? (
                                                <Shield className="w-6 h-6 text-pink-500 ml-auto mb-1" />
                                            ) : (
                                                <UserIcon className="w-6 h-6 text-muted-foreground/20 ml-auto mb-1" />
                                            )}
                                            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">{user.role}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-6">
                                        <h3 className="font-serif font-medium text-xl leading-none">{user.name}</h3>
                                        <p className="text-xs text-muted-foreground/60 flex items-center gap-2">
                                            <Mail className="w-3 h-3" /> {user.email}
                                        </p>
                                    </div>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40 uppercase tracking-widest border-t border-white/5 pt-4">
                                            <Calendar className="w-3 h-3" /> Member Since {new Date(user.createdAt).toLocaleDateString()}
                                        </div>

                                        {/* Role Switcher */}
                                        {user.role !== "owner" && (
                                            <div className="flex items-center gap-2 pt-2">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                    disabled={updatingUserId === user._id}
                                                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-pink-500/50 appearance-none cursor-pointer"
                                                >
                                                    <option value="user">Standard User</option>
                                                    <option value="premium">Premium Artist</option>
                                                </select>
                                                {updatingUserId === user._id && (
                                                    <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="stats-tab"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {[
                                { label: "Total Community", value: users.length, icon: UserIcon },
                                { label: "Premium Artists", value: users.filter(u => u.role === "premium").length, icon: Shield },
                                { label: "Standard Users", value: users.filter(u => u.role === "user").length, icon: Users },
                            ].map((stat, i) => (
                                <div key={i} className="p-10 rounded-[3rem] bg-card border border-white/5 space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                        <p className="text-5xl font-serif text-foreground">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
