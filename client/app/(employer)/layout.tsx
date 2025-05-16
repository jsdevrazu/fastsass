import Layout from "@/components/layouts/main-layout"



export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}
