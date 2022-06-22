<template>
    <div class="filter">
        <div class="filter__sort">
            <div class="filter__sort-item">
                <multiselect 
                    v-model="sortValue" 
                    tag-placeholder="Сортировка" 
                    placeholder="Сортировка" 
                    label="name" 
                    track-by="code" 
                    :options="sortList" 
                    :multiple="false" 
                    :searchable="false"
                    selectLabel="Выбрать"
                    selectedLabel="Выбрано"
                    deselectLabel="Удалить"
                    >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                    </multiselect>
            </div>
            <div class="filter__sort-item">
                <div class="filter__sort-item_box">
                    <button class="filter__sort-item__button" :class="{'active': Mode == 'all'}" @click="$router.push(allLink)">
                        <span>Все</span>
                    </button>
                    <button class="filter__sort-item__button" :class="{'active': Mode == 'discount'}" @click="$router.push(discountLink)" v-if="Discount">
                        <span>Со скидкой</span>
                    </button>
                    <button :to="instockLink"  class="filter__sort-item__button" :class="{'active': Mode == 'instock'}" @click="$router.push(instockLink)" v-if="InStock">
                        <span>В наличии</span>
                    </button>
                    <button :to="onwayLink" class="filter__sort-item__button" :class="{'active': Mode == 'onway'}" @click="$router.push(onwayLink)" v-if="OnWay">
                        <span>В пути</span>
                    </button>
                </div>
                <div class="filter__sort-item__switch">
                    <div class="filter__sort-item__switch-radio">
                        <label>
                            <input type="radio" name="radio_grid" value="grid" :checked="($store.state.viewMode == 'grid') ? true : false">
                            <span @click="toggleViewMode">
                                <icon-base icon-name="viewplates"><icon-viewplates /></icon-base>
                            </span>
                        </label>
                    </div>
                    <div class="filter__sort-item__switch-radio">
                        <label>
                            <input type="radio" name="radio_grid" value="line" :checked="($store.state.viewMode == 'list') ? true : false">
                            <span @click="toggleViewMode">
                                <icon-base icon-name="viewlines"><icon-viewlines /></icon-base>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import IconBase from '@/components/IconBase.vue'
import IconViewplates from '@/components/icons/IconViewplates.vue'
import IconViewlines from '@/components/icons/IconViewlines.vue'
import Multiselect from 'vue-multiselect'

export default {
    name: 'Sort',
    components: {
        IconBase, IconViewplates, IconViewlines,
        Multiselect
    },
    props: {Discount: Boolean, InStock: Boolean, OnWay: Boolean, Mode: String},
    data() {
        return {
            SortButtons: {
                Discount: false,
                InStock: false,
                OnWay: false

            },
            sortValue: [
                {
                    code: 'name',
                    name: 'По названию'
                }
            ],
            sortList: [
                {
                    code: 'price_up',
                    name: 'По возрастанию цены'
                },
                {
                    code: 'price_down',
                    name: 'По убыванию цены'
                },
                {
                    code: 'name',
                    name: 'По названию'
                },
            ]
        }
    },
    computed: {
        allLink: function() {
            return this.buildLink('all')
        },
        discountLink: function() {
            return this.buildLink('discount')
        },
        instockLink: function() {
            return this.buildLink('instock')
        },
        onwayLink: function() {
            return this.buildLink('onway')
        },
    },
    watch: {
        sortValue: function(newValue) {
            this.$emit('sort', newValue.code)
        }
    },
    methods: {
        toggleViewMode() {
            let s =  (this.$store.state.viewMode=='grid') ? 'list' : 'grid'
            this.$store.state.viewMode = s
            this.$cookies.set('CIS_VIEW_MODE', s)
        },
        sort(v) {
            this.SortButtons = {
                Discount: false,
                InStock: false,
                OnWay: false

            }
            this.SortButtons[v] = true
            this.$emit('sort', v)
        },
        buildLink( but ) {
            let l = '/'
            if (this.$route.params.brand) l += this.$route.params.brand
            if (this.$route.params.model) l += '/'+this.$route.params.model
            l += '?'
            if (this.$route.query) {
                for ( let key in this.$route.query ) {
                    if (key != 'sort') l += key+'='+this.$route.query[key]+'&'
                }
            } 
            if ( but != 'all' ) l += 'sort='+but
            
            return l
        }
    }
}
</script>
<style scoped>

</style>