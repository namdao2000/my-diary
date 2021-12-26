import { ReactElement } from "react";

export const Navbar = (): ReactElement => {
  return (
    <div className="flex justify-start bg-slate-200 rounded-full">
      <div>Home</div>
      <div>Diary</div>
      <div>Login</div>
      <div>Signup</div>
    </div>
  )
}