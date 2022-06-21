<template>
    <div class="model__grid-card">
        <div class="model__grid-card__head">
            <router-link :to="'/'+brand.alias+'/'+model.alias+'/'+item.id" class="model__grid-card__head--img">
                <img :src="item.images[0].preview_large" :alt="brand.name+' '+model.name">
            </router-link>
            <div class="model__grid-card__head--top" v-if="item.discounts">
                <div class="model__grid-card__head--top_discont">
                    до {{ Format(discount) }} <span class="rub">₽</span>
                </div>
                <div class="model__grid-card__head--top_icons">
                    <a href="#" :class="{'is--active': locstore.FAVORITES.indexOf(item.id) >= 0}" @click.prevent="toggleLocstore('FAVORITES')">
                        <icon-base icon-name="cisfavorites"><icon-cisfavorites /></icon-base>
                    </a>
                    <a href="#" :class="{'is--active': locstore.COMPARE.indexOf(item.id) >= 0}" @click.prevent="toggleLocstore('COMPARE')">
                        <icon-base icon-name="ciscompare"><icon-ciscompare /></icon-base>
                    </a>
                </div>
            </div>
        </div>
        <div class="model__grid-card__content">
            <router-link :to="'/'+brand.alias+'/'+model.alias+'/'+item.id" class="model__grid-card__content--title">{{ item.brand_name+' '+item.model_name+' '+item.equipment }}</router-link>
            <div class="model__grid-card__content--list">
                <span class="model__grid-card__content--list-item">{{ item.general[4].value }}</span>
                <span class="model__grid-card__content--list-item">{{ item.body_type }}</span>
                <span class="model__grid-card__content--list-item">{{ item.general[1].value }}</span>
                <span class="model__grid-card__content--list-item">{{ item.general[0].value }}</span>
            </div>
        </div>
        <div class="model__grid-card__footer">
            <div class="model__grid-card__content--status --in-stock">{{ item.status.name }}</div>
            <div class="model__grid-card__content--price">
                <div class="model__grid-card__content--price_curent">{{ Format(item.min_price) }} <span class="rub">₽</span></div>
                <div class="model__grid-card__content--price_discont" v-if="item.discounts">{{ Format(item.price) }} <span class="rub">₽</span></div>
            </div>
            <button class="button transparent">
                <span>ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ</span>
            </button>
        </div>
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCisfavorites from '@/components/icons/IconCisfavorites.vue'
import IconCiscompare from '@/components/icons/IconCiscompare.vue'

export default {
    name: 'ItemLine',
    components: {
        IconBase, IconCisfavorites, IconCiscompare
    },
    props: ['brand', 'model', 'item'],
    data() {
        return {
        }
    },
    computed: {
        discount: function() {
            if ( this.item.discounts ) {
                let s = 0
                this.item.discounts.forEach( (item) => {
                    s += item.sum
                })
                
                return s
            } else {
                return false
            }
        }
    },
    mounted: function() {
        setInterval(() => {
            this.locstore = {
                FAVORITES: JSON.parse(localStorage.getItem('CIS_FAVORITES')) || [],
                COMPARE: JSON.parse(localStorage.getItem('CIS_COMPARE')) || []
            }
        }, 500);
    },
    methods: {
        toggleLocstore(elem, id = this.item.id) {
            
            if ( this.locstore[elem].indexOf(id) < 0) {
                this.locstore[elem].push(id)
            } else {
                this.locstore[elem].splice(this.locstore[elem].indexOf(id), 1)
            }
            localStorage.setItem('CIS_'+elem, JSON.stringify(this.locstore[elem]))
        },
        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style scoped>
.model__line {
    display: block;
}
.model__line .model__grid-card {
    /*--rows: 200px;*/
    display: grid;
    grid-template-columns: 300px repeat(2, 1fr);
    /*grid-template-rows: var(--rows);*/
    justify-items: start;
    align-items: center;
    margin-bottom: 1rem;
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
    background: var(--yawhite);
    height: 100%;
    min-height: inherit;
    /* max-height: 220px; */
    width: 100%;
    display: grid;
    align-items: center;
}
.model__line .model__grid-card__footer {
    justify-self: end;
}
.model__line .model__grid-card__head--img {
    height: var(--rows);
    display: flex;
    align-items: center;
}
.model__grid-card__head--img img {
    width: 100%;
    object-fit: cover;
}
.model__line .model__grid-card__head--img img {
    object-fit: cover;
    height: var(--rows);
}
.model__grid-card__head--top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1em 2em;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1em;
    color: var(--yadarkblue);
    display: flex;
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
}
.model__grid-card__head--top_icons {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
}
.model__grid-card__head--top_icons a {
    background: var(--yawhite);
    padding: 5px;
    border: solid 1px var(--yagray);
    border-radius: 3px;
    position: relative;
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
    fill: var(--yayellow);
}
.model__grid-card__head--top_icons a svg {
    --icon-size: 15px;
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--yagray);
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
.model__line .model__grid-card__footer {
    padding-top: 2em;
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
    color: var(--yawhite);
}
.transparent:active {
    box-shadow: inset 0 0 3px 2px #00000020;
}
.w100 {
    width: 100%;
}
</style>