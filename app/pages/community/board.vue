<script setup lang="ts">
  definePageMeta({
    title: '�Խ���',
    description: '�Խ��� ������',
  })

  const title = ref('')
  const content = ref('')

  const handleSubmit = () => {
    if (!title.value.trim()) {
      alert('������ �Է����ּ���')
      return
    }
    if (!content.value.trim()) {
      alert('������ �Է����ּ���')
      return
    }

    // TODO: �Խù� �ۼ� API ȣ��
    alert('�Խù��� �ۼ��Ǿ����ϴ�')
  }
</script>

<template>
  <div class="relative min-h-screen w-full">
    <PageHeaderSection
      type="infoPage"
      title="�Խ���"
      image-src="/soccer-boy.png"
      image-alt="�Խ��� ��� �̹���"
    />
    <Container class="mx-auto max-w-[1200px] px-4 py-12 max-md:py-8">
      <div class="rounded-lg bg-white p-8 shadow-sm max-md:px-4 max-md:py-6">
        <h2 class="text-grey-900 mb-6 text-xl font-bold">�Խù� �ۼ�</h2>
        <div class="w-full">
          <TextField
            :model-value="title"
            label="����"
            placeholder="������ �Է��ϼ���"
            class="mb-4"
            @update:model-value="(v) => (title = v)"
          />
          <div class="mb-6 min-h-[400px]">
            <EditorRenderder
              v-model:model-value="content"
              name="board-content"
              renderer="editor"
            />
          </div>
          <div class="mt-6 flex justify-end gap-3 max-md:flex-col-reverse">
            <Button color="secondary" @click="$router.back()">���</Button>
            <Button color="primary" @click="handleSubmit">�ۼ��ϱ�</Button>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
