<template>
    <div>
        <div 
            class="model__grid"
            v-if="viewMode == 'grid'"
            >
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
                icon="credit"
                v-if="viewMode == 'grid'"
                />
        </div>
        <div 
            class="model__grid"
            v-if="viewMode == 'list'"
            :class="{'model__line': viewMode == 'list'}"
            >
            <item-line 
                v-for="item in items"
                :key="item.id"
                :brand="brand"
                :model="model"
                :item="item"
                />
        </div>
    </div>
</template>

<script>
import ItemGrid from '@/components/items/ItemGrid.vue'
import ItemLine from '@/components/items/ItemLine.vue'
import CtaGrid from '@/components/cta/CtaGrid.vue'

export default {
	name: 'ListItems',
	components: {
        ItemGrid, ItemLine, CtaGrid
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

		let url = this.$store.state.apiUrl+'model/'+this.$store.state.mode+'/'+this.$route.params.model+'?token='+this.$store.state.apiToken
        url += '&brand='+this.$route.params.brand
        for (let k in this.$route.query) if (k!=='brand') url += '&'+k+'='+this.$route.query[k]
        this.axios.get(url).then((response) => {
            console.log(response.data)
			this.items = response.data.items
            this.brand = response.data.brand
            this.model = response.data.model
            window.scrollTo(0,0);
        })
	},
}
</script>
<style scoped>
.model__grid {
    --grid-card: 300px;
    --margin-bottom: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--grid-card), 1fr));
    /*grid-template-columns: repeat(4, 1fr);*/
    gap: 20px;
    margin-bottom: 4rem;
}
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
.model__line {
    display: block;
}


</style>