<template>
    <div class="filter">
        <div class="filter__head">
            <div class="filter__head-item">
                <drop
                    block-style="block"
                    list-title="Выбрать автомобиль"
                    list-name="mode"
                    v-if="viewFull"/>
            </div>
            <div class="filter__head-item">
                <drop
                    block-style="block"
                    list-title="Марка"
                    list-name="brands"
                    v-if="viewFull"/>
            </div>
            <div class="filter__head-item">
                <drop
                    block-style="block"
                    list-title="Модель"
                    list-name="models"
                    v-if="viewFull"/>
            </div>
            <div class="filter__head-item">
                <multi-range/>
            </div>
        </div>
    </div>
</template>

<script>
// import IconBase from '@/components/IconBase.vue'
// import IconCorner from '@/components/icons/IconCorner.vue'

import Drop from '@/components/base/Drop.vue'
import MultiRange from '@/components/base/MultiRange.vue'

export default {
    name: 'SearchFilter',
    components: {
		// IconBase, IconCorner,
        Drop,
        MultiRange
    },
    data() {
        return {
            viewFull: true,
        }
    },
    mounted: function() {

    }
}
</script>


<style scoped>
.filter {
    margin-bottom: 4rem;
    user-select: none;
}
.filter__head {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 20px;
    align-items: center;
    margin-bottom: 2em;
}
.filter__head-item {
    border: 1px solid var(--yadarkblue);
    padding: 10px;
    border-radius: 3px;
    color: var(--yablack) !important;
}

</style>
