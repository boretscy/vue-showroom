<template>
    <div>
        <vue-headful
            :title="metaTitle"
            :description="metaDescription"
        />
        <div class="car__grid">

            <div class="car_grid-left">
                <div class="car_grid-left__slider">
                    <div class="swiper swiper__detail">
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide"
                                v-for="(slide, index) in vehicle._images" 
                                :key="index">
                                <img :src="slide.big"/>
                            </div>
                        </div>
                        <div class="swiper-button-next detail_next">
                            <div class="swiper-on-button">
                                <div class="swiper-on-button__radius"></div>
                            </div>
                        </div>
                        <div class="swiper-button-prev detail_prev">
                            <div class="swiper-on-button">
                                <div class="swiper-on-button__radius"></div>
                            </div>
                        </div>
                    </div>
                    <div thumbsSlider="" class="swiper swiper__detail-thumb">
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide"
                                v-for="(slide, index) in vehicle._images" 
                                :key="index">
                                <div class="detail-thumb">
                                    <img :src="slide.thumb"/>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-button-next detail_next">
                            <div class="swiper-on-button">
                                <div class="swiper-on-button__radius"></div>
                            </div>
                        </div>
                        <div class="swiper-button-prev detail_prev">
                            <div class="swiper-on-button">
                                <div class="swiper-on-button__radius"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="car__grid-item" v-if="vehicle">
                <h1 class="h2 car__grid-item_title">{{ metaH1 }}</h1>
                <div class="car__grid-box">
                    <div class="car__grid-box__dc --detail__bg">
                        <div class="car__grid-box__dc-title detail_bg">{{ vehicle.dealership.name }}</div>
                        <div class="car__grid-box__dc-item">
                            <span class="car__grid-box__dc-item_status --in-stock">{{ vehicle.status.name }}</span>
                            <span class="car__grid-box__dc-item_update">Обновлено {{ vehicle._updated }}</span>
                        </div>
                        <a :href="'tel:+'+FormatPhoneIn(phone)" class="car__grid-box__status-phone ">{{ FormatPhoneOut(phone) }}</a>
                        <div class="car__grid-box__status-links">
                            <VueCustomTooltip label="Избранное">
                                <a href="#" :class="{'--is-active': locstore.FAVORITES.indexOf(vehicle.id) >= 0}" @click.prevent="toggleLocstore('FAVORITES')">
                                    <icon-base icon-name="cisfavorites"><icon-cisfavorites /></icon-base>
                                </a>
                            </VueCustomTooltip>
                            <VueCustomTooltip label="Сравнение">
                                <a href="#" :class="{'--is-active': locstore.COMPARE.indexOf(vehicle.id) >= 0}" @click.prevent="toggleLocstore('COMPARE')">
                                    <icon-base icon-name="ciscompare"><icon-ciscompare /></icon-base>
                                </a>
                            </VueCustomTooltip>
                            <!-- <a href="#">
                                <icon-base icon-name="share"><icon-share /></icon-base>
                            </a> -->
                        </div>
                    </div>
                    <div class="car__grid-box__price --detail__bg">
                        <div class="car__grid-box__price-title">
                            <div class="price">{{ Format(curPrice) }}<span class="rub">₽</span></div>
                            <div
                                    class="drop"
                                :class="{'--open': drops.title}"
                                v-if="vehicle.discounts">
                                    <div class="drop-btn">
                                        <button class="question" @click="drops.title = !drops.title">?</button>
                                    </div>
                                    <div class="drop-container">
                                        <div class="drop-content">
                                            <div class="question-drop">
                                                Данная специальная цена действительна в случае приобретения автомобиля клиентом при условии использования специальных программ Производителя и/или ДЦ, а именно:
                                                {{ getDiscountsName() }}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div
                                class="car__grid-box__price-discount"
                                v-if="maxDiscount">
                            {{ Format(vehicle.price) }}<span class="rub">₽</span>
                        </div>
                        <button class="button hovered-t w100" @click="show('offer')">
                            <span>ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ</span>
                        </button>
                    </div>
                    <div class="car__grid-box-stock --detail__bg">
                        <div class="car__grid-box-stock__head">
                            <div class="car__grid-box-stock__head-sub" v-if="vehicle.equipment">Комплектация:</div>
                            <div class="car__grid-box-stock__head-title" v-if="vehicle.equipment">{{ vehicle.equipment }}</div>
                            <div class="car__grid-box-stock__head-options">
                                <span v-if="mainOptionsCount">{{ mainOptionsCount }} {{ getWorld(mainOptionsCount,'b') }} {{ getWorld(mainOptionsCount,'o') }}</span>
                                <span v-if="vehicle._additional.length">{{ vehicle._additional.length }} {{ getWorld(vehicle._additional.length,'d') }} {{ getWorld(vehicle._additional.length,'o') }}</span>
                            </div>
                        </div>
                        <div class="car__grid-box-stock__list">
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Цвет кузова:</div>
                                <div class="stock__list-items__name">{{ vehicle.general[2].value }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Год выпуска:</div>
                                <div class="stock__list-items__name">{{ vehicle.general[4].value }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Кузов:</div>
                                <div class="stock__list-items__name">{{ vehicle.body.name }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Коробка:</div>
                                <div class="stock__list-items__name">{{ vehicle.transmition.name }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Топливо:</div>
                                <div class="stock__list-items__name">{{ vehicle.engine.name }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Привод:</div>
                                <div class="stock__list-items__name">{{ vehicle.specifications[11].value }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Двигатель:</div>
                                <div class="stock__list-items__name">{{ (($store.state.mode=='new')?vehicle.general[5].value:vehicle.general[8].value) }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items">
                                <div class="stock__list-items__category">Расход л/100км:</div>
                                <div class="stock__list-items__name">{{ vehicle.specifications[3].value }} - {{ vehicle.specifications[2].value }}</div>
                            </div>
                            <div class="car__grid-box-stock__list-items" v-if="$store.state.mode=='used'">
                                <div class="stock__list-items__category">Пробег:</div>
                                <div class="stock__list-items__name">{{ Format(vehicle.general[5].value) }} км</div>
                            </div>
                        </div>
                    </div>
                    <div class="car__grid-box-profit --detail__bg">
                        <div class="car__grid-box-profit__head">
                            <div class="profit__head-title">Выгода на авто</div>
                            <div class="profit__head-discount">
                                <div
                                        class="profit__head-discount__item"
                                        v-if="maxDiscount">
                                        Максимальная сумма выгод - {{ Format(maxDiscount) }} <span class="rub">₽</span>
                                </div>
                                <div class="profit__head-discount__item">
                                    <div
                                            class="drop"
                                            :class="{'--open': drops.description}"
                                            v-if="vehicle.discounts">
                                            <div class="drop-btn" @click="drops.description = !drops.description">
                                                <button class="question">?</button>
                                            </div>
                                            <div class="drop-container">
                                                <div class="drop-content">
                                                    <div class="question-drop">
                                                        Данная специальная цена действительна в случае приобретения автомобиля клиентом при условии использования специальных программ Производителя и/или ДЦ, а именно:
                                                        {{ getDiscountsName() }}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-profit__list">
                                <div class="profit__list--grid_item profit__list--grid_item--no-click" v-if="specDiscount">
                                    <div class="box-profit__list-item__checkbox">
                                        <div class="item__checkbox">
                                            <icon-base icon-name="check"><icon-check /></icon-base>
                                        </div>
                                        <div class="item">Специальная</div>
                                </div>
                                <div class="box-profit__list-item">до {{ Format(specDiscount) }} <span class="rub">₽</span></div>
                                </div>
                                <div
                                    class="profit__list--grid_item"
                                    v-for="(item, indx) in vehicle.discounts"
                                    :key="indx"
                                    @click="item.active = !item.active">
                                    <div class="box-profit__list-item__checkbox">
                                        <div class="item__checkbox">
                                            <icon-base icon-name="check" v-if="item.active"><icon-check /></icon-base>
                                        </div>
                                        <div class="item">{{ item.description }}</div>
                                </div>
                                <div class="box-profit__list-item">до {{ Format(item.sum) }} <span class="rub">₽</span></div>
                                </div>
                                
                        </div>
                        <div class="car__grid-foot">
                            <div class="profit__list--stock">
                                <div class="profit__list--stock_item" v-if="vehicle.additional_equipment_price">
                                    <div class="list--stock_item-name">Доп оборудование</div>
                                    <div class="list--stock_item-price">{{ Format(vehicle.additional_equipment_price) }} <span class="rub">₽</span></div>
                                </div>
                                <div class="profit__list--stock_item">
                                    <div class="list--stock_item-name">Цена без учета выгод</div>
                                    <div class="list--stock_item-price">{{ Format(vehicle.price) }}<span class="rub">₽</span></div>
                                </div>
                                <div class="profit__list--stock_item">
                                    <div class="list--stock_item-name">Цена с учетом выгод</div>
                                    <div class="list--stock_item-price">{{ Format( curPrice ) }}<span class="rub">₽</span></div>
                                </div>
                            </div>
                            <div class="car__grid-box-profit__footer">
                                <button class="button hovered-t w100" @click="show('evaluation')">
                                    <span>ОЦЕНИТЬ АВТОМОБИЛЬ</span>
                                </button>
                                <button class="button hovered-t w100" @click="show('credit')">
                                    <span>РАССЧИТАТЬ КРЕДИТ</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!--<div class="profit_mobile" data-popup-trigger="profit">
                        <div class="profit_mobile-content">
                            <div class="profit_mobile-content__title">Выгода на авто</div>
                            <div class="profit_mobile-content__sub">Максимальная сумма выгод - {{ Format(maxDiscount) }} <span class="rub">₽</span></div>
                        </div>
                        <div class="profit_mobile-icon">
                            <icon-base icon-name="down"><icon-down /></icon-base>
                        </div>
                    </div>-->
                </div>
            </div>
            <div class="configuration" v-if="vehicle">
                <div class="tabs">
                    <div class="tabs_head">
                        <button
                                class="button hovered-t"
                                :class="{'--is-active': tabs.equipment.view}"
                                @click="toggleTabs"
                                v-if="vehicle._additional.length">
                                <span>{{ tabs.equipment.text }}</span>
                        </button>
                        <button
                                class="button hovered-t"
                                :class="{'--is-active': tabs.specifications.view}"
                                @click="toggleTabs">
                            <span>{{ tabs.specifications.text }}</span>
                        </button>
                    </div>
                    <div class="tabs_content">
                        <div
                                class="tabs_content-item"
                                :class="{'--is-active': tabs.equipment.view}"
                                v-if="tabs.equipment.view && vehicle._additional.length">
                                <div
                                    class="tabs_content-item__list"
                                    v-for="(item, indx) in vehicle._additional"
                                    :key="indx"
                                    >{{ item }}</div>
                            </div>
                            <div
                                class="tabs_content-item"
                                :class="{'--is-active': tabs.specifications.view}"
                                v-if="tabs.specifications.view">
                            <div class="tabs_content-item__title">Характеристики</div>
                            <div class="settigns_items">
                                <div
                                        class="tabs_content-item__title-settings"
                                        v-for="(group, gindx) in vehicle._specifications"
                                        :key="gindx"
                                        >
                                        <div
                                            class="settings_item"
                                            v-for="(item, indx) in group"
                                            :key="indx">
                                            <div class="settings_item--category">{{ item.name }}</div>
                                            <div class="settings_item--name">{{ item.value }}</div>
                                        </div>
                                </div>
                                </div>
                                <div class="setting_accordion-content" v-if="vehicle.options && vehicle.options.length">
                                <div
                                        class="settings_accordion"
                                        :class="{'--accordion-open': group.view}"
                                        v-for="(group, gindx) in accordion"
                                        :key="gindx">
                                    <div
                                            class="settings_accordion--head"
                                            @click="toggleAccordion(gindx)"
                                    >
                                        <div class="settings_accordion--head__title">{{ group.group }}</div>
                                        <div class="tabs_content-item__sub">
                                            <div class="tabs_content-item__sub-count">{{ Object.keys(group.options).length }} {{ getWorld(Object.keys(group.options).length, 'o') }}</div>
                                            <div class="tabs_content-item__sub-drop">
                                                <icon-base
                                                        icon-name="corner"
                                                        :class="{'up': group.view}"
                                                >
                                                    <icon-corner />
                                                </icon-base>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="settings_accordion--body">
                                        <div
                                                class="settings_accordion--body_list"
                                                v-for="(item, indx) in group.options"
                                                :key="indx"
                                        >{{ item }}</div>
                                    </div>
                                </div>
                                <div class="show-btn" @click="toggleAllAccordion">
                                    <div class="setting_accordion-all">{{ accordionButton }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex__head" v-if="vehicle.recomended.length > 0">
            <router-link 
                :to="'/?price='+Math.trunc(vehicle.min_price-0.1*vehicle.min_price)+','+Math.trunc(vehicle.min_price+0.1*vehicle.min_price)" 
                class="flex__head-title h2 text-normal">
                Рекомендованные автомобили:
                <!-- <span class="flex__head-count">223</span> -->
            </router-link>
        </div>

        <div class="col position-relative" v-if="vehicle.recomended.length > 0">
            <div class="swiper main-slider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide liner_model"
                        v-for="(item, indx) in vehicle.recomended" 
                        :key="indx">
                        <div class="available__grid-item">
                            <div class="grid-item__head">
                                <router-link :to="item.link" class="grid-item__head-img">
                                    <img :src="item.image" :alt="item.name" v-if="item.image">
                                    <icon-base icon-name="ciscrossover" v-if="!item.image && item.body.code == 'crossover'"><icon-ciscrossover /></icon-base>
                                    <icon-base icon-name="ciscupe" v-if="!item.image && item.body.code == 'cupe'"><icon-ciscupe /></icon-base>
                                    <icon-base icon-name="cisliftback" v-if="!item.image && item.body.code == 'liftback'"><icon-cisliftback /></icon-base>
                                    <icon-base icon-name="cishatchback" v-if="!item.image && item.body.code == 'hatchback'"><icon-cishatchback /></icon-base>
                                    <icon-base icon-name="cismicrobus" v-if="!item.image && item.body.code == 'microbus'"><icon-cismicrobus /></icon-base>
                                    <icon-base icon-name="cisminivan" v-if="!item.image && item.body.code == 'minivan'"><icon-cisminivan /></icon-base>
                                    <icon-base icon-name="cispickup" v-if="!item.image && item.body.code == 'pickup'"><icon-cispickup /></icon-base>
                                    <icon-base icon-name="cissedan" v-if="!item.image && item.body.code == 'sedan'"><icon-cissedan /></icon-base>
                                    <icon-base icon-name="cissuv" v-if="!item.image && item.body.code == 'suv'"><icon-cissuv /></icon-base>
                                    <icon-base icon-name="cisvan" v-if="!item.image && item.body.code == 'van'"><icon-cisvan /></icon-base>
                                    <icon-base icon-name="ciswagon" v-if="!item.image && item.body.code == 'wagon'"><icon-ciswagon /></icon-base>
                                </router-link>
                            </div>
                            <div class="head_items-box">
                                <div class="head_items">
                                    <router-link :to="item.link" class="grid-item__title">{{ item.name }}</router-link>
                                </div>
                                <div class="model__grid-card__content--list">
                                    <span 
                                        class="model__grid-card__content--list-item"
                                        v-for="(i, k) in item.general"
                                        :key="k"
                                        >{{ i }}</span>
                                </div>
                                <div class="model__grid-card__footer">
                                    <div
                                        class="model__grid-card__content--status"
                                        :class="{'--in-stock': item.status.id == 1, '--in-transit': item.status.id == 2}"
                                    >{{ item.status.name }}</div>
                                    <div class="model__grid-card__content--price">
                                        <div class="model__grid-card__content--price_curent">{{ Format(item.price) }} <span class="rub">₽</span></div>
                                    </div>
                                    <button class="button transparent w100" @click="_show(item.ext_id, item.name, item.dealership.name)">
                                        <span>ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="swiper-button-next next next-prev">
                <div class="swiper-on-button">
                    <div class="swiper-on-button__radius"></div>
                </div>
            </div>
            <div class="swiper-button-prev prev next-prev">
                <div class="swiper-on-button">
                    <div class="swiper-on-button__radius"></div>
                </div>
            </div>

       </div>

   </div>



</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCisfavorites from '@/components/icons/IconCisfavorites.vue'
import IconCiscompare from '@/components/icons/IconCiscompare.vue'
// import IconShare from '@/components/icons/IconShare.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconCorner from '@/components/icons/IconCorner.vue'

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

// import { VueAgile } from 'vue-agile'

import Swiper, { Navigation, Pagination, Thumbs,  } from 'swiper';
Swiper.use([Thumbs, Navigation, Pagination, ]);

import 'swiper/swiper-bundle.css';





export default {
    name: 'DetailItem',
    components: {
        IconBase, IconCisfavorites, IconCiscompare,
        // IconShare, 
        IconCheck, IconCorner,
        // agile: VueAgile
        IconCiscrossover, IconCiscupe, IconCishatchback, IconCisliftback, 
        IconCismicrobus, IconCisminivan, IconCispickup, IconCissedan,
        IconCissuv, IconCisvan, IconCiswagon
    },
    props: ['vehicle'],
    data() {
        return {
            discountsList: null,
            // thumbsSwiper: null,
            tabs: {
                equipment: {
                    view: false,
                    text: 'Дополнительно'
                },
                specifications: {
                    view: true,
                    text: 'Комплектация и характеристики'
                }

            },
            accordion: [
                {
                    group: 'Экстерьер',
                    view: false,
                    options: ['sdjgadfakdf']
                }
            ],
            drops: {
                title: false,
                description: false
            },
            asNavForMainSlider: [],
			asNavForMainThumbs: [],
			optionsMainSlider: {
				dots: false,
				navButtons: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            navButtons: true
                        }
                    },
                ]
			},
			optionsMainThumbs: {
				centerMode: true,
				dots: false,
				navButtons: false,
				slidesToShow: 2,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                ]
			},

            locstore: {
                FAVORITES: JSON.parse(localStorage.getItem('CIS_FAVORITES')) || [],
                COMPARE: JSON.parse(localStorage.getItem('CIS_COMPARE')) || []
            },

            phone: (window.calltouch_phone) ? window.calltouch_phone : this.vehicle.dealership.phone
            
        }
    },
    computed: {
        curPrice: function() {
            let res = this.vehicle.price
            if ( this.vehicle.discounts ) {
                this.vehicle.discounts.forEach( (item) => {
                    if (item.active) res = res - item.sum
                })
            }
            return this.vehicle.price - this.curDiscount
        },
        curDiscount: function() {

            let d = this.specDiscount, res = 0
            if ( this.vehicle.discounts ) {
                this.vehicle.discounts.forEach( (item) => {
                    if (item.active) d += item.sum
                })
            }
            if ( d ) {
                res = (d <= this.maxDiscount) ? d : this.maxDiscount
            } 
            return res
        },
        maxDiscount: function() {
            // let res = 0
            // if ( this.vehicle.discounts ) {
            //     this.vehicle.discounts.forEach( (item) => {
            //         res += item.sum
            //     })
            // }
            return this.vehicle.price - this.vehicle.min_price
        },
        specDiscount: function() {

            return this.vehicle.price - this.vehicle.special_price
        },
        accordionButton: function() {
            let res = 'Посмотреть все опции'
            this.accordion.forEach( (item) => {
                if (item.view) res = 'Скрыть все опции'
            })
            return res
        },
        mainOptionsCount: function() {
            let res = 0
            this.vehicle.options.forEach( (i) => {
                Object.keys(i.options).forEach( () => {
                    res++
                })
            })
            return res
        },
        metaTitle: function() {
            let res = ''
            res = 'Купить '
            res += ( this.$store.state.mode == 'new' ) ? 'новый ' : 'б/у '
            res += this.vehicle.brand_name+' '
            res += ( this.vehicle.ref_model_name ) ? this.vehicle.ref_model_name+' ' : this.vehicle.model_name+' '
            res += this.vehicle.general[2].value+' '
            res += ( this.vehicle.modification_name ) ? this.vehicle.modification_name+' ' : ''
            res += this.vehicle.general[4].value+' '
            res += 'года по цене '+this.curPrice+' рублей '
            res += ( this.$store.state.mode == 'used' ) ? 'с пробегом ' : ''
            res += ( this.$store.state.inCity ) ? 'в '+this.$store.state.inCity : ''
            res += '| Дилерский центр — Юг-Авто'
            return res
        },
        metaDescription: function() {
            let res = ''
            res = 'Объявление о продаже  '
            res += ( this.$store.state.mode == 'new' ) ? 'нового ' : 'подержанного '
            res += this.vehicle.brand_name+' '
            res += ( this.vehicle.ref_model_name ) ? this.vehicle.ref_model_name+' ' : this.vehicle.model_name+' '
            res += this.vehicle.general[2].value+' '
            res += ( this.vehicle.modification_name ) ? this.vehicle.modification_name+' ' : ''
            res += this.vehicle.general[4].value+' '
            res += ( this.$store.state.inCity ) ? 'в '+this.$store.state.inCity : ''
            res += '.'
            res += ( this.$store.state.mode == 'new' ) ? 'Выгодная цена ' : 'Цена  '
            res += this.curPrice+' рублей от дилерского центра "Юг-Авто" — ✔Кредит ✔Рассрочка ✔Трейд-ин'
            return res
        },
        metaH1: function() {
            let res = ''
            res += this.vehicle.brand_name+' '+((this.vehicle.ref_model_name)?this.vehicle.ref_model_name:this.vehicle.model_name)+' '+this.vehicle.general[4].value+' '+((this.vehicle.equipment)?this.vehicle.equipment:'')
            return res
        }
    },
    mounted: function() {

        this.accordion = this.vehicle.options

        this.asNavForMainSlider.push(this.$refs.thumbnails)
		this.asNavForMainThumbs.push(this.$refs.main)

        setInterval(() => {
            this.locstore = {
                FAVORITES: JSON.parse(localStorage.getItem('CIS_FAVORITES')) || [],
                COMPARE: JSON.parse(localStorage.getItem('CIS_COMPARE')) || []
            }
        }, 500);

        this.$store.state.nav = {
            brand: this.vehicle.brand,
            model: this.vehicle.model,
            item: this.vehicle.brand_name+' '+((this.vehicle.ref_model_name)?this.vehicle.ref_model_name:this.vehicle.model_name)+' '+this.vehicle.general[4].value+' '+((this.vehicle.equipment)?this.vehicle.equipment:'')
        }

        let swiper = new Swiper(".main-slider", {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesPerGroup: 4,
            loop: false,
            loopFillGroupWithBlank: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: "fraction",
            },
            navigation: {
                nextEl: ".next",
                prevEl: ".prev",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    slidesPerGroup: 6,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    slidesPerGroup: 4,
                },
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    slidesPerGroup: 6,
                }
            },
        });

        let swiperThumb = new Swiper(".swiper__detail-thumb", {
            spaceBetween: 5,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".detail_next",
                prevEl: ".detail_prev",
            },
        });
        let swiperDetail = new Swiper(".swiper__detail", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".detail_next",
                prevEl: ".detail_prev",
            },
            thumbs: {
                swiper: swiperThumb,
            },
        });
        
        this.$store.state.global.selectedVehicleName = this.vehicle.brand_name+' '+((this.vehicle.ref_model_name)?this.vehicle.ref_model_name:this.vehicle.model_name)+' '+((this.vehicle.equipment)?this.vehicle.equipment:'')
    },
    methods: {
        /* UI */
        toggleTabs() {
            for (let i in this.tabs) {
                this.tabs[i].view = !this.tabs[i].view
            }
        },
        toggleAccordion(i) {
            this.accordion[i].view = !this.accordion[i].view
        },
        toggleAllAccordion() {
            let res = true
            this.accordion.forEach( (item) => {
                if (item.view) res = false
            })
            this.accordion.forEach( (item) => {
                item.view = res
            })
        },
        getDiscountsName() {
            let s = []
            if ( this.vehicle.discounts ) {
                this.vehicle.discounts.forEach( (item) => {
                    s.push(item.name)
                })
            }
            return s.join(', ')
        },
        toggleLocstore(elem, id = this.vehicle.id) {
            
            if ( this.locstore[elem].indexOf(id) < 0) {
                this.locstore[elem].push(id)
            } else {
                this.locstore[elem].splice(this.locstore[elem].indexOf(id), 1)
            }
            localStorage.setItem('CIS_'+elem, JSON.stringify(this.locstore[elem]))
        },

        show(modal) {
            this.$modal.show('form-'+modal)
            this.$store.state.global.selectedVehicle = this.vehicle.id
        },

        _show(id, name, ds) {
            this.$modal.show('form-offer')
            this.$store.state.global.selectedVehicle = id
            this.$store.state.global.selectedVehicleName = name
            this.$store.state.form_dealership = ds
        },


        FormatPhoneOut(q) {
            q = this.FormatPhoneIn(q);
            return '+' + '7' + ' (' + q[1] + q[2] + q[3] + ') ' + q[4] + q[5] + q[6] + '-' + q[7] + q[8] + '-' + q[9] + q[10];
        },

        FormatPhoneIn(q) {
            q = String(q).replace(/[^\d;]/g, '')
            if ( q.length == 10 ) q = '7'+q
            if ( q.length == 7 ) q = '7861'+q
            return '7'+q.slice(1);
        },
        Format(q) {

            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' })
            return Price.format(Number(q))
        },

        getWorld( q = 1, f = 'o' ) {

            let res = {
                'o': ['опция', 'опции', 'опций'],
                'b': ['базовая', 'базовые', 'базовых'],
                'd': ['дополнительная', 'дополнительные', 'дополнительних'],
            }
            let t = [
				[1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141, 151, 161, 171, 181, 191],
				[2,3,4,22,23,24,32,33,34,42,43,44,52,53,54,62,63,64,72,73,74,82,83,84,92,93,94,102,103,104,122,123,124,132,133,134,142,143,144,152,153,154,162,163,164,172,173,174,182,183,184,192,193,194]
			]

            if ( t[0].indexOf(q) >= 0 ) return res[f][0]
            if ( t[1].indexOf(q) >= 0 ) return res[f][1]
            return res[f][2]
        },

    }
}
</script>

<style scoped>
    :root {
        --h1: 32px;
        --h2: 24px;
        --h3: 18px;
        --h4: 16px;
    }

.drop {
    position: relative;
    z-index: 1;
}
.drop .drop-icon {
    --ui-color: var(--yadarkblue);
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    transform-origin: center;
    display: flex;
    justify-content: center;
    align-items: center;
    fill: var(--ui-color);
}
.btn {
    --border-color: var(--yadarkblue);
    --background-color: var(--yawhite);
    border: 1px solid var(--yadarkblue);
    padding: 10px 15px;
    border-radius: 3px;
    box-sizing: border-box;
    background: var(--background-color);
    outline: none;
    font-size: 13px;
    color: var(--yablack);
    font-weight: 400;
}
.drop-btn input {
    --border-color: var(--yadarkblue);
    --background-color: var(--yawhite);
    border: 1px solid var(--border-input);
    padding: 10px 15px;
    border-radius: 3px;
    box-sizing: border-box;
    background: var(--background-color);
    outline: none;
    font-size: 13px;
    color: var(--yablack);
    font-weight: 400;
}
.drop .drop-btn {
    cursor: pointer;
    margin-bottom: 0;
}
.drop .w100 {
    width: 100%;
}
.drop .w100 .drop-btn input {
    width: 100%;
}
.drop .drop-container {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    transform: translateY(5px);
    top: 100%;
    left: 0;
    padding-top: 10px;
    transition: 200ms;
    box-sizing: border-box;
    width: inherit;
}
.drop .drop-container::before {
    content: '';
    position: absolute;
    left: 2em;
    top: 0;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 10px solid var(--yawhite);
}
.drop .drop-content {
    min-width: 100%;
    background: var(--yawhite);
    padding: 1.2rem;
    box-shadow: 0px 4px 20px var(--yablack)3;
    border-radius: 15px;
    box-sizing: border-box;
}
.drop .drop-content .checkbox, .drop .drop-content .radio {
    --icon-size: 20px;
    width: 100%;
}
.drop .drop-content .checkbox input:before, .drop .drop-content .radio input:before {
    background-size: 8px;
}
.drop .drop-submit {
    position: fixed;
    top: calc(100% + 50px);
    right: 10px;
    left: 10px;
    display: none;
    --padding: 12px;
    --font-size: 14px;
}
a.drop-item {
    display: flex;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    color: var(--yablack);
    text-decoration: none;
    line-height: 1em;
    box-sizing: border-box;
    width: max-content;
}
a.drop-item:hover {
   text-decoration: underline;
}

.drop .drop-item.checkbox input, .drop .drop-item.radio input {
    top: 50%;
    transform: translateY(-50%);
}
.drop.--open {
    z-index: 100;
}
.drop.--open .drop-container {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
}
.drop.--open .drop-icon {
    transform: translateY(-50%) rotate(180deg) !important;
}
.drop-title {
    display: flex;
}
.drop-title a.drop-item {
    font-size: calc(1em / 2);
}
.drop-title .drop .drop-icon {
    right: -2rem;
    fill: var(--yadarkblue);
}
.drop-title .filter-drop {
    color: var(--yadarkblue);
    margin-left: 8px;
    font-weight: 300;
}
.checkbox, .radio {
    display: grid;
    grid-template-columns: var(--icon-size) 1fr;
    --icon-size: 20px;
    --color: blue;
    display: inline-flex;
    cursor: pointer;
    line-height: 1em;
    position: relative;
    align-items: flex-start;
    align-content: center;
    appearance: none;
    width: auto;
}
.checkbox:not(.disabled):hover input:not(:checked), .radio:not(.disabled):hover input:not(:checked) {
    border: 1px solid var(--yadarkblue);
}
.checkbox input, .radio input {
    margin: 0px;
    outline: none;
    display: block;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 5px;
    width: var(--icon-size);
    height: var(--icon-size);
    border: 1px solid var(--yagray);
    background: white;
    position: relative;
    top: 0px;
}
.checkbox input:checked, .radio input:checked {
    border: 2px solid var(--yadarkblue);
    background: var(--yadarkblue);
}
.checkbox input:checked::before, .radio input:checked::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: calc(var(--icon-size) / 2);
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg  fill='%23fff' viewBox='0 -46 417.81333 417'  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0'/%3E%3C/svg%3E");
}
.checkbox input:checked + span, .radio input:checked + span {
    font-weight: 500;
}
.checkbox span, .radio span {
    --padding-left: 10px;
    padding-left: var(--padding-left);
    box-sizing: border-box;
    position: relative;
    top: 2px;
}
.checkbox.disabled, .radio.disabled {
    --color: var(--yagray);
    cursor: default;
}
.checkbox.disabled span, .radio.disabled span {
    color: var(--color);
}
.checkbox.disabled span *, .radio.disabled span * {
    color: var(--color) !important;
}
.checkbox.disabled input, .radio.disabled input {
    background-color: var(--color-whitesmoke);
    cursor: default;
}
.radio input {
    border-radius: 50%;
}
.radio input::before {
    display: none;
}
.radio input:checked {
    box-shadow: inset 0px 0px 0px 4px var(--yawhite), inset 0px 0px 0px 10px var(--yadarkblue);
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
.question {
    --icon-size: 15px;
    --padding-top-bottom: 0;
    --padding-left-right: 0;
    --ui-color: var(--yagray);
    border-radius: 50%;
    width: calc(var(--icon-size) * 2);
    height: calc(var(--icon-size) * 2);
    background: var(--ui-color);
    border: solid 1px var(--ui-color);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: var(--icon-size);
}
.question:hover {
    background: var(--yadarkblue);
    border: solid 1px var(--yadarkblue);
    color: var(--yawhite) !important;
}
.input {
    --size: 1em;
    position: relative;
}
.input input {
    --background-color: var(--yawhite);
    width: 100%;
    margin: 10px 0;
    outline: none;
    border: solid 1px var(--border-input);
    padding: 10px 15px;
    border-radius: 3px;
    box-sizing: border-box;
    background: var(--background-color);
    outline: none;
    font-size: 13px;
    color: var(--yablack);
    font-weight: 400;
}
.input input::placeholder {
    color: var(--yagray);
}
.input input:focus-visible {
    border: solid 1px var(--yadarkblue);
}
.input .icon {
    width: var(--size);
    height: var(--size);
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--yadarkblue);
}
textarea {
    font-family: 'Roboto', Helvetica, sans-serif;
    --background-color: var(--yawhite);
    width: 100%;
    margin: 10px 0;
    outline: none;
    border: solid 1px var(--border-input);
    padding: 10px 15px;
    border-radius: 3px;
    box-sizing: border-box;
    background: var(--background-color);
    outline: none;
    color: var(--yagray);
    font-size: 13px;
    color: var(--yablack);
    font-weight: 400;
    min-height: 85px;
    resize: none;
}
textarea:focus-visible {
    border: solid 1px var(--yadarkblue);
}
textarea::placeholder {
    color: var(--yagray);
}
input[type=range] {
    --range-size: 18px;
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
}
input[type=range]:focus {
    outline: none;
}
input[type=range]:disabled {
    opacity: 0.5;
}
input[type=range]::-webkit-slider-runnable-track {
    height: 1px;
    background: transparent;
}
input[type=range]::-webkit-slider-thumb {
    width: var(--range-size);
    -webkit-appearance: none;
    height: var(--range-size);
    cursor: pointer;
    background: var(--yawhite);
    position: relative;
    transform: translateY(-50%);
    border-radius: 50%;
    box-shadow: inset 0px 0px 0px 5px #d946af, 1px 1px 2px 0px var(--yablack)0002e;
}
input[type=range]::-webkit-progress-value {
    background-color: yayellow;
}
input[type=range]::-moz-range-progress {
    background-color: #43e5f7;
}
input[type=range]::-moz-range-track {
    background-color: #9a905d;
}
input[type=range]::-ms-fill-lower {
    background-color: #43e5f7;
}
input[type=range]::-ms-fill-upper {
    background-color: #9a905d;
}

.header {
    padding: 25px 0;
}
.header_body {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.header_body a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
}
.header_body .nav {

}
.header_body .nav a {
    color: var(--yablack);
    margin-right: 2em;
}
.header_body .nav a:nth-last-child(1) {
    margin-right: 0;
}
.header_body .logo .icon {
    width: 150px;
    height: 50px;
}
.header_body .header_contacts {

}
.header_contacts {
    display: flex;
    align-items: center;
    gap: 1rem;

}
.header_contacts a {
    color: var(--yadarkblue);
}
.header_contacts .icon {
    fill: var(--yadarkblue);
}
.header_contacts .city .filter-drop{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--yadarkblue);
}
.header_contacts .city .filter-drop .drop-icon{
    position: inherit;
    transform: translateY(0%);
}
.header_contacts .city .icon{
    width: 18px;
    height: 21px;
}
.header_contacts .phone{
    font-weight: 500;
}
.header_contacts .city .down{
    width: 14px;
    height: 7px;
}
.header_contacts .favorites {

}
.header_contacts .favorites .icon {
    width: 20px;
    height: 21px;
}
.header_contacts .compare{

}
.header_contacts .compare .icon{
    width: 19px;
    height: 21px;
}
/*breadcrumbs*/
.topic {
    margin-top: 2rem;
   /* margin-bottom: 2rem;*/
}
.breadcrumbs {
    display: inline-flex;
    margin-bottom: 3rem;
}
.breadcrumbs_item {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: var(--yagray);
    text-decoration: none;
    transition: 200ms;
}
.breadcrumbs_item:hover {
    color: var(--yadarkblue);
}
.breadcrumbs_item::after {
    content: '\2039';
   /* background: url("../img/svg/logo.svg");*/
    padding: 0 10px;
    color: var(--yagray);
    font-size: 1rem;
}
.breadcrumbs_item:last-child::after {
    content: '';
}
.breadcrumbs_item:last-child:hover {
    color: var(--yagray);
}
/*breadcrumbs*/
/*Фильтр*/
.filter {
    margin-bottom: 4rem;
    user-select: none;
}
.filter__head {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--filter-col), 1fr));
    gap: 20px;
    align-items: center;
    margin-bottom: 2em;
}
.filter__head-item {
    width: 100%;
}
.multirange {
    position: relative;
}
.multirange__item {
    display: flex;
}
.multirange__item .input input {
    border: solid 1px var(--yadarkblue);
    padding: 16px 20px 5px 15px;
}
.multirange__item .input span.price {
    position: absolute;
    top: 1em;
    left: 1.3em;
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--radio-grid-color);
}
.multirange__item .input span.rub  {
    position: absolute;
    right: 1em;
    bottom: 1.4em;
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--radio-grid-color);
}
.multirange__item .input:nth-child(1) input{
    border-right: solid 1px var(--border-input);
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
}
.multirange__item .input:nth-child(2) input{
    border-left: solid 1px var(--border-input);
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
}
.filter__head .drop .drop-btn {
    margin-bottom: 1em;
}
.filter__head button.grid {
    --font-size: 13px;
    --padding-top-bottom: 11px;
    --padding-left-right: 36px;
}
.filter__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--filter-col), 1fr));
    gap: 20px;
    align-items: center;
    margin-bottom: 2rem;
}
.filter__list-item {
    display: grid;
    grid-template-columns: 1fr 50px;
    width: 100%;
    align-items: center;
    text-decoration: none;
}
.filter__list-item:hover .filter__list-item__name{
    color: var(--yadarkblue);
}
.filter__list-item__name {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: var(--yagray);
    transition: 200ms;
}
.filter__list-item__count {
    color: var(--yagray);
    font-weight: 500;
    border: solid 1px var(--yayellow);
    border-radius: 3px;
    padding: 5px;
    justify-self: baseline;
    min-width: 50px;
    text-align: center;
}
.filter__sort {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
}
.filter__sort-item:nth-child(1) {
    width: var(--filter-col);
}
.filter__sort-item:nth-last-child(1) {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.filter__sort-item__button {
    background: transparent;
    border: 0;
    margin-right: 2em;
}
.filter__sort-item__button span{
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    cursor: pointer;
    display: block;
    transition: 200ms;
}
.filter__sort-item__button span:hover {
    color: var(--yadarkblue);
}
.filter__sort-item__button:nth-last-child(1) {
    margin-right: 0;
}
.active span{
    padding: 10px 15px;
    background: transparent;
    border: solid 1px var(--yayellow) !important;
    border-radius: 3px !important;
    color: var(--yadarkblue);
}
.filter__sort-item__switch-radio svg {
    --icon-size: 20px;
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--yablack);
    vertical-align: bottom;
}
.filter__sort-item__switch {
    display: flex;
}
.filter__sort-item__switch-radio {

}
.filter__sort-item__switch-radio input {
    display: none;
}
.filter__sort-item__switch-radio span {
    padding: 10px;
    border: solid 1px var(--radio-grid-color);
    border-radius: 3px;
    cursor: pointer;
    display: block;
    box-sizing: border-box;
}
.filter__sort-item__switch-radio:nth-child(1) span {
    border-right: solid 1px var(--yayellow);
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
.filter__sort-item__switch-radio:nth-child(2) span {
    border-left: solid 1px var(--yayellow);
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
.filter__sort-item__switch-radio input:checked + span {
    border: solid 1px var(--yayellow);
}
/*Фильтр end*/
/*Карточки Автомобилей в наличии*/
.available {}
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
    font-size: 28px;
}
.flex__head-count {
    color: var(--yagray);
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
    border: solid 1px var(--yagray);
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
    display: flex;
    align-items: center;
    margin-bottom: 1em;
}
.grid-item__head-img {
    --heigth: 200px;
    background: var(--yawhite);
    min-height: var(--heigth);
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
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
    font-size: 18px;
    font-weight: 600;
    line-height: 1em;
    margin-bottom: 1em;
    display: block;
    min-height: 37px;
    max-height: 37px;
    text-transform: uppercase;
    color: var(--yablack);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.grid-item__sub {
    font-size: 14px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 2em;
    color: var(--yadarkgray);
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
/*Карточки Автомобилей в наличии*/
.button-centered {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 4rem;
}
.main-form {
    background: var(--form-bg);
    padding: 3rem 0;
    margin-bottom: 4rem;
}
.main-form__container {
    --form-size: 830px 1fr;
    display: grid;
    grid-template-columns: var(--form-size);
    gap: 3rem;
}
.form-dc {
    --form-size: 940px 1fr;
}
.form-dc .areas {
    align-items: flex-end;
}
.form-dc .areas .input input {
    font-size: 12px;
    margin-bottom: 0;
    padding: 12px 15px;
}
.main-form .h2 {
    margin-bottom: 2rem;
}
.main-form__subtitle {
    font-size: 19px;
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2rem;
    color: var(--yagray);
}
.main-form__container-item input{
    padding: var(--p-form);
}
.main-form__container-item .checkbox input {
    padding: 0;
}
.main-form__container-item .areas .button {
    padding: var(--p-form);
}
.areas .checkbox input:checked {
    padding: 0;
}
.areas {
    display: flex;
    gap: 1em;
    margin-bottom: 1rem;
    align-items: center;
}
.input_title {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    margin-bottom: .4em;
}
.areas .checkbox input {
    width: calc(var(--icon-size) * 2);
}
.areas .checkbox span {
    color: var(--radio-grid-color);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.5em;
}
.areas .checkbox a {
    color: var(--yadarkblue);
    text-decoration: none;
}
.areas .checkbox input:checked + span {
    font-weight: 400;
}
.areas .checkbox input:checked {
    border: solid 1px var(--yadarkblue);
}
/*Swiper*/
.main-slider {
    position: relative;
    margin-bottom: 2rem;
}
.main-slider .swiper-wrapper {
    padding-bottom: 2rem;
}
.main-slider .swiper-slide {
}
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: var(--yawhite);

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain !important;
}
.main-slider .swiper-slide img {
    object-fit: cover !important;
}
.slider_content {
    border: solid 1px var(--radio-grid-color);
    border-radius: 3px;
    display: block;
    text-decoration: none;
    transition: 200ms;
}
.slider_content-img {

}
.slider_content:hover {
    box-shadow: 0px 0px 5px 1px var(--yablack)00029;
}
.slider_content-head {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    align-items: center;
}
.slider_content-head_title {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: var(--yablack);
}
.slider_content-head_icon svg {
    --icon-size: 10px;
    width: var(--icon-size);
    height: calc(var(--icon-size) * 2);
    fill: var(--yayellow);
}
.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 0;
}
.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    background: var(--yablack);
}
.swiper-pagination {
  font-size: 12.8px;
}
.swiper-pagination-current {
  color: var(--yablue);
  font-size: 16px;
}
.position-relative .next {
    right: -4em;
}
.position-relative .prev {
    left: -4em;
}
.swiper-button-prev:after {
     content: '';
}
.swiper-button-next:after {
    content: '';
}
.swiper-button-next {
    width: fit-content;
}
.swiper-button-prev {
    width: fit-content;
}
.swiper-button-next:hover .swiper-on-button__radius{
    background: var(--yalightyellow);
    transition: 200ms;
}
.swiper-button-prev:hover .swiper-on-button__radius{
    background: var(--yalightyellow);
    transition: 200ms;
}
.swiper-on-button {
    --size: 50px;
    border: solid 1px var(--yablue);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: #fff;
}
.swiper-on-button__radius {
    border: solid 1px var(--yalightyellow);
    width: calc(var(--size) - 10px);
    height: calc(var(--size) - 10px);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-on-button__radius:after {
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
    font-size: calc(var(--size) / 3.3);
    color: var(--yadarkblue);
}
.swiper-button-next .swiper-on-button__radius:after {
    content: 'next';
}
.swiper-button-prev .swiper-on-button__radius:after {
    content: 'prev';
}
    /*Swiper*/
.model__grid {
    --margin-bottom: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--grid-card), 1fr));
    gap: 20px;
    margin-bottom: 4rem;
}
.model__line {
    display: block;
}
.model__line .model__grid-card {
    --rows: 180px;
    display: grid;
    grid-template-columns: 300px repeat(2, 1fr);
    grid-template-rows: var(--rows);
    justify-items: start;
    align-items: center;
    margin-bottom: 1rem;
}
.model__line .model__grid-card__head {

}
.model__line .model__grid-card__footer {
    justify-self: end;
}
.model__line .model__grid-card__head--img {
    height: var(--rows);
}
.model__line .model__grid-card__head--img img{
    object-fit: scale-down;
}
.model__grid-card {
    --padding: 2rem 2rem;;
    text-decoration: none;
    border: solid 1px var(--ligth-yagray);
    display: block;
    user-select: none;
    border-radius: 3px;
    transition: 200ms;
    cursor: pointer;
}
.model__grid-card:hover {
    border: solid 1px var(--yayellow);
}
.model__grid-card__head {
    position: relative;
}
.model__grid-card__head--img {
    background: var(--form-bg);
    height: 220px;
    display: flex;
}
.model__grid-card__head--img img {
    width: 100%;
    object-fit: none;
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
    margin-bottom: var(--margin-bottom);
}
.model__grid-card__content--list {
    --margin-bottom: 2em;
    margin-bottom: var(--margin-bottom);
    word-break: break-word;
    min-height: 70px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4rem;
}
.model__grid-card__content--list-item {
    font-size: 13px;
    font-weight: 300;
    line-height: 1em;
    color: var(--yagray);
    display: inline-block;
}
.model__grid-card__content--list-item::before {
    content: '\2022';
    color: var(--yadarkblue);
    margin-right: 0.3rem;
    margin-left: 0.3rem;
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
    color: var(--yagray);
    text-decoration: line-through;
}
.main-form__head {
    --form-size: 850px 1fr;
    display: grid;
    grid-template-columns: var(--form-size);
    gap: 3rem;
    align-items: center;
}
.form-dc__container .areas {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: end;
    gap: 1rem;
}
.form-dc__container .areas .input_title {
    margin-bottom: 1rem;
}
.form-dc__container .areas .input input {
    margin-bottom: 0;
    margin-top: 0;
    border: solid 1px var(--border-input);
    padding: var(--p-form);
}
.form-dc__container .areas .input input:focus-visible {
    border: solid 1px var(--yadarkblue);
}
.form-dc__container .areas .btn {
    padding: var(--p-form);
    margin-top: 0;
    border: solid 1px var(--border-input);
}
.form-dc__container .areas .button {
    padding: var(--p-form);
}
.form-dc__container .areas .drop-content input {
    padding: 0;
}
.main-form__container-item .checkbox span {
    color: var(--radio-grid-color);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.5em;
}
.main-form__container-item .checkbox a {
    color: var(--yadarkblue);
    text-decoration: none;
}
.main-form__container-item .checkbox input:checked + span {
    font-weight: 400;
}
.form-dc__container .--open .btn{
    border: solid 1px var(--yadarkblue);
}
.form-dc__container .filter-drop {
    color: var(--yagray);
}
.test_content {

}
.car__grid {
    --left-w: 634px;
    --mb: 50px;
    display: grid;
    grid-template-columns: var(--left-w) 1fr;
    gap: 20px;
    row-gap: 1em;
    position: relative;
    margin-bottom: var(--mb);
}
.car_grid-left {
    position: static;
    top: 0;
    min-height: 580px;
    max-width: var(--left-w);
    border-bottom: solid 1px var(--yalightgray);
}

.car__grid-item {
    --padding: 1rem 1rem;
    position: sticky;
    max-height: 800px;
    top: 1em;
   /* margin-bottom: var(--mb);*/
}
.configuration {
    max-width: var(--left-w);
    width: 100%;
    /* margin-top: -40px; */
}
.sticky_box {}
.car__grid-item .car__grid-item_title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 2rem;
}
.car__grid-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
.--detail__bg {
    background: var(--yalightgray);
    border-radius: 3px;
}
.car__grid-box__dc {
    padding: var(--padding);
}
.car__grid-box__dc-title {
    font-size: 16px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 1em;
}
.car__grid-box__dc-item {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2em;
}
.car__grid-box__dc-item span::before {
    content: '\2022';
    color: var(--yadarkblue);
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    font-size: 20px;
    vertical-align: middle;
}
.car__grid-box__dc-item span:nth-child(1)::before {
    content: '';
    margin-left: 0;
    margin-right: 0;
}
.car__grid-box__dc-item_status {
    text-transform: uppercase;
}
.car__grid-box__dc-item_update {
    font-weight: 300;
    color: var(--yablackgray);
}
.car__grid-box__status-phone {
    font-size: 24px;
    font-weight: 500;
    line-height: 1em;
    margin-bottom: 2em;
    display: block;
    transition: 200ms;
    color: #1C1C1C;
    text-decoration: none;
}
.car__grid-box__status-phone:hover {
    color: var(--yadarkblue);
}
.car__grid-box__status-links {
    --size: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(var(--size) * 2), 1fr));
    gap: calc(var(--size) / 2);
}
.car__grid-box__status-links a {
    background: var(--yawhite);
    display: flex;
    width: calc(var(--size) * 2);
    height: calc(var(--size) * 2);
    align-items: center;
    justify-content: center;
    border: solid 1px var(--yagray);
    border-radius: 3px;
    position: relative;
    transition: .2s;
}
.car__grid-box__status-links a.--is-active {
    background: var(--yalightyellow);
    transition: .2s;
}
.car__grid-box__status-links svg {
    width: var(--size);
    height: var(--size);
    fill: var(--yadarkgray);
    transition: 200ms;
}
/* .car__grid-box__status-links span {
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
} */
.car__grid-box__status-links .--is-active span{
    display: flex;
}
.car__grid-box__status-links a:hover svg{
    fill: var(--yadarkblue);
}
.car__grid-box__price {
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.car__grid-box__price button.button {
    --padding-left-right: 10px;
    --padding-top-bottom: 15px;
    background: var(--yawhite);
    z-index: 1;
}
.car__grid-box__price button.button span {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    z-index: 100;
}
.car__grid-box__price button.button:hover {
    background: var(--yawhite);
}
.car__grid-box__price-title {
    font-size: 35px;
    font-weight: 500;
    line-height: 1em;
    margin-bottom: 0.5em;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    position: relative;
}
.car__grid-box__price-title .drop {
    position: inherit;
    --max-w: 300px;
    --max-h: 300px;
}
.car__grid-box__price-title .drop .drop-container {
    right: 0;
    left: inherit;
    padding-top: 10px;
    text-align: left;
    width: var(--max-w);
}
.car__grid-box__price-title .drop .drop-content {
    border-radius: 10px;
}
.car__grid-box__price-title .drop .drop-container::before {
    left: inherit;
    right: 0.1em;
    top: 2px;
}
.car__grid-box__price-title .question-drop {
    --max-w: 250px;
    --max-h: 200px;
}
.--open .question {
    background: var(--yadarkblue);
    border: solid 1px var(--yadarkblue);
}
.--open .question {
    color: var(--yawhite);
}
.question:hover {
    color: var(--yawhite);
}
.question-drop {
    --max-w: 300px;
    --max-h: 300px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.3em;
    max-width: var(--max-w);
    max-height: var(--max-h);
    overflow: auto;
    padding: 10px 10px;
}
.question-drop::-webkit-scrollbar {
    width: 5px;
    background-color: var(--yagray);
}
.question-drop::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--yayellow);
}

.question-drop ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: var(--yayellow);
}
.car__grid-box__price-title .question {}
.car__grid-box__price-discount {
    font-size: 20px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 1em;
    color: var(--yagray);
    text-align: right;
    text-decoration: line-through;
}
.car__grid-box-stock {
    padding: var(--padding);
}
.car__grid-box-stock__head {
    margin-bottom: 2em;
}
.car__grid-box-stock__head-sub {
    font-size: 14px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 1em;
    color: var(--yablackgray);
}
.car__grid-box-stock__head-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1em;
    margin-bottom: 1em;
}
.car__grid-box-stock__head-options {
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: 1em;
    color: var(--yablackgray);
}
.car__grid-box-stock__head-options span::before {
    content: '\2022';
    color: var(--yadarkblue);
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    font-size: 20px;
    vertical-align: middle;
}
.car__grid-box-stock__head-options span:nth-child(1)::before {
    content: '';
    margin-left: 0;
    margin-right: 0;
}
.car__grid-box-stock__list {}
.car__grid-box-stock__list-items {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 0;
    border-bottom: dotted 1px var(--yagray);
}
.car__grid-box-stock__list-items:nth-last-child(1) {
    border-bottom: 0;
}
.car__grid-box-profit {
    padding: var(--padding);
    display: grid !important;
    flex-direction: column;
    justify-content: space-between;
}
.car__grid-box-profit .drop{
    --max-w: 300px;
    --max-h: 300px;
}
.car__grid-box-profit .drop .drop-container {
    right: 0;
    left: inherit;
    padding-top: 10px;
    text-align: left;
    width: var(--max-w);
}
.car__grid-box-profit .drop .drop-container::before {
    left: inherit;
    right: 0.5em;
    top: 2px;
}
.profit__head-discount__item .question {
    --icon-size: 10px;
    font-size: var(--icon-size);
    color: #000;
}
.car__grid-box-profit__head {
    margin-bottom: 2em;
}
.profit__head-title {
    font-size: 20px;
    font-weight: 400;
    line-height: 1em;
    margin-bottom: .5em;
    color: var(--dark-black);
}
.profit__head-discount {
    display: grid;
    grid-template-columns: 1fr 20px;
    gap: 10px;
    align-items: center;
}
.profit__head-discount .question .icon {
    --icon-size: 10px;
    fill: var(--yawhite);
    width: var(--icon-size);
    height: var(--icon-size);
}
.profit__head-discount__item:nth-child(1) {
    margin-top: .5em;
}
.profit__head-discount__item {
    font-size: 12px;
    font-weight: 400;
    line-height: 1em;
    color: var(--yalightblack);
}
.box-profit__list {
    margin-bottom: 2em;
    min-height: 83px;
}
.profit__list--grid_item {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 100px;
    gap: 10px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 1em;
    align-items: center;
    justify-items: start;
    cursor: pointer;
}
.profit__list--grid_item--no-click {
    cursor: auto;
}
.box-profit__list-item__checkbox {
    --icon-size: 10px;
    display: grid;
    grid-template-columns: calc(var(--icon-size) * 1.8) 1fr;
    gap: var(--icon-size);
    align-items: center;
    justify-items: center;
}
.item__checkbox {
    background: var(--yalightyellow);
    padding: 1px 1px;
    box-sizing: border-box;
    display: block;
    justify-self: start;
    border-radius: 3px;
    border: solid 1px var(--yalightyellow);
    width: 100%;
    height: 18px;
    text-align: center;
}
.box-profit__list-item__checkbox svg {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--yadarkblue);
}
.box-profit__list-item {
    font-size: 13px;
    font-weight: 600;
    line-height: 1em;
    justify-self: end;
    min-width: 100px;
    align-self: start;
    text-align: right;
}
.car__grid-foot {
    align-self: end;
}
.profit__list--stock {
    /*margin-bottom: 2em;*/
}
.profit__list--stock_item {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-bottom: 1em;
}
.profit__list--stock_item:nth-last-child(1) .list--stock_item-price{
    font-size: 15px;
    font-weight: 600;
}
.list--stock_item-name {
    font-size: 13px;
    font-weight: 400;
    line-height: 1em;
}
.list--stock_item-price {
    font-size: 13px;
    font-weight: 400;
    line-height: 1em;
}
.stock__list-items__category {
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--yablackgray);
}
.stock__list-items__name {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    text-align: right;
}
.car__grid-box-profit__footer  button.button {
    --padding-left-right: 10px;
    --padding-top-bottom: 15px;
    background: var(--yawhite);
    z-index: 1;
    margin-bottom: 1em;
}
.car__grid-box-profit__footer  button.button:hover {
    background: var(--yawhite);
}
.car__grid-box-discount {
    padding: var(--padding);
}
/*Характеристики автомобиля - детальная страницы (переключение табами) + аккордеон, скрипты в index.js*/
.tabs {

}
.tabs_head {
    display: flex;
}
.tabs_head .button {
    --padding-left-right: 20px;
    background: var(--yawhite);
    color: var(--dark-black);
    border: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom: solid 1px var(--yagray);
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    transition: 200ms;
    width: 100%;
}
.tabs_head .--is-active {
    color: var(--yadarkblue);
    font-weight: 500;
}
.tabs_head .button {
    box-shadow: inherit;
}
.tabs_head .button span {
    z-index: 100;
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
    z-index: 1;
}
.tabs_content-item__list {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5em;
    padding: 1em 0 calc(1em / 2);
    border-bottom: dotted 1px var(--yablackgray);
}
.tabs_content-item__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1em;
}
.settigns_items {
    --paddint-top-bottom: 1rem;
    padding: var(--paddint-top-bottom) 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    align-items: center;
}
.tabs_content-item__title-settings_item {
    padding: var(--paddint-top-bottom) 0;
}
.settings_item {
    padding: calc(var(--paddint-top-bottom) / 2) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.settings_item--category {
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    color: var(--yadarkgray);
}
.settings_item--name {
    font-size: 14px;
    font-weight: 500;
    line-height: 1em;
    color: var(--yadarkgray);
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
    overflow-y: auto;
    opacity: 1;
    max-height: 350px;
    height: fit-content;
    border-bottom: solid 1px var(--yagray);
    padding-top: calc(var(--ptb) * 2);
    padding-bottom: calc(var(--ptb) * 2);
}
.show-btn {
    margin: 1em 0;
}
.car_grid-left__slider {
    /*overflow: visible;*/
    min-height: fit-content;
    max-height: fit-content;
    position: relative;
}
.car_grid-left__slider .swiper-container {
    position: relative;
}
.car_grid-left__slider .swiper-slide img {
    border-radius: 3px;
}.car_grid-left__slider .swiper-slide {
    border-radius: 3px;
    overflow: hidden;
}
.car_grid-left__slider .swiper-wrapper{
    cursor: pointer;
    position: relative;
}
.detail-thumb {
    max-height: 150px;
}
.swiper__detail-thumb {
    --position: 0px;
    position: relative;
    --height-slider: 135px;
    height: var(--height-slider);
    border-radius: 3px;
    position: relative;
    bottom: -40px;
}
.swiper__detail-thumb .swiper-on-button {--size: 35px;}
.swiper__detail-thumb .swiper-button-next {right: var(--position)}
.swiper__detail-thumb .swiper-button-prev {left: var(--position)}
.swiper__detail-thumb .swiper-slide {
    cursor: pointer;
}
.swiper__detail-thumb .swiper-slide img {
    height: var(--height-slider);
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
.swiper__detail-thumb {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}
.swiper__detail-thumb .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}
.swiper__detail-thumb .swiper-slide-thumb-active {
    opacity: 1;
}
.none {
    display: none;
}
.setting_accordion-all{
    display: block;
    color: var(--yadarkblue);
    text-decoration: underline;
    font-size: 12px;
    cursor: pointer;
}

.show-btn .--is-show {
    display: none;
}
/*Характеристики автомобиля - детальная страницы (переключение табами) + аккордеон*/

/*dealership - детальная карточка*/

.dealership {
    --padding: 2em 2em;
    display: grid;
    grid-template-columns: 283px 410px 1fr;
    gap: 10px;
    align-items: center;
    margin-bottom: 50px;
}
.dealership-item {}
.dealership-item:nth-last-child(1) {
    padding: var(--padding);
}
.dealership-item img {width: 100%; display: block;}
.dealership__dc {
    padding: var(--padding);
}
.dealership__dc-head {}
.dealership__dc-head__title {
    font-size: 16px;
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 1em;
}
.dealership__dc-head__link a{
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2em;
    display: block;
    text-decoration: underline;
    color: var(--yadarkblue);
}
.dealership__dc-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 2em;
}
.dealership__dc-body__item {}
.dealership__dc-body__item-sub {
    font-size: 12px;
    font-weight: 300;
    color: var(--yagray);
    margin-bottom: 0.5rem;
}
.dealership__dc-body__item-fields {
    font-size: 16px;
    font-weight: 400;
    line-height: 1em;
    color: var(--dark-black);
}
.dealership__dc-body__item-fields a {
    text-decoration: underline;
    color: var(--dark-black);
    transition: 200ms;
}
.dealership__dc-body__item-fields a:hover {
    color: var(--yadarkblue);
}
.dealership__dc-body__item:nth-last-child(1)
.dealership__dc-body__item-fields a {
    text-decoration: none;
}
.dealership__dc-footer {}
.dealership__dc-footer button {
    text-transform: uppercase;
}
/*dealership - детальная карточка*/
.w100 {
    width: 100%;
}
.ui-content {
    display: inline-block;
    max-width: 500px;
    width: 100%;
}
.ui-content .button, .btn {
    margin-top: 1em;
    margin-bottom: 1em;
}
h1, .h1 {
    font-size: var(--h1);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2rem;
}
h2, .h2 {
    font-size: var(--h2);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2rem;
}
h2, .h2 a {
    color: var(--yadarkblue);
}
.position-relative {
    position: relative;
}

.slider-styled,
.slider-styled .noUi-handle {
    box-shadow: none;
}

/* Hide markers on slider handles */
.slider-styled .noUi-handle::before,
.slider-styled .noUi-handle::after {
    display: none;
}
.profit_mobile {
    --icon-size: 13px;
    padding: 1rem 1rem;
    display: grid;
    grid-template-columns: 1fr calc(var(--icon-size) * 2);
    gap: var(--icon-size);
    align-items: center;
    border: solid 1px var(--yayellow);
    border-radius: 4px;
    margin-bottom: 1em;
    cursor: pointer;
    display: none;
}
.profit_mobile-content {}
.profit_mobile-content__title {
    font-size: 15px;
    font-weight: 600;
    line-height: 1em;
    margin-bottom: 1em;
    color: var(--yablue);
}
.profit_mobile-content__sub {
    font-size: 12px;
    font-weight: 400;
    line-height: 1em;
    color: var(--yablackgray);
}
.profit_mobile-icon svg {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--yablue);
    transform: rotate(-90deg);
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
.liner_model {
  /*  --grid-card: 300px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--grid-card), 1fr));
    gap: 20px;
    margin-bottom: 4rem;*/
}
.liner_model .available__grid-item {
    padding: 0 0;
}
.head_items-box {
    padding: 1em 1em;
    text-align: left;
}
.liner_model .grid-item__head-img img {
    object-fit: unset;
    max-height: var(--heigth);
}
.liner_model .grid-item__title {margin-bottom: 1em;}
.liner_model .grid-item__sub {margin-bottom: 1em;}

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
    color: var(--yablack);
}
.flex__head-link svg {
    fill: var(--yayellow);
    width: 30px;
    height: 30px;
    margin-left: 2em;
}
.text-normal {
    text-transform: unset;
}
.model__grid-card__content--list {
    --margin-bottom: 2em;
}
.model__grid-card__content--list-item {
    color: var(--yadarkgray);
}
.swiper__detail {
    height: 500px;
    max-height: 500px;
    min-height: 500px;
    width: 100%;
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
.swiper__detail-thumb {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}
.swiper__detail-thumb .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}

.swiper__detail-thumb .swiper-slide-thumb-active {
    opacity: 1;
}
.desktop {
    display: block;
}
.mobile {
    display: none;
}
span.rub {
    /* font-family: 'Rub'; */
    margin-left: 5px !important;
}
/*multi range slider*/
@media (max-width: 1024px) {
   .mobile {
    display: block;
}
    .car__grid {
        --left-w: itherit;
        display: block;
    }
    .car__grid-item {
        max-height: inherit;
        position: inherit;
        margin-bottom: 40px;
        margin-top: 40px;
    }
    .car__grid-box__price {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .car__grid-item .car__grid-item_title {
        display: none;
    }
    .car__grid-item_title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 2rem;
    }
    .car__grid {
        --mb: 80px;
    }
    .next-prev {
        --position: -1.2em;
    }
    .position-relative .next {
        right: var(--position);
    }
    .position-relative .prev {
        left: var(--position);
    }
    .swiper-on-button {
        --size: 35px;
    }
}
@media (max-width: 768px) {

    .swiper-button-next, .swiper-rtl .swiper-button-prev {
        right: 1em;
    }
    .swiper-button-prev, .swiper-rtl .swiper-button-next {
        left: 1em;
    }
    .swiper-on-button {
        --size: 35px;
    }

}
@media (max-width: 600px) {
    .flex__head {
        display: block;
    }
}
    @media (max-width: 500px) {
    .desktop {
        display: none;
    }
    .car__grid-box {
        grid-template-columns: 1fr;
    }
    .profit_mobile {
        display: grid;
    }
    .settigns_items {
        grid-template-columns: 1fr;
        gap: 0;
    }
    .position-relative .prev {
        display: none;
    }
    .position-relative .next {
        display: none;
    }
    .car_grid-left {
        min-height: inherit;
    }
    .swiper__detail {
        height: auto;
    }
    .car_grid-left__slider {
        min-height: revert;
        max-height: revert;
    }
    .swiper__detail {
        min-height: revert;
        max-height: revert;
    }
    .swiper__detail-thumb {
        --height-slider: auto;
    }
}
@media (max-width: 350px) {
    .tabs_head .button span {
        font-size: 11px;
    }
    .tabs_content-item__sub {
        column-gap: 1em;
    }
}



</style>