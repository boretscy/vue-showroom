<template>
    <div class="model__grid-card">
        <div v-if="item.type == 'vehicle'">
            <div class="model__grid-card__head">
                <router-link :to="link" class="model__grid-card__head--img">
                    <img :src="item.image" :alt="item.brand.name+' '+item.model.name" v-if="item.image">
                    
                    <icon-base icon-name="ciscrossover" v-if="!item.image && item.body.code == 'crossover'"><icon-ciscrossover /></icon-base>
                    <icon-base icon-name="ciscupe" v-if="!item.image && item.body.code == 'cupe'"><icon-ciscupe /></icon-base>
                    <icon-base icon-name="cisliftback" v-if="!item.image && item.body.code == 'liftback'"><icon-cisliftback /></icon-base>
                    <icon-base icon-name="cishatchback" v-if="!item.image && item.body.code == 'hatchback'"><icon-cishatchback /></icon-base>
                    <icon-base icon-name="cismicrobus" v-if="!item.image && item.body.code == 'microbus'"><icon-cismicrobus /></icon-base>
                    <icon-base icon-name="cisminivan" v-if="!item.image && item.body.code == 'minivan'"><icon-cisminivan /></icon-base>
                    <icon-base icon-name="cispickup" v-if="!item.image && item.body.code == 'pickup'"><icon-cispickup /></icon-base>
                    <icon-base icon-name="cissedan" v-if="!item.image && item.body.code == 'sedan'"><icon-cissedan /></icon-base>
                    <icon-base icon-name="cissedan" v-if="!item.image && item.body.code == 'none'"><icon-cissedan /></icon-base>
                    <icon-base icon-name="cissuv" v-if="!item.image && item.body.code == 'suv'"><icon-cissuv /></icon-base>
                    <icon-base icon-name="cisvan" v-if="!item.image && item.body.code == 'van'"><icon-cisvan /></icon-base>
                    <icon-base icon-name="ciswagon" v-if="!item.image && item.body.code == 'wagon'"><icon-ciswagon /></icon-base>
                    <icon-base icon-name="cisbus" v-if="!item.image && item.body.code == 'bus'"><icon-cisbus /></icon-base>
                    <icon-base icon-name="ciscargovan" v-if="!item.image && item.body.code == 'cargovan'"><icon-ciscargovan /></icon-base>
                    <icon-base icon-name="cisflatbedvan" v-if="!item.image && item.body.code == 'flatbedvan'"><icon-cisflatbedvan /></icon-base>
                    <icon-base icon-name="cisgoodsvan" v-if="!item.image && item.body.code == 'goodsvan'"><icon-cisgoodsvan /></icon-base>
                    <icon-base icon-name="cischassis" v-if="!item.image && item.body.code == 'chassis'"><icon-cischassis /></icon-base>
                    
                </router-link>
                <div class="model__grid-card__head--top">
                    <div class="model__grid-card__head--top_discont" v-if="item.Discount">
                        <VueCustomTooltip :label="discount_tooltip" position="is-bottom" multiline size="is-medium">
                            до {{ Format(discount) }} <span class="rub">₽</span>
                        </VueCustomTooltip>
                    </div>
                    <div class="model__grid-card__head--top_icons">
                        <VueCustomTooltip label="Избранное">
                            <a href="#" :class="{'is--active': locstore.FAVORITES.indexOf(item.id) >= 0}" @click.prevent="toggleLocstore('FAVORITES')">
                                <icon-base icon-name="cisfavorites"><icon-cisfavorites /></icon-base>
                            </a>
                        </VueCustomTooltip>
                        <VueCustomTooltip label="Сравнение">
                            <a href="#" :class="{'is--active': locstore.COMPARE.indexOf(item.id) >= 0}" @click.prevent="toggleLocstore('COMPARE')">
                                <icon-base icon-name="ciscompare"><icon-ciscompare /></icon-base>
                            </a>
                        </VueCustomTooltip>
                    </div>
                </div>
            </div>
            <div class="model__grid-card__content">
                <router-link :to="link" class="model__grid-card__content--title">{{ item.brand.name+' '+item.model.name+' '+((item.equipment)?item.equipment:'') }}</router-link>
                <div class="model__grid-card__content--list">
                    <span class="model__grid-card__content--list-item" v-if="item._general[0]">{{ item._general[0] }}</span>
                    <span class="model__grid-card__content--list-item bullet-before" v-if="item._general[1]">{{ item._general[1] }}</span>
                    <span class="model__grid-card__content--list-item bullet-before" v-if="item._general[2]">{{ item._general[2] }}</span>
                </div>
                <div style="display: block;width: 100%;"></div>
                <div class="model__grid-card__content--list">
                    <span class="model__grid-card__content--list-item" v-if="item._general[3]">{{ item._general[3] }}</span>
                    <span class="model__grid-card__content--list-item bullet-before" v-if="item._general[4]">{{ item._general[4] }}</span>
                    <span class="model__grid-card__content--list-item bullet-before" v-if="item._general[5]">{{ item._general[5] }}</span>
                </div>
            </div>
            <div class="model__grid-card__footer">
                <div 
                    class="model__grid-card__content--status"
                    v-if="item.status"
                    :class="{'--in-stock': item.status.id == 1, '--in-transit': item.status.id == 2}"
                    >{{ item.status.name }}</div>
                <div class="model__grid-card__content--price">
                    <div class="model__grid-card__content--price_curent">{{ Format(item.min_price) }} <span class="rub">₽</span></div>
                    <div class="model__grid-card__content--price_discont" v-if="item.Discount">{{ Format(item.price) }} <span class="rub">₽</span></div>
                </div>
                <button class="button transparent w100" @click="show(item.id, item.brand.name+' '+item.model.name+' '+((item.equipment)?item.equipment:''), item.dealership.name)">
                    <span>ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ</span>
                </button>
            </div>
        </div>
        <cta-grid 
            :cta="item"
            v-else />
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCisfavorites from '@/components/icons/IconCisfavorites.vue'
import IconCiscompare from '@/components/icons/IconCiscompare.vue'
import IconCiscrossover from '@/components/icons/IconCiscrossover.vue'
import IconCiscupe from '@/components/icons/IconCiscupe.vue'
import IconCisliftback from '@/components/icons/IconCisliftback.vue'
import IconCishatchback from '@/components/icons/IconCishatchback.vue'
import IconCismicrobus from '@/components/icons/IconCismicrobus.vue'
import IconCisminivan from '@/components/icons/IconCisminivan.vue'
import IconCispickup from '@/components/icons/IconCispickup.vue'
import IconCissedan from '@/components/icons/IconCissedan.vue'
import IconCissuv from '@/components/icons/IconCissuv.vue'
import IconCisvan from '@/components/icons/IconCisvan.vue'
import IconCiswagon from '@/components/icons/IconCiswagon.vue'
import IconCisbus from '@/components/icons/IconCisbus.vue'
import IconCiscargovan from '@/components/icons/IconCiscargovan.vue'
import IconCisflatbedvan from '@/components/icons/IconCisflatbedvan.vue'
import IconCisgoodsvan from '@/components/icons/IconCisgoodsvan.vue'
import IconCischassis from '@/components/icons/IconCischassis.vue'

import CtaGrid from '@/components/cta/CtaGrid.vue'

export default {
    name: 'ItemGrid',
    components: {
        IconBase, IconCiscompare, IconCisfavorites,
        IconCiscrossover, IconCiscupe, IconCishatchback, IconCisliftback, 
        IconCismicrobus, IconCisminivan, IconCispickup, IconCissedan,
        IconCissuv, IconCisvan, IconCiswagon, IconCisbus, IconCiscargovan, IconCisflatbedvan,
        IconCisgoodsvan, IconCischassis,
        CtaGrid
    },
    props: ['item'],
    data() {
        return {
            locstore: {
                FAVORITES: JSON.parse(localStorage.getItem('CIS_FAVORITES')) || [],
                COMPARE: JSON.parse(localStorage.getItem('CIS_COMPARE')) || []
            },
            link: '/'
        }
    },
    computed: {
        discount: function() {

            return this.item.price - this.item.min_price
        },
        discount_tooltip: function() {
            let res = []
            if ( this.item.discounts ) {
                this.item.discounts.forEach( (i) => {
                    if ( i.active ) res.push( i.description+' - до '+this.Format(i.sum)+' ₽' )
                })
            } else if ( this.item.Discount ) {
                res.push( 'Специальная выгода - до '+this.Format(this.discount)+' ₽' )
            }
            return res.join(' ')
        }

    },
    mounted: function() {
        if ( this.item.type == 'vehicle' ) {
            this.link = '/'
            this.link += this.item.brand.code || ' '
            this.link += '/'
            this.link += this.item.model.code || ' '
            this.link += '/'
            this.link += this.item.id

            setInterval(() => {
                this.locstore = {
                    FAVORITES: JSON.parse(localStorage.getItem('CIS_FAVORITES')) || [],
                    COMPARE: JSON.parse(localStorage.getItem('CIS_COMPARE')) || []
                }
            }, 500)
        }
    },
    methods: {
        show(id, name, ds) {
            
            this.$store.state.global.selectedVehicle = id
            this.$store.state.global.selectedVehicleName = name
            this.$store.state.dealership = ds

            this.$modal.show('form-offer')
        },
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
    --heigth: 228px;
    background: var(--yawhite);
    min-height: var(--heigth);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.model__grid-card__head--img img {
    width: 100%;
    object-fit: unset;
    max-height: var(--heigth);
}
.model__grid-card__head--img svg {
    width: 176px;
    height: 176px;
    fill: var(--yamiddlegray);
    object-fit: unset;
    transform: scale(-1, 1);
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
    align-items: center;
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
    vertical-align: middle;
}
.model__grid-card__head--top_icons a:hover svg {
    fill: var(--yadarkblue);
}
.model__grid-card__content {
    padding: var(--padding);
    padding-bottom: 0;
    margin-bottom: var(--margin-bottom);
    min-height: 152px;
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
    margin-bottom: 1em;
    display: block;
    height: 54px;
}
.model__grid-card__content--list {
    margin-bottom: var(--margin-bottom);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: revert;
    margin-bottom: 5px;

}
.model__grid-card__content--list-item {
    font-size: 13px;
    font-weight: 300;
    line-height: 1em;
    color: var(--yadarkgray);
}
.model__grid-card__content--list-item.bullet-before::before {
    content: '\2022';
    color: var(--yadarkblue);
    margin-right: 0.2rem;
    margin-left: 0.2rem;
    font-size: 20px;
    vertical-align: middle;
}
/* .model__grid-card__content--list-item:nth-child(1)::before {
    content: '';
    margin-left: 0;
    margin-right: 0;
} */
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
@media (max-width: 1024px) {
    .model__grid-card__footer .button {
        width: 100%;
    }
}
@media (max-width: 1400px) {
    .model__grid-card__head--img img {
        object-fit: cover;
    }
}

.vue-custom-tooltip.is-bottom.has-multiline.is-medium:after {
    width: 210px;
}
</style>