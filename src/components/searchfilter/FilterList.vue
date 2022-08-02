<template>
    <div class="filter__list">
        <list-item 
            v-for="(item, indx) in items"
            :key="indx"
            v-show="item.vehicles && ( (viewFull || (items.length > 15 && indx < 14)) || (viewFull || items.length <= 15))"
            :itemName="item.name" 
            :itemCount="item.vehicles" 
            :itemLink="'/'+((item.brand)?item.brand+'/':'')+item.code+query" />
        <div class="filter__list-item" @click="viewFull = !viewFull" v-if="items.length > 15">
            <div class="filter__list-item__name">
                {{ ( (viewFull) ? 'Скрыть' : 'Показать все' ) }}
                <icon-base icon-name="corner" :class="{'up': viewFull}"><icon-corner /></icon-base>
            </div>
        </div>
    </div>
</template>
<script>
import ListItem from '@/components/searchfilter/ListItem.vue'
import IconBase from '@/components/IconBase.vue'
import IconCorner from '@/components/icons/IconCorner.vue'


export default {
    name: 'FilterList',
    components: {
        ListItem,
        IconBase, IconCorner
    },
    props: ['list', 'query'],
    data() {
        return {
            viewFull: false
        }
    },
    computed: {
        items: {
            get() {
                if ( this.$store.state.mode == 'used' ) this.list.sort((a, b) => a.vehicles < b.vehicles ? 1 : -1);
                return this.list
            }
        },
        count: function() {
            let res = 18
            if ( this.items.length < res ) res = this.items.length
            return res
        }

    }
}
</script>
<style scoped>
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
    gap: 5px 20px;
    align-items: center;
    margin-bottom: 2rem;
}
.filter__list-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
}
.filter__list-item svg {
    width: 20px;
    height: 20px;
    fill: var(--yadarkblue);
}
.filter__list-item:hover .filter__list-item__name{
    color: var(--yadarkblue);
}
.filter__list-item__name {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: var(--yadarkblue);
    transition: 200ms;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
}
@media (max-width: 425px) {
    .filter__list {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}
</style>