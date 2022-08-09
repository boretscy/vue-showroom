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
    margin-bottom: 80px;
    margin-top: 20px;
    padding: 15px;
    background-color: var(--yalightyellow);
    text-align: center;
    border-radius: 5px;
}
</style>