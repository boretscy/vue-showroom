<template>
    <div class="filter">
        <div class="title">
            <router-link to="/">{{ Format(totalCount) }} авто</router-link>
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
            <div class="filter__head-item">
                <multiselect 
                    v-model="brandValue" 
                    tag-placeholder="Марка" 
                    placeholder="Марка" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.brands" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
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
                    @range="setRangeValue"/>
            </div>
            <div class="filter__head-item" v-show="viewFull">
                <multiselect 
                    v-model="transmitionsValue" 
                    tag-placeholder="КПП" 
                    placeholder="КПП" 
                    label="name" 
                    track-by="code" 
                    :options="filter.dropLists.transmitions" 
                    :multiple="true" 
                    :searchable="false"
                    :close-on-select="false" 
                    :clear-on-select="false"
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
                    @range="setRangeValue"/>
            </div>
            <div class="filter__head-item filter__head-item__range" v-show="viewFull">
                <multi-range
                    range="power"
                    desc-val="л.с."
                    name-range="Мощность"
                    ref="powerRange"
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
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
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
                <button-cancel @cancel="initFilter"/>
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
        </div>
        <div class="filter__head" v-else>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
            <div class="filter__head-item__empty"></div>
        </div>
        <div class="filter__list" v-if="filter">
            <list-item 
                v-for="(brand, indx) in filter.dropLists.brands"
                :key="indx"
                :itemName="brand.name" 
                :itemCount="brand.vehicles" 
                :itemLink="brand.code"/>
        </div>
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
import ListItem from '@/components/searchfilter/ListItem.vue'

import Multiselect from 'vue-multiselect'

export default {
    name: 'SearchFilter',
    props: ['listName'],
    components: {
        MultiRange,
        ButtonApply,
        ButtonCancel,
        ListItem,
        Multiselect
    },
    data() {
        return {
            totalCount: 0,

            filter: null,
            viewFull: false,
            blockFilter: false,

            modeValue: [],
            brandValue: [],

            modelValue: [],
            modelOptions: [],

            transmitionsValue: [],
            engineValue: [],
            dealershipValue: [],
            colorValue: [],
            bodyValue: [],
            driveValue: [],
            sortValue: [],

            link: '',

            sortbuttons: {
                discount: false,
                instock: false,
                inpath: false
            }
        }
    },
    watch: {
        modeValue: function(newValue) {
            window.location.href = newValue.code;
        },
        brandValue: function(newValue, oldValue) {
            if (newValue.length) {
                
                this.getModels(newValue)

                this.blockFilter = true
                this.transmitionsValue = []
                this.engineValue = []
                this.dealershipValue = []
                this.colorValue = []
                this.driveValue = []
                this.bodyValue = []
                this.blockFilter = false

                this.link = this.buildLink(this.buildQuery())
                this.getFilter(this.buildQuery())
                
            }
            if (!newValue.length && oldValue.length) {
                this.blockFilter = true
                this.initFilter()
                this.blockFilter = false
            }
            

        },
        modelValue: function() {
            this.link = this.buildLink(this.buildQuery())
            this.blockFilter = true
            this.getFilter(this.buildQuery())
            this.blockFilter = false
        },
        transmitionsValue: function() {
            this.link = this.buildLink(this.buildQuery())
            if (!this.blockFilter) this.getFilter(this.buildQuery())
        },
        engineValue: function() {
            this.link = this.buildLink(this.buildQuery())
            if (!this.blockFilter) this.getFilter(this.buildQuery())
        },
        dealershipValue: function() {
            this.link = this.buildLink(this.buildQuery())
            if (!this.blockFilter) this.getFilter(this.buildQuery())
        },
        colorValue: function() {
            this.link = this.buildLink(this.buildQuery())
            if (!this.blockFilter) this.getFilter(this.buildQuery())
        },
        bodyValue: function() {
            this.link = this.buildLink(this.buildQuery())
            if (!this.blockFilter) this.getFilter(this.buildQuery())
        },
        driveValue: function() {
            this.link = this.buildLink(this.buildQuery())
            if (!this.blockFilter) this.getFilter(this.buildQuery())
        },
    },
    mounted: function() {
        this.blockFilter = true
        this.initFilter().then(() => {
            this.getStartDropsValues()
        })
        this.blockFilter = false
    },
    methods: {
        initFilter() {
            return new Promise((resolve) => {
                let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
                for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]
                this.axios.get(url).then((response) => {
                    this.filter = response.data
                    // console.log(this.filter)
                    this.totalCount = response.data.totalCount
                    this.link = this.buildLink(this.buildQuery())
                    resolve(true)
                })
            })
        },

        getFilter(link) {
            let url = this.$store.state.apiUrl+'filter/'+this.$store.state.mode+'/'+link+'&token='+this.$store.state.apiToken
            this.axios.get(url).then((response) => {
                this.filter = response.data
                this.setRangesValues()
            }).then(() => {
            })
        },
        getStartDropsValues() {
            if ( this.$route.query.brand ) {
                this.$route.query.brand.split(',').forEach( (qi) => {
                    this.filter.dropLists.brands.forEach( (i) => {
                        if ( i.code == qi ) this.brandValue.push(i)
                    })
                })
            } 
            else if ( this.$route.params.brand ) {
                this.filter.dropLists.brands.forEach( (i) => {
                    if ( i.code == this.$route.params.brand ) this.brandValue.push(i)
                })
            }
            if ( this.$route.query.transmition ) {
                this.$route.query.transmition.split(',').forEach( (qi) => {
                    this.filter.dropLists.transmitions.forEach( (i) => {
                        if ( i.code == qi ) this.transmitionValue.push(i)
                    })
                })
            }
            if ( this.$route.query.engine ) {
                this.$route.query.engine.split(',').forEach( (qi) => {
                    this.filter.dropLists.engines.forEach( (i) => {
                        if ( i.code == qi ) {
                            this.engineValue.push(i)
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
        
        buildQuery() {
            let  s = [], l = '?'

            if ( this.brandValue.length ) {
                this.brandValue.forEach( function(i) { s.push(i.code) })
                l += 'brand='+s.join(',')
            }
            s = []
            if ( this.modelValue.length ) {
                this.modelValue.forEach( function(i) { s.push(i.code) })
                l += '&model='+s.join(',')
            }
            s = []
            if ( this.transmitionsValue.length ) {
                this.transmitionsValue.forEach( function(i) { s.push(i.code) })
                l += '&transmition='+s.join(',')
            }
            s = []
            if ( this.engineValue.length ) {
                this.engineValue.forEach( function(i) { s.push(i.code) })
                l += '&engine='+s.join(',')
            }
            s = []
            if ( this.colorValue.length ) {
                this.colorValue.forEach( function(i) { s.push(i.code) })
                l += '&color='+s.join(',')
            }
            s = []
            if ( this.bodyValue.length ) {
                this.bodyValue.forEach( function(i) { s.push(i.code) })
                l += '&body='+s.join(',')
            }
            s = []
            if ( this.driveValue.length ) {
                this.driveValue.forEach( function(i) { s.push(i.code) })
                l += '&drive='+s.join(',')
            }
            s = []
            if ( this.dealershipValue.length ) {
                this.dealershipValue.forEach( function(i) { s.push(i.code) })
                l += '&dealership='+s.join(',')
            }

            l += '&minprice='+this.filter.ranges.price.value[0]
            l += '&maxprice='+this.filter.ranges.price.value[1]

            l += '&minvolume='+this.filter.ranges.volume.value[0]
            l += '&maxvolume='+this.filter.ranges.volume.value[1]

            l += '&minpower='+this.filter.ranges.power.value[0]
            l += '&maxpower='+this.filter.ranges.power.value[1]

            l += '&minyear='+this.filter.ranges.year.value[0]
            l += '&maxyear='+this.filter.ranges.year.value[1]

            return l
        },
        buildLink( query ) {
            let str = query || ''
            let l = '/', q = ''
            if ( str.length ) {
                let get = {}
                str.split('?')[1].split('&').forEach( (param) => {
                    if ( param !== '' ) get[param.split('=')[0]] = param.split('=')[1].split(',')
                })

                // path
                if (typeof get.brand == 'object' && get.brand.length == 1) l += get.brand[0]
                if (typeof get.model == 'object' && get.model.length == 1) l += '/'+get.model[0]

                // query
                for (let key in get) {
                    if (key=='brand' || key=='model') {
                        if (get[key].length > 1) q += key+'='+get[key].join(',')+'&'
                    } else {
                        if (get[key].length && Boolean(get[key][0])) q += key+'='+get[key].join(',')+'&'
                    }
                }
            }

            return l+((q.length)?'?':'')+q.slice(0, -1)
        },

        getModels(newValue) {
            
            let s = []
            newValue.forEach( function(item) {
                s.push(item.code)
            })
            
            if ( s.length ) {
                let url = this.$store.state.apiUrl+'models/'+'?token='+this.$store.state.apiToken+'&brand='+s.join(',')
                this.modelOptions = []
                let m = this.modelOptions, p = this.filter.ranges.price
                this.axios.get(url).then((response) => {
                    p.min = 1000000000
                    p.max = 0
                    response.data.forEach((item) => {
                        m.push({
                            name: item.name,
                            code: item.alias
                        })
                        if ( item.min < p.min ) p.min = item.min
                        if ( item.max > p.max ) p.max = item.max
                    })

                    if ( this.$route.query.model ) {
                        let r = []
                        this.$route.query.model.split(',').forEach( (qi) => {
                            this.modelOptions.forEach( (i) => {
                                if ( i.code == qi ) r.push(i)
                            })
                        })
                        this.modelValue = r
                    }
                    // this.setRanges()
                })
            }
        },


        toggleViewMode() {
            let s =  (this.$store.state.viewMode=='grid') ? 'list' : 'grid'
            this.$store.state.viewMode = s
            this.$cookies.set('CIS_VIEW_MODE', s)
        },
        setRangeValue(v) {
            this.filter.ranges[v.range].value = v.value
            this.link = this.buildLink(this.buildQuery())
            this.getFilter(this.buildQuery())

        },
        setRangesValues() {
            for (let r in this.filter.ranges) {
                this.filter.ranges[r].value = [this.filter.ranges[r].min, this.filter.ranges[r].max]
            }
        },

        toggleFilter() {
            this.viewFull = !this.viewFull
        },


        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
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
.filter__list-item__empty {
    display: grid;
    grid-template-columns: 1fr 50px;
    width: 100%;
    align-items: center;
    text-decoration: none;
    height: 30px;
    border-radius: 3px;
    background-color: var(--yalightgray);
}

.filter__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 20px;
    align-items: center;
    margin-bottom: 2rem;
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
    height: 42px;
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
</style>
