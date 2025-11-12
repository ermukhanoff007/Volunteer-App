import { auth } from "@/auth/auth";
import Footer from "@/components/Sections/Footer";
import Header from "@/components/Sections/Header";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="relative">
      <Header session={session} />
      {children}
      <Footer />
    </div>
  );
}
