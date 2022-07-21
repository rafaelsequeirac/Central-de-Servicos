const list = document.querySelector(".list");
const grid = document.querySelector(".grid");
const chamado = document.querySelector(".listar");
const btnList = document.querySelector("#list");
const btnGrid = document.querySelector("#grid");
const desc = document.querySelector(".desc");


        grid.addEventListener("click", () => {
            chamado.classList.add("grid");
            btnList.classList.add("on");
            btnGrid.classList.add("off");
            desc.classList.add("off");
        })

        list.addEventListener("click", () => {
            chamado.classList.remove("grid");
            btnList.classList.remove("on");
            btnGrid.classList.remove("off");
            desc.classList.remove("off");
        })

//.................Paginação....................//

const chamados = Array.from(document.getElementsByClassName("chamados"));

const html = {
    get(element) {
        return document.querySelector(element)
    }
}

const state = {
    page: 1,
    perPage: 6,
    totalPage: Math.ceil(chamados.length / 6)
}

const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage
        if(lastPage){
            state.page--
        }
    },
    prev() {
        state.page--

        if(state.page < 1){
            state.page++
        }
    },
    goTo(page) {
        if(page < 1){
            page = 1
        }

        state.page = +page

        if(page > state.totalPage){
            state.page = state.totalPage
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () =>{
            controls.goTo(1)
            update()
        })

        html.get('.last').addEventListener('click', () =>{
            controls.goTo(state.totalPage)
            update()
        })

        html.get('.next').addEventListener('click', () =>{
            controls.next()
            update()
        })

        html.get('.prev').addEventListener('click', () =>{
            controls.prev()
            update()
        })
    }
}

const lista = {
    create(chamados) {
        const div = document.createElement('div');
        div.className = 'chamados';
        div.innerHTML = '<tr> <td>068755</td><td>017356</td><td>15:10h</td><td>Aberto</td><td>202221071536</td></tr>';
        html.get('.listar').appendChild(div);
    },
    update() {
        html.get('.listar').innerHTML = ""

        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage
        
        const paginatedItems = chamados.slice(start, end)

        paginatedItems.forEach(lista.create)
    }
}

const buttons = {
    create(number) {
        const button = document.createElement('div')

        button.innerHTML = number;

        if(state.page == number){
            button.classList.add('active')
        }

        button.addEventListener('click', (event) =>{
            const page = event.target.innerHTML

            controls.goTo(page)
            update()
        })

        html.get('#paginate .numbers').appendChild(button)
    },
    update() {
        html.get('#paginate .numbers').innerHTML = ""
        const {maxLeft, maxRight} = buttons.calculateMaxVisible() 

        for(let page = maxLeft; page <= maxRight; page++){
            buttons.create(page)
        }
    },
    calculateMaxVisible() {
        let maxLeft = (state.page - Math.floor(5 / 2))
        let maxRight = (state.page + Math.floor(5 / 2))

        if(maxLeft < 1) {
            maxLeft = 1
            maxRight = 5
        }

        if(maxRight > state.totalPage) {
            maxLeft = state.totalPage - (5 - 1)
            maxRight = state.totalPage

            if(maxLeft < 1) maxLeft = 1
        }

        return{maxLeft, maxRight}
    }
}

function update() {
    lista.update()
    lista.create()
    buttons.update()
}

function init() {
    update()
    controls.createListeners()
}

init()


