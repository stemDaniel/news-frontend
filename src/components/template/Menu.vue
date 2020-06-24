<template>
    <div v-show="displayMenu" class="menu">
        <div class="menu-searches">
            <div class="search-group">
                <input placeholder="Pesquisar..." class="search-input" type="text" ref="searchInput" :value="search" />
                <button @click="searchNews()" class="search-button">Ok</button>
            </div>
            <span v-if="searchesList.length > 0">Pesquisas Salvas</span>
            <ul v-if="searchesList.length > 0">
                <li class="search-saved" v-for="search in searchesList" :key="search._id">
                    <i @click="removeSearch(search._id)" class="fa fa-remove"></i>
                    <button @click="searchNews(search.text)">{{ search.title }}</button>
                </li>
            </ul>
        </div>
        <div v-if="starredsList.length > 0" class="menu-stars">
            <span>Preferidas</span>
            <ul>
                <li class="search-saved" v-for="starred in starredsList" :key="starred._id">
                    <i @click="removeStarred(starred._id)" class="fa fa-remove"></i>
                    <a :href="starred.url" target="_blank">{{ starred.title.slice(0, 15) }}...</a>
                </li>
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
import axios from 'axios'
import { baseApiURL } from '@/global.js'

export default {
    name: 'Menu',
    data: function(){
        return {
            search: null
        }
    },
    computed: {
        searchesList(){
            return this.$store.state.searchesList
        },
        starredsList(){
            return this.$store.state.starredsList
        },
        displayMenu(){
            return this.$store.state.displayMenu
        }
    },
    methods: {
        changeSection(id, title, number){
            this.$router.push({
                name: 'newsBySection',
                params: {id, title, number}
            })
        },
        searchNews(text = null){
            this.search = text ? text : this.$refs.searchInput.value
            this.$router.push({
                name: 'newsBySearch',
                params: {search: this.search}
            })
            this.search = null
        },
        getSearches(){
            axios.get(`${baseApiURL}/searches`).then(res => {
                res.data.forEach(search => {
                    this.$store.commit("addSearch", search)
                })
            })
        },
        removeSearch(_id){
            axios.delete(`${baseApiURL}/searches/${_id}`)
                .then(() => {
                    this.$store.commit("removeSearch", _id)
                })
        },
        getStarreds(){
            axios.get(`${baseApiURL}/starreds`).then(res => {
                res.data.forEach(starred => {
                    this.$store.commit("addStarred", starred)
                })
            })
        },
        removeStarred(_id){
            axios.delete(`${baseApiURL}/starreds/${_id}`)
                .then(() => {
                    this.$store.commit("removeStarred", _id)
                })
        },
    },
    mounted(){
        if(this.$mq === 'md'  || this.$mq === 'sm' || this.$mq === 'xs') {
            this.$store.commit('toggleMenu', false)
        }
        this.getSearches()
        this.getStarreds()
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

    .menu-searches, .menu-stars, .menu-categories{
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

    .menu-categories li, .menu-searches li button, .menu-stars li a{
        padding: 15px;
        transition: all 0.2s linear; 
    }

    .menu-searches li, .menu-stars li{
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .menu-searches i, .menu-stars i{
        font-size: 1.2rem;
        width: 50px;
        cursor: pointer;
        transition: all 0.1s linear; 
    }

    .menu-searches i:hover, .menu-stars i:hover{
        transform: scale(1.2);
        color: red;
    }

    .menu-searches li button, .menu-stars li a{
        color: #000;
        text-decoration: none;
        flex: 1;
        border: none;
        background: transparent;
        font-size: 1rem;
        padding-right: 50px;
    }

    .menu-searches li button:focus, .menu-stars li a:focus{
        outline: none;
    }

    .menu-categories li:hover, .menu-searches li button:hover, .menu-stars li a:hover{
        background-color: #C4E0E5;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        color: #4CA1AF;
    }

    @media(max-width: 980px){
        .menu{
            height: 100vh;
            width: 275px;
            position: absolute;
            top: 80px;
            left: 0;
        }
	}
</style>