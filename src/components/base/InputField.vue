<template>
    <div class="form-field">
        <p>{{ label }} <span v-if="required"><sup>*</sup></span></p>
        <input type="phone" :class="{'error': error && !$store.state.global.forms[form].fields[field].value}" v-model="$store.state.global.forms[form].fields[field].value" :placeholder="placeholder" v-mask="'+7 (###) ###-##-##'" v-if="type=='phone'" />
        <input :type="type" :class="{'error': error && !$store.state.global.forms[form].fields[field].value}" v-model="$store.state.global.forms[form].fields[field].value" :placeholder="placeholder" v-else />
    </div>
</template>

<script>
export default {
    name: 'InputName',
    props: ['label', 'required', 'placeholder', 'error', 'type', 'form', 'field']
}
</script>

<style scoped>
.form-field {
    margin-bottom: 15px;
}
.form-field p {
    margin: 0 0 5px 0;
}
.form-field p span {
    color: var(--yablue);
}
.form-field input {
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 5px;
    border: 1px solid var(--yagray);
    color: var(--yablack);
    width: 100%;
}
.form-field input.error {
    border-color: var(--yared);
}
</style>