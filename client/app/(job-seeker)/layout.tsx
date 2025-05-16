import Layout from "@/components/layouts/main-layout"

export default function JobSeekerLayout({
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
