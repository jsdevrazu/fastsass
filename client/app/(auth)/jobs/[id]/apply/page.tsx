import JobApplicationPage from "@/components/jobs/apply-form"

export default async function Page({ params }: { params: { id: string } }) {

  const { id } = await params
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${id}/detail`)
  const { job } = await data.json() as SingleJobsResponse



  return (
    <JobApplicationPage job={job} />
  )
}
