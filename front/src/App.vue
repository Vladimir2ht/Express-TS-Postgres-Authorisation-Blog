<template>
	<div>
		<Main/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import Main from './components/Main.vue';

	export default defineComponent({
		name: 'App',
		components: {
			Main
		}
	});
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #000000;
		height: 100%;
	
		.ant-radio-inner {
			box-shadow: 0 0 5px 1.5px rgb(67, 67, 255); // creates the shadow
		}
		
		.ant-list-item-extra {
			min-width: 48px;
			margin: 0 0 0 24px;
		}
	}
</style>
