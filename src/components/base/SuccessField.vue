<template>
    <div class="form-field">
        Спасибо за вашу заявку!<br />
        Мы свяжемся с Вами в ближайшее время.
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
    background-color: var(--yalightgray);
    text-align: center;
}
</style>