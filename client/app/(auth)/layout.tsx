import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

export default function AuthLayout({
    children,
}: Children) {
    return <>
        <Header />
        {children}
        <Footer />
    </>
}