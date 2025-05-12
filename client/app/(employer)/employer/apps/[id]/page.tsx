import EmployerApplicationsPage from '@/components/dashboard/employer/job-application';
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    return (
        <EmployerApplicationsPage id={id} />
    )
}

export default Page