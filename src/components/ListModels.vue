<template>
    <div>
        <div class="flex__head">
            <router-link :to="brand.code" class="flex__head-title h3" v-if="brand">
                {{ brand.name }}
                <span class="flex__head-count">{{ brand.vehicles }}</span>
            </router-link>
        </div>

        <div 
            class="available__grid" 
            v-if="models && viewMode=='grid'">
            <div 
                v-for="model in models"
                :key="model.id">
                <cta-grid 
                    :cta="model"
                    v-if="model.name == 'random_cta'"/>
                <model-grid 
                    :picture="model.image || null"
                    :brand="$route.params.brand"
                    :model="model"
                    :link="buildLink(model.code)"
                    v-else/>
            </div>
            
        </div>
        <div 
            class="available__grid" 
            :class="{'available__line': viewMode == 'list'}"
            v-if="viewMode=='list'">
            <model-line 
                v-for="model in models"
                :key="model.id"
                :model="model"
                :picture="model.image || null"
                :brand="$route.params.brand"
                :link="buildLink(model.code)"
                />
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
    props: ['viewMode'],
    data() {
        return {
            brand: null,
            models: null,
            count: 0,
            random_cta: null
        }
    },
    computed: {
    },
    watch: {

        '$route.params.brand': {
            immediate: true,
            handler(value) {
                let url = this.$store.state.apiUrl+'models/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
                url += '&brand='+value
                if (this.$store.state.city) url += '&city='+this.$store.state.city
                if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
                for (let k in this.$route.query) if (k!=='brand') url += '&'+k+'='+this.$route.query[k]
                if (this.$store.state.brand) url += '&brand='+this.$store.state.brand

                this.axios.get(url).then((response) => {
                    this.models = response.data
                    this.models.forEach( (item) => {
                        if (item.Discount) this.$parent.sortButtons.Discount = true
                        if (item.InStock) this.$parent.sortButtons.InStock = true
                        if (item.OnWay) this.$parent.sortButtons.OnWay = true
                    })
                    this.models.sort((a, b) => a.name > b.name ? 1 : -1);
                    this.random_cta = this.$store.state.global.cta[this.randomInteger(0, 3)]
                    this.models.splice(this.randomInteger(2, this.models.length), 0, this.random_cta)
                })
                url = this.$store.state.apiUrl+'brand/'+this.$store.state.mode+'/'+value+'/?token='+this.$store.state.apiToken
                for (let k in this.$route.query) if (k!=='brand') url += '&'+k+'='+this.$route.query[k]
                if (this.$store.state.city) url += '&city='+this.$store.state.city
                if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
                if (this.$store.state.brand) url += '&brand='+this.$store.state.brand
                this.axios.get(url).then((response) => {
                    this.brand = response.data
                    if ( !this.brand ) this.$router.push('/404') 
                })
            }
        },

        '$parent.sortMode': function(newValue) {
            switch(newValue) {
                case 'name':
                    this.models.sort((a, b) => a.name > b.name ? 1 : -1)
                    break;
                case 'price_up':
                    this.models.sort((a, b) => a.min_price > b.min_price ? 1 : -1)
                    break;
                case 'price_down':
                    this.models.sort((a, b) => a.min_price < b.min_price ? 1 : -1)
                    break;
            }
        },

        '$store.state.city': function() {
            let url = this.$store.state.apiUrl+'models/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
            url += '&brand='+this.$route.params.brand
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
            for (let k in this.$route.query) if (k!=='brand') url += '&'+k+'='+this.$route.query[k]
            if (this.$store.state.brand) url += '&brand='+this.$store.state.brand

            this.axios.get(url).then((response) => {
                this.models = response.data
                this.models.forEach( (item) => {
                    this.count += item.statistics[1].counter + item.statistics[2].counter
                    if (item.Discount) this.$parent.sortButtons.Discount = true
                    if (item.InStock) this.$parent.sortButtons.InStock = true
                    if (item.OnWay) this.$parent.sortButtons.OnWay = true
                })
                this.models.sort((a, b) => a.name > b.name ? 1 : -1);
                this.random_cta = this.$store.state.global.cta[this.randomInteger(0, 3)]
                this.models.splice(this.randomInteger(2, this.models.length), 0, this.random_cta)
            })
            url = this.$store.state.apiUrl+'brand/'+this.$store.state.mode+'/'+this.$route.params.brand+'/?token='+this.$store.state.apiToken
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            if (this.$store.state.dealership) url += '&dealership='+this.$store.state.dealership
            if (this.$store.state.brand) url += '&brand='+this.$store.state.brand
            this.axios.get(url).then((response) => {
                this.brand = response.data
                if ( !this.brand ) this.$router.push('/404') 
            })
        }
    },
    mounted: function() {
        this.$store.state.global.selectedVehicle = null
        this.$store.state.global.selectedVehicleName = ''
    },
    methods: {
        buildLink(model) {
            let l = '/'+this.$route.params.brand+'/'+model, q = ''
            for (let key in this.$route.query) {
                

                if (key!='brand' && key!='model') {
                    if (this.$route.query[key].length && Boolean(this.$route.query[key][0])) {
                        q += key+'='+this.$route.query[key]+'&'
                    }
                
                }
            }
            return l+((q.length)?'?':'')+q.slice(0, -1)
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