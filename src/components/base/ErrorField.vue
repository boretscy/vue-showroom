<template>
    <div class="form-field">
        Ой, что-то пошло не так!<br />
        Повторите попытку позднее.
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
    padding: 15px;
    background-color: var(--yalightred);
    text-align: center;
}
</style>