interface Children{
    children: React.ReactNode
}

interface QueryParamsGetJob{
    page: number
    limit:number
    title: string
    location: string
    min_salary:number
    max_salary:number
    job_type: string
}


interface PaymentResponse{
    checkout_url: string
}