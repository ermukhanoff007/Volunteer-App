import { auth } from "@/auth/auth";
import Header from "@/components/Header";


export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
}
