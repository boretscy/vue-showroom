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
                    <button class="filter__sort-item__button active" :class="{'active': !SortButtons.Discount && !SortButtons.InStock && !SortButtons.OnWay}"  @click="sort('name')">
                        <span>Все</span>
                    </button>
                    <button class="filter__sort-item__button" :class="{'active': SortButtons.Discount}"  @click="sort('Discount')" v-if="Discount">
                        <span>Со скидкой</span>
                    </button>
                    <button class="filter__sort-item__button" :class="{'active': SortButtons.InStock}" @click="sort('InStock')" v-if="InStock">
                        <span>В наличии</span>
                    </button>
                    <button class="filter__sort-item__button" :class="{'active': SortButtons.OnWay}" @click="sort('OnWay')" v-if="OnWay">
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
    props: {Discount: Boolean, InStock: Boolean, OnWay: Boolean},
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
    }
}
</script>
<style scoped>

</style>