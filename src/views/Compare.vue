<template>
    <div class="yapps-cis">
        <div class="container">
            <div class="h1">Сравнение автомобилей
            </div>

            <div class="tab">
                <div class="radio_head">
                    <div class="config_head">
                        <div class="tabs_head">
                            <button class="button transparent" data-role="tab" data-target="#movie" @click.prevent="clear">
                                <span>Очистить</span>
                            </button>
                        </div>
                    </div>
                    <div class="config_head-items">
                        <div class="config_head-items__title">Выбрано {{ this.compare.length }} {{ getWorld(this.compare.length, 'a') }}</div>
                        <div class="config_head-items__arrow">
                            <div class="swiper-button-prev compare-prev next-prev-buttons"></div>
                            <div class="swiper-button-next compare-next next-prev-buttons"></div>
                        </div>

                    </div>
                </div>
                <div class="tabs_content"  v-if="compare.length > 0">
                    <div class="tabs_content-item --is-active" id="img">
                        <div class="tabs_content-box">
                            <div class="compare --detail__bg">
                                <div class="compare-settings">
                                    <a class="compare-settings__item settings__add">
                                        <div class="settings__add-icon"></div>
                                        <router-link to="/" class="settings__add-text">Добавить авто</router-link>
                                    </a>
                                    <div class="compare-settings__item settings__head">
                                        <div class="settings__head-item">Бренд, модель, комплектация</div>
                                        <div class="settings__head-item">Стоимость</div>
                                    </div>
                                    <div class="compare-settings__item settings__body">
                                        <div class="settings__body-item">
                                            <div class="settings_accordion" :class="{'--accordion-open': accordions.main}">
                                                <div class="settings_accordion--head" @click="accordions.main = !accordions.main">
                                                    <div class="settings_accordion--head__title">Технические параметры</div>
                                                    <div class="tabs_content-item__sub">
                                                        <div class="tabs_content-item__sub-drop">
                                                            <icon-base
                                                                icon-name="corner"
                                                                :class="{'up': accordions.main, 'down': !accordions.main}"
                                                                ><icon-corner />
                                                            </icon-base>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="settings_accordion--body">
                                                    <div class="settings_accordion--body_list">Кузов</div>
                                                    <div class="settings_accordion--body_list">Цвет кузова</div>
                                                    <div class="settings_accordion--body_list">Масса</div>
                                                    <div class="settings_accordion--body_list">Мощность</div>
                                                    <div class="settings_accordion--body_list">Тип двигателя</div>
                                                    <div class="settings_accordion--body_list">Расход топлива</div>
                                                    <div class="settings_accordion--body_list">Максимальная скорость</div>
                                                    <div class="settings_accordion--body_list">Год выпуска</div>
                                                </div>
                                            </div>
                                            <div class="settings_accordion" :class="{'--accordion-open': accordions.sizes}">
                                                <div class="settings_accordion--head" @click="accordions.sizes = !accordions.sizes">
                                                    <div class="settings_accordion--head__title">Размеры</div>
                                                    <div class="tabs_content-item__sub">
                                                        <div class="tabs_content-item__sub-drop">
                                                            <icon-base
                                                                icon-name="corner"
                                                                :class="{'up': accordions.sizes, 'down': !accordions.maisizesn}"
                                                                ><icon-corner />
                                                            </icon-base>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="settings_accordion--body">
                                                    <div class="settings_accordion--body_list">Высота</div>
                                                    <div class="settings_accordion--body_list">Длина</div>
                                                    <div class="settings_accordion--body_list">Ширина</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="compare-slider">
                                <div class="swiper com-slide">
                                    <div class="swiper-wrapper">
                                        <div 
                                            class="swiper-slide"
                                            v-for="(item, indx) in items"
                                            :key="indx">
                                            <div class="compare-card">
                                                <div class="compare-card__img">
                                                    <img :src="item.image" alt="">
                                                    <div class="compare-card__img-icon" title="Удалить автомобиль" @click="deleteItem(indx)">
                                                        <icon-base icon-name="trash"><icon-trash /></icon-base>
                                                    </div>
                                                </div>
                                                <div class="compare-card__head">
                                                    <div class="compare-card__head-title">{{ item.brand.name }} {{ item.model.name }} {{ ((item.equipment)?item.equipment:'') }}</div>
                                                    <div class="compare-card__head-price">{{ Format(item.min_price) }} <span class="rub">₽</span></div>
                                                </div>
                                                <div class="compare-card__body" :class="{'--accordion-open': accordions.main}">
                                                    <div class="compare-card__body-head">
                                                        <div class="compare-card__body-head__title">Технические параметры</div>
                                                        <div class="compare-card__body-head__icon">
                                                            <icon-base
                                                                icon-name="corner"
                                                                :class="{'up': accordions.main, 'down': !accordions.main}"
                                                                ><icon-corner />
                                                            </icon-base>
                                                        </div>
                                                    </div>
                                                    <div class="compare-card__body-content">
                                                        <div class="compare-card__body-content__list">{{ item.body.name }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.general[2].value }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.specifications[7].value }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.power }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.engine.name }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.specifications[3].value }} - {{ item.specifications[2].value }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.specifications[0].value || '&nbsp;' }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.general[4].value }}</div>
                                                    </div>
                                                </div>
                                                <div class="compare-card__body" :class="{'--accordion-open': accordions.sizes}">
                                                    <div class="compare-card__body-head">
                                                        <div class="compare-card__body-head__title">Размеры</div>
                                                        <div class="compare-card__body-head__icon">
                                                            <icon-base
                                                                icon-name="corner"
                                                                :class="{'up': accordions.sizes, 'down': !accordions.maisizesn}"
                                                                ><icon-corner />
                                                            </icon-base>
                                                        </div>
                                                    </div>
                                                    <div class="compare-card__body-content">
                                                        <div class="compare-card__body-content__list">{{ item.specifications[10].value }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.specifications[8].value }}</div>
                                                        <div class="compare-card__body-content__list">{{ item.specifications[9].value }}</div>
                                                    </div>
                                                </div>
                                                <div class="compare-card__footer">
                                                    <button class="button w100 hovered-t" @click="show(item.id, item.brand.name+' '+item.model.name+' '+((item.equipment)?item.equipment:''))">
                                                        <span>ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="tab" v-if="compare.length == 0" style="padding-top: 100px; text-align: center">
                <div class="tab_head">
                    <h3 style="margin-bottom: 1em">Вы еще не добавили к сравнению ни одного автомобиля</h3>
                    <p style="color: var(--yagray); margin-bottom: 1rem">Здесь будут отображаться автомобили, которые вы добавили к сравнению</p>
                </div>
                <div class="tab_content">
                    <router-link to="/" class="button hovered-t">К СПИСКУ МОДЕЛЕЙ</router-link>
                </div>
            </div>


        </div>
	</div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCorner from '@/components/icons/IconCorner.vue'
import IconTrash from '@/components/icons/IconTrash.vue'



import Swiper, { Navigation, Pagination, Thumbs,  } from 'swiper';
Swiper.use([Thumbs, Navigation, Pagination, ]);

import 'swiper/swiper-bundle.css';

export default {
	name: 'Compare',
	components: {
        IconBase, IconTrash, IconCorner
	},
	data() {
		return {
            items: [],
            compare: JSON.parse(localStorage.getItem('CIS_COMPARE')) || [],
            accordions: {
                main: true,
                sizes: false
            }
		}
	},
	computed: {
	},
	watch: {
	},
	mounted: function() {
        
        if ( this.compare.length ) {
            let url = this.$store.state.apiUrl+'vehicles/all/?token='+this.$store.state.apiToken+'&id='+this.compare.join(',')
            this.axios.get(url).then((response) => {
                this.items = response.data.items || []
            })
            setInterval(() => {
            
                this.compare = JSON.parse(localStorage.getItem('CIS_COMPARE')) || []
                this.items.forEach((i, k) => {
                    if ( !this.compare.includes(i.id) ) this.items.splice(k, 1)
                })
            }, 100);
        }

        new Swiper(".com-slide", {
            slidesPerView: 3.5,
            spaceBetween: 10,
            loop: false,
            loopFillGroupWithBlank: true,
            navigation: {
                nextEl: ".compare-next",
                prevEl: ".compare-prev",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 10
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 10
                },
                1440: {
                    slidesPerView: 3.5,
                    spaceBetween: 10
                }
            }
        });
	},
    methods: {
        getWorld( q = 1, f = 'a' ) {

            let res = {
                'c': ['цвет', 'цвета', 'цветов'],
                'o': ['опция', 'опции', 'опций'],
                'a': ['автомобиль', 'автомобиля', 'автомобилей']
            }
            let t = [
                [1],
                [2,3,4]
            ]
            for (let i=2; i<=300; i++) {
                t[0].push(i*10+1)
                t[1].push(i*10+2)
                t[1].push(i*10+3)
                t[1].push(i*10+4)
            }

            if ( t[0].indexOf(Number(q)) >= 0 ) return res[f][0]
            if ( t[1].indexOf(Number(q)) >= 0 ) return res[f][1]
            return res[f][2]
        },

        show(id, name) {
            this.$modal.show('form-offer')
            this.$store.state.global.selectedVehicle = id
            this.$store.state.global.selectedVehicleName = name
        },

        clear() {
            this.items = []
            this.compare = []
            localStorage.setItem('CIS_COMPARE', JSON.stringify([]))
        },

        deleteItem(indx) {
            this.compare.splice(indx, 1)
            localStorage.setItem('CIS_COMPARE', JSON.stringify(this.compare))
        },


        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style scoped>
.h1 {
    font-weight: 400;
}
    .--gray__bg {
        background: var(--yalightgray);
    }
    .close_box {
        position: relative;
    }
    .close {
        --width: 1em;
        --volume: 2px;
        --color: #333;
        position: absolute;
        right: 1rem;
        top: -1.3em;
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
    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .swiper-slide {
        background-size: cover;
        background-position: center;
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
    .--detail__bg {
        background: var(--detail_bg);
        border-radius: 3px;
    }
    .settings_accordion {
        --ptb: 1em;
        border-bottom: solid 1px var(--yagray);
        user-select: none;
        display: block;
    }
    .setting_accordion-content .settings_accordion:nth-last-child(1) {
        margin-bottom: 2em;
    }
    .settings_accordion--head {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }
    .settings_accordion--head__title {
        font-size: 14px;
        font-weight: 600;
        line-height: 1em;
        padding: 1em 0;
    }
    .tabs_content-item__sub {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 2rem;
    }
    .tabs_content-item__sub-count {
        font-size: 14px;
        font-weight: 400;
        line-height: 1em;
        color: var(--yablackgray);
    }
    .tabs_content-item__sub-drop svg {
        --icon: 16px;
        width: var(--icon);
        height: var(--icon);
        fill: var(--yadarkgray);
        display: block;
    }
    .settings_accordion--body {
        height: 0;
        opacity: 0;
        transition: 100ms;
        overflow: hidden;
    }
    .settings_accordion--body::-webkit-scrollbar {
        width: 5px;
        height: 15px;
        background-color: var(--yagray);
    }
    .settings_accordion--body::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--yayellow);
    }
    .settings_accordion--body_list {
        font-size: 14px;
        font-weight: 300;
        line-height: 1.5em;
        margin-bottom: 1em;
        color: var(--yadarkgray);
    }
    .--accordion-open {
        border-bottom: 0;
    }
    .--accordion-open svg.icon {
        transform: rotate(180deg);
    }
    .--accordion-open .settings_accordion--body{
        height: fit-content;
        opacity: 1;
        height: fit-content;
        border-bottom: solid 1px var(--yagray);
        padding-top: calc(var(--ptb) * 2);
        padding-bottom: calc(var(--ptb) * 2);
    }
    .radio_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .radio_head .tabs_head .button {
        --padding-left-right: 20px;
        background: var(--yawhite);
        color: var(--yalightblack);
        border: solid 1px transparent;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1em;
        transition: 200ms;
        width: 100%;
        display: inline-block;
    }
    .radio_head .tabs_head .--is-active span {
        color: var(--yablue);
    }
    .tabs {

    }
    .tabs_head {
        display: flex;
    }
    .tabs_head .button {
        --padding-left-right: 20px;
        background: var(--yawhite);
        color: var(--yalightblack);
        border: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: solid 1px var(--yadarkgray);
        font-size: 14px;
        font-weight: 400;
        line-height: 1em;
        transition: 200ms;
        width: 100%;
    }
    .tabs_head .--is-active {
        color: var(--yablue);
        font-weight: 500;
    }
    .tabs_head .button {
        box-shadow: inherit;
    }
    .tabs_head .button span {
        z-index: 100;
        width: 100%;
        display: block;
        margin-left: 0;
    }
    .tabs_head .button:hover {

    }
    .tabs_content {}
    .tabs_content-item {
        display: none;
        margin: 2rem 0;
    }
    .tabs_content .--is-active {
        display: block;
    }
    .tabs_head .--is-active {
        border: solid 1px var(--yayellow) !important;
    }
    .tabs_content-item__list {
        font-size: 14px;
        font-weight: 400;
        line-height: 1em;
        padding: 1em 0 calc(1em / 2);
        border-bottom: dotted 1px var(--radio-grid-color);
    }
    .tabs_content-item__title {
        font-size: 14px;
        font-weight: 600;
        line-height: 1em;
    }
    .tabs_content-box {
        --border-c: #DEDEDC;
        display: flex;
        gap: 20px;
        overflow: hidden;
    }
    .compare {
        padding: 0 1em;
    }
    .compare-settings {
        padding: 1em 0;
        width: 300px;
    }
    .compare-settings__item {
        border-bottom: solid 1px var(--border-c);
    }
    .settings__add {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 180px;
        cursor: pointer;
        text-decoration: none;
    }
    .settings__head {
        padding: 1em 0;
    }
    .settings__add-icon {
        --width: 1em;
        --volume: 4px;
        --color: #5C5D5E;
        position: relative;
        line-height: 1;
        font-size: 30px;
        cursor: pointer;
        width: var(--width);
        height: var(--width);
        cursor: pointer;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    .settings__add-icon:before {
        transform: rotate(90deg);
        position: absolute;
        top: 0;
        left: 50%;
        content: '';
        height: var(--width);
        width: 0;
        border: solid var(--color);
        border-width: 0px var(--volume) 0 0;
        background-color: var(--color);
    }
    .settings__add-icon:after {
        transform: rotate(0deg);
        position: absolute;
        top: 0;
        left: 50%;
        content: '';
        height: var(--width);
        width: 0;
        border: solid var(--color);
        border-width: 0px var(--volume) 0 0;
        background-color: var(--color);
    }
    .settings__add-text {
        color: var(--yablack);
    }
    .settings__head-item {
        font-size: 14px;
        font-weight: 600;
        line-height: 1em;
        margin-bottom: 1em;
    }
    .settings__head-item:nth-last-child(1) {
        margin-bottom: 0;
    }
    .settings__body {}
    .settings__body-item {}
    .settings__body-item .--accordion-open .settings_accordion--body{
        padding-top: calc(var(--ptb) * 1);
        padding-bottom: calc(var(--ptb) * 1);
    }
    .settings__body-item .settings_accordion {
        border-bottom: solid 1px var(--border-c);
    }
    .settings__body-item .settings_accordion:nth-last-child(1) {
        border-bottom: 0;
    }
    .settings__body-item .--accordion-open .settings_accordion--body {
        border-bottom: 0;
    }
    .settings__body-item .settings_accordion--head__title {
        font-weight: 400;
    }
    .compare-slider {
        width: 100%;
        overflow: hidden;
    }
    .config_head-items {
        --size: 30px;
        display: grid;
        grid-template-columns: 1fr calc(var(--size) * 3);
        gap: 20px;
    }
    .config_head-items__title {
        font-size: 18px;
        font-weight: 400;
        line-height: 1em;
    }
    .config_head-items__arrow {
        position: relative;
        top: 50%;
    }
    .next-prev-buttons {
        border: solid 1px #003375;
        width: var(--size);
        height: var(--size);
        border-radius: 3px;
    }
    .next-prev-buttons:nth-child(1) {
        left: inherit;
        right: calc(var(--size) * 1.2);
    }
    .next-prev-buttons:nth-child(2) {
        right: 0;
    }
    .next-prev-buttons:after {
        font-size: 1em;
        color: #003375;
    }
    .next-prev-buttons:before {
        font-size: 1em;
        color: #003375;
    }
    .compare-card {
        text-align: left;
        cursor: pointer;
    }
    .compare-card .button span {
        margin: 0;
    }
    .compare-card__img {
        position: relative;
        min-height: 190px;
        margin-bottom: 0.58em;
    }
    .compare-card__img-icon {
        --icon-size: 14px;
        position: absolute;
        top: 1em;
        right: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(var(--icon-size) * 2);
        height: calc(var(--icon-size) * 2);
        background: #fff;
        border: solid 1px #5C5D5E;
        border-radius: 3px;
        cursor: pointer;
        transition: 200ms;
    }
    .compare-card__img-icon:hover svg{
        fill: #FDBA4D;
    }
    .compare-card__img-icon svg {
        width: var(--icon-size);
        height: var(--icon-size);
        fill: #5C5D5E;
    }
    .compare-card__head {
        /*max-height: 71px;
        min-height: 70px;*/
        border-bottom: solid 1px var(--border-c);
        padding: 5px 0;
    }
    .compare-card__head-title {
        font-size: 14px;
        font-weight: 600;
        line-height: 1em;
        margin-bottom: 1em;
        /*padding: 0.5em 0;
        border-bottom: solid 1px var(--border-c);*/
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .compare-card__head-price {
        font-size: 14px;
        font-weight: 600;
        line-height: 1em;
        margin-bottom: 1em;
        /*border-bottom: solid 1px var(--border-c);*/
    }
    .compare-card__body {
        border-bottom: solid 1px var(--border-c);
    }
    .compare-card__body-head {
        display: flex;
        justify-content: space-between;
        padding: 14px 0;
    }
    .--accordion-open .compare-card__body-head {
        padding: 16.5px 0;
    }
    .compare-card__body-head__title {
        font-size: 14px;
        font-weight: 400;
        line-height: 1em;
    }
    .compare-card__body-head__icon svg {
        --icon: 10px;
        width: var(--icon);
        height: calc(var(--icon) / 2);
        fill: var(--yalightblack);
        display: block;
    }
    .--accordion-open .compare-card__body-head__icon svg {
        transform: rotate(180deg);
    }
    .compare-card__body-content {
        height: 0;
        opacity: 0;
        transition: 100ms;
        overflow: hidden;
    }
    .--accordion-open .compare-card__body-content {
        --ptb: 1em;
        overflow: visible;
        opacity: 1;
        height: fit-content;
        padding-top: calc(var(--ptb) * 1);
        padding-bottom: calc(var(--ptb) * 1);
    }
    .compare-card__body-content__list {
        font-size: 14px;
        font-weight: 300;
        line-height: 1.5em;
        margin-bottom: 1em;
        color: var(--yalightblack);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .compare-card__body-content__list:nth-last-child(1) {
        margin-bottom: 9px;
    }
    .compare-card__footer {
        margin-top: 1em;
    }
    .compare-card__footer .button {
        --padding-left-right: 20px;
    }
    .compare-card__footer .button span {
        z-index: 50;
    }
    @media (max-width: 768px) {
        .compare-settings {
            width: 230px;
        }
        .compare-card__footer .button span {
            font-size: 11px;
        }
    }
    @media (max-width: 425px) {
        .tabs_content-box {
            display: grid;
            grid-template-columns: 1fr;
        }
        .compare {
            grid-area: 2;
        }
        .compare-settings {
            width: 100%;
        }
        .settings__head {
            display: none;
        }
        .settings__body {
            display: none;
        }
        .settings__add {
            min-height: initial;
        }
        .compare-settings__item {
            border-bottom: 0;
        }
        .config_head-items {
            display: none;
        }
        .radio_head .config_head .tabs_head{
            display: flex;
        }
    }

    /*Слайдер сравнения*/
</style>
