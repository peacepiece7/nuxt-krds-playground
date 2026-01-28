import { inject, computed } from 'vue'
import type { InjectionKey } from 'vue'

/**
 * FormField 에서 provide 되는 Context 타입
 */
export interface FormFieldContext {
  id?: string
  status?: 'error' | 'success' | 'info'
  disabled?: boolean
  required?: boolean
  errorId?: string
  helperId?: string
}

/**
 * FormField 전용 Context Key
 */
export const FormFieldContextKey: InjectionKey<FormFieldContext> =
  Symbol('FormFieldContext')

/**
 * FormField Context 를 사용하는 composable
 */
export function useFormField() {
  const field = inject(FormFieldContextKey)

  if (!field) {
    throw new Error('useFormField must be used within <FormField>')
  }

  const isError = computed(() => field.status === 'error')

  const ariaDescribedBy = computed(() => {
    return (
      [field.helperId, field.errorId].filter(Boolean).join(' ') || undefined
    )
  })

  return {
    /** basic */
    id: computed(() => field.id),
    status: computed(() => field.status),
    disabled: computed(() => field.disabled),
    required: computed(() => field.required),

    /** state */
    isError,

    /** aria */
    errorId: computed(() => field.errorId),
    helperId: computed(() => field.helperId),
    ariaDescribedBy,
  }
}
