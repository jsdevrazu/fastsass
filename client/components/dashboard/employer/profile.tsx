"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Globe,
  MapPin,
  Upload,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { CompanyFormData, companySchema } from "@/validation/auth.validation"
import { useMutation } from "@tanstack/react-query"
import { update_employer_information } from "@/lib/apis/auth"
import { toast } from "sonner"
import ErrorMessage from "@/components/error-message"
import { useAuthStore } from "@/store/store"
import { baseURLPhoto } from "@/lib/axios"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import industries from '@/dump/industry.json'
import company_size from '@/dump/company_size.json'

export default function EmployerCompanyPage() {

  const { user } = useAuthStore()
  const [preview, setPreview] = useState('')

  const { isPending, mutate } = useMutation({
    mutationFn: update_employer_information,
    onSuccess: () => {
      toast.success("Profile Update Success")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  })

  const onSubmit = (formState: CompanyFormData) => {

    const formData = new FormData()

    formData.append("name", formState.name ?? '')
    if (formState.logo instanceof File) {
      formData.append("logo", formState.logo);
    }
    formData.append("website", formState.website ?? '')
    formData.append("industry", formState.industry ?? '')
    formData.append("company_size", formState.company_size ?? '')
    formData.append("headquatar_location", formState.headquatar_location ?? '')
    formData.append("company_description", formState.company_description ?? '')

    formData.append("comapnies_calture", JSON.stringify({
      mission_statement: formState?.mission_statement ?? '',
      core_value: formState?.core_value ?? '',
      benefit: formState?.benefit ?? '',
    }))

    formData.append("social_media", JSON.stringify({
      linkedin: formState?.linkedin ?? '',
      twitter: formState?.twitter ?? '',
      facebook: formState?.facebook ?? '',
      instagram: formState?.instagram ?? '',
      contact_email: formState?.contact_email ?? '',
      phone_number: formState?.phone_number ?? '',
    }))

    mutate(formData)

  }

  useEffect(() => {
    setValue("name", user?.comapny?.name)
    setValue("website", user?.comapny?.website)
    setValue("industry", user?.comapny?.industry)
    setValue("company_description", user?.comapny?.company_description)
    setValue("company_size", user?.comapny?.company_size)
    setValue("headquatar_location", user?.comapny?.headquatar_location)
    setValue("core_value", user?.comapny?.comapnies_calture?.core_value)
    setValue("benefit", user?.comapny?.comapnies_calture?.benefit)
    setValue("mission_statement", user?.comapny?.comapnies_calture?.mission_statement)
    setValue("linkedin", user?.comapny?.social_media?.linkedin)
    setValue("facebook", user?.comapny?.social_media?.facebook)
    setValue("instagram", user?.comapny?.social_media?.instagram)
    setValue("twitter", user?.comapny?.social_media?.twitter)
    setValue("contact_email", user?.comapny?.social_media?.contact_email)
    setValue("phone_number", user?.comapny?.social_media?.phone_number)
  }, [user])



  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Company Profile</h2>
              <p className="text-muted-foreground">Manage your company information and branding</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>
                      This information will be displayed publicly on your company profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={`${preview || baseURLPhoto(user?.comapny?.logo ?? '')}?height=96&width=96`} alt="Company Logo" />
                              <AvatarFallback className="text-2xl">TC</AvatarFallback>
                            </Avatar>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                              type="button"
                            >
                              <Label htmlFor="logo">
                                <Upload className="h-4 w-4" />
                              </Label>
                              <Input id="logo" accept="image/*" type="file" className="w-full h-full absolute top-0 hidden" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setValue("logo", file);
                                  setPreview(URL.createObjectURL(file));
                                }
                              }} />
                              <span className="sr-only">Upload logo</span>
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium">{user?.comapny?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Upload a square logo of at least 200x200 pixels
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" {...register("name")} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-website">Website</Label>
                        <div className="flex">
                          <div className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                            <Globe className="h-4 w-4" />
                          </div>
                          <Input
                            id="company-website"
                            className="rounded-l-none"
                            {...register("website")}
                            error={errors?.website?.message?.toString()}
                          />
                        </div>
                        {errors.website && <ErrorMessage message={errors?.website?.message?.toString() ?? ''} />}
                      </div>

                      <Controller
                        control={control}
                        name="industry"
                        render={({ field }) => (
                          <div className="space-y-2">
                            <Label htmlFor="company-industry">Industry</Label>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {industries?.map((item) => (
                                    <SelectItem key={item} value={item}>
                                      {item}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />

                      <Controller
                        control={control}
                        name="company_size"
                        render={({ field }) => (
                          <div className="space-y-2">
                            <Label htmlFor="company-size">Company Size</Label>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Company Size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {
                                    company_size?.map((item) => (
                                      <SelectItem key={item} value={item}>{item}</SelectItem>
                                    ))
                                  }
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />



                      <div className="space-y-2">
                        <Label htmlFor="company-location">Headquarters Location</Label>
                        <div className="flex">
                          <div className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <Input
                            id="company-location"
                            className="rounded-l-none"
                            {...register("headquatar_location")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-description">Company Description</Label>
                        <Textarea
                          id="company-description"
                          className="min-h-[150px]"
                          {...register("company_description")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Company Culture</CardTitle>
                    <CardDescription>Showcase your company culture to attract the right candidates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-mission">Mission Statement</Label>
                      <Textarea
                        id="company-mission"
                        className="min-h-[100px]"
                        {...register("mission_statement")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-values">Core Values</Label>
                      <Textarea
                        id="company-values"
                        className="min-h-[100px]"
                        {...register("core_value")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-benefits">Benefits & Perks</Label>
                      <Textarea
                        id="company-benefits"
                        className="min-h-[100px]"
                        {...register("benefit")}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media & Contact</CardTitle>
                    <CardDescription>Add your social media profiles and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company-linkedin">LinkedIn</Label>
                        <Input id="company-linkedin" {...register("linkedin")} error={errors?.linkedin?.message?.toString()} />
                        {errors.linkedin && <ErrorMessage message={errors?.linkedin?.message?.toString() ?? ''} />}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-twitter">Twitter</Label>
                        <Input id="company-twitter" {...register("twitter")} error={errors?.twitter?.message?.toString()} />
                        {errors.twitter && <ErrorMessage message={errors?.twitter?.message?.toString() ?? ''} />}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-facebook">Facebook</Label>
                        <Input id="company-facebook" {...register("facebook")} error={errors?.facebook?.message?.toString()} />
                        {errors.facebook && <ErrorMessage message={errors?.facebook?.message?.toString() ?? ''} />}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-instagram">Instagram</Label>
                        <Input id="company-instagram" {...register("instagram")} error={errors?.instagram?.message?.toString()} />
                        {errors.instagram && <ErrorMessage message={errors?.instagram?.message?.toString() ?? ''} />}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-email">Contact Email</Label>
                      <Input id="company-email" type="email" {...register("contact_email")} error={errors?.contact_email?.message?.toString()} />
                      {errors.contact_email && <ErrorMessage message={errors?.contact_email?.message?.toString() ?? ''} />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Contact Phone</Label>
                      <Input id="company-phone" type="tel" {...register("phone_number")} />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
