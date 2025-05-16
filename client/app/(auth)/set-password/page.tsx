import SetPasswordPage from "@/app/(auth)/set-password/sec-password-client"
import { GlobalLoader } from "@/components/global-loader"
import { Suspense } from "react"

const Page = () => {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <SetPasswordPage />
    </Suspense>
  )
}

export default Page