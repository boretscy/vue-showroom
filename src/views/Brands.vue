<template>
	<div class="yapps-cis" :key="iter" >
		<vue-headful
            :title="metaTitle"
            :description="metaDescription"
        />
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
				ref="used"
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
		},

        metaTitle: function() {
            let d = new Date()
            let res = 'Купить новый автомобиль '+d.getFullYear()+' года выпуска в '+this.$store.state.inCity+' | Официальный дилер — Юг-Авто'
            return res
        },
        metaDescription: function() {
            let d = new Date()
            let res = 'Продажа новых автомобилей '+d.getFullYear()-1+'-'+d.getFullYear()+' года выпуска от официального дилера в Краснодаре и Краснодарском крае — Юг-Авто. *Актуальный модельный ряд *Выгодные цены *Тест-драйв перед покупкой'
            if (this.$store.state.mode == 'used') res = 'Продажа подержанных б/у автомобилей у официального дилера в Краснодаре и Краснодарском крае — Юг-Авто. *Обмен по Trade-in *Выкуп *Кредит *Подбор'
            return res
        }
	},
    watch: {
        '$route.query': function() {
			this.getData()
		},
		sortMode: function(v) {
			this.sort(v)
		},
        '$store.state.city': function() {
            this.getData() 
        }
    },
	mounted: function() {
		this.getData()
	},
	methods: {
		more() {
			this.$refs.page++
			this.$refs.used.getData()
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
