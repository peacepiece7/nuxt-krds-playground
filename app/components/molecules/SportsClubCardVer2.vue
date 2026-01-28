<script setup lang="ts">
  import type { SlideGroupItem } from '~/components/molecules/SlideGroup.vue'

  export type Course = {
    id: string
    name: string
    instructor: string
    schedule: string
    capacity: number
    enrolled: number
    price?: string
    operatingSport: string
  }

  export type SportClubCardData = {
    name: string
    badgeType: 'designated' | 'registered'
    distance: string
    address: string
    phone: string
    operatingFacilities: string[]
    convenienceFacilities: string[]
    homepageUrl?: string
    courses?: Course[]
  }

  const props = defineProps<{ data: SportClubCardData }>()

  const displayedOperatingFacilities = computed(() => {
    const facilities = props.data.operatingFacilities
    if (facilities.length === 0) return []
    if (facilities.length === 1) return [facilities[0]]
    return [facilities[0], `�� ${facilities.length - 1}��`]
  })

  const isFlipped = ref(false)
  const selectedOperatingSport = ref<string>('')

  const operatingSportItems = computed<SlideGroupItem[]>(() => {
    if (!props.data.courses || props.data.courses.length === 0) return []
    const sports = new Set<string>()
    props.data.courses.forEach((course) => {
      if (course.operatingSport) {
        sports.add(course.operatingSport)
      }
    })
    return Array.from(sports).map((sport) => ({
      id: sport,
      title: sport,
      icon: undefined,
      subheaders: [],
      noticeTitle: '',
      noticeContent: [],
    }))
  })

  const filteredCourses = computed(() => {
    if (!props.data.courses || !selectedOperatingSport.value) return []
    return props.data.courses.filter((course) => course.operatingSport === selectedOperatingSport.value)
  })

  const selectedCourse = computed(() => {
    if (filteredCourses.value.length === 0) return null
    return filteredCourses.value[0]
  })

  const toggleFlip = () => {
    if (props.data.courses && props.data.courses.length > 0) {
      isFlipped.value = !isFlipped.value
      if (isFlipped.value && !selectedOperatingSport.value && operatingSportItems.value.length > 0) {
        selectedOperatingSport.value = operatingSportItems.value[0].id
      }
    }
  }

  const goBack = () => {
    isFlipped.value = false
  }

  const handleWheel = (event: WheelEvent) => {
    const target = event.currentTarget as HTMLElement
    const { scrollTop, scrollHeight, clientHeight } = target

    const isScrollable = scrollHeight > clientHeight

    if (!isScrollable) {
      event.stopPropagation()
      return
    }

    const isAtTop = scrollTop === 0
    const isScrollingUp = event.deltaY < 0

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
    const isScrollingDown = event.deltaY > 0

    if (
      (isAtTop && isScrollingUp) ||
      (isAtBottom && isScrollingDown) ||
      (!isAtTop && !isAtBottom)
    ) {
      event.stopPropagation()
    }
  }
</script>

<template>
  <div
    style="width: 100%; perspective: 1000px; overflow: visible; position: relative; box-sizing: border-box;"
    @mouseleave="goBack"
  >
    <div
      class="transition-transform duration-300 ease-in"
      style="position: relative; width: 75%; height: 100%; margin: 0 auto; transform-style: preserve-3d;"
      :class="{ '': isFlipped }"
    >
      <Card class="club-card--front rounded-2xl shadow transition-shadow duration-200 ease-in" style="width: 100%; overflow: hidden; backface-visibility: hidden">
        <div class="m-0 p-0" style="width: 100%; min-height: 200px; background-color: var(--color-grey-200); display: flex; align-items: center; justify-content: center;">
          <IcIcon icon="location" class="text-4xl text-grey-400" />
        </div>

        <CardBody class="gap-3 p-4" style="display: flex; flex-direction: column">
          <div class="gap-2" style="display: flex; justify-content: space-between; align-items: center;">
            <span class="rounded px-2 py-1 text-sm font-medium" style="color: var(--color-primary-700); background-color: var(--color-primary-300);">
              {{ data.badgeType === 'designated' ? '����' : '���' }}
            </span>
            <span class="text-grey-600 text-sm">�� ��ġ�κ��� {{ data.distance }}</span>
          </div>

          <h3 class="text-grey-900 m-0 text-2xl font-bold" style="text-align: left">{{ data.name }}</h3>

          <div class="gap-2" style="display: flex; align-items: center">
            <IcIcon icon="location" class="text-grey-600" />
            <span class="text-grey-900 text-sm">{{ data.address }}</span>
          </div>

          <div class="gap-2" style="display: flex; align-items: center">
            <IcIcon icon="call" class="text-grey-600" />
            <span class="text-grey-900 text-sm">{{ data.phone }}</span>
          </div>

          <div class="gap-2" style="display: flex; flex-direction: column">
            <h4 class="text-grey-900 m-0 text-base font-bold">��ü�</h4>
            <div class="gap-2" style="display: flex; flex-wrap: wrap">
              <span v-for="(facility, index) in displayedOperatingFacilities" :key="index" class="text-grey-600 text-sm">{{ facility }}</span>
            </div>
          </div>

          <div class="gap-2" style="display: flex; flex-direction: column">
            <h4 class="text-grey-900 m-0 text-base font-bold">���ǽü�</h4>
            <div class="gap-2" style="display: flex; flex-wrap: wrap">
              <span v-for="(facility, index) in data.convenienceFacilities" :key="index" class="text-grey-600 text-sm">{{ facility }}</span>
            </div>
          </div>

          <div class="border-grey-300 mt-2 gap-2 border-t pt-3" style="display: flex; justify-content: space-between">
            <Button v-if="data.courses && data.courses.length > 0" variant="outlined" class="font-medium" style="flex: 1" @click="toggleFlip">
              <span>� ����/���� ����</span>
              <IcIcon icon="chevron-right" class="ml-1" />
            </Button>
            <Button
              v-if="data.homepageUrl"
              variant="outlined"
              class="font-medium"
              style="flex: 1"
              :href="data.homepageUrl"
              target="_blank"
              rel="noopener noreferrer"
            >Ȩ������</Button>
          </div>
        </CardBody>
      </Card>

      <Card class="club-card--back rounded-2xl shadow transition-shadow duration-200 ease-in" style="width: 100%; overflow: hidden; backface-visibility: hidden">
        <CardBody class="gap-4 p-8" style="display: flex; flex-direction: column; height: 100%; background-color: #000000; color: #ffffff;">
          <h3 class="m-0 text-xl font-bold" style="color: #ffffff">� ����/����</h3>

          <div v-if="operatingSportItems.length > 0" style="width: 100%">
            <SlideGroup v-model="selectedOperatingSport" :items="operatingSportItems" btn-size="small" />
          </div>

          <h4 class="m-0 text-lg font-bold" style="color: #ffffff">���� ����</h4>

          <div style="flex: 1; overflow-y: auto; min-height: 0" @wheel="handleWheel">
            <div
              v-for="course in filteredCourses"
              :key="course.id"
              class="gap-3 rounded-lg p-4"
              style="background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); display: flex; flex-direction: column;"
            >
              <h4 class="m-0 text-xl font-bold" style="color: #ffffff">{{ course.name }}</h4>

              <div class="gap-2" style="display: flex; flex-direction: column">
                <div class="gap-2 text-base" style="display: flex; align-items: center; color: rgba(255, 255, 255, 0.8);">
                  <IcIcon icon="timeout" class="text-white/80" />
                  <span>{{ course.schedule }}</span>
                </div>
                <div class="gap-2 text-base" style="display: flex; align-items: center; color: rgba(255, 255, 255, 0.8);">
                  <IcIcon icon="announcement" class="text-white/80" />
                  <span>{{ course.enrolled }} / {{ course.capacity }}��</span>
                </div>
              </div>

              <div v-if="course.price" class="text-2xl font-bold" style="color: var(--color-primary-700)">
                {{ course.price }}
              </div>
            </div>
          </div>

          <div class="gap-2 pt-3" style="display: flex; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <Button class="flex-1" color="primary" @click="() => {}">������û</Button>
            <Button variant="outlined" class="flex-1" @click="goBack">�ڷΰ���</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
</template>
