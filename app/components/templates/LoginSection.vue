<script setup lang="ts">
  import { Rive } from '@rive-app/canvas'
  import type { Rive as RiveType, StateMachineInput } from '@rive-app/canvas'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import * as yup from 'yup'
  import SelectionGroup, {
    type GroupOption,
  } from '~/components/atoms/SelectionGroup.vue'

  const loginSchema = yup.object({
    userId: yup.string().required('���̵� �Է����ּ���'),
    password: yup.string().required('��й�ȣ�� �Է����ּ���'),
    rememberId: yup.array().of(yup.string()).default([]),
  })

  type LoginFormValues = yup.InferType<typeof loginSchema>

  const { handleSubmit, values } = useForm<LoginFormValues>({
    validationSchema: toTypedSchema(loginSchema),
    initialValues: {
      userId: '',
      password: '',
      rememberId: [],
    },
  })

  const rememberIdOptions: GroupOption<string>[] = [
    { label: '���̵� ����', value: 'remember' },
  ]

  const emit = defineEmits<{
    'login-success': []
  }>()

  const canvas = ref<HTMLCanvasElement | null>(null)
  let rive: RiveType | null = null

  const inputs: Record<string, StateMachineInput> = {}

  let eyeTrackRAF: number | null = null
  let currentEyeTrack = 0.5
  let targetEyeTrack = 0.5

  const { loginNative, loginKakao, loginNaver, loginNice } = useAuth()

  const startEyeTrack = () => {
    stopEyeTrack()

    const animate = () => {
      currentEyeTrack += (targetEyeTrack - currentEyeTrack) * 0.15
      if (inputs.eye_track) {
        inputs.eye_track.value = currentEyeTrack
      }
      eyeTrackRAF = requestAnimationFrame(animate)
    }

    animate()
  }

  const stopEyeTrack = () => {
    if (eyeTrackRAF) {
      cancelAnimationFrame(eyeTrackRAF)
      eyeTrackRAF = null
    }
  }

  const handleIdFocus = () => {
    if (inputs.isFocus) {
      inputs.isFocus.value = true
    }
  }

  const handleIdBlur = () => {
    if (inputs.isFocus) {
      inputs.isFocus.value = false
    }
  }

  const handlePasswordFocus = () => {
    if (inputs.IsPassword) {
      inputs.IsPassword.value = true
    }
  }

  const handlePasswordBlur = () => {
    if (inputs.IsPassword) {
      inputs.IsPassword.value = false
    }

    targetEyeTrack = 0.5
    startEyeTrack()
  }

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await loginNative(formValues.userId, formValues.password, true)
      inputs.login_success?.fire()
      emit('login-success')
    } catch {
      inputs.login_fail?.fire()
    }
  })

  const handleLogin = async () => {
    const isValid = await new Promise<boolean>((resolve) => {
      handleSubmit(
        () => {
          resolve(true)
        },
        () => {
          inputs.login_fail?.fire()
          resolve(false)
        },
      )()
    })

    if (isValid) {
      await onSubmit()
    }
  }

  const handleKakaoLogin = async () => {
    await loginKakao(true)
    inputs.login_success?.fire()
    emit('login-success')
  }

  const handleNaverLogin = async () => {
    await loginNaver(true)
    inputs.login_success?.fire()
    emit('login-success')
  }

  const handleNiceLogin = async () => {
    await loginNice(true)
    inputs.login_success?.fire()
    emit('login-success')
  }

  const handleSignup = () => {
    console.log('Signup')
  }

  onMounted(async () => {
    await nextTick()
    if (!canvas.value) return

    rive = new Rive({
      src: '/animated-login-bunny-character.riv',
      canvas: canvas.value,
      stateMachines: 'State Machine 1',
      autoplay: true,
      onLoad: () => {
        const smInputs = rive!.stateMachineInputs('State Machine 1')
        smInputs.forEach((input) => {
          inputs[input.name] = input
        })

        if (inputs.eye_track) {
          inputs.eye_track.value = currentEyeTrack
        }
      },
    })
  })

  onUnmounted(() => {
    stopEyeTrack()
    rive?.cleanup()
    rive = null
  })
</script>
<template>
  <div class="login-section flex flex-col items-center gap-4">
    <div class="border-grey-200 rounded-4xl border-2 border-solid">
      <canvas ref="canvas" class="login-section__canvas h-full w-full" />
    </div>

    <Card class="w-full min-w-[340px]">
      <CardHeader class="border-grey-200 border-b px-6 py-4">
        <CardTitle class="text-xl font-bold">Login</CardTitle>
      </CardHeader>

      <CardBody class="flex flex-col gap-2 p-6">
        <Input
          :model-value="values.userId"
          label="ID"
          placeholder="ID를 입력해주세요"
          @focus="handleIdFocus"
          @blur="handleIdBlur"
        />

        <Input
          :model-value="values.password"
          label="Password"
          type="password"
          placeholder="Password를 입력해주세요"
          @keyup.enter="handleLogin"
          @focus="handlePasswordFocus"
          @blur="handlePasswordBlur"
        />

        <Button color="primary" class="mt-2" @click="handleLogin">Login</Button>

        <div class="flex items-center justify-between gap-2">
          <!-- <SelectionGroup
            type="checkbox"
            :model-value="field.value"
            v-bind="bind"
            :items="rememberIdOptions"
            direction="horizontal"
          /> -->

          <div class="flex items-center gap-2 text-sm">
            <a href="#" class="text-grey-600">Find ID</a>
            <span class="text-grey-300">|</span>
            <a href="#" class="text-grey-600">Find Password</a>
          </div>
        </div>

        <div class="flex justify-center gap-2">
          <button
            class="h-10 w-10 rounded-full"
            aria-label="Kakao Login"
            @click="handleKakaoLogin"
          >
            <IcIcon icon="message-default" />
          </button>

          <button
            class="h-10 w-10 rounded-full bg-[#03c75a]"
            aria-label="Naver Login"
            @click="handleNaverLogin"
          >
            <IcIcon icon="login-v1" class="text-white" />
          </button>
        </div>

        <Button color="primary" class="mt-2" @click="handleNiceLogin">
          Register
        </Button>

        <Button color="primary" class="mt-2" @click="handleSignup">
          Login
        </Button>
      </CardBody>
    </Card>
  </div>
</template>
