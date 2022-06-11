<template>
    <div class="available__grid-item">
        <div class="grid-item__head">
            <router-link :to="'/'+brand+'/'+alias" class="grid-item__head-img">
                <img :src="picture" :alt="brand + ' ' + name">
            </router-link>
            <div class="grid-item__head-discont" v-if="discount">Выгода</div>
        </div>
        <div class="head_items">
            <div class="grid-item__head-discont--grid_line" v-if="discount">Выгода</div>
            <router-link :to="'/'+brand+'/'+alias" class="grid-item__title">{{ name }}</router-link>
        </div>
        <div class="grid-item__sub">
            <span class="grid-item__sub--items">{{ Format( Number(cis) ) }} автомобилей</span>
            <span class="grid-item__sub--items">{{ Format( Number(colors) ) }} цветов</span>
        </div>
        <button class="button transparent w100">от {{ Format( Number(price) ) }} <span class="rub">₽</span></button>
    </div>
</template>

<script>
export default {
    name: 'ModelItem',
    props: ['discount', 'price', 'colors', 'cis', 'picture', 'name', 'brand', 'alias'],
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
    color: var(--gray);
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
    fill: var(--orange);
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
.available__grid-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0rem 2rem;
    margin-bottom: 30px;
    align-items: center;
    justify-items: start;
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
    border: solid 1px var(--orange);
    padding: 5px 30px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1em;
    color: var(--main);
    margin-bottom: 2em;
    position: absolute;
    top: -4em;
    left: 0;
}
.available__grid-item {
    text-decoration: none;
    border: solid 1px var(--ligth-gray);
    display: block;
    padding: 2rem 2rem;
    user-select: none;
    transition: 200ms;
}
.available__line .available__grid-item .grid-item__head-img img {
    width: inherit;
}
.available__line .grid-item__sub{
    margin-bottom: 0;
}
.available__line .grid-item__title{
    margin-bottom: 0;
}
.available__grid-item:hover {
    border: solid 1px var(--orange);
}
.available__grid-item .button {
    --padding-left-right: 20px;
    position: relative;
    overflow: hidden;
    transition: 300ms;
}
.available__grid-item .button::before {
    content: "";
    background-color: var(--orange);
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
.grid-item__head-discont {
    position: absolute;
    top: 0;
    left: 0;
    border: solid 1px var(--orange);
    padding: 5px 30px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1em;
    color: var(--main);
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
    color: var(--gray);
   /* display: grid;
    grid-template-columns: repeat(2, 1fr);*/
    gap: 10px;
}
.grid-item__sub--items::before {
    content: '\2022';
    color: var(--main);
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