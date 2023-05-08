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
				<Input ref="user" placeholder="Basic usage" />
				<!-- <Input v-model="login" ref="user" placeholder="Basic usage" /> -->
				<InputPassword placeholder="Basic usage" />
			</Modal>
			<Card>
				<template #title>
					<Button @click="newPost" type="primary">Добавить пост</Button>
					{{selectedPostDate}}
				</template>
				<template #extra>{{login}}</template>
				<Textarea ref="text" auto-size placeholder="Пост с текстом"/>
				<Input ref="file" type="file" placeholder="Пост с файлом" :max="1" />
				<!-- <Input ref="user" type="file" placeholder="Basic usage" :maxlength="1" /> -->
				<RadioGroup @change="selectPost">
				<List item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
					<!-- <template #footer>
						<div>
							footer part
						</div>
					</template> -->
					<template #renderItem="{ item }">
						<ListItem key="item.id">
							<!-- <template #actions>
								<span v-for="{ type, text } in actions" :key="type">
									<component :is="type" style="margin-right: 8px" />
									{{ text }}
								</span>
							</template> -->
							<template #extra>
								<Radio :value="item.id">
							</template>
							<!-- <ListItemMeta :description="item.description"> -->
							<ListItemMeta>
								<template #title>
									{{ item.author }}
								</template>
							</ListItemMeta>
							{{ item.content }}
						</ListItem>
					</template>
				</List>
				</RadioGroup>
			</Card>
		</LayoutContent>
	</Layout>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { 
		Layout,
		LayoutContent,
		Card,
		List,
		ListItem,
		ListItemMeta,
		Modal,
		Button,
		Input,
		InputPassword,
		Textarea,
    Radio,
    RadioGroup,
	} from 'ant-design-vue';
	// import { LoadingOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';

	interface Post {
		author: string;
		date: any;
		id: any;
		content: string;
		content_type: string;
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

	let token: string;
	const listData = ref<Post[]>([]);
	const login = ref<string>('');
	const selectedPostDate = ref<string>('');
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
			Button,
			Input,
			InputPassword,
			Textarea,
			Radio,
			RadioGroup,
		},
		data() {
			return {
				sign_up: 'Регистрация',
				sign_in: 'Авторизация',
			};
		},
		setup() {
			return {
				login,
				selectedPostDate,
				listData,
				pagination,
				visible,
				confirmLoading,
			};
		},
		methods: {
			async getPosts() {
				let response = await fetch('http://vladimir2ht.ddns.net:4000/posts/', {
					method: 'GET',
					headers: { 'Origin': 'http://localhost:8080/' }
				});
				listData.value = await response.json();
				console.log(listData.value);
			},

			async newPost() {
				console.log('token', token);
				
				const formData = new FormData();
				formData.append('file', (this.$refs.file as any).input.files[0]);
				formData.append('text', (this.$refs.text as any).resizableTextArea.textArea.value);

				await fetch('http://vladimir2ht.ddns.net:4000/posts/', {
					method: 'PUT',
					headers: {
						Origin: 'http://localhost:8080/',
						Authorization: 'Bearer ' + token,
					},
					body: formData
				});

				await this.getPosts();
			},

			async selectPost(e: Event) {
				console.log(e);
				
			},

			async deletePost() {

			},

			async authRequest(action: string) {
				confirmLoading.value = true;

				const authData: {name: string, password?: string} = {
					name: (this.$refs.user as any).input.value
				};
				const pass = document.querySelector('input[type="password"]')
				if (pass) {
					authData.password = (pass as any).value;
				} else {
					authData.password = document.querySelectorAll('input')[1].value;
				}
				if (!(authData.name && authData.password)) return confirmLoading.value = false
				console.log(authData)
				
				const responseData = await fetch('http://vladimir2ht.ddns.net:4000/auth/' + action, {
					method: 'post',
					body: JSON.stringify(authData),
					headers: { 
						Origin: 'http://localhost:8080/',
						"Content-type":  "application/json",
					},
				}).then(res => res.json());
				console.log(responseData);
				
				if (responseData.token) {
					token = responseData.token;
					login.value = authData.name;
					confirmLoading.value = false;
					visible.value = false;
					setTimeout(() => {
						visible.value = true;
					}, 600000);
				}

			},

			async handleIn() {this.authRequest('log')},
			async handleUp() {this.authRequest('reg')},
		},
		mounted() {
			this.getPosts();
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
