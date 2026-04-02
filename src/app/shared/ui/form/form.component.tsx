import * as React from 'react'
import { Controller, type ControllerProps, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'

import { cn } from '@/app/shared/utils/cn.service'

type FormProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>
  onSubmit: (values: TFieldValues) => void | Promise<void>
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

function Form<TFieldValues extends FieldValues>({ form, onSubmit, className, ...props }: FormProps<TFieldValues>) {
  return <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4', className)} {...props} />
}

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>

function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: FormFieldProps<TFieldValues, TName>,
) {
  return <Controller {...props} />
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />,
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm leading-none font-medium text-zinc-700 dark:text-zinc-300', className)}
      {...props}
    />
  ),
)
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />,
)
FormControl.displayName = 'FormControl'

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null
    return (
      <p ref={ref} className={cn('text-xs font-medium text-red-500', className)} {...props}>
        {children}
      </p>
    )
  },
)
FormMessage.displayName = 'FormMessage'

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage }
