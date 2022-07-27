<template>
    <div class="filter">
        <div class="title">
            <router-link to="/">
                {{ Format(totalCount) }} {{ getWorld(totalCount, 'a') }} 
                <span v-if="curBrand">
                    {{ curBrand+' ' }}
                </span>
                <span v-if="curBrand && curModel">
                    {{ curModel+' ' }}
                </span>
            </router-link>
            <a :href="'/dealerships/?city='+$store.state.city" v-if="$store.state.inCity" role="top-menu-show-list-city" class="city-link">в {{ $store.state.inCity }}</a>
		</div>
        <div class="filter__head" v-if="filter">
            <div class="filter__head-item">
                <multiselect 
                    v-model="modeValue" 
                    tag-placeholder="Выбрать автомобиль" 
                    placeholder="Выбрать автомобиль" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.mode" 
                    :searchable="false"
                    :multiple="false"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    ></multiselect>
            </div>
            <div class="filter__head-item" v-show="!oneBrand">
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
                    :options="modelOptions" 
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
                class="filter__head-item"
                >
                <button-apply 
                    :filterLink="link"
                    :carCount="filter.totalCount"
                    :viewFull="viewFull"
                    @toggle="toggleFilter"/>
            </div>
            <div class="filter__head-item" v-show="(viewFull && !oneBrand) || oneBrand">
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
            <div class="filter__head-item filter__head-item__range" v-show="viewFull">
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
                class="filter__head-item"
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
            <div class="filter__head-item filter__head-item__range" v-show="viewFull">
                <multi-range
                    range="year"
                    desc-val=""
                    name-range="Год выпуска"
                    ref="yearRange"
                    :delimiter="false"
                    @range="setRangeValue"/>
            </div>
            <div class="filter__head-item" v-show="viewFull">
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
            totalCount: 0,
            curBrand: null,
            curModel: null,

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

            link: '',

            sortbuttons: {
                discount: false,
                instock: false,
                inpath: false
            },

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
            tags: []
        }
    },
    computed: {
        filterList: {
            get() {
                // console.log(this.modelOptions)
                return ( this.$route.params.brand ) ? this.modelOptions : this.brands
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
                    q += '&minprice='+this.filter.ranges.price.value.join(',')
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
                return res
                
            },
            set() {}
        }
        
    },
    watch: {
        modeValue: function(n, o) {
            if ( o.code ) {
                window.location.href = '/cars/'+n.code;
            }
        },

        brandValue: function(newValue) {
            if (newValue.length) {
                this.modelValue = []
                this.getModels(newValue).then(()=>{
                    this.resetDrops()
                    this.getFilter(this.buildQuery())
                    // if ( this.$ ) 
                })
            } else {
                this.initFilter().then(() => {
                    this.resetDrops()
                })
            }
        },
        modelValue: function() {
            this.resetDrops()
            this.getFilter(this.buildQuery())
        },
        transmissionsValue: function(v, o) {
            if ( v.length || (!v.length && o.length) ) {
                this.link = this.buildLink(this.buildQuery())
                this.getFilter(this.buildQuery())
            }
        },
        engineValue: function(v,o) {
            if ( v.length || (!v.length && o.length) ) {
                this.link = this.buildLink(this.buildQuery())
                this.getFilter(this.buildQuery())
            }
        },
        dealershipValue: function(v,o) {
            if ( v.length || (!v.length && o.length) ) {
                this.link = this.buildLink(this.buildQuery())
                this.getFilter(this.buildQuery())
            }
        },
        colorValue: function(v,o) {
            if ( v.length || (!v.length && o.length) ) {
                this.link = this.buildLink(this.buildQuery())
                this.getFilter(this.buildQuery())
            }
        },
        bodyValue: function(v,o) {
            if ( v.length || (!v.length && o.length) ) {
                this.link = this.buildLink(this.buildQuery())
                this.getFilter(this.buildQuery())
            }
        },
        driveValue: function(v,o) {
            if ( v.length || (!v.length && o.length) ) {
                this.link = this.buildLink(this.buildQuery())
                this.getFilter(this.buildQuery())
            }
        },
        '$route.query': function() {
            this.getFilter(this.buildQuery()).then(() => {
                this.$parent.iter++
            })
            
        },
        '$route.params.brand': function() {
            this.$store.state.global.brands.forEach( (i) => {
                if ( i.alias == this.$route.params.brand ) {
                    this.brandValue.push(i)
                }
            })
            if ( this.brandValue.length == 1 ) this.curBrand = this.brandValue[0].name
            if ( this.modelValue.length == 1 ) this.curModel = this.modelValue[0].name
        },
        '$route.param.model': function() {
            this.modelOptions.forEach( (i) => {
                if ( i.code == this.$route.params.model ) {
                    this.modelValue.push(i)
                }
            })
            if ( this.modelValue.length == 1 ) this.curModel = this.modelValue[0].name
        },
        '$store.state.city': function() {
            let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            if ( this.$route.params.brand ) url += '&brand='+this.$route.params.brand
            if ( this.$route.params.model ) url += '&model='+this.$route.params.model
            this.axios.get(url).then((response) => {
                this.filter = response.data
                this.totalCount = this.filter.totalCount
                this.filterList = this.filter.dropLists.brands
                this.brands = this.filter.dropLists.brands
                this.link = this.buildLink(this.buildQuery())
            })
        }
    },
    mounted: function() {

        this.initFilter().then(() => {
            setTimeout(() => {
                this.getStartDropsValues()
                if ( this.$store.state.brand ) this.oneBrand = true
            }, 500);
        })
    },
    methods: {
        // filter
        initFilter() {
            return new Promise((resolve) => {
                let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
                if (this.$store.state.city) url += '&city='+this.$store.state.city
                for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
                if ( this.$route.params.brand ) url += '&brand='+this.$route.params.brand
                if ( this.$route.params.model ) url += '&model='+this.$route.params.model
                this.axios.get(url).then((response) => {
                    this.filter = response.data
                    this.totalCount = this.filter.totalCount
                    this.filterList = this.filter.dropLists.brands
                    this.brands = this.filter.dropLists.brands
                    this.link = this.buildLink(this.buildQuery())
                    resolve(true)
                })
            })
        },
        getFilter(link) {
            return new Promise((resolve) => {
                let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/'+link+'&token='+this.$store.state.apiToken
                if (this.$store.state.city) url += '&city='+this.$store.state.city
                for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
                if ( this.$route.params.brand ) url += '&brand='+this.$route.params.brand
                if ( this.$route.params.model ) url += '&model='+this.$route.params.model
                this.axios.get(url).then((response) => {
                    this.filter = response.data
                    this.totalCount = this.filter.totalCount
                    this.filterList = this.filter.dropLists.brands
                    this.link = this.buildLink(this.buildQuery())
                    resolve(true)
                })
            })
        },
        getRangeCount(link) {
            return new Promise((resolve) => {
                let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/'+link+'&token='+this.$store.state.apiToken
                if (this.$store.state.city) url += '&city='+this.$store.state.city
                this.axios.get(url).then((response) => {
                    this.totalCount = response.data.totalCount
                    this.filter.totalCount = response.data.totalCount
                    this.filterList = response.data.dropLists
                    this.link = this.buildLink(this.buildQuery())
                    resolve(true)
                })
            })
        },
        resetFilter() {
            if (this.$route.path == '/') {
                this.initFilter().then(() => {
                    this.$router.replace({'query': null})
                    this.brandValue = []
                    this.resetDrops()
                })
            } else {
                this.$router.push('/').catch(() => {})
            }
            this.$parent.iter++
        },

        // drops
        getStartDropsValues() {

            this.modeValue = this.$store.state.modeOptions[this.$store.state.mode]

            if ( this.modelValue.length == 1 ) this.curModel = this.modelValue[0].name

            if ( this.$route.params.brand ) {
                this.$store.state.global.brands.forEach( (i) => {
                    if ( i.code == this.$route.params.brand ) {
                        this.brandValue.push(i)
                        this.curBrand = i.name
                    }
                })
            } else if ( typeof this.$route.query.brand == 'string' ) {
                this.$route.query.brand.split(',').forEach( (qi) => {
                    this.$store.state.global.brands.forEach( (i) => {
                        if ( i.code == qi ) {
                            this.brandValue.push(i)
                        }
                    })
                })
            }
             
            if ( this.$route.query.transmission ) {
                this.$route.query.transmission.split(',').forEach( (qi) => {
                    this.filter.dropLists.transmissions.forEach( (i) => {
                        if ( i.code == qi ) {
                            this.transmissionsValue.push(i)
                        }
                    })
                })
            }
            if ( this.$route.query.engine ) {
                this.$route.query.engine.split(',').forEach( (qi) => {
                    this.filter.dropLists.engines.forEach( (i) => {
                        if ( i.code == qi ) {
                            this.engineValue.push({name: i.name, code: i.code})
                        }
                    })
                })
            }
            if ( this.$route.query.drive ) {
                this.$route.query.drive.split(',').forEach( (qi) => {
                    this.filter.dropLists.drives.forEach( (i) => {
                        if ( i.code == qi ) this.driveValue.push(i)
                    })
                })
            }
            if ( this.$route.query.body ) {
                this.$route.query.body.split(',').forEach( (qi) => {
                    this.filter.dropLists.bodies.forEach( (i) => {
                        if ( i.code == qi ) this.bodyValue.push(i)
                    })
                })
            }
            if ( this.$route.query.dealership ) {
                this.$route.query.dealership.split(',').forEach( (qi) => {
                    this.filter.dropLists.dealerships.forEach( (i) => {
                        if ( i.code == qi ) this.dealershipValue.push(i)
                    })
                })
            }
            if ( this.$route.query.color ) {
                this.$route.query.color.split(',').forEach( (qi) => {
                    this.filter.dropLists.colors.forEach( (i) => {
                        if ( i.code == qi ) this.colorValue.push(i)
                    })
                })
            }
        },
        setDrops(drops) {
            let q = []
            this.blockFilter = true

            if ( !drops.includes('transmissions') ) {
                q = []
                if ( this.transmissionsValue.length ) {
                    this.filter.dropLists.transmissions.forEach((o) => {
                        this.transmissionsValue.forEach((i) => {
                            if ( i.code == o.code ) q.push(i)
                        })
                    })
                }
                this.transmissionsValue = q
            }

            if ( !drops.includes('engines') ) {
                q = []
                if ( this.engineValue.length ) {
                    this.filter.dropLists.engines.forEach((o) => {
                        this.engineValue.forEach((i) => {
                            if ( i.code == o.code ) q.push(i)
                        })
                    })
                }
                this.engineValue = q
            }
            
            if ( !drops.includes('drives') ) {
                q = []
                if ( this.driveValue.length ) {
                    this.filter.dropLists.drives.forEach((o) => {
                        this.driveValue.forEach((i) => {
                            if ( i.code == o.code ) q.push(i)
                        })
                    })
                }
                this.driveValue = q
            }

            if ( !drops.includes('bodies') ) {
                q = []
                if ( this.bodyValue.length ) {
                    this.filter.dropLists.bodies.forEach((o) => {
                        this.bodyValue.forEach((i) => {
                            if ( i.code == o.code ) q.push(i)
                        })
                    })
                }
                this.bodyValue = q
            }
            
            if ( !drops.includes('dealerships') ) {
                q = []
                if ( this.dealershipValue.length ) {
                    this.filter.dropLists.dealerships.forEach((o) => {
                        this.dealershipValue.forEach((i) => {
                            if ( i.code == o.code ) q.push(i)
                        })
                    })
                }
                this.dealershipValue = q
            }

            if ( !drops.includes('colors') ) {
                q = []
                if ( this.colorValue.length ) {
                    this.filter.dropLists.colors.forEach((o) => {
                        this.colorValue.forEach((i) => {
                            if ( i.code == o.code ) q.push(i)
                        })
                    })
                }
                this.colorValue = q
            }

            this.blockFilter = false
        },
        resetDrops() {
            this.blockFilter = true
                this.transmissionsValue = []
                this.engineValue = []
                this.dealershipValue = []
                this.colorValue = []
                this.driveValue = []
                this.bodyValue = []
            this.blockFilter = false
        },

        // ranges
        setRangeValue(v) {
            this.filter.ranges[v.range].value = v.value
            this.link = this.buildLink(this.buildQuery())
            this.getRangeCount(this.buildQuery())

        },
        
        // link
        buildQuery() {
            let  s = [], a = [], l = '?'

            if ( this.brandValue.length ) {
                this.brandValue.forEach((i) => { s.push(i.code) })
                l += 'brand='+s.join(',')
            }
            s = []
            if ( this.modelValue.length ) {
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
                console.log(l)
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

            return l
        },
        buildLink( query ) {
            let str = query || ''
            let l = '', q = '', res
            if ( str.length ) {
                let get = {}
                str.split('?')[1].split('&').forEach( (param) => {
                    if ( param !== '' ) get[param.split('=')[0]] = param.split('=')[1].split(',')
                })

                // path
                if (typeof get.brand == 'object') {
                    if (get.brand.length == 1) {
                        l += '/'+get.brand[0]
                        if (typeof get.model == 'object') {
                            if (get.model.length == 1) l += '/'+get.model[0]
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

            console.log(res);

            return res
        },

        getModels(brands) {
            
            return new Promise((resolve) => {

                let s = []
                brands.forEach( function(item) {
                    s.push(item.code)
                })
                
                if ( s.length ) {
                    let url = this.$store.state.apiUrl+'models/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken+'&brand='+s.join(',')
                    if (this.$store.state.city) url += '&city='+this.$store.state.city
                    for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
                    this.modelOptions = []
                    let p = this.filter.ranges.price
                    this.axios.get(url).then((response) => {
                        p.min = 1000000000
                        p.max = 0
                        let pi
                        response.data.forEach((item) => {
                            pi = {
                                name: item.name,
                                code: item.code,
                                brand: item.brand.code,
                                vehicles: 0
                            }
                            pi.vehicles += item.vehicles
                            this.modelOptions.push(pi)
                            if ( item.min < p.min ) p.min = item.min
                            if ( item.max > p.max ) p.max = item.max
                        })

                        if ( this.$route.params.model ) {
                            this.modelOptions.forEach( (i) => {
                                if ( i.code == this.$route.params.model ) this.modelValue.push(i)
                            })
                        } else if ( this.$route.query.model ) {
                            this.$route.query.model.split(',').forEach( (qi) => {
                                this.modelOptions.forEach( (i) => {
                                    if ( i.code == qi ) this.modelValue.push(i)
                                })
                            })
                        }
                        // this.setRanges()
                    })
                }
                resolve(true)
            })
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
    }
}
</script>


<style>
@import '../assets/css/multiselect.css';

.title {
    font-size: var(--h1);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 2rem;
	position: relative;
	user-select: none;
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
    width: 205px;
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
    padding: 14.5px 20px;
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
    
@media (max-width: 768px) {
    .filter__sort-item:nth-last-child(1) {
        gap: 0;
    }
}
</style>
