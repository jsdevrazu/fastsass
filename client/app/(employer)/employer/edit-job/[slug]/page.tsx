import PostJobPage from '@/components/dashboard/employer/post-job'
import React from 'react'
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from '@/constants'
import { notFound, redirect } from 'next/navigation';


const Page = async ({ params }: { params: { slug: string } }) => {

  const { slug } = await params
  const cookie = await cookies()
  const token = cookie.get(ACCESS_TOKEN)?.value;

  if (!token) redirect('/login')
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${slug}/edit/detail`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })
  const { job } = await data.json() as SingleJobsResponse

  if (!job) {
    notFound()
  }


  return (
    <PostJobPage job={job} />
  )
}

export default Page