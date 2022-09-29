<template>
    <div :key="iter">
        <div v-if="items">
            <div 
                class="model__grid"
                v-if="viewMode == 'grid'"
                >
                <item-grid 
                    v-for="(item, indx) in items"
                    :key="indx"
                    :item="item"
                    />
            </div>
            <div 
                class="model__grid"
                v-if="viewMode == 'list'"
                :class="{'model__line': viewMode == 'list'}"
                >
                <item-line 
                    v-for="(item, indx) in items"
                    :key="indx"
                    :item="item"
                    />
            </div>
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
            page: 0,
            iter: 1
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
    watch: {

        '$route.query': function() {
            this.page = 0
            this.getData()
            window.scrollTo(0,0)
        },

        '$parent.sortMode': function() {
            this.page = 0
            this.getData()
            window.scrollTo(0,0)
        },

        '$store.state.city': function() {
            this.page = 0
            this.getData()
            window.scrollTo(0,0)
        }
    },
	mounted: function() {
        this.getData()
        window.scrollTo(0,0)
	},
    methods: {
        getData() {
            
            if ( !this.page ) this.items = []
            this.page++
            
            let url = this.$store.state.apiUrl+'vehicles/'+this.$store.state.mode+'?token='+this.$store.state.apiToken
            if (this.$route.params.brand) url += '&brand='+this.$route.params.brand
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
            for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
            url += '&page='+this.page
            if ( this.$parent.sortMode ) url += '&sort='+this.$parent.sortMode
            this.axios.get(url).then((response) => {
                let newitems = this.items.concat(response.data.items)
                this.items = newitems
                this.count = response.data.totalCount
                this.$parent.showMore = response.data.next_page
                this.$parent.TagButtons.Discount = response.data.Discount
                this.$parent.TagButtons.InStock = response.data.InStock
                this.$parent.TagButtons.OnWay = response.data.OnWay
            }).catch( (e) => {
				if (e.response.status == 404) window.location.href = '/404.php'
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