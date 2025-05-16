const Hero = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="app_container">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Find Your Dream Job Today
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Search thousands of jobs from top companies and find the perfect match for your skills and experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero