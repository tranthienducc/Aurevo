import Navbar from "@/components/navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  // if (!entitlement._valueJSON) {
  //   redirect(`/dashboard/${combinedSlug(profileName!)}`);
  // }
  return (
    <div className="grid grid-cols-1 h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
