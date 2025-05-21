"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CandidateCardProps {
  candidate: {
    id: string
    name: string
    position: string
    location: string
    email: string
    phone: string
    skills: string[]
    experience: number
    rating: number
    avatar: string
  }
  onContact: (id: string) => void
  onViewProfile: (id: string) => void
}

const CandidateCard = ({ candidate, onContact, onViewProfile }: CandidateCardProps) => {
  const { name, position, avatar, id } = candidate

  return (
    <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium">{name}</p>
          </div>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => onContact(id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Contact
        </button>
        <button
          onClick={() => onViewProfile(id)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          View Profile
        </button>
      </div>
    </div>
  )
}

export default CandidateCard
