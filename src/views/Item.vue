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
	watch: {
		'$route.params': {
            immediate: true,
            handler(value) {
                let url = this.$store.state.apiUrl+'item/'+this.$store.state.mode+'/'+value.item+'?token='+this.$store.state.apiToken

				this.axios.get(url).then((response) => {
					this.vehicle = response.data
					this.$cookies.set('CIS_DEALERSHIP', response.data.dealership.id)
				})
            }
        },
	},
	mounted: function() {
	},
}
</script>

