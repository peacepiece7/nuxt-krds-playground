<script setup lang="ts">
  import { usePubGuideStore } from '~/stores/pubGuildStore'

  const pubGuideStore = usePubGuideStore()

  const strRefs = ref<any[]>([])
  const numRefs = ref<number[]>([])
  const emailRef = ref('')
  const telRef = ref('')
  const urlRef = ref('')
  const numberRef = ref('')
  const usernameRef = ref('')
  const passwordRef = ref('')
  const ageRef = ref('')
  const emailErrorRef = ref('이메일 형식이 올바르지 않습니다')

  const handleClickAppendInner = () => {
    alert('click append inner')
  }

  // 고유한 ID 생성 함수
  const generateInputId = (index: number, prefix = 'input') => {
    return `${prefix}-${index}`
  }
</script>

<template>
  <!-- Input 섹션 -->
  <section class="border-grey-300 min-h-[420px] rounded-3xl border p-10">
    <h3 class="m-0 mb-4 text-2xl font-bold">Input</h3>

    <div class="grid max-w-[720px] gap-4">
      <!-- Size Variants -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(0, 'size')"
          class="text-grey-600 text-sm font-medium"
          >Size Variants</FormLabel
        >
        <FormLabel :for="generateInputId(0, 'size')" class="sr-only"
          >TEXT FIELD SM</FormLabel
        >
        <Input
          :id="generateInputId(0, 'size')"
          v-model="strRefs[0]"
          placeholder="TEXT FIELD SM"
          size="sm"
        />
        <FormLabel :for="generateInputId(1, 'size')" class="sr-only"
          >TEXT FIELD MD (default)</FormLabel
        >
        <Input
          :id="generateInputId(1, 'size')"
          v-model="strRefs[1]"
          placeholder="TEXT FIELD MD (default)"
          size="md"
        />
        <FormLabel :for="generateInputId(2, 'size')" class="sr-only"
          >TEXT FIELD LG</FormLabel
        >
        <Input
          :id="generateInputId(2, 'size')"
          v-model="strRefs[2]"
          placeholder="TEXT FIELD LG"
          size="lg"
        />
      </div>

      <!-- Variant Types -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(3, 'variant')"
          class="text-grey-600 text-sm font-medium"
          >Variant Types</FormLabel
        >
        <FormLabel :for="generateInputId(3, 'variant')" class="sr-only"
          >Default variant</FormLabel
        >
        <Input
          :id="generateInputId(3, 'variant')"
          v-model="strRefs[3]"
          placeholder="Default variant"
          variant="default"
        />
        <FormLabel :for="generateInputId(4, 'variant')" class="sr-only"
          >Filled variant</FormLabel
        >
        <Input
          :id="generateInputId(4, 'variant')"
          v-model="strRefs[4]"
          placeholder="Filled variant"
          variant="filled"
        />
      </div>

      <!-- States -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(5, 'state')"
          class="text-grey-600 text-sm font-medium"
          >States</FormLabel
        >
        <div class="flex gap-4">
          <div class="flex-1">
            <FormLabel :for="generateInputId(5, 'state')" class="sr-only"
              >Readonly</FormLabel
            >
            <Input
              :id="generateInputId(5, 'state')"
              model-value="Readonly text"
              placeholder="Readonly"
              readonly
            />
          </div>
          <div class="flex-1">
            <FormLabel :for="generateInputId(6, 'state')" class="sr-only"
              >Disabled</FormLabel
            >
            <Input
              :id="generateInputId(6, 'state')"
              model-value="Disabled text"
              placeholder="Disabled"
              disabled
            />
          </div>
        </div>
      </div>

      <!-- Status Variants -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(7, 'status')"
          class="text-grey-600 text-sm font-medium"
          >Status Variants</FormLabel
        >
        <FormLabel :for="generateInputId(7, 'status')" class="sr-only"
          >Error status</FormLabel
        >
        <Input
          :id="generateInputId(7, 'status')"
          v-model="strRefs[5]"
          placeholder="Error status"
          status="error"
        />
        <FormLabel :for="generateInputId(8, 'status')" class="sr-only"
          >Success status</FormLabel
        >
        <Input
          :id="generateInputId(8, 'status')"
          v-model="strRefs[6]"
          placeholder="Success status"
          status="success"
        />
        <FormLabel :for="generateInputId(9, 'status')" class="sr-only"
          >Info status</FormLabel
        >
        <Input
          :id="generateInputId(9, 'status')"
          v-model="strRefs[7]"
          placeholder="Info status"
          status="info"
        />
      </div>

      <!-- Clearable -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(10, 'clearable')"
          class="text-grey-600 text-sm font-medium"
          >Clearable</FormLabel
        >
        <FormLabel :for="generateInputId(10, 'clearable')" class="sr-only"
          >Type something and clear</FormLabel
        >
        <Input
          :id="generateInputId(10, 'clearable')"
          v-model="strRefs[8]"
          placeholder="Type something and clear"
          clearable
        />
      </div>

      <!-- Password Type -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(11, 'password')"
          class="text-grey-600 text-sm font-medium"
          >Password Type</FormLabel
        >
        <FormLabel :for="generateInputId(11, 'password')" class="sr-only"
          >Password input</FormLabel
        >
        <Input
          :id="generateInputId(11, 'password')"
          v-model="strRefs[9]"
          type="password"
          placeholder="Password input"
        />
      </div>

      <!-- Left Addon (Prefix) -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(12, 'left-addon')"
          class="text-grey-600 text-sm font-medium"
          >❌❌ Left Addon (Prefix)</FormLabel
        >
        <FormLabel :for="generateInputId(12, 'left-addon')" class="sr-only">
          Enter URL
        </FormLabel>
        <Input
          :id="generateInputId(12, 'left-addon')"
          v-model="strRefs[10]"
          placeholder="Enter URL"
        >
          <template #leftAddon>
            <span class="text-krds-gray-60">https</span>
          </template>
        </Input>
        <FormLabel :for="generateInputId(13, 'left-addon')" class="sr-only"
          >Enter phone number</FormLabel
        >
        <Input
          :id="generateInputId(13, 'left-addon')"
          v-model="strRefs[11]"
          placeholder="Enter phone number"
        >
          <template #leftAddon>
            <span class="text-krds-gray-60">+82</span>
          </template>
        </Input>
      </div>

      <!-- Right Addon (Suffix) -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(14, 'right-addon')"
          class="text-grey-600 text-sm font-medium"
          >Right Addon (Suffix)</FormLabel
        >
        <FormLabel :for="generateInputId(14, 'right-addon')" class="sr-only">
          Enter count
        </FormLabel>
        <Input
          :id="generateInputId(14, 'right-addon')"
          v-model="strRefs[12]"
          placeholder="Enter count"
        >
          <template #rightAddon>
            <span class="text-krds-gray-60">명</span>
          </template>
        </Input>
        <FormLabel :for="generateInputId(15, 'right-addon')" class="sr-only">
          Enter period
        </FormLabel>
        <Input
          :id="generateInputId(15, 'right-addon')"
          v-model="strRefs[13]"
          placeholder="Enter period"
        >
          <template #rightAddon>
            <span class="text-krds-gray-60">개월</span>
          </template>
        </Input>
      </div>

      <!-- Combined Addons (X)-->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(16, 'combined')"
          class="text-grey-600 text-sm font-medium"
          >❌❌ Combined Addons</FormLabel
        >
        <FormLabel :for="generateInputId(16, 'combined')" class="sr-only"
          >Enter URL</FormLabel
        >
        <Input
          :id="generateInputId(16, 'combined')"
          v-model="strRefs[14]"
          placeholder="Enter URL"
        >
          <template #leftAddon>
            <span class="text-krds-gray-60">https</span>
          </template>
          <template #rightAddon>
            <span class="text-krds-gray-60 ml-10">.com</span>
          </template>
        </Input>
      </div>

      <!-- Custom Right Addon with Icon -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(17, 'custom')"
          class="text-grey-600 text-sm font-medium"
          >Custom Right Addon</FormLabel
        >
        <FormLabel :for="generateInputId(17, 'custom')" class="sr-only"
          >Search</FormLabel
        >
        <Input
          :id="generateInputId(17, 'custom')"
          v-model="strRefs[15]"
          placeholder="Search"
        >
          <template #rightAddon>
            <button
              type="button"
              class="hover:text-krds-primary-60 cursor-pointer transition-colors"
              @click="handleClickAppendInner"
            >
              <IcIcon icon="search" />
            </button>
          </template>
        </Input>
      </div>

      <!-- All Props Combined -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(18, 'combined-props')"
          class="text-grey-600 text-sm font-medium"
          >All Props Combined</FormLabel
        >
        <FormLabel :for="generateInputId(18, 'combined-props')" class="sr-only"
          >Filled variant, large size, clearable</FormLabel
        >
        <Input
          :id="generateInputId(18, 'combined-props')"
          v-model="strRefs[16]"
          placeholder="Filled variant, large size, clearable"
          variant="filled"
          size="lg"
          clearable
        >
          <template #leftAddon>
            <span class="text-krds-gray-60">$</span>
          </template>
          <template #rightAddon>
            <span class="text-krds-gray-60">USD</span>
          </template>
        </Input>
      </div>
    </div>
  </section>

  <!-- Input Types 섹션 -->
  <section class="border-grey-300 mt-6 min-h-[420px] rounded-3xl border p-10">
    <h3 class="m-0 mb-4 text-2xl font-bold">Input Types</h3>
    <p class="text-grey-600 mb-6">
      Input 컴포넌트는 다양한 입력 타입을 지원하며, 각 타입에 최적화된 기능을
      제공합니다.
    </p>

    <div class="grid max-w-[720px] gap-6">
      <!-- Text Type -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(19, 'type-text')"
          class="text-grey-600 text-sm font-medium"
          >Text Type</FormLabel
        >
        <FormLabel :for="generateInputId(19, 'type-text')" class="sr-only"
          >영문, 숫자 4-20자</FormLabel
        >
        <Input
          :id="generateInputId(19, 'type-text')"
          v-model="usernameRef"
          type="text"
          placeholder="영문, 숫자 4-20자"
        />
      </div>

      <!-- Password Type (자동 visibility toggle) -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(20, 'type-password')"
          class="text-grey-600 text-sm font-medium"
          >Password Type (자동 visibility toggle)</FormLabel
        >
        <FormLabel :for="generateInputId(20, 'type-password')" class="sr-only"
          >8자 이상 입력</FormLabel
        >
        <Input
          :id="generateInputId(20, 'type-password')"
          v-model="passwordRef"
          type="password"
          placeholder="8자 이상 입력"
        />
        <p class="text-grey-600 text-sm">
          비밀번호 입력 시 자동으로 보기/숨기기 토글 버튼이 표시됩니다.
        </p>
      </div>

      <!-- Number Type -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(21, 'type-number')"
          class="text-grey-600 text-sm font-medium"
        >
          Number Type
        </FormLabel>
        <FormLabel :for="generateInputId(21, 'type-number')" class="sr-only">
          나이
        </FormLabel>
        <Input
          :id="generateInputId(21, 'type-number')"
          v-model="ageRef"
          type="number"
          placeholder="0-120"
          :min="0"
          :max="120"
        />
        ????
        <p class="text-grey-600 text-sm">
          모바일에서 숫자 키보드가 자동으로 활성화됩니다 (inputMode="numeric").
        </p>
      </div>

      <!-- Email Type -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(22, 'type-email')"
          class="text-grey-600 text-sm font-medium"
          >Email Type</FormLabel
        >
        <FormLabel :for="generateInputId(22, 'type-email')" class="sr-only"
          >example@email.com</FormLabel
        >
        <Input
          :id="generateInputId(22, 'type-email')"
          v-model="emailRef"
          type="email"
          placeholder="example@email.com"
        />
      </div>

      <!-- Tel Type -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(23, 'type-tel')"
          class="text-grey-600 text-sm font-medium"
          >Tel Type</FormLabel
        >
        <FormLabel :for="generateInputId(23, 'type-tel')" class="sr-only"
          >전화번호</FormLabel
        >
        <Input
          :id="generateInputId(23, 'type-tel')"
          v-model="telRef"
          type="tel"
          placeholder="010-1234-5678"
        />
      </div>

      <!-- URL Type -->
      <div class="space-y-2">
        <FormLabel
          :for="generateInputId(24, 'type-url')"
          class="text-grey-600 text-sm font-medium"
          >URL Type</FormLabel
        >
        <FormLabel :for="generateInputId(24, 'type-url')" class="sr-only"
          >https://example.com</FormLabel
        >
        <Input
          :id="generateInputId(24, 'type-url')"
          v-model="urlRef"
          type="url"
          placeholder="https://example.com"
        />
      </div>
    </div>
  </section>

  <!-- FormField 사용 예제 섹션 -->
  <section class="border-grey-300 mt-6 min-h-[420px] rounded-3xl border p-10">
    <h3 class="m-0 mb-4 text-2xl font-bold">FormField 사용 예제 (UI만 참고)</h3>
    <p class="text-grey-600 mb-6">
      FormField를 사용하면 label, helper text, error message를 자동으로 연결하고
      접근성을 보장합니다.
    </p>

    <div class="grid max-w-[720px] gap-6">
      <!-- 기본 사용 -->
      <FormField id="username-field" required>
        <FormLabel>사용자명</FormLabel>
        <Input
          v-model="usernameRef"
          type="text"
          placeholder="영문, 숫자 4-20자"
          maxlength="20"
        />
        <FormHelperText
          >4-20자의 영문자와 숫자만 사용 가능합니다</FormHelperText
        >
      </FormField>

      <!-- 비밀번호 (자동 visibility toggle) -->
      <FormField id="password-field" required>
        <FormLabel>비밀번호</FormLabel>
        <Input
          v-model="passwordRef"
          type="password"
          placeholder="8자 이상 입력"
        />
        <FormHelperText>영문, 숫자, 특수문자 포함 8자 이상</FormHelperText>
      </FormField>

      <!-- 숫자 입력 -->
      <FormField id="age-field">
        <FormLabel>나이</FormLabel>
        <Input v-model="ageRef" type="number" placeholder="0-120" />
      </FormField>

      <!-- 에러 상태 -->
      <FormField id="email-field" status="error" required>
        <FormLabel>이메일</FormLabel>
        <Input
          v-model="emailRef"
          type="email"
          placeholder="example@email.com"
        />
        <FormError>{{ emailErrorRef }}</FormError>
      </FormField>

      <!-- Success 상태 -->
      <FormField id="success-field" status="success">
        <FormLabel>검증 완료</FormLabel>
        <Input
          v-model="usernameRef"
          type="text"
          placeholder="사용 가능한 사용자명"
        />
        <FormHelperText>사용 가능한 사용자명입니다</FormHelperText>
      </FormField>

      <!-- Info 상태 -->
      <FormField id="info-field" status="info">
        <FormLabel>정보 입력</FormLabel>
        <Input
          v-model="strRefs[17]"
          type="text"
          placeholder="추가 정보를 입력하세요"
        />
        <FormHelperText>선택사항입니다</FormHelperText>
      </FormField>

      <!-- Disabled 상태 -->
      <FormField id="disabled-field" disabled>
        <FormLabel>비활성화된 필드</FormLabel>
        <Input
          v-model="strRefs[18]"
          type="text"
          placeholder="비활성화된 입력"
        />
        <FormHelperText>이 필드는 비활성화되어 있습니다</FormHelperText>
      </FormField>

      <!-- Clearable과 함께 사용 -->
      <FormField id="clearable-field">
        <FormLabel>검색어</FormLabel>
        <Input
          v-model="strRefs[19]"
          type="text"
          placeholder="검색어를 입력하세요"
          clearable
        />
        <FormHelperText
          >입력값이 있을 때 X 버튼으로 지울 수 있습니다</FormHelperText
        >
      </FormField>
    </div>
  </section>

  <!-- NumberInput 섹션 -->
  <section class="border-grey-300 mt-6 min-h-[420px] rounded-3xl border p-10">
    <h3 class="m-0 mb-4 text-2xl font-bold">NumberInput</h3>
  </section>
</template>
