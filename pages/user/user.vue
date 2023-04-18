<template>
	<view class="demo-skeleton">
		<yf-skeleton :loading="loading" :avatarSize="skeleton1.avatarSize" :row="skeleton1.row" :imgTitle="true">
			<view class="section-content">我是段落1</view>
		</yf-skeleton>

		<yf-skeleton :loading="loading" :avatarSize="skeleton1.avatarSize" :nameRow="5" flexType="space-between">
			<view class="section-content">我是段落2</view>
		</yf-skeleton>

		<yf-skeleton :loading="loading" :avatarSize="skeleton1.avatarSize" :nameRow="5" avatarShape="square"
			flexType="space-between">
			<view class="section-content">我是段落3</view>
		</yf-skeleton>

		<yf-skeleton :loading="loading" :avatarSize="skeleton1.avatarSize" :row="skeleton1.row" :showTitle="true">
			<view class="section-content">我是段落4</view>
		</yf-skeleton>

		<yf-skeleton :loading="loading" :row="skeleton2.row" :showAvatar="skeleton2.showAvatar" :showTitle="true"
			avatarSize="false">
			<view class="section-content">我是段落5</view>
		</yf-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				skeleton1: {
					avatarSize: '52px',
					row: 3,
					showTitle: true,
				},
				skeleton2: {
					avatarSize: '52px',
					row: 3,
					showAvatar: true,
				}
			}
		},
		created() {
			this.reloadData()
		},
		methods: {
			reloadData() {
				this.loading = true
				setTimeout(() => {
					this.loading = false
				}, 30000)
			},
		},
	}
</script>

<style lang="scss">

</style>
