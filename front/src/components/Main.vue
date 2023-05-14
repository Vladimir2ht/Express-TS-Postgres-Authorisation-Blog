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
				<Input ref="user" placeholder="Введите имя пользователя" />
				<InputPassword placeholder="Введите пароль" />
			</Modal>
			<Card>
				<template #title>
					<Button @click="newPost" type="primary">Добавить пост</Button>
					<Button @click="newPost(e, true)" type="primary">Изменить пост</Button>
					{{selectedPostDate}}
				</template>
				<template #extra>{{login}}</template>
				<Textarea ref="text" auto-size placeholder="Пост с текстом"/>
				<Input ref="file" type="file" placeholder="Пост с файлом" :max="1" />
				<!-- <Input ref="user" type="file" placeholder="Basic usage" :maxlength="1" /> -->
				<List
					@change="selectPost"
					:pagination="pagination"
					:data-source="listData"
					item-layout="vertical"
					size="large"
				>
					<template #renderItem="{ item }">
						<ListItem key="item.id">
							<!-- <template #actions>
								<span v-for="{ type, text } in actions" :key="type">
									<component :is="type" style="margin-right: 8px" />
									{{ text }}
								</span>
							</template> -->
							<template #extra v-if="item.user_name === login">
								<!-- <Radio :value="item.id" :checked="item.id === selectedPost"/> -->
								<Radio :value="item.id" :checked="item.checked"/>
								<Button type="primary" shape="circle" danger @click="deletePost(item.id)" :size="small">
									<template #icon><DeleteOutlined /></template>
								</Button>
							</template>
							<ListItemMeta :description="item.date_created">
								<template #title>
									{{ item.user_name }}
								</template>
							</ListItemMeta>
							<span v-if="item.content_type === 'text'">
								{{ item.body }}
							</span>
							<img v-else-if="item.content_type.includes('image')" :src="item.body">
							<!-- <video controls="controls" poster="video/duel.jpg"> -->
							<video v-else-if="item.content_type.includes('video')" controls="controls">
								<source :src="item.body">
							</video>
							<audio controls="controls" v-else-if="item.content_type.includes('audio')">
								<source :src="item.body">
							</audio>
						</ListItem>
					</template>
				</List>
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
	} from 'ant-design-vue';
	import { DeleteOutlined } from '@ant-design/icons-vue';

	interface Post {
		user_name: string,
		date_created: Date,
		id: number,
		body: string,
		content_type: string,
		checked: boolean,
	};

	const pagination = {
		onChange: (page: number) => {
			console.log(page);
		},
		pageSize: 20,
	};

	let token: string;
	const listData = ref<Post[]>([]);
	const login = ref<string>('');
	const selectedPost = ref<number>(0);
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
			DeleteOutlined,
		},
		data() {
			return {
				sign_up: 'Регистрация',
				sign_in: 'Авторизация',
				small: 'small',
			};
		},
		setup() {
			return {
				login,
				selectedPost,
				listData,
				pagination,
				visible,
				confirmLoading,
			};
		},
		computed: {
			selectedPostDate() {
				return selectedPost.value ? listData.value[selectedPost.value].date_created : ''
			}
		},
		methods: {
			async getPosts() {
				let response = await fetch('http://vladimir2ht.ddns.net:4000/posts/', {
					method: 'GET',
					headers: { 'Origin': 'vladimir2ht.ddns.net:4000' }
				});
				listData.value = (await response.json())
					.map((post: Post | Omit<Post, 'chesked'>): Post => {
						post.checked = false;
						return post
					});
				console.log(listData.value);
			},

			async newPost(e?: Event, change: boolean = false) {
				const formData = new FormData();
				formData.append('file', (this.$refs.file as any).input.files[0]);
				formData.append('text', (this.$refs.text as any).resizableTextArea.textArea.value);
				if (change) {
					formData.append('id', listData.value[selectedPost.value].id.toString());
				};

				await fetch('http://vladimir2ht.ddns.net:4000/posts/', {
					method: change ? 'PATCH' : 'PUT',
					headers: {
						Origin: 'vladimir2ht.ddns.net:4000',
						Authorization: 'Bearer ' + token,
					},
					body: formData
				});

				await this.getPosts();
			},

			async selectPost(e: Event & {target:{value: number, type: string}}) {
				if (e.target.type !== 'radio') return
				console.log(e.target.value);
				let post = listData.value.findIndex((post: Post) => post.id == e.target.value)
				console.log(post);
				listData.value[selectedPost.value].checked = false;
				selectedPost.value = post;
				listData.value[post].checked = true;
				listData.value = [...listData.value];
				console.log(selectedPost.value);
			},

			async deletePost(id: number) {
				await fetch('http://vladimir2ht.ddns.net:4000/posts?id=' + id, {
					method: 'delete',
					headers: {
						Origin: 'vladimir2ht.ddns.net:4000',
						Authorization: 'Bearer ' + token,
					},
				});
				
				// убрать
				await this.getPosts();
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
				}).then(res => {
					if (res.status === 205) {
						confirmLoading.value = false
						return {token: false}
					} else return res.json()});
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
			min-width: 425px;
			
			textarea {
				margin-bottom: 15px;
			}

			.ant-card-head button {
				margin-right: 20px;
			}
		}
	}

	.ant-input-password {
		margin-top: 15px;
	}
</style>
