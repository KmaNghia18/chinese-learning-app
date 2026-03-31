"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";
interface User { id:number; username:string; email:string; display_name:string; hsk_level:string; streak_days:number; }
interface AuthCtx { user:User|null; token:string|null; login:(email:string,pw:string)=>Promise<void>; register:(data:object)=>Promise<void>; logout:()=>void; loading:boolean; }
const Ctx = createContext<AuthCtx>({} as AuthCtx);
export function AuthProvider({children}:{children:ReactNode}) {
  const [user,setUser]=useState<User|null>(null);
  const [token,setToken]=useState<string|null>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const t=localStorage.getItem('cl_token');
    if(t){setToken(t);api.me().then(r=>setUser(r.user)).catch(()=>localStorage.removeItem('cl_token')).finally(()=>setLoading(false));}
    else setLoading(false);
  },[]);
  const login=async(email:string,pw:string)=>{const r=await api.login({email,password:pw});localStorage.setItem('cl_token',r.token);setToken(r.token);setUser(r.user);};
  const register=async(data:object)=>{const r=await api.register(data);localStorage.setItem('cl_token',r.token);setToken(r.token);setUser(r.user);};
  const logout=()=>{localStorage.removeItem('cl_token');setToken(null);setUser(null);};
  return <Ctx.Provider value={{user,token,login,register,logout,loading}}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
