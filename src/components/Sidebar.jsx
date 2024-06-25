import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Ordenes de Trabajo", path: "/", icon: "ri-list-unordered" },
  {
    name: "Colores",
    path: "/colores",
    icon: "ri-pantone-line",
  },
  { name: "Prendas", path: "/prendas", icon: "ri-shirt-line" },
  { name: "Telas", path: "/telas", icon: "ri-file-paper-2-line" },
];

export default function SideBar() {
  const { pathname } = useLocation();

  return (
    <div className={`flex h-full flex-col px-3 py-4 md:px-2 gap-2`}>
      <Link
        to="/"
        className={`"mb-2 flex h-20 items-center rounded-md p-4 md:h-40"`}
      >
        <div className={`flex flex-row items-center leading-none text-black gap-2`}>
          <img
            src={"/logo_dvl.webp"}
            className="h-20 md:h-20 rounded-full"
            alt="logo"
          />
          <h1 className="text-xl font-extrabold">DVL S.R.L.</h1>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`flex items-center justify-start gap-2 rounded-md p-2 md:p-3 hover:bg-color ${
              pathname === link.path ? "text-mainColor" : "text-black"
            }`}
          >
            <i className={`${link.icon} text-2xl`} />
            <p className="hidden md:block font-bold">{link.name}</p>
          </Link>
        ))}
        <div
          className={`hidden h-auto w-full grow rounded-md bg-zinc-300 md:block`}
        ></div>
      </div>
    </div>
  );
}