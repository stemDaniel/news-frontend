<template>
    <div class="header">
        <h1>Aplicação News API</h1>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
    .header{
        background: linear-gradient(to right, #4CA1AF, #C4E0E5);
        grid-area: header;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 5px 0 0 20px;
        color: #fff;
        border-left: 1px solid rgba(0, 0, 0, 0.7);
    }

	@media(max-width: 700px){
		.header h1{
			font-size: 2rem;
		}
	}
</style>