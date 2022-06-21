<template>
	<div class="yapps-cis">
		<search-filter @sort="sort"/>
		<sort
			:Discount="true"
			:InStock="true"
			:OnWay="true"
			@sort="sortToggle"/>
		<list-models
			:viewMode="viewMode"
			:dataSort="sortMode"/>
	</div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter.vue'
import Sort from '@/components/Sort.vue'
import ListModels from '@/components/ListModels.vue'

export default {
	name: 'Brand',
	components: {
		SearchFilter, Sort,
		ListModels
	},
	data() {
		return {
			brand: null,
			sortMode: 'name',
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
	methods: {
		sortToggle(v) {
			this.sortMode = v
		},
		sort(v) {
			this.brands.forEach( (b) => {
				if (b.alias == v.brand) {
					this.sortList.push(
						{
							id: b.id,
							value: b.value
						}
					)
					b.sort = {
						id: b.id,
						value: b.value
					}
				}
			})
		}
	}
}
</script>
