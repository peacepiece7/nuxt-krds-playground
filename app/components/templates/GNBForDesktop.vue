<script setup lang="ts">
  import type { MenuItem } from '~/components/templates/GNB.vue'

  interface Props {
    menuItems: MenuItem[]
    visible: boolean
    isAtTop: boolean
  }

  const props = defineProps<Props>()

  const hoveredMenuIndex = ref<number | null>(null)

  const selectedMenu = computed(() => {
    if (hoveredMenuIndex.value === null) return null
    return props.menuItems[hoveredMenuIndex.value]
  })

  const isSubmenuOpen = computed(() => {
    return (
      selectedMenu.value !== null &&
      selectedMenu.value.children !== undefined &&
      selectedMenu.value.children.length > 0 &&
      hoveredMenuIndex.value !== null &&
      props.visible
    )
  })

  // 투명 배경 로직 제거 - 항상 배경색 표시

  const handleMouseEnter = (index: number) => {
    hoveredMenuIndex.value = index
  }

  const handleMouseLeave = () => {
    hoveredMenuIndex.value = null
  }

  const handleSubmenuClick = () => {
    hoveredMenuIndex.value = null
  }

  const route = useRoute()

  watch(
    () => route.path,
    () => {
      hoveredMenuIndex.value = null
    },
  )

  const authStore = useAuthStore()
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  const userName = computed(() => authStore.user?.name || '')

  const goToMyPage = () => {
    navigateTo('/mypage')
  }

  const isLoginDialogOpen = ref(false)

  const handleLoginLogout = () => {
    if (isLoggedIn.value) {
      authStore.logout()
    } else {
      isLoginDialogOpen.value = true
    }
  }

  const handleLoginSuccess = () => {
    isLoginDialogOpen.value = false
  }
</script>

<template>
  <div class="w-full">
    <header
      class="bg-krds-primary-50 relative w-full shadow-sm transition-[transform,background-color,box-shadow] duration-300 ease-in-out will-change-transform"
      :style="{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }"
    >
      <div
        class="mx-auto flex w-full max-w-[1400px] items-center overflow-visible p-0"
      >
        <div class="flex items-center gap-4 pl-4">
          <NuxtLink
            :prefetch="false"
            to="/"
            class="flex cursor-pointer items-center no-underline transition-opacity duration-200 ease-in hover:opacity-80"
          >
            <!-- <IcIcon icon="star-filled" class="shrink-0 text-krds-primary-90" /> -->
            <span class="text-krds-primary-90 hidden text-xl font-bold md:flex">
              Sports Club
            </span>
          </NuxtLink>

          <div class="relative ml-4 flex items-center gap-2">
            <div
              v-for="(item, index) in menuItems"
              :key="item.to"
              class="relative"
              @mouseenter="handleMouseEnter(index)"
            >
              <NuxtLink
                :prefetch="false"
                class="text-krds-primary-90 relative inline-block px-3 py-2 font-medium no-underline transition-colors duration-200 ease-in"
                :class="{ 'gnb-menu-link-active': hoveredMenuIndex === index }"
                :to="item.to"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <ClientOnly>
            <div class="flex items-center gap-2">
              <Button>
                <IcIcon icon="announcement" />
              </Button>
              <template v-if="isLoggedIn">
                <span
                  class="text-krds-primary-90 px-2 py-0 text-sm font-medium whitespace-nowrap"
                  >{{ userName }}</span
                >
                <Button @click="goToMyPage">
                  <IcIcon icon="login-v1" />
                </Button>
              </template>
              <Button @click="handleLoginLogout">
                {{ isLoggedIn ? 'Logout' : 'Login' }}
              </Button>
            </div>
          </ClientOnly>
        </div>
      </div>
    </header>

    <Dialog v-model="isLoginDialogOpen">
      <template #content>
        <LoginSection @login-success="handleLoginSuccess" />
      </template>
    </Dialog>

    <div
      v-if="
        selectedMenu &&
        selectedMenu.children &&
        selectedMenu.children.length > 0 &&
        hoveredMenuIndex !== null &&
        visible
      "
      class="border-grey-200 z-app-bar fixed top-16 left-0 w-full translate-y-0 animate-[slideDown_200ms_ease-in-out] border-t bg-white pt-0 shadow-lg"
      @mouseenter="handleMouseEnter(hoveredMenuIndex)"
      @mouseleave="handleMouseLeave"
    >
      <div class="mx-auto max-w-[1400px] px-4 py-6">
        <div class="flex items-start gap-6">
          <div class="flex h-[250px] w-[250px] items-center justify-center">
            <NuxtImg
              src="/dali_hi.png"
              alt="Hello Dali"
              class="h-full w-full object-contain"
            />
          </div>
          <div class="flex-1">
            <div class="mb-4">
              <h3 class="heading-3">{{ selectedMenu.title }}</h3>
            </div>
            <div
              class="grid gap-2"
              style="
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              "
            >
              <NuxtLink
                v-for="child in selectedMenu.children"
                :key="child.to"
                :prefetch="false"
                :to="child.to"
                class="text-grey-900 hover:bg-grey-100 block rounded-xl px-4 py-3 text-base no-underline transition-all duration-200 ease-in-out"
                :scroll="true"
                @click="handleSubmenuClick"
              >
                {{ child.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
