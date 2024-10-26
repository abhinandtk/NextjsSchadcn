// serverActions.ts
"use server";

import { signIn,auth,signOut } from "@/auth";

export async function googleSignIn() {
  const session=await auth()
  await signIn("google");
  
}
export async function authsign(){
    const session=await auth()
    return session
}
export async function authsignout(){
  await signOut()
}