import { MobileNav, Nav, NavLink } from "./_components/Nav";

export const dynamic = "force-dynamic";

export default function Layouy({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden lg:block">
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
        </Nav>
      </div>

      <div className="block lg:hidden">
        <MobileNav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
        </MobileNav>
      </div>

      <div className=" mx-10 lg:mx-20">{children}</div>
    </>
  );
}
