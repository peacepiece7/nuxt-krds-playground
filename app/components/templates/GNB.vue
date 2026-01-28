<script setup lang="ts">
  import { GNB_TRIGGER_HEIGHT } from '~/constants/ux'

  // 메뉴 아이템 타입 정의
  export type MenuItem = {
    title: string
    to: string
    children?: Array<{ title: string; to: string }>
  }

  // 로그인 상태 확인 (로그인 시 메뉴 추가)
  const authStore = useAuthStore()

  // 디바이스 감지
  const { isDesktop, isMobile } = useDevice()

  // 스크롤 추적
  const { scrollY, scrollDirection } = useTracker()

  const { isMounted } = useMounted()

  const isLoggedIn = computed(() => {
    return authStore.isLoggedIn
  })

  // GNB 기본 메뉴 아이템 정의
  const baseMenuItems: MenuItem[] = [
    {
      title: 'Pub Playground',
      to: '/pub',
      children: [
        { title: 'atom(inputs)', to: '/pub/atom/inputs' },
        { title: 'atom(buttons)', to: '/pub/atom/buttons' },
        { title: 'molecules', to: '/pub/molecules' },
        { title: 'organisms', to: '/pub/organisms' },
      ],
    },
  ]

  const menuItems = computed<MenuItem[]>(() => {
    const items: MenuItem[] = [...baseMenuItems]

    if (isLoggedIn.value) {
      // "스포츠클럽 정보" 뒤에 "신청" 메뉴 삽입
      // const insertIndex = items.findIndex((i) => i.to === '/info')
      // const applyMenu: MenuItem = {
      //   title: '스포츠클럽 신청',
      //   to: '/apply',
      //   children: [
      //     {
      //       title: '등록 스포츠클럽 신청',
      //       to: '/apply/registered-sports-club',
      //     },
      //   ],
      // }
      // if (insertIndex >= 0) {
      //   items.splice(insertIndex + 1, 0, applyMenu)
      // } else {
      //   items.push(applyMenu)
      // }
    }

    return items
  })

  // GNB 표시 여부 계산 - 항상 표시
  const isVisible = computed(() => {
    return true
  })

  // 스크롤이 최상단인지 확인
  const isAtTop = computed(() => {
    if (!isMounted.value) return true
    return scrollY.value === 0
  })
</script>

<template>
  <div class="fixed top-0 left-0 z-1000 w-full">
    <GNBForDesktop
      v-if="isDesktop"
      :menu-items="menuItems"
      :visible="isVisible"
      :is-at-top="isAtTop"
    />
    <GNBForMobile
      v-else-if="isMobile"
      :menu-items="menuItems"
      :visible="isVisible"
      :is-at-top="isAtTop"
    />
  </div>
</template>
