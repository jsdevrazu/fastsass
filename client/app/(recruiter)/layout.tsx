import Layout from "@/components/layouts/main-layout"


export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}
