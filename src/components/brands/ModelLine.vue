<template>
    <div class="available__grid-item">
        <div class="grid-item__head">
            <router-link :to="link" class="grid-item__head-img">
                <img :src="picture" :alt="brand + ' ' + model.name" v-if="picture">
                <icon-base icon-name="ciscrossover" v-if="!picture && model.body.code == 'crossover'"><icon-ciscrossover /></icon-base>
                <icon-base icon-name="ciscupe" v-if="!picture && model.body.code == 'cupe'"><icon-ciscupe /></icon-base>
                <icon-base icon-name="cisliftback" v-if="!picture && model.body.code == 'liftback'"><icon-cisliftback /></icon-base>
                <icon-base icon-name="cishatchback" v-if="!picture && model.body.code == 'hatchback'"><icon-cishatchback /></icon-base>
                <icon-base icon-name="cismicrobus" v-if="!picture && model.body.code == 'microbus'"><icon-cismicrobus /></icon-base>
                <icon-base icon-name="cisminivan" v-if="!picture && model.body.code == 'minivan'"><icon-cisminivan /></icon-base>
                <icon-base icon-name="cispickup" v-if="!picture && model.body.code == 'pickup'"><icon-cispickup /></icon-base>
                <icon-base icon-name="cissedan" v-if="!picture && model.body.code == 'sedan'"><icon-cissedan /></icon-base>
                <icon-base icon-name="cissuv" v-if="!picture && model.body.code == 'suv'"><icon-cissuv /></icon-base>
                <icon-base icon-name="cisvan" v-if="!picture && model.body.code == 'van'"><icon-cisvan /></icon-base>
                <icon-base icon-name="ciswagon" v-if="!picture && body.code == 'wagon'"><icon-ciswagon /></icon-base>
            </router-link>
            <div class="grid-item__head-discont" v-if="model.Discount">Выгода</div>
        </div>
        <div class="head_items">
            <div class="grid-item__head-discont--grid_line" v-if="model.Discount">Выгода</div>
            <router-link :to="link" class="grid-item__title">{{ model.name }}</router-link>
        </div>
        <div class="grid-item__sub">
            <span class="grid-item__sub--items">{{ Format( Number(model.vehicles) ) }} {{ getWorld(Number(model.vehicles), 'a') }}</span>
            <span class="grid-item__sub--items">{{ Format( Number(model._colors) ) }} {{ getWorld(Number(model._colors), 'c') }}</span>
        </div>
        <button class="button transparent w100"><span style="z-index: 50;">от {{ Format( Number(model.min_price) ) }} </span><span class="rub">₽</span></button>
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
    name: 'ModelItem',
    components: {
        IconBase,
        IconCiscrossover, IconCiscupe, IconCishatchback, IconCisliftback, 
        IconCismicrobus, IconCisminivan, IconCispickup, IconCissedan,
        IconCissuv, IconCisvan, IconCiswagon
    },
    props: ['picture', 'brand', 'link', 'model'],
    methods: {
        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style scoped>
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
    color: var(--black);
}
.flex__head-count {
    color: var(--yadarkgray);
    margin-left: 1em;
}
.flex__head-link {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    text-decoration: none;
    color: var(--black);
}
.flex__head-link svg {
    fill: var(--yayellow);
    width: 10px;
    height: 20px;
    margin-left: 2em;
}
.available__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--grid-card), 1fr));
    gap: 20px;
    margin-bottom: 4rem;
}
.available__line {
    display: block;
}
.available__line .available__grid-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 2rem;
    margin-bottom: 30px;
    align-items: center;
    justify-items: start;
    gap: 10px;
}
.available__line .grid-item__head-discont {
    display: none;
}
.grid-item__head-discont--grid_line {
    display: none;
}
.available__line .head_items {
    position: relative;
}
.available__line .grid-item__head-discont--grid_line {
    display: block;
    border: solid 1px var(--yayellow);
    padding: 5px 30px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1em;
    color: var(--yadarkblue);
    margin-bottom: 2em;
    position: absolute;
    top: -4em;
    left: 0;
}
.available__grid-item {
    text-decoration: none;
    border: solid 1px var(--yamiddlegray);
    display: block;
    padding: 2rem 2rem;
    user-select: none;
    transition: 200ms;
}
.available__line .available__grid-item .grid-item__head-img img {
    width: 100%;
    object-fit: contain;
    max-width: 250px;
    max-height: 150px;
}
.available__line .grid-item__sub{
    margin-bottom: 0;
}
.available__line .grid-item__title{
    margin-bottom: 0;
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
}
.grid-item__head-img {
    display: block;
}
.grid-item__head-img img {
    width: 100%;
    object-fit: none;
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
    top: 0;
    left: 0;
    border: solid 1px var(--yayellow);
    padding: 5px 30px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1em;
    color: var(--yadarkblue);
}
.grid-item__title {
    text-decoration: none;
    font-size: 22px;
    font-weight: 600;
    line-height: 1em;
    margin-bottom: 1em;
    display: block;
    color: var(--black);
}
.grid-item__sub {
    font-size: 14px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 2em;
    color: var(--yadarkgray);
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