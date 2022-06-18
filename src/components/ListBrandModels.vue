<template>
    <div>
        <div class="flex__head">
            <router-link :to="dataLink" class="flex__head-title h2">
                {{ dataName }}
                <span class="flex__head-count">{{ count }}</span>
            </router-link>
            <router-link :to="dataLink" class="flex__head-link">
                Все модели {{ dataName }}
                <icon-base icon-name="corner" iconRotate="right"><icon-corner /></icon-base>
            </router-link>
        </div>

        <div 
            class="available__grid" 
            v-if="viewMode == 'grid'">
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
                :link="buildLink(model.alias)"/>
            <cta-grid 
                title="Рассчитайте ежемесячный платеж"
                link="#"
                button="Получить одобрение"
                icon="credit"/>
        </div>
        <div 
            class="available__grid" 
            :class="{'available__line': viewMode == 'list'}"
            v-if="viewMode == 'list'">
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
import IconBase from '@/components/IconBase.vue'
import IconCorner from '@/components/icons/IconCorner.vue'
import ModelGrid from '@/components/brands/ModelGrid.vue'
import ModelLine from '@/components/brands/ModelLine.vue'
import CtaGrid from '@/components/cta/CtaGrid.vue'
// import CtaLine from './brands/CtaLine.vue'

export default {
    name: 'ListBrandModels',
    components: {
        IconBase, IconCorner,
        ModelGrid, ModelLine,
        CtaGrid, 
        // CtaLine
    },
    props: ['dataName', 'dataLink', 'viewMode'],
    data() {
        return {
            models: [],
            count: 0
        }
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                let url = this.$store.state.apiUrl+'models/'+'?token='+this.$store.state.apiToken
                url += '&brand='+this.dataLink
                for (let k in this.$route.query) if (k!=='brand') url += '&'+k+'='+this.$route.query[k]

                this.axios.get(url).then((response) => {
                    
                    if ( this.$route.query.model ) {
						let b = this.$route.query.model.split(',')
						response.data.forEach( (item) => {
							if ( b.includes(item.alias) ) {
                                this.models.push(item)
                                this.count += item.statistics[1].counter + item.statistics[2].counter
                            }
						})
					} else {
						this.models = response.data
                        this.models.forEach( (item) => {
                            this.count += item.statistics[1].counter + item.statistics[2].counter
                        })
					}
                    this.models.sort((a, b) => a.name > b.name ? 1 : -1);
                })
            }
        }
    },
    methods: {
        buildLink(model) {
            let l = '/'+this.dataLink+'/'+model, q = ''
            for (let key in this.$route.query) {
                

                if (key!='brand' && key!='model') {
                    if (this.$route.query[key].length && Boolean(this.$route.query[key][0])) {
                        q += key+'='+this.$route.query[key]+'&'
                    }
                
                }
            }
            return l+((q.length)?'?':'')+q.slice(0, -1)
        },
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