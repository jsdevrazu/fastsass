import React, { Suspense } from 'react'
import OTPVerificationPage from '@/app/(auth)/reset-password/reset-password-section'
import { GlobalLoader } from '@/components/global-loader'

const Page = () => {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <OTPVerificationPage />
    </Suspense>
  )
}

export default Page