<template>
	<div class="app">
		<Logo />
		<Header />
		<Content />
		<Menu />
	</div>
</template>

<script>
import Logo from './components/template/Logo'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Menu from './components/template/Menu'

export default {
	name: 'App',
	components: {
		Logo, Header, Content, Menu
	}
}
</script>

<style>
	* {
		font-family: "Roboto", sans-serif;
	}

	body {
		margin: 0;
	}

	.app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		
		height: 100vh;
		display: grid;
		grid-template-rows: 80px 1fr;
		grid-template-columns: 275px 1fr;
		grid-template-areas: 
			"logo header"
			"menu content"
		;
	}

	@media(max-width: 980px){
		.app{
			grid-template-rows: 80px 1fr;
			grid-template-columns: 275px 1fr;
			grid-template-areas: 
				"logo header"
				"content content"
			;
		}
	}

	@media(max-width: 700px){
		.app{
			grid-template-columns: 150px 1fr;
		}
	}
</style>