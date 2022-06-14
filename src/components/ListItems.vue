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
    gap: 20px;
    margin-bottom: 4rem;
}
.model__grid-card__head--img img {
    object-fit: cover;
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
.button {
    --ui-color: var(--yadarkblue);
    --border-color: var(--ui-color);
    --background: transparen;
    --color: var(--ui-color);
    --font-size: 14px;
    --padding-top-bottom: 12px;
    --padding-left-right: 50px;
    --margin-inner: 15px;
    --icon-size: calc(1em * 1.2);
    --transition: 100ms;
    line-height: calc(1em * 1);
    display: inline-flex;
    border: 1px solid var(--border-color);
    color: var(--yawhite);
    background: var(--color);
    font-size: var(--font-size);
    padding: var(--padding-top-bottom) var(--padding-left-right);
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    /*margin-bottom: 10px;*/
    align-content: space-between;
    transition: var(--transition);
    text-decoration: none;
    /*box-shadow: inset 0 0 1px 1px #00000038, 0px 1px 0px 0px #0000002b;*/
}
.button:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.button:hover {
    --ui-color: var(--yayellow);
    color: var(--yablack);
    background: var( --ui-color);
    border: solid 1px var(--border-color);
    /*
     Создать медиа запрос на кастомный скрин вот так
     */
}
.button .icon {
    width: var(--icon-size);
    height: var(--icon-size);
    --fill: var(--color);
    fill: var(--color);
    margin: 0 calc(var(--margin-inner) / 2.5);
    box-sizing: border-box;
    transition: var(--transition);
}
.button span {
    font-size: var(--font-size);
    margin: 0 calc(var(--margin-inner) / 2.5);
}
.transparent {
    background: transparent;
    color: var(--ui-color);
    border: solid 1px var(--border-color);
}
.transparent:hover {
    --ui-color: var(--yadarkblue);
    background: var(--ui-color);
    color: var(--white);
}
.transparent:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.w100 {
    width: 100%;
}
</style>