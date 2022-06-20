<template>
	<div class="yapps-cis">
		<search-filter @sort="sort"/>
		<sort
			:Discount="true"
			:InStock="true"
			:OnWay="true"
			@sort="sortToggle"/>
		<div v-if="brands">
			<list-brand-models
				v-for="(brand, indx) in brands"
				:key="indx"
				:dataName="brand.name"
				:dataCount="brand.vehicles"
				:dataLink="brand.alias"
				:dataSort="sortMode"
				:viewMode="viewMode"
				@sort="sort"/>
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
			brands: [],
			brandsCount: 0,
			showMore: false,
			sortMode: 'name',
			sortList: []
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                let url = this.$store.state.apiUrl+'brands/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
				if ( this.$route.query.brand ) url += '&brand='+this.$route.query.brand
				this.axios.get(url).then((response) => {
					response.data.sort((a, b) => a.name > b.name ? 1 : -1);
					this.brands = response.data
				})
            }
        },
		sortList: function(val) {
			if (val.length == this.brands.length) {
				console.log(this.brands)
				switch(this.sortMode) {
					case 'all':
					case 'name':
					case 'price_up':
					case 'Discount':
					case 'InStock':
					case 'OnWay':
						this.brands.sort((a, b) => a.sort.value > b.sort.value ? 1 : -1);
						break;
					case 'price_down':
						this.brands.sort((a, b) => a.sort.value > b.sort.value ? 1 : -1);
						break;
				}
			}
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
			// switch (v) {
			// 	case 'name':
			// 		break;
			// }
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
