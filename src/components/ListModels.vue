<template>
    <div>
        <div class="flex__head">
            <router-link :to="dataLink" class="flex__head-title h2" v-if="models">
                {{ dataName }}
                <span class="flex__head-count">{{ dataCount }}</span>
            </router-link>
        </div>

        <div class="available__grid" v-if="models && viewMode=='grid'">
            <model-grid 
                v-for="model in models"
                :key="model.id"
                :discount="model.has_discounts"
                :price="Number(model.min_price)"
                :colors="model.colors"
                :cis="model.statistics['1'].counter + model.statistics['2'].counter"
                :name="model.name"
                :picture="model.image"
                :brand="dataLink"
                :alias="model.alias"/>
            <cta-grid 
                title="Рассчитайте ежемесячный платеж"
                link="#"
                button="Получить одобрение"
                icon="credit"/>
        </div>
        <div 
            class="available__grid" 
            :class="{'available__line': viewMode == 'list'}"
            v-if="models && viewMode=='list'">
            <model-line 
                v-for="model in models"
                :key="model.id"
                :discount="model.has_discounts"
                :price="Number(model.min_price)"
                :colors="model.colors"
                :cis="model.statistics['1'].counter + model.statistics['1'].counter"
                :name="model.name"
                :picture="model.image"
                :brand="dataLink"
                :alias="model.alias"/>
            <!-- <cta-line 
                title="Рассчитайте ежемесячный платеж"
                link="#"
                button="Получить одобрение"
                icon="credit"/> -->
        </div>
    </div>
</template>

<script>
import ModelGrid from '@/components/brands/ModelGrid.vue'
import ModelLine from '@/components/brands/ModelLine.vue'
import CtaGrid from '@/components/cta/CtaGrid.vue'
// import CtaLine from './brands/CtaLine.vue'

export default {
    name: 'ListModels',
    components: {
        ModelGrid, ModelLine,
        CtaGrid, 
        // CtaLine
    },
    props: ['dataName', 'dataCount', 'dataLink', 'viewMode'],
    data() {
        return {
            models: null
        }
    },
    mounted: function() {


         console.log(this.dataLink)
            let url = this.$store.state.apiUrl+'models/'+'?token='+this.$store.state.apiToken
            url += '&brand='+this.dataLink
            for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]

            this.axios.get(url).then((response) => {
                
                this.models = response.data
            })
        
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
.available__line {
    display: block;
}
</style>