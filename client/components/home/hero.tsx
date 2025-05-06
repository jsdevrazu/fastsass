import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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
                    <div className="w-full max-w-sm space-y-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search jobs..." className="w-full bg-background pl-8 rounded-lg" />
                        </div>
                        <Button className="w-full">Search Jobs</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero