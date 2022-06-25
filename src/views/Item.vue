<template>
    <div class="yapps-cis">
        <detail-item
            :vehicle="vehicle"
			v-if="vehicle"
            />
	</div>
</template>

<script>
import DetailItem from '@/components/DetailItem.vue'

export default {
	name: 'Item',
	components: {
        DetailItem
	},
	data() {
		return {
			vehicle: null
		}
	},
	computed: {
		viewMode: function() {
			return this.$store.state.viewMode
		}
	},
	mounted: function() {
		let url = this.$store.state.apiUrl+'item/'+this.$store.state.mode+'/'+this.$route.params.item+'?token='+this.$store.state.apiToken
        for (let k in this.$route.query) url += '&'+k+'='+this.$route.query[k]

        this.axios.get(url).then((response) => {
			this.vehicle = response.data
        })
	},
}
</script>

