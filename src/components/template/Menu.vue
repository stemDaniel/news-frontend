<template>
    <div class="menu">
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
    methods: {
        changeSection(id, title, number){
            this.$router.push({
                name: 'newsBySection',
                params: {id, title, number}
            })
        }
    }
}
</script>

<style>
    .menu{
        background-color: #fff;
        grid-area: menu;

        background-color: #FFF;
        padding: 20px;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .menu-categories span{
        font-size: 1.5rem;
    }

    .menu-categories li{
        font-size: 1.2rem;
        transition: all 0.1s linear;
    }

    .menu-categories li:hover{
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
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