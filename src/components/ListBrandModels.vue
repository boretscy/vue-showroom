<template>
    <div>
        <div class="flex__head">
            <router-link :to="brand.code" class="flex__head-title h3">
                {{ brand.name }}
                <span class="flex__head-count">{{ brand.vehicles }}</span>
            </router-link>
        </div>

        <div 
            class="available__grid" 
            v-if="viewMode == 'grid'">
            <div 
                v-for="model in brand._models"
                :key="model.id">
                <cta-grid 
                    :cta="model"
                    v-if="model.name == 'random_cta'"/>
                <model-grid 
                    :model="model"
                    :picture="model.image || null"
                    :brand="brand.code"
                    :link="buildLink(model.code)"
                    v-else/>
            </div>
            
        </div>
        <div 
            class="available__grid" 
            :class="{'available__line': viewMode == 'list'}"
            v-if="viewMode == 'list'">
            <model-line 
                v-for="model in brand._models"
                :key="model.id"
                :model="model"
                :picture="model.image || null"
                :brand="brand.code"
                :link="buildLink(model.code)"
                />
        </div>
    </div>
</template>

<script>
// import IconBase from '@/components/IconBase.vue'
// import IconCorner from '@/components/icons/IconCorner.vue'
import ModelGrid from '@/components/brands/ModelGrid.vue'
import ModelLine from '@/components/brands/ModelLine.vue'
import CtaGrid from '@/components/cta/CtaGrid.vue'
// import CtaLine from './brands/CtaLine.vue'

export default {
    name: 'ListBrandModels',
    components: {
        // IconBase, IconCorner,
        ModelGrid, ModelLine,
        CtaGrid, 
        // CtaLine
    },
    props: ['dataName', 'dataLink', 'viewMode', 'dataSort', 'brand'],
    data() {
        return {
            models: [],
            count: 0,
            sortMode: this.$parent.sortMode,
            random_cta : null
        }
    },

    
    watch: {
        // '$route.query': {
        //     immediate: true,
        //     handler() {
        //         let url = this.$store.state.apiUrl+'models/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
        //         url += '&brand='+this.dataLink
        //         for (let k in this.$route.query) if (k!=='brand') url += '&'+k+'='+this.$route.query[k]
        //         // console.log(url)

        //         this.axios.get(url).then((response) => {

        //             this.count = 0
        //             this.models = []
                    
        //             this.models = response.data
        //             // console.log(this.models)
        //             this.models.forEach( (item) => {
        //                 this.count += item.statistics[1].counter + item.statistics[2].counter
        //                 if (item.Discount) this.$parent.sortButtons.Discount = true
        //                 if (item.InStock) this.$parent.sortButtons.InStock = true
        //                 if (item.OnWay) this.$parent.sortButtons.OnWay = true
        //             })
        //             this.models.sort((a, b) => a.name > b.name ? 1 : -1)
        //         })
        //     }
        // },
        '$parent.sortMode': function(newValue) {
            // console.log( this.brand._models )
            switch(newValue) {
                case 'name':
                    this.brand._models.sort((a, b) => a.name > b.name ? 1 : -1)
                    break;
                case 'price_up':
                    this.brand._models.sort((a, b) => a.min_price > b.min_price ? 1 : -1)
                    break;
                case 'price_down':
                    this.brand._models.sort((a, b) => a.min_price < b.min_price ? 1 : -1)
                    break;
            }
        }
    },
    mounted: function() {

        this.brand._models.forEach( (item) => {
            if (item.Discount) this.$parent.sortButtons.Discount = true
            if (item.InStock) this.$parent.sortButtons.InStock = true
            if (item.OnWay) this.$parent.sortButtons.OnWay = true
        })

        this.random_cta = this.$store.state.global.cta[this.randomInteger(0, 3)]
        this.brand._models.splice(this.randomInteger(2, this.brand._models.length), 0, this.random_cta)


        this.$store.state.global.selectedVehicle = null
        this.$store.state.global.selectedVehicleName = ''
    },
    methods: {
        buildLink(model) {
            let l = '/'+this.dataLink+'/'+model, q = ''
            for (let key in this.$route.query) {
                

                if (key!='brand' && key!='model') {
                    if (this.$route.query[key] && Boolean(this.$route.query[key][0])) {
                        q += key+'='+this.$route.query[key]+'&'
                    }
                
                }
            }
            return l+((q.length)?'?':'')+q.slice(0, -1)
        },
        sort(v) {
            this.$emit('sort', v)
        },
        randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
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
h3, .h3 {
    font-size: var(--h3);
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
    width: 30px;
    height: 30px;
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
@media (max-width: 320px) {
    .available__grid {
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    }
}
</style>