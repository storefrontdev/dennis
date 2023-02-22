import Link from "next/link"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const Navigation = () => {
  return (
    <div className="bg-gray-800 w-full px-3 py-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="text-white font-bold text-2xl">Dennis</div>
        </div>
        <div className="flex flex-row items-center">
          {links.map(({ href, label }) => (
            <div key={label} className="mr-5">
              <Link href={href} className="text-white font-bold text-lg">
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;