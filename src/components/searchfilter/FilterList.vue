<template>
    <div class="filter__list">
        <list-item 
            v-for="(item, indx) in items"
            :key="indx"
            v-if="item.vehicles"
            :itemName="item.name" 
            :itemCount="item.vehicles" 
            :itemLink="'/'+((item.brand)?item.brand+'/':'')+item.code+query" />
    </div>
</template>
<script>
import ListItem from '@/components/searchfilter/ListItem.vue'

export default {
    name: 'FilterList',
    components: {
        ListItem
    },
    props: ['list', 'query'],
    computed: {
        items: {
            get() {
                this.list.sort((a, b) => a.name > b.name ? 1 : -1);
                return this.list
            }
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
    gap: 20px;
    align-items: center;
    margin-bottom: 2rem;
}
</style>