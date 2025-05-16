import Layout from "@/components/layouts/main-layout"


export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <Layout>{children}</Layout>
  }