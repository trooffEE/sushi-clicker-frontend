<template>
	<page-container>
		<rotating-sushi class="col-start-3 col-span-8 flex justify-center items-center" @send-ws-message="send" />
	</page-container>
</template>

<script setup lang="ts">
import PageContainer from '@/components/page/PageContainer.vue'
import RotatingSushi from '@/components/sushi/RotatingSushi.vue'

import { useWebSocketClient } from '@/stores/socket.ts'

const { send } = useWebSocketClient()
</script>
