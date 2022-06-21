<template>
    <div class="yapps-cis">
		<search-filter @sort="sort"/>
		<sort
			:Discount="true"
			:InStock="true"
			:OnWay="true"
			@sort="sortToggle"/>
        <list-items
            data="modelItems"
			:viewMode="viewMode"
            ></list-items>
	</div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter.vue'
import Sort from '@/components/Sort.vue'
import ListItems from '@/components/ListItems.vue'

export default {
	name: 'Items',
	components: {
		SearchFilter, Sort,
        ListItems
	},
	data() {
		return {
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
	mounted: function() {

		// let url = this.$store.state.apiUrl+'model/'+this.$route.params.model+'?token='+this.$store.state.apiToken
        // for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
        // this.axios.get(url).then((response) => {
		// 	this.items = response.data
        //     console.log(this.items)
        // })
	},
}
</script>

