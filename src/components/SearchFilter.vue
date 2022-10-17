<template>
    <div class="filter" :key="iter">
        <vue-headful
            :title="metaTitle"
            :description="metaDescription"
            :url="canonical"
        />
        <h1 class="title" v-if="filter">
            <a href="#" @click.prevent="resetFilter">{{ metaH1 }} </a>
            <a href="#" v-if="$store.state.inCity" role="top-menu-show-list-city" class="city-link" @click.prevent="showCity">в {{ $store.state.inCity }}</a>
		</h1>
        <div class="title" v-else>
            <div class="title-empty"></div>
        </div>
        <div class="filter__head" v-if="filter">
            <div class="filter__head-item" v-show="!$store.state.brand">
                <multiselect 
                    v-model="modeValue" 
                    tag-placeholder="Выбрать автомобиль" 
                    placeholder="Выбрать автомобиль" 
                    label="name" 
                    track-by="code" 
                    :options="$store.state.modeOptions[$store.state.mode]" 
                    :searchable="false"
                    :multiple="false"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    ></multiselect>
            </div>
            <div class="filter__head-item" v-show="!$store.state.brand">
                <multiselect 
                    v-model="brandValue" 
                    tag-placeholder="Марка" 
                    placeholder="Марка" 
                    label="name" 
                    track-by="code" 
                    :options="$store.state.global.brands" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div class="filter__head-item">
                <multiselect 
                    v-model="modelValue" 
                    tag-placeholder="Модель" 
                    placeholder="Модель" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.models" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div class="filter__head-item filter__head-item__range">
                <multi-range
                    range="price"
                    desc-val="₽"
                    name-range="Цена"
                    ref="priceRange"
                    :delimiter="true"
                    @range="setRangeValue"/>
            </div>
            <div   
                class="filter__head-item pos-1"
                >
                <button-apply 
                    :filterLink="link"
                    :carCount="filter.totalCount"
                    :viewFull="viewFull"
                    @toggle="toggleFilter"/>
            </div>
            <div class="filter__head-item" v-show="viewFull || $store.state.brand">
                <multiselect 
                    v-model="transmissionsValue" 
                    tag-placeholder="КПП" 
                    placeholder="КПП" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.transmissions" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div class="filter__head-item filter__head-item__range" v-show="viewFull || $store.state.brand">
                <multi-range
                    range="volume"
                    desc-val="см3"
                    name-range="Объем"
                    ref="volumeRange"
                    :delimiter="true"
                    @range="setRangeValue"/>
            </div>
            <div class="filter__head-item filter__head-item__range" v-show="viewFull">
                <multi-range
                    range="power"
                    desc-val="л.с."
                    name-range="Мощность"
                    ref="powerRange"
                    :delimiter="true"
                    @range="setRangeValue"/>
            </div>
            <div class="filter__head-item" v-show="viewFull">
                <multiselect 
                    v-model="engineValue" 
                    tag-placeholder="Двигатель" 
                    placeholder="Двигатель" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.engines" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div   
                class="filter__head-item pos-2"
                v-show="viewFull"
                >
                <button-cancel @reset="resetFilter"/>
            </div>
            <div class="filter__head-item" v-show="viewFull">
                <multiselect 
                    v-model="driveValue" 
                    tag-placeholder="Привод" 
                    placeholder="Привод" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.drives" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div class="filter__head-item" v-show="viewFull">
                <multiselect 
                    v-model="bodyValue" 
                    tag-placeholder="Кузов" 
                    placeholder="Кузов" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.bodies" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div class="filter__head-item filter__head-item__range" v-show="viewFull && filter.ranges.year.value[0] < filter.ranges.year.value[1]">
                <multi-range
                    range="year"
                    desc-val=""
                    name-range="Год выпуска"
                    ref="yearRange"
                    :delimiter="false"
                    @range="setRangeValue"/>
            </div>
            <div class="filter__head-item" v-show="viewFull && filter.dropLists.dealerships.length > 1">
                <multiselect 
                    v-model="dealershipValue" 
                    tag-placeholder="Автосалон" 
                    placeholder="Автосалон" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.dealerships" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div class="filter__head-item" v-show="viewFull">
                <multiselect 
                    v-model="colorValue" 
                    tag-placeholder="Цвет" 
                    placeholder="Цвет" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.colors" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
                    :closeOnSelect="true"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            
        </div>
        <div class="filter__head" v-else>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
        </div>
        <list-tags :tags="tagsList" @reset="resetFilter" v-if="tagsList.length > 0" />
        <filter-list 
            :list="filterList"
            :query="filterListQuery"
            v-if="filter"/>
        <div class="filter__list" v-else>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
            <div class="filter__list-item__empty"></div>
        </div>
    </div>
</template>

<script>

import MultiRange from '@/components/base/MultiRange.vue'
import ButtonCancel from '@/components/searchfilter/ButtonCancel.vue'
import ButtonApply from '@/components/searchfilter/ButtonApply.vue'
import FilterList from '@/components/searchfilter/FilterList.vue'
import ListTags from '@/components/searchfilter/ListTags.vue'

import Multiselect from 'vue-multiselect'

export default {
    name: 'SearchFilter',
    props: ['listName'],
    components: {
        MultiRange,
        ButtonApply,
        ButtonCancel,
        FilterList,
        Multiselect,
        ListTags
    },
    data() {
        return {

            brands: [],
            oneBrand: false,

            filter: null,
            viewFull: false,
            blockFilter: false,

            modeValue: [],
            brandValue: [],
            brandOptions: this.$store.state.global.brands,

            modelValue: [],
            modelOptions: [],

            transmissionsValue: [],
            engineValue: [],
            dealershipValue: [],
            colorValue: [],
            bodyValue: [],
            driveValue: [],
            sortValue: [],
            complectationOptions: [],
            tagValue: [],

            link: '',

            canonical: window.location.href,

            query: {
                brand: null,
                model: null,
                price: null,
                transmission: null,
                volume: null,
                power: null,
                engine: null,
                drive: null,
                body: null,
                year: null,
                dealership: null,
                color: null,
            },
            tags: [],

            iter: 0,

            meta: {
                h1: '',
                title: '',
                description: '',
                count: 0,
                status: 200
            }
        }
    },
    computed: {
        curModel: {
            get() {
                return ( this.modelValue.length == 1 ) ? this.modelValue[0] : null
            },
            set() {}
        },
        curBrand: {
            get() {
                let res = null
                if (this.brandValue.length == 1) {
                    res = this.brandValue[0]
                } else if (this.brandValue.length > 1 && this.modelValue.length == 1) {
                    res = this.modelValue[0].brand
                }
                return res
            },
            set() {}
        },
        filterList: {
            get() {
                return ( this.$route.params.brand || this.$route.query.brand ) ? this.filter.dropLists.models : this.filter.dropLists.brands
            },
            set() {
            }

        },
        filterListQuery: {
            get() {

                let q = '', s = []
                if ( this.transmissionsValue.length ) {
                this.transmissionsValue.forEach( function(i) { s.push(i.code) })
                    q += '&transmission='+s.join(',')
                }
                s = []
                if ( this.engineValue.length ) {
                    this.engineValue.forEach( function(i) { s.push(i.code) })
                    q += '&engine='+s.join(',')
                }
                s = []
                if ( this.colorValue.length ) {
                    this.colorValue.forEach( function(i) { s.push(i.code) })
                    q += '&color='+s.join(',')
                }
                s = []
                if ( this.bodyValue.length ) {
                    this.bodyValue.forEach( function(i) { s.push(i.code) })
                    q += '&body='+s.join(',')
                }
                s = []
                if ( this.driveValue.length ) {
                    this.driveValue.forEach( function(i) { s.push(i.code) })
                    q += '&drive='+s.join(',')
                }
                s = []
                if ( this.dealershipValue.length ) {
                    this.dealershipValue.forEach( function(i) { s.push(i.code) })
                    q += '&dealership='+s.join(',')
                }

                if ( this.filter.ranges.price.value[0] != this.filter.ranges.price.min || this.filter.ranges.price.value[1] != this.filter.ranges.price.max ) {
                    q += '&price='+this.filter.ranges.price.value.join(',')
                }
                if ( this.filter.ranges.volume.value[0] != this.filter.ranges.volume.min || this.filter.ranges.volume.value[1] != this.filter.ranges.volume.max ) {
                    q += '&volume='+this.filter.ranges.volume.value.join(',')
                }
                if ( this.filter.ranges.power.value[0] != this.filter.ranges.power.min || this.filter.ranges.power.value[1] != this.filter.ranges.power.max ) {
                    q += '&power='+this.filter.ranges.power.value.join(',')
                }
                if ( this.filter.ranges.year.value[0] != this.filter.ranges.year.min || this.filter.ranges.year.value[1] != this.filter.ranges.year.max ) {
                    q += '&year='+this.filter.ranges.year.value.join(',')
                }
                if ( this.$route.query.tag ) q += '&tag='+this.$route.query.tag

                return ((q.length)?'?':'') + q

            },
            set() {

            }
        },
        tagsList: {
            get() {
                let res = []
                this.brandValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'brandValue'
                        }
                    )
                })
                this.modelValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'modelValue'
                        }
                    )
                })
                this.transmissionsValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'transmissionsValue'
                        }
                    )
                })
                this.engineValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'engineValue'
                        }
                    )
                })
                this.driveValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'driveValue'
                        }
                    )
                })
                this.bodyValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'bodyValue'
                        }
                    )
                })
                this.dealershipValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'dealershipValue'
                        }
                    )
                })
                this.colorValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'colorValue'
                        }
                    )
                })
                this.tagValue.forEach((i, k) => {
                    res.push(
                        {
                            name: i.name,
                            indx: k,
                            list: 'tagValue'
                        }
                    )
                })
                
                return res
                
            },
            set() {}
        },

        metaTitle: function() {
            // let res = '', d = new Date()
            // res = 'Купить '
            // res += ( this.$store.state.mode == 'new' ) ? 'новый ' : ''
            // res += ( this.curBrand ) ? this.curBrand.name+' ' : 'автомобиль '
            // res += ( this.curModel ) ? this.curModel.name+' ' : ''
            // res += ( this.$store.state.mode == 'used' ) ? 'с пробегом ' : ''
            // res += ( this.$store.state.inCity ) ? 'в '+this.$store.state.inCity : ''
            // res += ' - Автосалон '
            // res += ( this.curBrand ) ? ((this.curBrand.ru_name)?this.curBrand.ru_name:this.curBrand.name)+' ' : ''
            // res += ( this.curModel ) ? ((this.curModel.ru_name)?this.curModel.ru_name:this.curModel.name)+' ' : ''
            // res += d.getFullYear()+' года по выгодным ценам'+this.titleSuffix
            // return res
            return this.meta.title
        },
        metaDescription: function() {
            // let res
            // res = 'Продажа '
            // res += (( this.$store.state.mode == 'new' ) ? 'новых' : 'подержанных') +'авто '
            // res += ( this.curBrand ) ? this.curBrand.name+' ' : ''
            // res += ( this.curModel ) ? this.curModel.name+' ' : ''
            // res += ( this.$store.state.inCity ) ? 'в '+this.$store.state.inCity : ''
            // res += 'Все машины '
            // res += ( this.curBrand ) ? ((this.curBrand.ru_name)?this.curBrand.ru_name:this.curBrand.name)+' ' : ''
            // res += ( this.curModel ) ? ((this.curModel.ru_name)?this.curModel.ru_name:this.curModel.name)+' ' : ''
            // res += 'в наличии недорого, возможно купить в кредит на выгодных условиях.'
            // res += ( window.calltouch_phone ) ? ' Телефон: '+this.FormatPhoneOut(window.calltouch_phone)+'.' : ''
            // return res
            return this.meta.description
        },
        metaH1: function() {
            // let res = ''
            // if ( this.$store.state.mode == 'new' ) {
            //     res = this.filter.totalCount+/*' '+this.getWorld(this.totalCount, 'n')+*/' '+this.getWorld(this.filter.totalCount, 'a')+' '
            //     res += ( this.curBrand ) ? this.curBrand.name+' ' : ''
            //     res += ( this.curModel ) ? this.curModel.name+' ' : ''
            // }
            // if ( this.$store.state.mode == 'used' ) {
            //     res = this.filter.totalCount+' '+this.getWorld(this.filter.totalCount, 'a')+' '
            //     res += ( this.curBrand ) ? this.curBrand.name+' ' : ''
            //     res += ( this.curModel ) ? this.curModel.name+' ' : ''
            //     res += 'с пробегом '
            // }
            // return res
            return this.meta.h1
        },
        titleSuffix: function() {
            let res = ''
            if ( window.location.host == 'yug-avto.ru' ) res = ' | Дилерский центр Юг-Авто'
            if ( window.location.host == 'yug-avto-expert.ru' ) res = ' | Юг-Авто Эксперт'
            if ( this.$store.state.brand && typeof this.$route.params.brand != 'undefined') res = ' | Дилерский центр Юг-Авто '+this.$store.state.brand

            return res
        }
        
    },
    watch: {
        modeValue: function(n, o) {
            if ( o.code && !this.blockFilter) {
                let l = '/'
                if (this.$store.state.mode == 'new') {
                    l += 'cars/'+n.code
                } else {
                    l += 'cars/used/'
                    if ( n.code == 'comm' ) l += '?dealership=1489,1533'
                }
                window.location.href = l;
            }
        },

        brandValue: function(n) {
            if (  !this.blockFilter ) {
                let s = []
                switch (n.length) {
                    case 0:
                        if ( this.$route.params.brand || this.$route.query.brand ) {
                            this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                                if (error.name != "NavigationDuplicated") {
                                    throw error;
                                }
                            })
                        }
                        break;
                    case 1:
                        if ( this.$route.params.brand != n[0].code ) {
                            this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                                if (error.name != "NavigationDuplicated") {
                                    throw error;
                                }
                            })
                        }
                        break;
                    default:
                        n.forEach( (i) => {
                            s.push(i.code)
                        })
                        if ( this.$route.query.brand != s.join(',') ) {
                            this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                                if (error.name != "NavigationDuplicated") {
                                    throw error;
                                }
                            })
                        }
                        this.iter++
                        break;
                }
            }
            
        },
        modelValue: function(n) {
            if (  !this.blockFilter ) {
                            let s = []
                switch (n.length) {
                    case 0:
                        if ( this.$route.params.model || this.$route.query.model ) {
                            this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                                if (error.name != "NavigationDuplicated") {
                                    throw error;
                                }
                            })
                        }
                        break;
                    case 1:
                        if ( this.$route.params.model != n[0].code || this.$route.query.model != n[0].code) {
                            this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                                if (error.name != "NavigationDuplicated") {
                                    throw error;
                                }
                            })
                        }
                        break;
                    default:
                        n.forEach( (i) => {
                            s.push(i.code)
                        })
                        if ( this.$route.query.model != s.join(',') ) {
                            this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                                if (error.name != "NavigationDuplicated") {
                                    throw error;
                                }
                            })
                        }
                        break;
                }

            }
        },
        transmissionsValue: function(n) {
            if (  !this.blockFilter ) {
            let s = []
            n.forEach( (i) => {
                s.push(i.code)
            })
            if ( this.$route.query.transmission != s.join(',') ) {
                this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                })
            }
            }
        },
        engineValue: function(n){
            if (  !this.blockFilter ) {
            let s = []
            n.forEach( (i) => {
                s.push(i.code)
            })
            if ( this.$route.query.engine != s.join(',') ) {
                this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                })
            }
            }
        },
        dealershipValue: function(n){
            if (  !this.blockFilter ) {
            let s = []
            n.forEach( (i) => {
                s.push(i.code)
            })
            if ( this.$route.query.dealership != s.join(',') ) {
                this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                })
            }
            }
        },
        colorValue: function(n){
            if (  !this.blockFilter ) {
            let s = []
            n.forEach( (i) => {
                s.push(i.code)
            })
            if ( this.$route.query.color != s.join(',') ) {
                this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                })
            }
            }
        },
        bodyValue: function(n){
            if (  !this.blockFilter ) {
            let s = []
            n.forEach( (i) => {
                s.push(i.code)
            })
            if ( this.$route.query.body != s.join(',') ) {
                this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                })
            }
            }
        },
        driveValue: function(n){
            if (  !this.blockFilter ) {
            let s = []
            n.forEach( (i) => {
                s.push(i.code)
            })
            if ( this.$route.query.drive != s.join(',') ) {
                this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                })
            }
            }
        },
        
        '$store.state.city': function() {
            if ( !this.blockFilter ) this.initFilter()
        },
        '$route.query': function() {
            if ( !this.blockFilter ) this.initFilter()
        }
    },
    mounted: function() {
        this.initFilter()
    },
    methods: {
        
        initFilter() {
            let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
            for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
            if ( this.$route.params.brand ) url += '&brand='+this.$route.params.brand
            if ( this.$route.params.model ) url += '&model='+this.$route.params.model
            this.axios.get(url).then((response) => {
                this.filter = response.data
                this.brands = this.filter.dropLists.brands
                this.meta.h1 = response.data.meta.meta.h1
                this.meta.title = response.data.meta.meta.title
                this.meta.description = response.data.meta.meta.description
                this.link = this.buildLink(this.buildQuery())
                this.getStartDropsValues()
            })
        },
        getRangeCount(link) {
            let url = this.$store.state.apiUrl+'count/'+this.$store.state.mode+'/'+link+'&token='+this.$store.state.apiToken
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
            this.axios.get(url).then((response) => {
                this.filter.totalCount = Number(response.data)
                this.link = this.buildLink(this.buildQuery())
            })
        },
        resetFilter() {
            this.$router.replace({'query': null});
            this.initFilter()
            this.resetDrops()
            let startPath = '/'
            if ( this.$store.state.brand ) startPath += this.$store.state.brand 
            this.$router.push(startPath ).catch(error => {
                if (error.name != "NavigationDuplicated") {
                    throw error;
                }
            })
        },

        // drops
        getStartDropsValues() {

            this.blockFilter = true

            this.modeValue = this.$store.state.modeOptions[this.$store.state.mode][((this.$route.query.dealership=='1489,1533'||this.$route.query.dealership=='1533'||this.$route.query.dealership=='1489')?1:0)]
            this.$store.state.nav = {}

            let v = []
            if ( this.$route.params.brand ) {
                this.$store.state.global.brands.forEach( (i) => {
                    if ( i.code == this.$route.params.brand ) {
                        v.push(i)
                        this.$store.state.nav.brand = i
                    }
                })
            } else if ( this.$route.query.brand ) {
                this.$route.query.brand.split(',').forEach( (qi) => {
                    this.$store.state.global.brands.forEach( (i) => {
                        if ( i.code == qi ) v.push(i)
                    })
                })
            }
            this.brandValue = v
            
            v = []
            if ( this.$route.params.model ) {
                this.filter.dropLists.models.forEach( (i) => {
                    if ( i.code == this.$route.params.model ) {
                        v.push(i)
                        this.$store.state.nav.model = i
                    }
                })
            } else if ( this.$route.query.model ) {
                this.$route.query.model.split(',').forEach( (qi) => {
                    this.filter.dropLists.models.forEach( (i) => {
                        if ( i.code == qi ) v.push(i)
                    })
                })
            }
            this.modelValue = v
            
            v = []
            if ( this.$route.query.transmission ) {
                this.$route.query.transmission.split(',').forEach( (qi) => {
                    this.filter.dropLists.transmissions.forEach( (i) => {
                        if ( i.code == qi ) v.push(i)
                    })
                })
            }
            this.transmissionsValue = v
            v = []
            if ( this.$route.query.engine ) {
                this.$route.query.engine.split(',').forEach( (qi) => {
                    this.filter.dropLists.engines.forEach( (i) => {
                        if ( i.code == qi ) v.push({name: i.name, code: i.code})
                    })
                })
            }
            this.engineValue = v
            v = []
            if ( this.$route.query.drive ) {
                this.$route.query.drive.split(',').forEach( (qi) => {
                    this.filter.dropLists.drives.forEach( (i) => {
                        if ( i.code == qi ) v.push(i)
                    })
                })
            }
            this.driveValue = v
            v = []
            if ( this.$route.query.body ) {
                this.$route.query.body.split(',').forEach( (qi) => {
                    this.filter.dropLists.bodies.forEach( (i) => {
                        if ( i.code == qi ) v.push(i)
                    })
                })
            }
            this.bodyValue = v
            v = []
            if ( this.$route.query.dealership ) {
                this.$route.query.dealership.split(',').forEach( (qi) => {
                    this.filter.dropLists.dealerships.forEach( (i) => {
                        if ( i.code == qi ) v.push(i)
                    })
                })
            }
            this.dealershipValue = v
            v = []
            if ( this.$route.query.color ) {
                this.$route.query.color.split(',').forEach( (qi) => {
                    this.filter.dropLists.colors.forEach( (i) => {
                        if ( i.code == qi ) v.push(i)
                    })
                })
            }
            this.colorValue = v

            v = []
            switch ( this.$route.query.tag ) {
                case 'discount':
                    v.push(
                        {
                            name: 'Выгода',
                            list: 'tagValue'
                        }
                    )
                    break

                case 'instock':
                    v.push(
                        {
                            name: 'В наличии',
                            list: 'tagValue'
                        }
                    )
                    break

                case 'onway':
                    v.push(
                        {
                            name: 'В пути',
                            list: 'tagValue'
                        }
                    )
                    break
            }
            this.tagValue = v

            this.blockFilter = false
        },
        resetDrops() {
            this.blockFilter = true
            this.brandValue = []
            this.modelValue = []
            this.transmissionsValue = []
            this.engineValue = []
            this.dealershipValue = []
            this.colorValue = []
            this.driveValue = []
            this.bodyValue = []
            this.blockFilter = false
        },

        // ranges
        setRangeValue() {
            // this.getRangeCount(this.buildQuery())
            this.$router.push(this.buildLink(this.buildQuery())).catch(error => {
                            if (error.name != "NavigationDuplicated") {
                                throw error;
                            }
                        })
        },
        
        // link
        buildQuery() {
            let  s = [], a = [], l = '?'

            if ( this.brandValue.length ) {
                this.brandValue.forEach((i) => { s.push(i.code) })
                l += 'brand='+s.join(',')
            }
            s = []
            if ( this.modelValue.length > 0 ) {
                this.modelValue.forEach( (i) => { s.push(i.code) })
                l += '&model='+s.join(',')
            }
            s = []
            if ( this.transmissionsValue.length ) {
                this.transmissionsValue.forEach((i) => { s.push(i.code) })
                l += '&transmission='+s.join(',')
            }
            s = []
            if ( this.engineValue.length ) {
                this.engineValue.forEach((i) => { s.push(i.code) })
                l += '&engine='+s.join(',')
            }
            s = []
            if ( this.colorValue.length ) {
                this.colorValue.forEach((i) => { s.push(i.code) })
                l += '&color='+s.join(',')
            }
            s = []
            if ( this.bodyValue.length ) {
                this.bodyValue.forEach((i) => { s.push(i.code) })
                l += '&body='+s.join(',')
            }
            s = []
            if ( this.driveValue.length ) {
                this.driveValue.forEach((i) => { s.push(i.code) })
                l += '&drive='+s.join(',')
            }
            s = []
            if ( this.dealershipValue.length ) {
                this.dealershipValue.forEach((i) => { 
                    s.push(i.code)
                    if ( !this.brandValue.length && i.code == 1309 ) a.push(i.brand)
                })
                l += '&dealership='+s.join(',')
                if ( a.length ) l += this.buildPartQuery(a, 'brand')
            }

            if ( this.filter.ranges.price.value[0] != this.filter.ranges.price.min || this.filter.ranges.price.value[1] != this.filter.ranges.price.max ) {
                l += '&price='+this.filter.ranges.price.value.join(',')
            }
            if ( this.filter.ranges.volume.value[0] != this.filter.ranges.volume.min || this.filter.ranges.volume.value[1] != this.filter.ranges.volume.max ) {
                l += '&volume='+this.filter.ranges.volume.value.join(',')
            }
            if ( this.filter.ranges.power.value[0] != this.filter.ranges.power.min || this.filter.ranges.power.value[1] != this.filter.ranges.power.max ) {
                l += '&power='+this.filter.ranges.power.value.join(',')
            }
            if ( this.filter.ranges.year.value[0] != this.filter.ranges.year.min || this.filter.ranges.year.value[1] != this.filter.ranges.year.max ) {
                l += '&year='+this.filter.ranges.year.value.join(',')
            }
            if ( this.$route.query.tag ) l += '&tag='+this.$route.query.tag
            
            return l
        },
        buildLink( query ) {
            let str = query || ''
            let l = '/', q = '', res
            if ( str.length ) {
                let get = {}
                str.split('?')[1].split('&').forEach( (param) => {
                    if ( param !== '' ) get[param.split('=')[0]] = param.split('=')[1].split(',')
                })

                // path
                if (typeof get.brand == 'object') {
                    if (get.brand.length == 1) {
                        l += get.brand[0]
                        if (typeof get.model == 'object') {
                            if (get.model.length == 1) {
                                l += '/'+get.model[0]
                            } else {
                                q += 'model='+get.model.join(',')+'&'
                            }
                        }
                    } else {
                        q += 'brand='+get.brand.join(',')+'&'
                        if (typeof get.model == 'object') q += 'model='+get.model.join(',')+'&'
                    }
                }
                // query
                for (let key in get) {
                    if (key!='brand' && key!='model') q += key+'='+get[key].join(',')+'&'
                }
            }

            res = l+((q.length)?'?':'')+q.slice(0, -1)
            // this.$router.push( res )

            return res
        },
        buildPartQuery( data = [], name, ampersand = true ) {
            
            let res = ''

            if ( ampersand ) res += '&'
            res += name+'='
            res += data.join(',')

            return res
        },

        


        // toggles
        toggleViewMode() {
            let s =  (this.$store.state.viewMode=='grid') ? 'list' : 'grid'
            this.$store.state.viewMode = s
            this.$cookies.set('CIS_VIEW_MODE', s)
        },
        toggleFilter() {
            this.viewFull = !this.viewFull
        },


        // helpers
        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        },

        getWorld( q = 1, f = 'a' ) {

            let res = {
                'c': ['цвет', 'цвета', 'цветов'],
                'a': ['автомобиль', 'автомобиля', 'автомобилей'],
                'n': ['новый', 'новых', 'новых']
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

        showCity() {
            localStorage.setItem('YAPP_SELECTED_CITY_SHOW_LIST', 'true')
        }
    }
}
</script>


<style>
@import '../assets/css/multiselect.css';
.pos-1 {grid-area: 1 / 5}
.pos-2 {grid-area: 2 / 5}
.title {
    font-size: var(--h1);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2rem;
	position: relative;
	user-select: none;
}
.title .title-empty {
    height: 32px;
    background-color: var(--yalightgray);
}
.title a, .title a:visited {
    color: var(--yablack);
    text-decoration: none;
}
.title a:hover, .title a:active .title a:hover {
    color: var(--yadarkblue);
}
.title a.city-link {
    color: var(--yadarkblue);
    text-decoration: underline;
}

.filter {
    margin-bottom: 4rem;
    user-select: none;
}
.filter__head {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 20px;
    align-items: start;
    margin-bottom: 2em;
}
.filter__head-item {
    border-radius: 3px;
    color: var(--yablack)!important;
    height: 45px;
}
.filter__head-item__range {
	border: 1px solid var(--yadarkblue);
    padding: 0;
}
.filter__head-item__empty {
	border: 1px solid var(--yalightgray);
    border-radius: 3px;
    background-color: var(--yalightgray);
    height: 42px;
}

.filter__sort {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
}
.filter__sort-item:nth-child(1) {
    width: 243.2px;
    border-radius: 3px;
    color: var(--yablack) !important;
    height: 45px;
}
.filter__sort-item:nth-last-child(1) {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.filter__sort-item__empty:nth-child(1) {
    width: 205px;
    border: 1px solid var(--yalightgray);
    border-radius: 3px;
    background-color: var(--yalightgray);
    height: 42px;
}
.filter__sort-item__empty:nth-last-child(1) {
    display: flex;
    gap: 2rem;
    align-items: center;
    background-color: var(--yalightgray);
    border: 1px solid var(--yalightgray);
    height: 42px;
    width: 205px;
}
.filter__sort-item__button {
    background: transparent;
    border: 0;
    margin-right: 1em;
}
.filter__sort-item__button span{
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    cursor: pointer;
    display: block;
    padding: 10px 15px;
    background: transparent;
    border: solid 1px transparent!important;
    border-radius: 3px!important;
    transition: 200ms;
}
.filter__sort-item__button span:hover, .filter__sort-item__button span.active {
    color: var(--yadarkblue);
}
.filter__sort-item__button:nth-last-child(1) {
    margin-right: 0;
}
.filter__sort-item__button.active span{
    background: transparent;
    border: solid 1px var(--yayellow) !important;
    border-radius: 3px !important;
    color: var(--yadarkblue);
}
.filter__sort-item__switch-radio svg {
    --icon-size: 20px;
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--black);
    vertical-align: bottom;
}
.filter__sort-item__switch {
    display: flex;
}
.filter__sort-item__switch-radio input {
    display: none;
}
.filter__sort-item__switch-radio span {
    padding: 11.5px;
    border: solid 1px var(--radio-grid-color);
    border-radius: 3px;
    cursor: pointer;
    display: block;
    box-sizing: border-box;
}
.filter__sort-item__switch-radio:nth-child(1) span {
   /* border-right: solid 1px var(--yayellow);
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;*/
}
.filter__sort-item__switch-radio:nth-child(2) span {
    /*border-left: solid 1px var(--yayellow);
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;*/
}
.filter__sort-item__switch-radio input:checked + span {
    border: solid 1px var(--yayellow);
}
@media (max-width: 1024px) {
    .pos-1 {grid-area: 1}
    .pos-2 {grid-area: 2}
}
@media (max-width: 768px) {
    .filter__sort-item:nth-last-child(1) {
        gap: 0;
    }
}
</style>
