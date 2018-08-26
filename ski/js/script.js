const Slide = function ( person, container ) {

       this.person = person
       let elem = container.appendChild (document.createElement ( 'div' )) 
       elem.classList.add("slider")
       var comment1 = document.createElement("div")
       var comment2 = document.createElement("div")
       comment1.classList.add("comment")
       comment2.classList.add("comment")

       var pic = document.createElement("img")
       var pic2 = document.createElement("img")
       pic.src = person[0].img
       pic2.src = person[1].img
       var info = document.createElement("section")
       var info2 = document.createElement("section")
       info.innerHTML = `${person[0].name}<br>г.${person[0].city}`
       info2.innerHTML = `${person[1].name}<br>г.${person[1].city}`
       var text = document.createElement("p")
       var text2 = document.createElement("p")
       text.innerText = person[0].comment
       text2.innerText = person[1].comment

       comment1.appendChild(pic)
       comment1.appendChild(info)
       comment1.appendChild(text)

       comment2.appendChild(pic2)
       comment2.appendChild(info2)
       comment2.appendChild(text2)
       elem.appendChild(comment1)
       elem.appendChild(comment2)

    this.init = function ( x ) {
      elem.style.left = x + '%'
      elem.style.opacity = "0"
    }
    this.setPicture = person => {
           pic.src = person[0].img
           pic2.src = person[1].img
           info.innerHTML = `${person[0].name}<br>г.${person[0].city}`
           info2.innerHTML = `${person[1].name}<br>г.${person[1].city}`
           text.innerText = person[0].comment
           text2.innerText = person[1].comment
    }
    this.mcFromTo = function ( from, to, finalOpacity ) {
        elem.style.transition = 'none'
        elem.style.left = from
        elem.style.opacity = 1 - finalOpacity
        setTimeout ( function () {
          elem.style.transition = 'all 2s'
          elem.style.left = to
          elem.style.opacity = finalOpacity
        }, 50 )
    }
}

class PictureSlider extends HTMLElement {
    constructor () {
        super()
        this.pictures = []
        this.container = this.createElem ( 'div' )
        this.container.classList.add("content")
        this.loadData()
        this.currentIndex = 0
        this.currentSlide = 0
        let shadow = this.attachShadow ( { mode: 'open' } )
        shadow.appendChild ( this.container )
        let style = document.createElement ( 'style' )
        style.textContent = `
            .content{
                position:relative;
                width:1100px;
                height:443px;
                margin:30px auto 30px auto;
                overflow:hidden;
            }
            button {
              position: absolute;
              top:50%;
              font-size: 50px;
              background: transparent;
              border: 0;
              color: white;
              text-shadow: 3px 3px 5px #00000090;
              outline: none;
              font-family: monospace;
              z-index:10;
            }
            button:hover { 
              font-size: 55px;
              text-shadow: 2px 2px 4px #000000b0;
            }
            #left { left: 20px; }
            #right { right: 20px; }
            .slider {                 /*div*/
              width:950px;
              position: absolute;
              top:0;
              display:flex;
              justify-content: space-between;
              transition: all 0.8s;
            }
            .comment{                     /*new*/
            width: 423px;
            height: 423px;
            border-width: 10px;
            border-color: rgb(241, 239, 230);
            border-style: solid;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: flex-start;
            }
            .comment > img{
            display: block;
            width:155px;
            height: 155px;
            margin:20px;
            }
            .comment > section{
            font-weight: bold;
            padding-top:40px;
            height:150px;
            }
            section ~ p{
            padding: 20px 30px;
            }
            `
        shadow.appendChild ( style )

        this.btnLeft = this.createElem ( 'button', this.container )
        this.btnLeft.id = 'left'
        this.btnLeft.onclick = () => this.changePicture ( "left" )
        this.btnRight = this.createElem ( 'button', this.container )
        this.btnRight.id = 'right'
        this.btnRight.onclick = () => this.changePicture ( "right" )
        this.btnLeft.innerHTML = '<'
        this.btnRight.innerHTML = '>'

    }
    createElem ( tagName, container ) {
        return  ( !container ? document.body : container )
                .appendChild (
                  document.createElement ( tagName )
                )
    }
    
    loadData ( ) {
        // let promise = fetch ( jsonURL )
        //                 .then ( response => response.json() )
        // this.pictures = await promise
        this.pictures = [

        [{name:"Светлова Татьяна",city:"Харьков",img:"img/user1.png",
        comment:
        `Очень довольна. Курорт современный, подъемники отличные,очереди только на первом в лифт), когда поднимаешься в зону катания очередей на подъемниках не бывает.Трассы на любой вкус и цвет. В снежную зиму, отличный фрирайд!!!`},
        {name:"Марина Весельчакова",city:"Полтава",img:"img/user2.png",
        comment:`Красивый городок. Здесь мы ощутили в полной мере местный колорит- дома, отели в национальном стиле, рестораны. Множество магазинов с товарами местного производства. Цены везде приятно радуют. Приветливо 
улыбающиеся люди, причем искренне- повсюду. Ну и конечно горы!`}],
        [{name:"Игорь Сверлов",city:"Киев",img:"img/user3.png",
        comment:`Для меня это первое катание на лыжах и первый горнолыжный курорт. Мне понравилось, нам повезло с погодой. Для начинающих довольно много мест для катания. Сам городок милый, оживленный, есть куда пойти, отель "на уровне", с бассейном,  живописные окрестности.`},
        {name:"Владимир Мельник",city:"Львов",img:"img/user4.png",
        comment:`Недорого, на хорошем уровне для новичков. Группы небольшие, можно на русском или английском. 
Инструкторы- профессионалы. В горах много снега, много трасс. Подъемники современные.`}]
        ] 
        this.slides = []
        this.slides [ 0 ] = new Slide ( 
                        this.pictures [ 0 ], 
                        this.container 
        )
        this.slides [ 0 ].mcFromTo ( "100%", "80px" )
        this.slides [ 1 ] = new Slide ( 
                        this.pictures [ 1 ], 
                        this.container 
        )
        this.slides [ 1 ].init ( 100 )
    }
    changePicture ( direction ) {
        let to = direction === 'left' ? 100 : -100
        let nextSlide = this.currentSlide === 0 ? 1 : 0
        let nextIndex = this.getNextIndex ( direction )
        this.slides [ nextSlide ].setPicture ( this.pictures [ nextIndex ] )
        this.slides [ nextSlide ].init ( -to )
        this.slides [ this.currentSlide ].mcFromTo ( "80px", `${to}%`, 0 )
        this.slides [ nextSlide ].mcFromTo ( `${-to}%`, "80px", 1 )
        setTimeout ( function () {
            this.currentSlide = nextSlide
            this.currentIndex = nextIndex
    
        }.bind(this), 1000 )
    }
    
    getNextIndex ( dir ) {
      return dir === 'left' ? 
            ( this.currentIndex === 0 ? 
                this.pictures.length - 1 : this.currentIndex - 1 ) :
            ( this.currentIndex === this.pictures.length - 1 ? 
                0 : this.currentIndex + 1 )
    }
    
}
customElements.define ( 'picture-slider', PictureSlider )
