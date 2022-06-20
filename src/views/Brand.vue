<template>
	<div class="yapps-cis">
		<search-filter ref="searchFilter" list-name="models"/>
		<list-models
			:viewMode="viewMode"/>
	</div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter.vue'
import ListModels from '@/components/ListModels.vue'

export default {
	name: 'Brand',
	components: {
		SearchFilter,
		ListModels
	},
	data() {
		return {
			brand: null,
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
	mounted: function() {
		localStorage.setItem(
			'CIS_NAV',
			JSON.stringify([
				{
					path: '/'+this.$route.params.brand+'/',
					name: this.$route.params.brand
				}
			])
		)
	},
}
</script>
