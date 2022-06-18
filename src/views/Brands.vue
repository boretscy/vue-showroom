<template>
	<div class="yapps-cis">
		<search-filter @sort="sort"/>
		<list-brand-models
			v-for="(brand, indx) in brands"
			:key="indx"
			:dataName="brand.name"
			:dataCount="brand.vehicles"
			:dataLink="brand.alias"
			:viewMode="viewMode"/>
		<more
			@more="moreBrands"
			v-if="showMore"/>
	</div>
</template>

<script>
// @ is an alias to /src
// import IconBase from '@/components/IconBase.vue'
// import IconCorner from '@/components/icons/IconCorner.vue'

import SearchFilter from '@/components/SearchFilter.vue'
import ListBrandModels from '@/components/ListBrandModels.vue'
import More from '@/components/brands/More.vue'

export default {
	name: 'Brands',
	components: {
		// IconBase, IconCorner,
		SearchFilter,
		ListBrandModels,
		More
	},
	data() {
		return {
			brands: [],
			brandsCount: 0,
			showMore: false
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
                let url = this.$store.state.apiUrl+'brands/'+'?token='+this.$store.state.apiToken
				for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
				this.axios.get(url).then((response) => {
					
					if ( this.$route.query.brand ) {
						let b = this.$route.query.brand.split(',')
						response.data.forEach( (item) => {
							if ( b.includes(item.alias) ) this.brands.push(item)
						})
					} else {
						this.brands = response.data
					}
					this.brands.sort((a, b) => a.name > b.name ? 1 : -1);
				})
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

		sort(v) {
			console.log('brands', v)
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
