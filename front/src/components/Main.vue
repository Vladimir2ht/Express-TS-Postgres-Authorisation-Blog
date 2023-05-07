"vetur.validation.template": true
<template>
	<Layout>
		<LayoutContent>
			<Modal
				title="Авторизация"
				:visible = visible
				:confirm-loading="confirmLoading"
				:cancelText="sign_up"
				:okText="sign_in"
				@ok="handleIn"
				@cancel="handleUp"
			>
				<Input v-model="login" ref="user" placeholder="Basic usage" />
				<InputPassword placeholder="Basic usage" />
			</Modal>
			<Card>
				<List item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
					<!-- <template #footer>
						<div>
							footer part
						</div>
					</template> -->
					<template #renderItem="{ item }">
						<ListItem key="item.title">
							<!-- <template #actions>
								<span v-for="{ type, text } in actions" :key="type">
									<component :is="type" style="margin-right: 8px" />
									{{ text }}
								</span>
							</template> -->
							<template #extra>
								fof
							</template>
							<!-- <ListItemMeta :description="item.description"> -->
							<ListItemMeta>
								<template #title>
									{{ item.author }}
								</template>
								<!-- <template #avatar><a-avatar :src="item.avatar" /></template> -->
							</ListItemMeta>
							{{ item.content }}
						</ListItem>
					</template>
				</List>
			</Card>
		</LayoutContent>
	</Layout>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { Card, Input, InputPassword, Layout, LayoutContent, List, ListItem, ListItemMeta, Modal } from 'ant-design-vue';
	// import { LoadingOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';

	interface Post {
		author: string;
		date: any;
		content: string;
	}

	// for (let i = 0; i < 23; i++) {
	// 	listData.push({
	// 		author: `ant design vue part ${i}`,
	// 		date:
	// 			'Ant Design, a design language for background applications, is refined by Ant UED Team.',
	// 		content:
	// 			'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	// 	});
	// }

	const pagination = {
		onChange: (page: number) => {
			console.log(page);
		},
		pageSize: 20,
	};

	async function authRequest(params: {name: string, password?: string}, action: string) {
		let pass = document.querySelector('input[type="password"]')
		if (pass) {
			params.password = (pass as any).value;
		} else {
			params.password = document.querySelectorAll('input')[1].value;
		}
		let url = 'http://vladimir2ht.ddns.net:4000/auth/' + action;
		console.log(params)
		const response: Response = await fetch(url, {
			method: 'post',
			body: JSON.stringify(params),
			headers: { 
				Origin: 'http://localhost:8080/',
				"Content-type":  "application/json",
			},
		});
		const responseData = await response.json();
		console.log(responseData);
	}

	let token: string;
	// let password: string;
	const listData = ref<Post[]>([]);
	const login = ref<string>('');
	const modalText = ref<string>('Content of the modal');
	const visible = ref<boolean>(true);
	const confirmLoading = ref<boolean>(false);

	export default defineComponent({
		name: 'Main',
		components: {
			Layout,
			LayoutContent,
			Card,
			List,
			ListItem,
			ListItemMeta,
			Modal,
			Input,
			InputPassword,
			// WarningOutlined,
			// SearchOutlined,
			// LoadingOutlined,
		},
		data() {
			return {
				sign_up: 'Регистрация',
				sign_in: 'Авторизация'
			};
		},
		setup() {
			return {
				login,
				// password,
				listData,
				pagination,
				modalText,
				visible,
				confirmLoading,
			};
		},
		methods: {
			async getPosts(): Promise<void> {
				let response = await fetch('http://vladimir2ht.ddns.net:4000/posts/', {
					method: 'GET',
					headers: { 'Origin': 'http://localhost:8080/' }
				});
				listData.value = await response.json();
			},
			// async search(event: {[key: string]: any; srcElement: {_value: string};}): Promise<void> {
			// 	await this.$nextTick();
			// 	await this.$nextTick(); // одного иногда не хвататет, чтобы получилось нужное значение.
			// 	let url: string = event.srcElement._value;

			// 	if (url && url.length < 3) {
			// 		lessSymbols.value = true;
			// 		return
			// 	}	else lessSymbols.value = false;
			// 	loading.value = true;

			// 	url = 'http://vladimir2ht.ddns.net:4000/' + ((url) ? '?q=' + url : '');
			// 	const response: Response = await fetch(url, {
			// 		method: 'GET',
			// 		headers: { 'Origin': 'http://localhost:8080/' }
			// 	});
			// 	const responseData: Lead[] = await response.json();
				
			// 	responseData.forEach(lead => {
			// 		lead.created_at = new Date((lead.created_at as number) * 1000).toLocaleDateString();
			// 	});
				
			// 	loading.value = false;
			// 	leadsData.value = responseData;
			// },

			// refocus() {
			// 	this.$nextTick(() => (this.$refs.inputField as any).focus());
			// },
			async handleIn() {
      console.log((this.$refs.user as any).input.value)

			const authData: {name: string} = {
				name: (this.$refs.user as any).input.value
			};

			authRequest(authData, 'log');

      confirmLoading.value = true;
			visible.value = false;
			confirmLoading.value = false;
			setTimeout(() => {
				visible.value = true;
			}, 60000);
    	},
			async handleUp() {
      console.log((this.$refs.user as any).input.value)

			const authData: {name: string} = {
				name: (this.$refs.user as any).input.value
			};

			authRequest(authData, 'reg');

      confirmLoading.value = true;
			visible.value = false;
			confirmLoading.value = false;
			setTimeout(() => {
				visible.value = true;
			}, 6000);
    	},
		},
		mounted() {
			this.getPosts();
    	// if (this.$refs.inputField) {this.search({srcElement: {_value: ''}})};
  	},
	});
</script>

<style scoped lang="scss">
	#app .ant-layout {
		padding: 5%;
		
		.ant-layout-content {
			min-width: 625px;
		}
	}
</style>
