<template>
    <div>
        <div class="flex__head">
            <router-link :to="dataLink" class="flex__head-title h2">
                {{ dataName }}
                <span class="flex__head-count">{{ dataCount }}</span>
            </router-link>
            <router-link :to="dataLink" class="flex__head-link">
                Все модели {{ dataName }}
                <icon-base icon-name="corner" iconRotate="right"><icon-corner /></icon-base>
            </router-link>
        </div>

        <div class="available__grid" v-if="viewMode == 'grid'">
            <model-grid 
                discount="Выгода"
                price="799000"
                colors="7"
                cis="148"
                name="Granta"
                picture="https://195004.selcdn.ru/ref/catalog/11197/7/original/4046bd3274.png"
                brand="LADA"/>
            <cta-grid 
                title="Рассчитайте ежемесячный платеж"
                link="#"
                button="Получить одобрение"
                icon="credit"/>
        </div>
        <div class="available__grid" v-if="viewMode == 'line'">
            <model-line 
                discount="Выгода"
                price="799000"
                colors="7"
                cis="148"
                name="Granta"
                picture="https://195004.selcdn.ru/ref/catalog/11197/7/original/4046bd3274.png"
                brand="LADA"/>
            <cta-line 
                title="Рассчитайте ежемесячный платеж"
                link="#"
                button="Получить одобрение"
                icon="credit"/>
        </div>
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue'
import IconCorner from '@/components/icons/IconCorner.vue'
import ModelGrid from '@/components/brands/ModelGrid.vue'
import ModelLine from '@/components/brands/ModelLine.vue'
import CtaGrid from './brands/CtaGrid.vue'
import CtaLine from './brands/CtaLine.vue'

export default {
    name: 'BrandsItem',
    components: {
        IconBase, IconCorner,
        ModelGrid, ModelLine,
        CtaGrid, CtaLine
    },
    props: ['dataName', 'dataCount', 'dataLink'],
    data() {
        return {
            viewMode: 'grid'
        }
    }
}
</script>

<style scoped>
h2, .h2 {
    font-size: var(--h2);
    font-weight: 400;
    line-height: 1em;
    margin-bottom: 1rem;
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
.available__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 4rem;
}
</style>