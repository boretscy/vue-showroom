<template>
	<div class="yapps-cis">
		<search-filter @sort="sort"/>
		<sort
			:Discount="sortButtons.Discount"
			:InStock="sortButtons.InStock"
			:OnWay="sortButtons.OnWay"
			:Mode="mode"
			@sort="sortToggle"/>
		<div v-if="brands" :key="iter">
			<list-brand-models
				v-for="(brand, indx) in brands"
				:key="indx"
				v-if="brand._models && brand.vehicles > 0"
				:dataName="brand.name"
				:dataCount="brand.vehicles"
				:dataLink="brand.alias"
				:dataSort="sortMode"
				:viewMode="viewMode"/>
			<more
				@more="moreBrands"
				v-if="showMore"/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import IconBase from '@/components/IconBase.vue'
// import IconCorner from '@/components/icons/IconCorner.vue'

import SearchFilter from '@/components/SearchFilter.vue'
import Sort from '@/components/Sort.vue'
import ListBrandModels from '@/components/ListBrandModels.vue'
import More from '@/components/brands/More.vue'

export default {
	name: 'Brands',
	components: {
		// IconBase, IconCorner,
		SearchFilter,
		ListBrandModels,
		Sort,
		More
	},
	data() {
		return {
			iter: 0,
			brands: [],
			brandsCount: 0,
			showMore: false,
			sortMode: 'name',
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
        '$route.query': {
            immediate: true,
            handler() {
                let url = this.$store.state.apiUrl+'brands/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
				for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
				this.axios.get(url).then((response) => {
					response.data.sort((a, b) => a.name > b.name ? 1 : -1);
					// console.log(response.data)
					this.brands = response.data
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

		moreBrands() {
			let p = this.brandsCount+5
			for ( this.brandsCount = this.brands.length; this.brandsCount<=p; this.brandsCount++ ) {
				if ( this.brandsCount <= this.$store.state.brands.length-1 ) {
					this.brands.push( this.$store.state.brands[this.brandsCount] )
					this.showMore = true
				} else {
					this.showMore = false
					break
				}
			}
		},
		sortToggle(v) {
			this.sortMode = v
		},
		sort(v) {
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
