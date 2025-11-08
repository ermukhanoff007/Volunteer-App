import { auth } from "@/auth/auth";
import Header from "@/components/Header";


export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log("MainLayout session:", session);
  return (
    <div className="relative">
      <Header session={session} />
      {children}
    </div>
  );
}
