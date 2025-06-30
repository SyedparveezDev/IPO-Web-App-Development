"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

interface FormValidationProps {
  children: React.ReactNode
  onValidationChange?: (isValid: boolean) => void
}

interface FieldValidationProps {
  value: string
  rules: ValidationRule[]
  children: (props: {
    isValid: boolean
    errors: string[]
    showErrors: boolean
  }) => React.ReactNode
}

interface ValidationRule {
  test: (value: string) => boolean
  message: string
}

export function FormValidation({ children, onValidationChange }: FormValidationProps) {
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    onValidationChange?.(isFormValid)
  }, [isFormValid, onValidationChange])

  return <div className="space-y-4">{children}</div>
}

export function FieldValidation({ value, rules, children }: FieldValidationProps) {
  const [showErrors, setShowErrors] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const newErrors = rules.filter((rule) => !rule.test(value)).map((rule) => rule.message)

    setErrors(newErrors)
    setIsValid(newErrors.length === 0 && value.length > 0)
  }, [value, rules])

  const handleBlur = () => {
    setShowErrors(true)
  }

  return (
    <div onBlur={handleBlur}>
      {children({ isValid, errors, showErrors })}
      {showErrors && errors.length > 0 && (
        <div className="mt-1 space-y-1">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          ))}
        </div>
      )}
      {showErrors && isValid && (
        <div className="mt-1 flex items-center text-sm text-green-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          Valid
        </div>
      )}
    </div>
  )
}

// Common validation rules
export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    test: (value) => value.trim().length > 0,
    message,
  }),

  email: (message = "Please enter a valid email address"): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  password: (
    message = "Password must contain at least 8 characters, one uppercase, one lowercase, and one number",
  ): ValidationRule => ({
    test: (value) => value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value),
    message,
  }),
}
