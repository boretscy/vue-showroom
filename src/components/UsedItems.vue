<template>
    <div>
        <div class="flex__head">
            <router-link :to="'/'" class="flex__head-title h2">
                <span class="flex__head-count">{{ items.count }}</span>
            </router-link>
        </div>

        <div 
            class="model__grid"
            v-if="viewMode == 'grid'"
            >
            <item-grid 
                v-for="item in items"
                :key="item.id"
                :brand="item.brand"
                :model="item.model"
                :item="item"
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
                :brand="item.brand"
                :model="item.model"
                :item="item"
                />
        </div>
    </div>
</template>

<script>
import ItemGrid from '@/components/items/ItemGrid.vue'
import ItemLine from '@/components/items/ItemLine.vue'

export default {
	name: 'ListItems',
	components: {
        ItemGrid, ItemLine
	},
	data() {
		return {
			items: [],
			showMore: false,
			count: 0,
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
    watch: {

        '$parent.page': {
            immediate: true,
            handler(v) {
                let url = this.$store.state.apiUrl+'vehicles/'+this.$store.state.mode+'?token='+this.$store.state.apiToken
                if (this.$store.state.city) url += '&city='+this.$store.state.city
                for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
                url += '&page='+v
                this.axios.get(url).then((response) => {
                    let newitems = this.items.concat(response.data.items)
                    this.items = newitems
                    this.count = response.data.totalCount
                    this.$parent.showMore = response.data.next_page

                    this.items.forEach( (item) => {
                        if (item.Discount) this.$parent.sortButtons.Discount = true
                        if (item.InStock) this.$parent.sortButtons.InStock = true
                        if (item.OnWay) this.$parent.sortButtons.OnWay = true
                    })
                })
            }
        },

        '$route.query': {
            immediate: true,
            handler() {
                let url = this.$store.state.apiUrl+'vehicles/'+this.$store.state.mode+'?token='+this.$store.state.apiToken
                if (this.$store.state.city) url += '&city='+this.$store.state.city
                for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
                url += '&page=1'
                this.axios.get(url).then((response) => {
                    let newitems = this.items.concat(response.data.items)
                    this.items = newitems
                    this.count = response.data.totalCount
                    this.$parent.showMore = response.data.next_page

                    this.items.forEach( (item) => {
                        if (item.Discount) this.$parent.sortButtons.Discount = true
                        if (item.InStock) this.$parent.sortButtons.InStock = true
                        if (item.OnWay) this.$parent.sortButtons.OnWay = true
                    })
                })
            }
        },

        '$parent.sortMode': function(newValue) {
            switch(newValue) {
                case 'name':
                    this.items.sort((a, b) => a.name > b.name ? 1 : -1)
                    break;
                case 'price_up':
                    this.items.sort((a, b) => a.price > b.price ? 1 : -1)
                    break;
                case 'price_down':
                    this.items.sort((a, b) => a.price < b.price ? 1 : -1)
                    break;
            }
        },

        '$store.state.city': function() {
            let url = this.$store.state.apiUrl+'model/'+this.$store.state.mode+'/'+this.$route.params.model+'?token='+this.$store.state.apiToken
            url += '&brand='+this.$route.params.brand
            url += '&model='+this.$route.params.model
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            for (let k in this.$route.query) if (k!=='brand' && k!=='model') url += '&'+k+'='+this.$route.query[k]
            this.axios.get(url).then((response) => {
                this.items = response.data.items
                this.brand = response.data.brand
                this.model = response.data.model

                this.items.forEach( (item) => {
                    if (item.Discount) this.$parent.sortButtons.Discount = true
                    if (item.InStock) this.$parent.sortButtons.InStock = true
                    if (item.OnWay) this.$parent.sortButtons.OnWay = true
                })

                window.scrollTo(0,0);
            })
        }
    },
	mounted: function() {

		
	},
    methods: {
        getData( url ) {
            
            this.axios.get(url).then((response) => {
                this.items = response.data.items
                this.count = response.data.totalCount
                this.$parent.showMore = response.data.next_page

                this.items.forEach( (item) => {
                    if (item.Discount) this.$parent.sortButtons.Discount = true
                    if (item.InStock) this.$parent.sortButtons.InStock = true
                    if (item.OnWay) this.$parent.sortButtons.OnWay = true
                })
                window.scrollTo(0,0);
            })
        }
    }
}
</script>
<style scoped>
h2, .h2 {
    font-size: var(--h2);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 1rem;
}
.flex__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}
.flex__head-title {
    text-transform: uppercase;
    margin-bottom: 0;
    text-decoration: none;
    color: var(--yablack);
}
.flex__head-count {
    color: var(--yamiddlegray);
    margin-left: 1em;
}
.flex__head-link {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    text-decoration: none;
    color: var(--yablack);
}
.flex__head-link svg {
    fill: var(--yayellow);
    width: 20px;
    height: 20px;
    margin-left: 2em;
}
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
@media (max-width: 1024px) {
    .model__grid {
        --grid-card: 250px;
    }
}
@media (max-width: 768px) {

}



</style>