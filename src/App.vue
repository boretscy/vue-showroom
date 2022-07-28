<template>
    <div id="app" :key="GlobalIter" :style="YAppsShowroomStyles">
        <router-view/>
        <forms />
    </div>
</template>

<script>
import Forms from '@/components/Forms.vue'

export default {
    name: 'App',
    components: {
        Forms
    },
    data() {
        return {
            GlobalIter: 0
        }
    },
    watch: {
        "$store.state.city": function() {
            let url = this.$store.state.apiUrl+'brands/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
            if (this.$store.state.city) url += '&city='+this.$store.state.city
            this.axios.get(url).then((response) => {
                this.$store.state.global.brands = response.data.dropLists.brands
                if ( response.data.in_city ) this.$store.state.inCity = response.data.in_city 
            })
        },

        '$route.params': function(v) {
            
            if ( typeof v.brand == 'undefined' && this.$store.state.brand )  console.log(this.$store.state.brand) // this.$router.push( '/'+this.$store.state.brand )
        }
    },
    computed: {
        YAppsShowroomStyles: function() {
            let res = {
                '--yalightgray': '#f3f5f6',
                '--yagray': '#bdc0c2',
                '--yamiddlegray': '#7b8284',
                '--yadarkgray': '#565b5d',
                '--yablackgray': '#1c232c',
                '--yalightblack': '#5C5D5E',
                '--detail_bg': '#F3F5F6',
                
                '--yablack': '#000000',
                '--yawhite': '#ffffff',

                '--yalightred': '#ee9999',
                '--yared': '#cc0000',

                '--yalightgreen': '#99eea0',
                '--yargreen': '#1bcc00',
                
                '--yalightblue': '#87cefa',
                '--yablue': '#0048a9',
                '--yadarkblue': '#003375',
                
                '--yalightyellow': '#fce0b2',
                '--yayellow': '#fdba4d',
                '--yadarkyellow': '#fdaa25',

                'font-family': "'Roboto', Helvetica, sans-serif",
                'font-size': '14px',

                '--h1': '32px',
                '--h2': '28px',
                '--h3': '24px',
                '--h4': '20px',
                '--p': '14px'
            }

            if ( window.YAppsShowroomStyles ) res = window.YAppsShowroomStyles
            return res
        }
    },
    mounted: function() {

        if (this.$store.state.brand) this.$router.push( '/'+this.$store.state.brand )

        this.$store.state.viewMode = this.$cookies.get('CIS_VIEW_MODE') || 'grid'
        this.$cookies.set('CIS_DETAIL_PAGE', 0)

        let url = this.$store.state.apiUrl+'brands/'+this.$store.state.mode+'/?token='+this.$store.state.apiToken
        if (this.$store.state.city) url += '&city='+this.$store.state.city
		this.axios.get(url).then((response) => {
			this.$store.state.global.brands = response.data.dropLists.brands
            if ( response.data.in_city ) this.$store.state.inCity = response.data.in_city 
		})

        setInterval(() => {
            
            if ( localStorage.getItem('YAPP_SELECTED_CITY') != this.$store.state.city ) {
                this.$store.state.city = localStorage.getItem('YAPP_SELECTED_CITY')

            }
            
        }, 500);
    },
    methods: {
    }
}
</script>


<style scoped>
@import '/assets/fonts/font.css';
</style>
