<template>
    <div>
        <modal 
            :name="'form-'+form.name" 
            :adaptive="true"
            :height="'auto'"
            v-for="(form, indx1) in $store.state.global.forms"
            :key="indx1">
            <div class="form">
                <div class="form-container">
                    <close-field :modal="'form-'+form.name" />
                    <h4>{{form.title}} <span v-if="form.use_vehicle && $store.state.global.selectedVehicle">на {{ $store.state.global.selectedVehicleName }}</span></h4>
                    <p>{{form.description}}</p>
                    <success-field v-if="form.statuses.sended && form.statuses.success" />
                    <error-field v-if="form.statuses.sended && !form.statuses.success" />
                    <input-field 
                        v-for="(field, indx2) in form.fields"
                        :key="indx2"
                        :label="field.label"
                        :placeholder="field.placeholder"
                        :required="field.required"
                        :error="field.error"
                        :type="field.type"
                        :form="indx1"
                        :field="indx2"
                        @setval="setValue(indx1, indx2)"/>
                    <button-field :button="form.button" @send="send(indx1)" />
                    <rules-field :check="form.rulesCheck" @check="toggleCheck(indx1)" />
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import InputField from '@/components/base/InputField.vue'
import CloseField from '@/components/base/CloseField.vue'
import ButtonField from '@/components/base/ButtonField.vue'
import RulesField from '@/components/base/RulesField.vue'
import SuccessField from '@/components/base/SuccessField.vue'
import ErrorField from '@/components/base/ErrorField.vue'

export default {
    name: 'Forms',
    components: {
        InputField,
        CloseField,
        ButtonField,
        RulesField,
        SuccessField,
        ErrorField
    },
    mounted: function() {
    },
    methods: {
        toggleCheck( indx ) {
            this.$store.state.global.forms[indx].rulesCheck = !this.$store.state.global.forms[indx].rulesCheck
        },
        send( indx ) {
           
            let send = true
            if ( !this.$store.state.global.forms[indx].rulesCheck ) send = false 
            let sendData = []
            sendData.push({name: 'src', value: window.location.href})
            sendData.push({name: 'AppName', value: 'Cis'})
            sendData.push({name: 'form', value: this.$store.state.global.forms[indx].title})
            if ( this.$store.state.dealership ) sendData.push({name: 'dealership', value: this.$store.state.dealership})
            this.$store.state.global.forms[indx].fields.forEach((i) => {
                if (i.required && !i.value) {
                    i.error = true
                    send = false
                }
                sendData.push({name: i.name, value: i.value})
            })
            
            if (this.$store.state.global.selectedVehicle) sendData.push({name: 'vehicle', value: this.$store.state.global.selectedVehicle})

            if ( send ) {

                this.axios.post(
                    'https://apps.yug-avto.ru/API/get/cis/send/?token=34b5ac8b71018c0bc7e5c050ed90b243',
                    sendData,
                    {headers: this.$store.state.global.headers}
                )
                .then((response) => {
                    if (response.data.status) {
                        this.$store.state.global.forms[indx].statuses.sended = true
                        this.$store.state.global.forms[indx].statuses.success = true
                        setTimeout(() => {
                            this.$store.state.global.forms[indx].statuses.sended = false
                            this.$store.state.global.forms[indx].statuses.success = false
                            this.$store.state.global.forms[indx].fields.forEach( (i) => {
                                i.value = null
                            })
                        }, 5000);
                    }
                })
            }
            





            // let CallTouchURL = 'https://api.calltouch.ru/calls-service/RestAPI/requests/'+GoalData.CallTouch.CTSiteID+'/register/';
            // CallTouchURL += '?subject='+encodeURIComponent(GoalData.Name)+' '+encodeURIComponent(GoalData.Action);
            // CallTouchURL += '&sessionId='+window['call_value_'+GoalData.CallTouch.CTSession];
            // CallTouchURL += '&phoneNumber='+GoalData.CallTouch.Phone.replace(/[^\d;]/g, '');
            // if ( GoalData.CallTouch.Name ) CallTouchURL += '&fio='+encodeURIComponent(GoalData.CallTouch.Name);
            // CallTouchURL += '&requestUrl='+location.href;
                    
            // let request = new XMLHttpRequest();
            // request.open('GET', CallTouchURL, true);
            // request.send();
            
        }
    }
}
</script>

<style scoped>
.form {
    padding: 30px;
    position: relative;
}
.form::before {
    content: '';
    background-color: var(--yayellow);
    border-radius: 50%;
    width: 300px;
    height: 250px;
    position: absolute;
    bottom: -150px;
    left: -200px;
    transition: .2s;
    z-index: 0;
}
.form-container {
    z-index: 5;
    position: relative;
}
.form h4 {
    font-weight: bold;
    font-size: 24px;
}
.form p {
    margin-bottom: 30px;
}
</style>