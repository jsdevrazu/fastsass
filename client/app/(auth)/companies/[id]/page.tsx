import CompanyDetailsPage from "./company-details"


export default async function Page({ params }: { params: { id: string } }) {

    const { id } = await params
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/company/${id}`)
    const { company } = await data.json() as SingleCompanyResponse


    return (
        <CompanyDetailsPage company={company} id={id}  />
    )
}
