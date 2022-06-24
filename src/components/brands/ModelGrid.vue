<template>
    <div class="available__grid-item">
        <div class="grid-item__head">
            <router-link :to="link" class="grid-item__head-img">
                <img :src="picture" :alt="brand + ' ' + name" v-if="picture">
                <icon-base icon-name="ciscrossover" v-if="!picture && body == 'crossover'"><icon-ciscrossover /></icon-base>
                <icon-base icon-name="ciscupe" v-if="!picture && body == 'cupe'"><icon-ciscupe /></icon-base>
                <icon-base icon-name="cisliftback" v-if="!picture && body == 'liftback'"><icon-cisliftback /></icon-base>
                <icon-base icon-name="cishatchback" v-if="!picture && body == 'hatchback'"><icon-cishatchback /></icon-base>
                <icon-base icon-name="cismicrobus" v-if="!picture && body == 'microbus'"><icon-cismicrobus /></icon-base>
                <icon-base icon-name="cisminivan" v-if="!picture && body == 'minivan'"><icon-cisminivan /></icon-base>
                <icon-base icon-name="cispickup" v-if="!picture && body == 'pickup'"><icon-cispickup /></icon-base>
                <icon-base icon-name="cissedan" v-if="!picture && body == 'sedan'"><icon-cissedan /></icon-base>
                <icon-base icon-name="cissuv" v-if="!picture && body == 'suv'"><icon-cissuv /></icon-base>
                <icon-base icon-name="cisvan" v-if="!picture && body == 'van'"><icon-cisvan /></icon-base>
                <icon-base icon-name="ciswagon" v-if="!picture && body == 'wagon'"><icon-ciswagon /></icon-base>
            </router-link>
            <div class="grid-item__head-discont" v-if="Discount">Выгода</div>
        </div>
        <div class="head_items">
            <div class="grid-item__head-discont--grid_line" v-if="Discount">Выгода</div>
            <router-link :to="link" class="grid-item__title">{{ name }}</router-link>
        </div>
        <div class="grid-item__sub">
            <span class="grid-item__sub--items">{{ Format( Number(cis) ) }} {{ getWorld(Number(cis), 'a') }}</span>
            <span class="grid-item__sub--items">{{ Format( Number(colors) ) }} {{ getWorld(Number(colors), 'c') }}</span>
        </div>
        <button class="button transparent w100">от {{ Format( Number(price) ) }} <span class="rub">₽</span></button>
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
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

export default {
    name: 'ModelGrid',
    components: {
        IconBase,
        IconCiscrossover, IconCiscupe, IconCishatchback, IconCisliftback, 
        IconCismicrobus, IconCisminivan, IconCispickup, IconCissedan,
        IconCissuv, IconCisvan, IconCiswagon
    },
    props: ['discount', 'price', 'colors', 'cis', 'picture', 'name', 'brand', 'link', 'body'],
    mounted: function() {
    },
    methods: {

        getWorld( q = 1, f = 'a' ) {

            let res = {
                'c': ['цвет', 'цвета', 'цветов'],
                'a': ['автомобиль', 'автомобиля', 'автомобилей']
            }
            let t = [
				[1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141, 151, 161, 171, 181, 191],
				[2,3,4,22,23,24,32,33,34,42,43,44,52,53,54,62,63,64,72,73,74,82,83,84,92,93,94,102,103,104,122,123,124,132,133,134,142,143,144,152,153,154,162,163,164,172,173,174,182,183,184,192,193,194]
			]

            if ( t[0].indexOf(q) >= 0 ) return res[f][0]
            if ( t[1].indexOf(q) >= 0 ) return res[f][1]
            return res[f][2]
        },
        
        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style scoped>
.available__grid-item {
    text-decoration: none;
    border: solid 1px var(--yagray);
    display: block;
    padding: 2rem 2rem;
    user-select: none;
    transition: 200ms;
    border-radius: 3px;
}
.available__grid-item:hover {
    border: solid 1px var(--yayellow);
}
.available__grid-item .button {
    --padding-left-right: 20px;
    position: relative;
    overflow: hidden;
    transition: 300ms;
}
.available__grid-item .button::before {
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
.available__grid-item:hover .button::before {
    bottom: -199px;
    left: -240px;
}
.available__grid-item .button span {
    z-index: 50;
    margin: 0;
}
.available__grid-item .button:hover {
    background: transparent;
    color: var(--ui-color);
}
.grid-item__head-discont--grid_line {
    display: none;
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

.grid__icon-form {
    --icon-size: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
}
.grid__icon-form .grid-item__title {
    line-height: 1.3em;
    margin-bottom: 0;
}
.grid__icon-form .grid-item__sub {
    margin-bottom: 0;
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
.grid__icon-form .grid-item__sub {}
.grid-item__head {
    position: relative;
    min-height: 182.5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.grid-item__head-img {
    display: block;
}
.grid-item__head-img img {
    width: 100%;
    object-fit: unset;
}
.grid-item__head-img svg {
    width: 176px;
    height: 176px;
    fill: var(--yamiddlegray);
    object-fit: unset;
    transform: scale(-1, 1);

}
.grid-item__head-discont {
    position: absolute;
    top: -1em;
    left: 0;
    border: solid 1px var(--yayellow);
    padding: 5px 30px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1em;
    color: var(--yadarkblue);
    background-color: var(--yawhite);
}
.grid-item__title {
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    line-height: 1em;
    margin-bottom: 1em;
    display: block;
    color: var(--black);
    min-height: 50px;
    max-height: 50px;
    text-transform: uppercase;
}
.grid-item__sub {
    font-size: 14px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 2em;
    color: var(--yamiddlegray);
   /* display: grid;
    grid-template-columns: repeat(2, 1fr);*/
    gap: 10px;
}
.grid-item__sub--items::before {
    content: '\2022';
    color: var(--yadarkblue);
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    font-size: 20px;
    vertical-align: middle;
}
.grid-item__sub--items:nth-child(1)::before {
    content: '';
    margin-left: 0;
    margin-right: 0;
}
</style>