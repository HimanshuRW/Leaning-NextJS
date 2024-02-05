"use client";

export default function AuthBtn({btnState, clickHandler, children}) {
    let btnClass;
    if (btnState=="able") {
        btnClass = "hover:bg-blue-500 text-blue-700 hover:text-white border-blue-500 hover:border-transparent";
    } else if (btnState=="disable"){
        btnClass = "text-slate-400 border-slate-400";
    } else btnClass = "text-emerald-600 border-emerald-600";
  return (
    <button onClick={btnState=="able" ? clickHandler : null} className={"w-1/4 h-12 my-3 bg-transparent font-semibold py-2 px-4 border rounded "+btnClass}>
                {btnState=="loading" ? "Loading..." : children}
            </button>
  );
}
