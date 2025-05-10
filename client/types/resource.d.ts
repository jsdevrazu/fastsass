
interface ResourceCardProps{
    icon: React.JSX.Element,
    title: string,
    description: string,
    link: string
}

interface DownloadCardProps{
    title: string
    description: string
    fileType: string
    fileSize: string
}

interface ToolCardProps{
    title: string
    description: string
}

interface VideoCardProps{
    title: string, 
    duration: string, 
    thumbnail: string
}

interface FaqItemProps{
    question: string
    answer: string
}

interface CaseStudyCardProps{
    title:string,
    industry:string, 
    result:string
}

interface WebinarCardProps{
    title: string, 
    date: string, 
    time:string
}