<template>
	<div class="yapps-cis">
		<search-filter ref="searchFilter"/>
		<brands-item
			v-for="(brand, indx) in brands"
			:key="indx"
			:dataName="brand.name"
			:dataCount="brand.vehicles"
			:dataLink="brand.alias"/>
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
import BrandsItem from '@/components/BrandsItem.vue'
import More from '@/components/brands/More.vue'

export default {
	name: 'Brands',
	components: {
		// IconBase, IconCorner,
		SearchFilter,
		BrandsItem,
		More
	},
	data() {
		return {
			brands: [],
			brandsCount: 0,
			showMore: true,
			totalcount: 0
		}
	},
	mounted: function() {

		let url = this.$store.state.apiUrl+'brands/'+'?token='+this.$store.state.apiToken
        for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
        this.axios.get(url).then((response) => {
			response.data.sort((a, b) => a.name > b.name ? 1 : -1);
			this.$store.state.brands = response.data
        }).then(() => {
			this.moreBrands()
		})
	},
	methods: {

		moreBrands() {
			console.log(this.brandsCount, this.brands.length)
			let p = this.brandsCount+5
			for ( this.brandsCount = this.brands.length; this.brandsCount<=p; this.brandsCount++ ) {
				if ( this.brandsCount <= this.$store.state.brands.length-1 ) {
					this.brands.push( this.$store.state.brands[this.brandsCount] );
				} else {
					this.showMore = false
					break
				}
			}
			console.log(this.brandsCount)
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
