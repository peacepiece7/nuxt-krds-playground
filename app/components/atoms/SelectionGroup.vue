<script setup lang="ts">
  import { computed, unref, type ComputedRef } from 'vue'
  import HanuiRadioGroup from '~/components/hanui/RadioGroup.vue'
  import HanuiRadio from '~/components/hanui/Radio.vue'
  import HanuiCheckbox from '~/components/hanui/Checkbox.vue'

  type Direction = 'vertical' | 'horizontal'

  export type GroupOption<TValue extends string | number = string> = {
    label: string
    value: TValue
    disabled?: boolean
  }

  type RadioProps<TValue extends string | number = string> = {
    type?: 'radio'
    modelValue: TValue | null
  }

  type CheckboxProps<TValue extends string | number = string> = {
    type: 'checkbox'
    modelValue: TValue[]
  }

  type BaseProps<TValue extends string | number = string> = {
    items: GroupOption<TValue>[]
    direction?: Direction
    label?: string
    disabled?: boolean
    readonly?: boolean
    error?: ComputedRef<boolean> | boolean
    errorMessageId?: ComputedRef<string> | string
  }

  type Props<TValue extends string | number = string> =
    | (BaseProps<TValue> & RadioProps<TValue>)
    | (BaseProps<TValue> & CheckboxProps<TValue>)

  const props = withDefaults(defineProps<Props>(), {
    type: 'radio',
    direction: 'vertical',
    disabled: false,
    readonly: false,
    label: undefined,
    errorMessageId: undefined,
    error: undefined,
  })

  const error = computed(() => unref(props.error))
  const errorMessageId = computed(() => unref(props.errorMessageId))

  const emit = defineEmits<{
    (
      e: 'update:modelValue',
      value: string | number | null | (string | number)[],
    ): void
  }>()

  const value = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v),
  })

  const handleCheckboxToggle = (optValue: string | number) => {
    const current = Array.isArray(value.value) ? value.value : []
    const exists = current.includes(optValue)
    const next = exists ? current.filter((v) => v !== optValue) : [...current, optValue]
    emit('update:modelValue', next)
  }
</script>

<template>
  <div class="selection-group" v-bind="$attrs">
    <div v-if="props.label" class="text-grey-900 mb-2 text-sm font-semibold">
      {{ props.label }}
    </div>

    <div
      class="selection-group__wrapper"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="errorMessageId ?? undefined"
    >
      <HanuiRadioGroup
        v-if="props.type === 'radio'"
        :model-value="value as string | undefined"
        :orientation="props.direction === 'horizontal' ? 'horizontal' : 'vertical'"
        :disabled="props.disabled || props.readonly"
        @update:model-value="(v) => emit('update:modelValue', v)"
      >
        <HanuiRadio
          v-for="opt in props.items"
          :key="String(opt.value)"
          :value="String(opt.value)"
          :label="opt.label"
          :disabled="props.disabled || opt.disabled"
        />
      </HanuiRadioGroup>

      <div v-else class="flex flex-col gap-2">
        <HanuiCheckbox
          v-for="opt in props.items"
          :key="String(opt.value)"
          :model-value="Array.isArray(value) && (value as (string | number)[]).includes(opt.value)"
          :label="opt.label"
          :disabled="props.disabled || opt.disabled || props.readonly"
          @update:model-value="() => handleCheckboxToggle(opt.value)"
        />
      </div>
    </div>
  </div>
</template>
