<template>
    <div class="yapps-cis">
        <div class="h1">Избранные автомобили</div>
        <div class="tab">
            <div class="tab_head">
                <router-link to="/favorites" class="button --is-active">
                    <span>Избранное</span>
                    <span class="count">{{ favorites.length }}</span>
                </router-link >
                <button class="button" @click.prevent="clear">
                    <span>Очистить</span>
                </button>
            </div>
            <div class="tab_content">
                <div class="tab_content-item --is-active" id="equipment">
                    <div class="model__grid">
                        <item-grid 
                            v-for="item in items"
                            :key="item.id"
                            :brand="item.brand"
                            :model="item.model"
                            :item="item"
                            />
                    </div>
                </div>
                <!-- <div class="tab_content-item">
                    <div class="tabs_content-item__list">Установка автосигнализации с обратной связью</div>
                    <div class="tabs_content-item__list">Обработка антрикоррозийная</div>
                    <div class="tabs_content-item__list">Тонирование стекол</div>
                </div> -->
            </div>
        </div>
        <div class="tab" v-if="!favorites.length" style="padding-top: 100px; text-align: center">
            <div class="tab_head">
                <h3 style="margin-bottom: 1em">Вы не добавили автомобили в "Избранное"</h3>
            </div>
            <div class="tab_content">
                <router-link to="/" class="button hovered-t">Перейти к выбору авто &rarr;</router-link>
            </div>
        </div>
	</div>
</template>

<script>
import ItemGrid from '@/components/items/ItemGrid.vue'

export default {
	name: 'Favorites',
	components: {
        ItemGrid
	},
	data() {
		return {
            items: [],
            favorites: JSON.parse(localStorage.getItem('CIS_FAVORITES')) || [],
		}
	},
	computed: {
	},
	watch: {
	},
	mounted: function() {

        this.$store.state.nav = {
                brand: 'Избранные автомобили'
        }

        if ( this.favorites.length ) {
            let url = this.$store.state.apiUrl+'vehicles/all/?token='+this.$store.state.apiToken+'&id='+this.favorites.join(',')
            this.axios.get(url).then((response) => {
                this.items = response.data.items || []
            })
            setInterval(() => {
            
                this.favorites = JSON.parse(localStorage.getItem('CIS_FAVORITES')) || []
                this.items.forEach((i, k) => {
                    if ( !this.favorites.includes(i.id) ) this.items.splice(k, 1)
                })
            }, 100);
        }

        

	},
    methods: {
        clear() {
            this.items = []
            this.favorites = []
            localStorage.setItem('CIS_FAVORITES', JSON.stringify([]))
        }
    }
}
</script>

<style scoped>

.h1 {
    font-weight: 400;
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
        border: 1px solid var(--yadarkblue);
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
        /*box-shadow: inset 0 0 1px 1px var(--yablack)00038, 0px 1px 0px 0px var(--yablack)0002b;*/
    }
    .button:active {
        box-shadow: inset 0 0 3px 2px var(--yablack)00020;
    }
    .button:hover {
        --ui-color: var(--yayellow);
        color: var(--yablack);
        background: var( --ui-color);
        border: solid 1px var(--yadarkblue);
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
    .--white {
        fill: var(--yawhite);
    }
    .transparent {
        background: transparent;
        color: var(--ui-color);
        border: solid 1px var(--yadarkblue);
    }
    .transparent:hover {
        --ui-color: var(--yadarkblue);
        background: var(--ui-color);
        color: var(--yawhite);
    }
    .transparent:active {
        box-shadow: inset 0 0 3px 2px var(--yablack)00020;
    }
    .grid {
        --icon-size: 20px;
        --padding-left-right: 20px;
        --padding-top-bottom: 12px;
        display: grid;
        grid-template-columns: 1fr calc(var(--icon-size) * 2);
        justify-content: space-between;
        align-items: center;
        padding: 0;
        justify-items: center;
    }
    .grid span {
        margin: 0;
        padding: var(--padding-top-bottom) var(--padding-left-right);
        border-right: solid 1px var(--yawhite);
    }
    .grid .icon {
        --background-color: var(--yawhite);
        fill: var(--background-color);
        width: var( --icon-size);
        height: var( --icon-size);
    }
    .grid:hover .icon {
        fill: var(--yablack);
    }

    .hovered-t {
        --ui-color: var(--yadarkblue);
        position: relative;
        overflow: hidden;
        transition: 300ms;
        background: var(--yawhite);
        color: var(--ui-color);
    }
    .hovered-t:hover {
        --ui-color: var(--yadarkblue);
        background: var(--yawhite);
        color: var(--ui-color);
        border: solid 1px var(--ui-color);
    }
    .hovered-t::before {
        content: "";
        background-color: var(--yayellow);
        border-radius: 50%;
        width: 300px;
        height: 300px;
        position: absolute;
        bottom: -300px;
        left: -300px;
        transition: .2s;
        z-index: 0;
    }
    .hovered-t:hover::before{
        bottom: -199px;
        left: -240px;
    }
    .tab {

    }
    .tab_head {
        display: inline-flex;
        gap: 10px;
    }
    .tab_head .button {
        --padding-left-right: 20px;
        background: var(--yawhite);
        color: var(--dark-black);
        border: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1em;
        transition: 200ms;
        width: 100%;
    }
    .tab_head .count {
        font-weight: 600;
    }
    .tab_head .--is-active {
        color: var(--yadarkblue);
        font-weight: 500;
    }
    .tab_head .button {
        box-shadow: inherit;
    }
    .tab_head .button span {
        z-index: 100;
    }
    .tab_head .button:hover {

    }
    .tab_content {}
    .tab_content-item {
        display: none;
        margin: 2rem 0;
    }
    .tab_content .--is-active {
        display: block;
    }
    .tab_head .--is-active {
        border: solid 1px var(--yayellow) !important;
    }
    .tab_content-item__list {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5em;
        padding: 1em 0 calc(1em / 2);
        border-bottom: dotted 1px var(--yablackgray);
    }
    .tab_content-item__title {
        font-size: 14px;
        font-weight: 600;
        line-height: 1em;
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
    .model__grid-card {
        --margin-bottom: 2em;
        --padding: 2rem 2rem;;
        text-decoration: none;
        border: solid 1px var(--yagray);
        display: block;
        user-select: none;
        border-radius: 3px;
        transition: 200ms;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .model__grid-card:hover {
        border: solid 1px var(--yayellow);
    }
    .model__grid-card__head {
        position: relative;
    }
    .model__grid-card__head--img {
        --heigth: 200px;
        background: var(--yawhite);
        min-height: var(--heigth);
        height: 100%;
        display: flex;
        align-items: center;
    }
    .model__grid-card__head--img img {
        width: 100%;
        object-fit: unset;
        max-height: var(--heigth);
    }
    .model__grid-card__head--top {
        position: absolute;
        top: 1em;
        left: 0;
        right: 0;
        padding: 1em 2em;
        border-radius: 3px;
        font-size: 12px;
        line-height: 1em;
        color: var(--yadarkblue);
        display: grid;
        grid-template-columns: 120px 60px;
        justify-content: space-between;
        align-items: center;
    }
    .model__grid-card__head--top_discont {
        background: var(--yawhite);
        border: solid 1px var(--yayellow);
        padding: 5px 15px;
        font-size: 12px;
        font-weight: 300;
        color: var(--yadarkblue);
        border-radius: 3px;
        position: absolute;
        left: 2em;
    }
    .model__grid-card__head--top_icons {
        display: flex;
        justify-content: space-between;
        gap: 0.5em;
        position: absolute;
        right: 2em;
    }
    .model__grid-card__head--top_icons a {
        background: var(--yawhite);
        padding: 5px;
        border: solid 1px var(--yagray);
        border-radius: 3px;
        position: relative;
        transition: .2s;
    }
    .model__grid-card__head--top_icons a.is--active {
        background: var(--yalightyellow);
        transition: .2s;
    }
    .model__grid-card__head--top_icons a span {
        position: absolute;
        top: -8px;
        right: -5px;
        width: 17px;
        height: 17px;
        font-size: 11px;
        background: var(--yadarkblue);
        border-radius: 50%;
        color: var(--yawhite);
        align-items: center;
        justify-content: center;
        display: none;
    }
    .model__grid-card__head--top_icons a.is--active span{
        display: flex;
    }
    .model__grid-card__head--top_icons a.is--active svg{
        fill: var(--yadarkblue);
    }
    .model__grid-card__head--top_icons a svg {
        --icon-size: 14px;
        width: var(--icon-size);
        height: var(--icon-size);
        fill: var(--yadarkgray);
        transition: 200ms;
    }
    .model__grid-card__head--top_icons a:hover svg {
        fill: var(--yadarkblue);
    }
    .model__grid-card__content {
        padding: var(--padding);
        padding-bottom: 0;
    }
    .model__grid-card__footer {
        padding: var(--padding);
        padding-top: 0;
    }
    .model__grid-card__footer .button {
        --padding-left-right: 20px;
        position: relative;
        overflow: hidden;
        transition: 300ms;
    }
    .model__grid-card__footer .button:hover {
        background: transparent;
        color: var(--ui-color);
    }
    .model__grid-card__footer .button span {
        z-index: 50;
        margin: 0;
    }
    .model__grid-card .button::before{
        content: "";
        background-color: var(--yayellow);
        border-radius: 50%;
        width: 300px;
        height: 300px;
        position: absolute;
        bottom: -300px;
        left: -300px;
        transition: .2s;
        z-index: 0;
    }
    .model__grid-card:hover .button::before{
        bottom: -199px;
        left: -240px;
    }
    .model__grid-card__content--title {
        font-size: 18px;
        font-weight: 500;
        line-height: 1em;
        color: var(--yablack);
        text-decoration: none;
        margin-bottom: 2em;
        display: block;
    }
    .model__grid-card__content--list {
        margin-bottom: var(--margin-bottom);
    }
    .model__grid-card__content--list-item {
        font-size: 14px;
        font-weight: 300;
        line-height: 1em;
        color: var(--yadarkgray);
    }
    .model__grid-card__content--list-item::before {
        content: '\2022';
        color: var(--yadarkblue);
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        font-size: 20px;
        vertical-align: middle;
    }
    .model__grid-card__content--list-item:nth-child(1)::before {
        content: '';
        margin-left: 0;
        margin-right: 0;
    }
    .model__grid-card__content--status {
        font-size: 12px;
        font-weight: 400;
        line-height: 1em;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
    .--in-transit {
        color: var(--yayellow);
    }
    .--in-stock {
        color: var(--yadarkblue);
    }
    .model__grid-card__content--price {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    .model__grid-card__content--price_curent {
        font-size: 16px;
        font-weight: 400;
        line-height: 1em;
    }
    .model__grid-card__content--price_discont {
        font-size: 14px;
        font-weight: 300;
        line-height: 1em;
        color: var(--yadarkgray);
        text-decoration: line-through;
    }
    .close_box {
        position: relative;
        display: block;
    }
    .close {
        --width: 1em;
        --volume: 2px;
        --color: #333;
        position: absolute;
        right: 1rem;
        top: 1rem;
        line-height: 1;
        font-size: 30px;
        cursor: pointer;
        width: var(--width);
        height: var(--width);
        cursor: pointer;
        overflow: hidden;
    }
    .close:before {
        transform: rotate(45deg);
        position: absolute;
        top: 0;
        left: 50%;
        content: '';
        height: var(--width);
        width: 0;
        border: solid var(--yalightblack);
        border-width: 0px var(--volume) 0 0;
        background-color: var(--yalightblack);
    }
    .close:after {
        transform: rotate(-45deg);
        position: absolute;
        top: 0;
        left: 50%;
        content: '';
        height: var(--width);
        width: 0;
        border: solid var(--yalightblack);
        border-width: 0px var(--volume) 0 0;
        background-color: var(--yalightblack);
    }
</style>
