'use server';

import { signIn, signOut } from "@/auth";

export async function signInAction() {
    await signIn("google", { redirectTo: "/wall"});
}

export async function signOutAction() {
    return await signOut();
}