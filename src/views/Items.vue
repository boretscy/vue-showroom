<template>
    <div class="yapps-cis">
		<search-filter ref="searchfilter" />
		<sort
			:Discount="TagButtons.Discount"
			:InStock="TagButtons.InStock"
			:OnWay="TagButtons.OnWay"
			:Mode="mode"
			@sort="sortToggle" />
        <list-items
            data="modelItems"
			:viewMode="viewMode"
			:dataSort="sortMode"
			ref="items"
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
        ListItems,
	},
	data() {
		return {
			sortMode: null,
			iter: 0,

			TagButtons: {
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
			if ( this.$route.query.tag ) res = this.$route.query.tag
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
		},
	}
}
</script>

