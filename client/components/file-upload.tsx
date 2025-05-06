"use client"

import { useRef } from "react"
import { Controller, Control } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FileUploadProps {
  name: string
  label?: string
  control: Control<any>
}

export function FileUpload({ name, label, control }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              type="file"
              ref={inputRef}
              onChange={(e) => onChange(e.target.files?.[0])}
            />
            {value && <p className="text-sm text-muted-foreground">{value.name}</p>}
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  )
}
