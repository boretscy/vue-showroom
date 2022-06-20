<template>
	<div class="yapps-cis">
		<search-filter ref="searchFilter" list-name="models"/>
		<list-models
			:dataName="brand.name"
			:dataCount="brand.vehicles"
			:dataLink="$route.params.brand"
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
			brand: [],
			showMore: false,
			totalcount: 0
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
	mounted: function() {

		let url = this.$store.state.apiUrl+'brand/'+this.$store.state.mode+'/'+this.$route.params.brand+'?token='+this.$store.state.apiToken
        for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
        this.axios.get(url).then((response) => {
			this.brand = response.data
        })
	},
}
</script>
