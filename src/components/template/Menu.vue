<template>
    <div class="menu">
        <div class="menu-searches">
            <div class="search-group">
                <input placeholder="Pesquisar..." class="search-input" type="text" ref="searchInput" :value="search" />
                <button @click="searchNews()" class="search-button">Ok</button>
            </div>
            <span>Pesquisas Salvas</span>
            <ul>
                <li @click="changeSection('globo', 'Globo', 1)">Tecnlogia</li>
                <li @click="changeSection('abc-news', 'ABC News', 2)">Gastronomia</li>
                <li @click="changeSection('bbc-sport', 'BBC Sport', 3)">Economia</li>
            </ul>
        </div>
        <div class="menu-categories">
            <span>Categorias</span>
            <ul>
                <li @click="changeSection('globo', 'Globo', 1)">Seção 1</li>
                <li @click="changeSection('abc-news', 'ABC News', 2)">Seção 2</li>
                <li @click="changeSection('bbc-sport', 'BBC Sport', 3)">Seção 3</li>
                <li @click="changeSection('axios', 'Axios', 4)">Seção 4</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data: function(){
        return {
            search: null
        }
    },
    methods: {
        changeSection(id, title, number){
            this.$router.push({
                name: 'newsBySection',
                params: {id, title, number}
            })
        },
        searchNews(){
            this.search = this.$refs.searchInput.value
            this.$router.push({
                name: 'newsBySearch',
                params: {search: this.search}
            })
            this.search = null
        }
    }
}
</script>

<style>
    .menu{
        background-color: #fff;
        grid-area: menu;

        background-color: #FFF;
        padding: 20px 0;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .menu-searches, .menu-categories{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .search-group{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0 20px 20px 20px;
    }

    .search-group input{
        width: 75%;
        font-size: 1rem;
        padding: 10px 0 10px 10px;
        border: 2px solid #4CA1AF;
        border-right: none;
        border-radius: 8px 0 0 8px;
        color: #4CA1AF;
    }

    .search-group button{
        width: 25%;
        padding: 10px 0;
        font-size: 1rem;
        margin: 0;
        border: 2px solid #4CA1AF;
        background: #C4E0E5;
        color: #4CA1AF;
        font-weight: bold;
        transition: filter 0.1s linear;
        cursor: pointer;
    }

    .search-group input:focus, .search-group button:focus{
        outline: none;
    }

    .search-group button:hover{
        filter: brightness(1.1);
    }

    .menu span{
        font-size: 1.3rem;
        color: #4CA1AF;
        font-weight: bold;
    }

    .menu ul{
        list-style: none;
        padding: 0;
    }

    .menu li{
        padding: 15px;
        transition: all 0.2s linear;
    }

    .menu li:hover{
        background-color: #C4E0E5;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        color: #4CA1AF;
    }

    @media(max-width: 980px){
        .menu-categories span{
            visibility: hidden;
            position: absolute;
        }
        .menu, .menu-categories{
            display: flex;
            justify-content: center;
            align-items: center;
        }
		.menu-categories ul{
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            list-style: none;
        }
        .menu-categories li:not(:last-child){
            padding-right: 40px;
        }
	}
</style>