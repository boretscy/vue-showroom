<template>
    <div class="yapps-cis">
		<search-filter />
		<sort
			:Discount="sortButtons.Discount"
			:InStock="sortButtons.InStock"
			:OnWay="sortButtons.OnWay"
			:Mode="mode"
			@sort="sortToggle"/>
        <list-items
            data="modelItems"
			:viewMode="viewMode"
			:dataSort="sortMode"
            ></list-items>
		<more
			@more="more"
			v-if="showMore"/>
	</div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter.vue'
import Sort from '@/components/Sort.vue'
import ListItems from '@/components/ListItems.vue'
import More from '@/components/brands/More.vue'

export default {
	name: 'Items',
	components: {
		SearchFilter, Sort,
        ListItems,
		More
	},
	data() {
		return {
			sortMode: 'name',
			iter: 0,

			sortButtons: {
				Discount: false,
				InStock: false,
				OnWay: false,
			}
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		},
		mode: function() {
			let res = 'all'
			if ( this.$route.query.sort ) res = this.$route.query.sort
			return res
		}
	},
	watch: {
		sortMode: function(v) {
			this.sort(v)
		}
    },
	mounted: function() {
		this.$cookies.set('CIS_DETAIL_PAGE', 0)
		this.$store.state.dealership = null
	},
	methods: {
		sortToggle(v) {
			this.sortMode = v
		}
	}
}
</script>

