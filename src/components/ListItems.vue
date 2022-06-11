<template>
    <div class="model__grid">
        <item-grid 
            v-for="item in items"
            :key="item.id"
            :brand="brand"
            :model="model"
            :item="item"
            />
        <cta-grid 
            title="Рассчитайте ежемесячный платеж"
            link="#"
            button="Получить одобрение"
            icon="credit"/>
    </div>
</template>

<script>
import ItemGrid from '@/components/items/ItemGrid.vue'
import CtaGrid from '@/components/cta/CtaGrid.vue'

export default {
	name: 'ListItems',
	components: {
        ItemGrid, CtaGrid
	},
	data() {
		return {
			items: [],
			brand: null,
            model: null,
			showMore: false,
			totalcount: 0
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
	mounted: function() {

		let url = this.$store.state.apiUrl+'model/'+this.$route.params.model+'?token='+this.$store.state.apiToken
        for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
        this.axios.get(url).then((response) => {
            console.log(response.data)
			this.items = response.data.items
            this.brand = response.data.brand
            this.model = response.data.model
        })
	},
}
</script>
<style scoped>
.model__grid .grid__icon-form {
    --icon-size: 120px;
}
.grid__icon-form svg {
    width: var(--icon-size);
    height: var(--icon-size);
}
.grid__icon-form .head_items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.model__grid .head_items {
    display: block;
}
</style>