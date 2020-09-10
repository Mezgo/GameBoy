class AudioPlayer{
    constructor(domElement){
        this.domElement= domElement
        this.src= this.domElement.dataset.src
        this.audio= new Audio(this.src)
        this.controls= {
            domElement: this.domElement.querySelector(".controles")
        }
        console.log(this.domElement.querySelector(".controles"))
        //console.log(this.controls)
        this.progress= this.domElement.querySelector(".cover .progress")
        this.plaI= this.domElement.querySelector(".cover .fa-play")
        this.pauI= this.domElement.querySelector(".cover .fa-pause")
        /* console.log("icon",this.icon) */
        
        this.initControls()
        this.initProgressActions()

        this.audio.ontimeupdate = () => { this.updateUI() }
    }

    initControls(){
        console.log("controls",this.controls)
        this.controls.play= this.controls.domElement.querySelector(".botonA")
        if (this.controls.play){
            this.initPlay(this.controls.play)
        }
    }

    initPlay(domElement){
        console.log(domElement)
        domElement.onclick = ()=>{
            console.log("hello")
    
          
            //const isPaused= icon.classList.contains("fa-play") 
            console.log("audio",this.audio.paused)  
            if(!this.audio.paused){
                this.pause()
                this.plaI.style.display= "none"
                this.pauI.style.display= "flex"
                
            } else{
                this.play()
                this.plaI.style.display= "flex"
                this.pauI.style.display= "none"
            }
        }
    }

    initProgressActions(){
        const cover= this.domElement.querySelector(".cover")
        console.log("cover", cover)
        cover.onclick= (e)=>{
            const x= e.offsetX,
            totalX= cover.clientWidth,
            progress= (x/totalX)
            this.setCurrentTime(progress)
        }
    }

    setCurrentTime(progress){
        this.audio.currentTime= this.audio.duration* progress
         
    }

    updateUI(){
        const total = this.audio.duration
        const current= this.audio.currentTime
        const progress= (current/total)*100
        this.progress.style.width= `${progress}%` 
    }

    play(){
        this.audio.play().then().catch( err=> console(`Error al reproducier el archivo: ${err}`))
     }

     pause(){
         this.audio.pause()
     }

}