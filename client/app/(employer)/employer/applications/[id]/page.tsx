import React from 'react'
import MyJobsApplication from './get-applications';

const ViewAllApplicationsPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params;

    return (
        <MyJobsApplication id={id} />
    )
}

export default ViewAllApplicationsPage