<template>
    <div class="form-field">
        <button @click="$emit('send')">{{ button }}</button>
    </div>
</template>

<script>
export default {
    name: 'ButtonField',
    props: ['button'],
}
</script>

<style scoped>
.form-field {
    margin-bottom: 15px;
}
button {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: var(--yadarkblue);
    color: var(--yawhite);
    border: none;
    transition: .2s;
}
button:hover {
    transition: .2s;
    background-color: var(--yayellow);
    color: var(--yablack);
}
</style>