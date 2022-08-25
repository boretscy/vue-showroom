<template>
	<div class="yapps-cis">
		<search-filter />
		<sort
			:Discount="sortButtons.Discount"
			:InStock="sortButtons.InStock"
			:OnWay="sortButtons.OnWay"
			:Mode="mode"
			@sort="sortToggle" />
		<list-brand-items
            data="modelItems"
			:viewMode="viewMode"
			:dataSort="sortMode"
			ref="items"
            ></list-brand-items>
		<more
			@more="more"
			v-if="showMore" />
	</div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter.vue'
import Sort from '@/components/Sort.vue'
import ListBrandItems from '@/components/ListBrandItems.vue'
import More from '@/components/brands/More.vue'

export default {
	name: 'Brand',
	components: {
		SearchFilter, Sort, 
        ListBrandItems, More
	},
	data() {
		return {
			brand: null,
			iter: 0,
			showMore: false,
			sortMode: null,

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
		},
	},
	watch: {
        '$route.params.brand': {
            immediate: true,
            handler() {
                this.iter++
            }
        },
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
