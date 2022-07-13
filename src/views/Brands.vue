<template>
	<div class="yapps-cis" :key="iter" >
		<search-filter @sort="sort"/>
		<sort
			:Discount="sortButtons.Discount"
			:InStock="sortButtons.InStock"
			:OnWay="sortButtons.OnWay"
			:Mode="viewSort"
			@sort="sortToggle"/>
		<div v-if="mode == 'new' && brands.length">
			<list-brand-models
				v-for="(brand, indx) in brands"
				:key="indx"
				v-if="brand._models && brand.vehicles > 0"
				:dataName="brand.name"
				:dataCount="brand.vehicles"
				:dataLink="brand.code"
				:dataSort="sortMode"
				:viewMode="viewMode"
				:brand="brand"/>
		</div>
		<div v-if="mode == 'used'" >
			<used-items
				:dataSort="sortMode"
				></used-items>
			<more
				@more="more"
				v-if="showMore"/>
		</div>
	</div>
</template>

<script>
// import IconBase from '@/components/IconBase.vue'
// import IconCorner from '@/components/icons/IconCorner.vue'

import SearchFilter from '@/components/SearchFilter.vue'
import Sort from '@/components/Sort.vue'
import ListBrandModels from '@/components/ListBrandModels.vue'
import UsedItems from '@/components/UsedItems.vue'
import More from '@/components/brands/More.vue'

export default {
	name: 'Brands',
	components: {
		// IconBase, IconCorner,
		SearchFilter,
		ListBrandModels,
		Sort,
		More,
		UsedItems
	},
	data() {
		return {
			iter: 0,
			brands: [],
			vehicles: [],
			brandsCount: 0,
			showMore: false,
			sortMode: 'name',
			sortButtons: {
				Discount: false,
				InStock: false,
				OnWay: false,
			},
			page: 1
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		},
		viewSort: function() {
			let res = 'all'
			if ( this.$route.query.sort ) res = this.$route.query.sort
			return res
		},
		mode: function() {
			return this.$store.state.mode
		}
	},
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                let url = this.$store.state.apiUrl+'brandsmodels/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
				for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
				this.axios.get(url).then((response) => {
					this.brands = response.data
					this.$cookies.set('CIS_DETAIL_PAGE', 0)
				})
            }
        },
		sortMode: function(v) {
			this.sort(v)
		}
    },
	mounted: function() {
		
	},
	methods: {

		more() {
			this.page++
		},
		sortToggle(v) {
			this.sortMode = v
		},
		sort(v) {
			switch (this.$store.state.mod) {
				case 'new':
					switch(v) {
						case 'name':
							this.brands.sort((a, b) => a.name > b.name ? 1 : -1)
							break;
						case 'price_up':
							this.brands.sort((a, b) => a.min > b.min ? 1 : -1)
							break;
						case 'price_down':
							this.brands.sort((a, b) => a.max < b.max ? 1 : -1)
							break;
					}
					this.iter++
					break;
				case 'used':
					break;
			}
			
		}
	}
}
</script>

<style scoped>
.title {
    font-size: var(--h1);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2rem;
	position: relative;
	user-select: none;
}
</style>
