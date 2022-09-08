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
			ref="items"
            ></list-items>
		<more
			@more="more"
			v-if="showMore" />
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
        ListItems, More
	},
	data() {
		return {
			showMore: false,
			sortMode: null,

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
	mounted: function() {
		this.$cookies.set('CIS_DETAIL_PAGE', 0)
	},
	methods: {
		more() {
			this.$refs.items.getData()
		},
		sortToggle(v) {
			this.sortMode = v
		},
	}
}
</script>

