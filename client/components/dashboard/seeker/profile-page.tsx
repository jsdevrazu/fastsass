"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    FileText,
    Globe,
    Loader2,
    MapPin,
    Plus,
    Upload,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AddExperienceModal } from "@/components/modals/add-experience-modal"
import { AddCertificationModal } from "@/components/modals/add-certification-modal"
import { ExperienceCard } from "@/components/experience-card"
import { CertificationCard } from "@/components/certification-card"
import { useAuthStore } from "@/store/store"
import { baseURLPhoto } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { update_current_user, upload_resume } from "@/lib/apis/auth"
import { toast } from "sonner"
import { SkillBadge } from "@/components/skill-badge"
import { AddSkillModal } from "@/components/modals/add-skill-modal"
import { OverlayLock } from "@/components/overlay-lock"
import { mapResumeEducationToEntity, mapResumeExperienceToEntity, mapResumeSkillsToEntity } from "@/lib/utils"


const initalState = {
    degree_name: "",
    institution: "",
    start_date: "",
    end_date: ""
}

export default function JobSeekerProfilePage() {
    const { user } = useAuthStore()
    const [experiences, setExperiences] = useState<ExperienceEntity[]>(user?.experience ?? [])
    const [certifications, setCertifications] = useState<CertificationsEntity[]>(user?.certifications ?? [])
    const [skills, setSkills] = useState<SkillsEntity[]>(user?.skills ?? [])
    const [education, setEducation] = useState<Education>(initalState)
    const [experienceModalOpen, setExperienceModalOpen] = useState(false)
    const [certificationModalOpen, setCertificationModalOpen] = useState(false)
    const [skillModalOpen, setSkillModalOpen] = useState(false)
    const [editingExperience, setEditingExperience] = useState<ExperienceEntity | null>(null)
    const [editingCertification, setEditingCertification] = useState<CertificationsEntity | null>(null)
    const [editingSkillId, setEditingSkillId] = useState<string | null>(null)


    const editingSkill = editingSkillId ? user?.skills?.find((skill) => skill.id === editingSkillId) || null : null


    const [formState, setFormState] = useState<ProfileFormState>({
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        email: user?.email ?? '',
        phone_number: user?.phone_number ?? '',
        location: user?.location ?? '',
        head_line_title: user?.head_line_title ?? '',
        website: user?.website ?? '',
        linkedin_profile: user?.linkedin_profile ?? '',
        github_profile: user?.github_profile ?? '',
        summary: user?.summary ?? '',
        avatar: null
    })

    const { isPending, mutate } = useMutation({
        mutationFn: update_current_user,
        onSuccess: () => {
            toast.success("Profile updated")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { isPending: uploading, mutate: mnFun } = useMutation({
        mutationFn: upload_resume,
        onSuccess: (data) => {
            const cleaned = data?.parsed_resume?.replace(/```json|```/g, '').trim() ?? '';
            const resume_preview: ResumePreview = JSON.parse(cleaned);

            setFormState((prev) => ({
                ...prev,
                first_name: resume_preview.full_name?.split(' ')[0] ?? prev.first_name,
                last_name: resume_preview.full_name?.split(' ')[1] ?? prev.last_name,
                email: resume_preview.email ?? prev.email,
                phone_number: resume_preview.phone ?? prev.phone_number,
                location: resume_preview.location ?? prev.location,
                summary: resume_preview.summary ?? prev.summary,
                github_profile: resume_preview.github ?? prev.github_profile,
                linkedin_profile: resume_preview.linkedin ?? prev.linkedin_profile,
                website: resume_preview.website ?? prev.website,
                head_line_title: resume_preview?.title ?? prev.head_line_title
            }));


            const resumeExperiences: ExperienceEntityResumePreview[] = resume_preview.experience ?? [];
            const resumeSkills: string[] = resume_preview.skills ?? [];
            const resumeEducation: EducationEntityResumePreview | undefined | null = resume_preview.education && resume_preview.education[0];
            const formattedExperiences = resumeExperiences.map(mapResumeExperienceToEntity);
            const formattedSkills = resumeSkills.map(mapResumeSkillsToEntity);
            const formattedEducation = mapResumeEducationToEntity(resumeEducation)
            console.log(resumeEducation, "resume_preview.education", formattedEducation)


            setExperiences((prev) => [
                ...prev,
                ...formattedExperiences
            ]);
            setSkills((prev) => [
                ...prev,
                ...formattedSkills
            ]);
            
            setEducation({
                degree_name: formattedEducation.degree_name,
                institution: formattedEducation.institution,
                start_date: '',
                end_date: ''
            });


            toast.success("Profile updated from resume!");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;

        setFormState(prev => ({
            ...prev,
            [name]: type === "file" ? (target.files?.[0] || null) : value
        }));
    };

    const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setEducation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("first_name", formState.first_name)
        formData.append("last_name", formState.last_name)
        formData.append("email", formState.email)
        formData.append("phone_number", formState.phone_number)
        formData.append("location", formState.location)
        formData.append("head_line_title", formState.head_line_title)
        formData.append("website", formState.website)
        formData.append("linkedin_profile", formState.linkedin_profile)
        formData.append("github_profile", formState.github_profile)
        formData.append("experience", JSON.stringify(experiences))
        formData.append("education", JSON.stringify(education))
        formData.append("certifications", JSON.stringify(certifications))
        formData.append("skills", JSON.stringify(skills))
        formData.append("summary", formState.summary)

        if (formState.avatar instanceof File) {
            formData.append("avatar", formState.avatar)
        }

        mutate(formData)
    }


    const handleAddExperience = (newExperience: Omit<ExperienceEntity, "id">) => {
        const experienceWithId = {
            ...newExperience,
            id: `exp${Date.now()}`,
        }
        setExperiences([experienceWithId, ...experiences])
    }

    const handleEditExperience = (data: ExperienceEntity) => {
        setEditingExperience(data)
        setExperienceModalOpen(true)
    }

    const handleDeleteExperience = (id: string) => {
        setExperiences(experiences?.filter((exp) => exp.id !== id))
    }

    const handleAddCertification = (newCertification: Omit<CertificationsEntity, "id">) => {
        const certificationWithId = {
            ...newCertification,
            id: `cert${Date.now()}`,
        }
        setCertifications([certificationWithId, ...certifications])
    }

    const handleEditCertification = (data: CertificationsEntity) => {
        setEditingCertification(data)
        setCertificationModalOpen(true)
    }

    const handleDeleteCertification = (id: string) => {
        setCertifications(certifications?.filter((cert) => cert.id !== id))
    }

    const handleAddSkill = (newSkill: Omit<SkillsEntity, "id">) => {
        if (editingSkillId) {
            setSkills(
                skills.map((skill) =>
                    skill.id === editingSkillId ? { ...skill, name: newSkill.name, proficiency: newSkill.level } : skill,
                ),
            )
            setEditingSkillId(null)
        } else {
            const skillWithId = {
                ...newSkill,
                id: `skill${Date.now()}`,
            }
            setSkills([...skills, skillWithId])
        }
    }

    const handleEditSkill = (id: string) => {
        setEditingSkillId(id)
        setSkillModalOpen(true)
    }

    const handleDeleteSkill = (id: string) => {
        setSkills(skills.filter((skill) => skill.id !== id))
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return


        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit.")
            return
        }

        const form = new FormData()
        form.append("resume", file)
        mnFun(form)

    }



    useEffect(() => {
        setFormState({
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            email: user?.email ?? '',
            phone_number: user?.phone_number ?? '',
            location: user?.location ?? '',
            head_line_title: user?.head_line_title ?? '',
            website: user?.website ?? '',
            linkedin_profile: user?.linkedin_profile ?? '',
            github_profile: user?.github_profile ?? '',
            summary: user?.summary ?? '',
            avatar: null
        })
        setSkills(user?.skills ?? [])
        setExperiences(user?.experience ?? [])
        setCertifications(user?.certifications ?? [])
        setEducation(user?.education ?? initalState)
    }, [user])

    return (
        <>
            <OverlayLock visible={uploading} />
            <main>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
                        <p className="text-muted-foreground">Complete your profile to increase your chances of getting hired</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update your personal details and contact information</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <Avatar className="h-24 w-24">
                                                        <AvatarImage className="object-cover" src={`${baseURLPhoto(user?.avatar ?? '')}?height=96&width=96`} alt="Profile Picture" />
                                                        <AvatarFallback className="text-2xl">
                                                            {user?.first_name?.slice(0, 2)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                                                        type="button"
                                                    >
                                                        <Label htmlFor="avatar">
                                                            <Upload className="h-4 w-4" />
                                                        </Label>
                                                        <Input id="avatar" name='avatar' accept="image/*" type="file" className="w-full h-full absolute top-0 hidden" onChange={handleChange} />
                                                        <span className="sr-only">Upload photo</span>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium">Profile Picture</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Upload a professional photo to make your profile stand out
                                                </p>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="first-name">First name</Label>
                                                <Input id="first-name" value={formState.first_name} name="first_name" onChange={handleChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="last-name">Last name</Label>
                                                <Input id="last-name" value={formState.last_name} name="last_name" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" value={formState.email} name="email" onChange={handleChange} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone number</Label>
                                                <Input id="phone" type="tel" value={formState.phone_number} name="phone_number" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <div className="flex">
                                                    <div className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                                                        <MapPin className="h-4 w-4" />
                                                    </div>
                                                    <Input id="location" className="rounded-l-none" classNameRoot="flex-1" value={formState.location} name="location" onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="headline">Professional Headline</Label>
                                                <Input
                                                    id="headline"
                                                    name='head_line_title'
                                                    value={formState.head_line_title}
                                                    onChange={handleChange}
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    A short headline that summarizes your professional identity
                                                </p>
                                            </div>
                                        </div>



                                        <div className="space-y-2">
                                            <Label htmlFor="summary">Professional Summary</Label>
                                            <Textarea
                                                id="summary"
                                                className="min-h-[150px]"
                                                value={formState.summary}
                                                name="summary"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Experience</CardTitle>
                                        <CardDescription>Showcase your professional experience</CardDescription>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setEditingExperience(null)
                                            setExperienceModalOpen(true)
                                        }}
                                        className="ml-auto"
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add Experience
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {experiences?.length === 0 ? (
                                            <div className="rounded-lg border border-dashed p-8 text-center">
                                                <h3 className="text-lg font-medium">No experience added yet</h3>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Add your work experience to showcase your professional background.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    className="mt-4"
                                                    onClick={() => {
                                                        setEditingExperience(null)
                                                        setExperienceModalOpen(true)
                                                    }}
                                                    type="button"
                                                >
                                                    <Plus className="mr-2 h-4 w-4" /> Add Your First Experience
                                                </Button>
                                            </div>
                                        ) : (
                                            experiences?.map((experience, index) => (
                                                <ExperienceCard
                                                    key={index}
                                                    experience={experience}
                                                    onEdit={handleEditExperience}
                                                    onDelete={handleDeleteExperience}
                                                />
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Skills</CardTitle>
                                        <CardDescription>Add your technical and professional skills</CardDescription>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setEditingSkillId(null)
                                            setSkillModalOpen(true)
                                        }}
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add Skill
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {skills.length === 0 ? (
                                        <div className="rounded-lg border border-dashed p-8 text-center">
                                            <h3 className="text-lg font-medium">No skills added yet</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Add your skills to showcase your expertise to potential employers.
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="mt-4"
                                                onClick={() => {
                                                    setEditingSkillId(null)
                                                    setSkillModalOpen(true)
                                                }}
                                                type="button"
                                            >
                                                <Plus className="mr-2 h-4 w-4" /> Add Your First Skill
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-3">
                                            {skills?.map((skill) => (
                                                <SkillBadge
                                                    key={skill.id}
                                                    skill={skill}
                                                    onEdit={handleEditSkill}
                                                    onDelete={handleDeleteSkill}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Education & Certifications</CardTitle>
                                        <CardDescription>Add your educational background and certifications</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="degree">Degree/Certificate</Label>
                                        <Input id="degree" name='degree_name' value={education.degree_name} onChange={handleEducationChange} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="institution">Institution</Label>
                                        <Input id="institution" name='institution' value={education.institution} onChange={handleEducationChange} />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="edu-start-date">Start Date</Label>
                                            <Input id="edu-start-date" name='start_date' value={education.start_date} onChange={handleEducationChange} type="month" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="edu-end-date">End Date</Label>
                                            <Input id="edu-end-date" type="month" name='end_date' value={education.end_date} onChange={handleEducationChange} />
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-semibold leading-none tracking-tight">Certifications</h3>
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    setEditingCertification(null)
                                                    setCertificationModalOpen(true)
                                                }}
                                            >
                                                <Plus className="mr-2 h-4 w-4" /> Add Certification
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {certifications?.length === 0 ? (
                                                <div className="rounded-lg border border-dashed p-8 text-center">
                                                    <h3 className="text-lg font-medium">No certifications added yet</h3>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Add your professional certifications to showcase your skills and knowledge.
                                                    </p>
                                                    <Button
                                                        variant="outline"
                                                        className="mt-4"
                                                        onClick={() => {
                                                            setEditingCertification(null)
                                                            setCertificationModalOpen(true)
                                                        }}
                                                    >
                                                        <Plus className="mr-2 h-4 w-4" /> Add Your First Certification
                                                    </Button>
                                                </div>
                                            ) : (
                                                certifications?.map((certification: CertificationsEntity) => (
                                                    <CertificationCard
                                                        key={certification.name}
                                                        certification={certification}
                                                        onEdit={handleEditCertification}
                                                        onDelete={handleDeleteCertification}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Resume & Portfolio</CardTitle>
                                    <CardDescription>Upload your resume and add links to your portfolio</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Resume/CV</Label>
                                        <div className="flex items-center gap-4 flex-wrap">
                                            {user?.resume && (
                                                <div className="rounded-md border p-2 px-4 flex items-center gap-2 bg-muted">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm truncate max-w-[200px]">{user?.resume}</span>
                                                </div>
                                            )}

                                            <div className="relative">
                                                <Input
                                                    id="resume"
                                                    type="file"
                                                    accept="application/pdf"
                                                    className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                                                    name="resume"
                                                    onChange={handleFileUpload}
                                                    disabled={uploading}
                                                />
                                                <Button variant="outline" size="sm">
                                                    {user?.resume ? "Update Resume" : "Upload Resume"}
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Upload your resume in PDF format (max 5MB)
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="portfolio">Portfolio/Website</Label>
                                            <div className="flex">
                                                <div className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                                                    <Globe className="h-4 w-4" />
                                                </div>
                                                <Input id="portfolio" classNameRoot="flex-1" className="rounded-l-none" name='website' value={formState.website} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                            <Input id="linkedin" value={formState.linkedin_profile} name="linkedin_profile" onChange={handleChange} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="github">GitHub Profile</Label>
                                            <Input id="github" value={formState.github_profile} name="github_profile" onChange={handleChange} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-4">
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Saving..." : "Save Profile"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <AddExperienceModal
                open={experienceModalOpen}
                onOpenChange={setExperienceModalOpen}
                onSave={handleAddExperience}
                editingExperience={editingExperience}
            />

            <AddCertificationModal
                open={certificationModalOpen}
                onOpenChange={setCertificationModalOpen}
                onSave={handleAddCertification}
                editingCertification={editingCertification}
            />

            <AddSkillModal
                open={skillModalOpen}
                onOpenChange={setSkillModalOpen}
                onSave={handleAddSkill}
                editingSkill={editingSkill}
            />
        </>
    )
}
