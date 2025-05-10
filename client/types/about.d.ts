
interface ValueCardProps {
    icon: React.JSX.Element,
    title: string,
    description: string,
}

interface TimelineItemProps {
    year: string,
    title: string,
    description: string,
    isLeft: boolean
}

interface TeamMemberProps{
    name: string, 
    role: string, 
    image: string
}


interface StatCardProps{
    number: string,
     label: string
}


interface AwardCardProps{
    year: string, 
    award: string, 
    organization: string
}

interface OfficeCardProps{
    city: string, 
    address: string, 
    image: string
}