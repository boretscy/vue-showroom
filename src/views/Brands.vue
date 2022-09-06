<template>
	<div class="yapps-cis" :key="iter" >
		<search-filter @sort="sort" ref="filter"/>
		<sort
			:Discount="TagButtons.Discount"
			:InStock="TagButtons.InStock"
			:OnWay="TagButtons.OnWay"
			:Mode="viewTag"
			@sort="sortToggle"/>
		<items
			:dataSort="sortMode"
			ref="items"
			></items>
		<more
			@more="more"
			v-if="showMore"/>
	</div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter.vue'
import Sort from '@/components/Sort.vue'
import Items from '@/components/Items.vue'
import More from '@/components/brands/More.vue'

export default {
	name: 'Brands',
	components: {
		SearchFilter,
		Sort,
		More,
		Items
	},
	data() {
		return {
			iter: 0,
			brands: [],
			brandsCount: 0,
			showMore: false,
			sortMode: null,
			TagButtons: {
				Discount: false,
				InStock: false,
				OnWay: false,
			},
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		},
		viewTag: function() {
			let res = 'all'
			if ( this.$route.query.tag ) res = this.$route.query.tag
			return res
		},
		mode: function() {
			return this.$store.state.mode
		}
	},
    watch: {
        '$route.query': function() {
			// if ( !this.$refs.filter.blockFilter ) this.getData()
		},
		sortMode: function(v) {
			this.sort(v)
		},
        '$store.state.city': function() {
            this.getData() 
        }
    },
	mounted: function() {
		// this.getData()
	},
	methods: {
		more() {
			// this.$refs.items.page++
			this.$refs.items.getData()
		},
		sortToggle(v) {
			this.sortMode = v
		},
		sort(v) {
			switch (this.$store.state.mode) {
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
					// this.iter++
					break;
				case 'used':
					break;
			}
			
		},
		getData() {
			let url = this.$store.state.apiUrl+'brandsmodels/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
			if (this.$store.state.city) url += '&city='+this.$store.state.city
			if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
			if (this.$store.state.brand) url += '&brand='+this.$store.state.brand
			for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
			this.axios.get(url).then((response) => {
				this.brands = response.data
				this.$cookies.set('CIS_DETAIL_PAGE', 0)
			})
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
