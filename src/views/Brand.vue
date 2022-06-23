<template>
	<div class="yapps-cis">
		<search-filter />
		<sort
			:Discount="sortButtons.Discount"
			:InStock="sortButtons.InStock"
			:OnWay="sortButtons.OnWay"
			:Mode="mode"
			@sort="sortToggle"/>
		<list-models
			:viewMode="viewMode"
			:dataSort="sortMode"
			:key="iter"/>
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
        '$route.params.brand': {
            immediate: true,
            handler() {
                this.iter++
            }
        },
		sortMode: function(v) {
			this.sort(v)
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
		}
	}
}
</script>
