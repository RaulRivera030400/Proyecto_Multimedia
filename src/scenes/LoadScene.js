import Menu from './Menu.js';
export default class LoadScene extends Phaser.Scene{
    constructor(){
        super({key:"LoadScene"});
    }
    preload(){
        //Cargar archivos
        this.load.image('title_bg','./assets/image/title_bg.jpg');
        this.load.image('options_button','./assets/image/options_button2.png');
        this.load.image('play_button','./assets/image/play_button2.png');
        this.load.image('logo','./assets/image/logo2.png');

        this.load.spritesheet('cat','./assets/sprite/cat.png',{
            frameHeight:32,
            frameWidth: 32
        });

        this.load.audio('title_music','./assets/audio/shuinvy-childhood.mp3');

        let loadingBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff //white
            }
        });

        //Simulate larger load
        // for(let i=0; i<100000;i++){
        //     this.load.spritesheet("cat","./assets/image/cat.png",{
        //         frameHeight:32,
        //         frameWidth:32
        //     });
        // }

        this.load.on("progress",(percent)=>{
            loadingBar.fillRect(0,this.game.renderer.height/2,this.game.renderer.width*percent,50);
            console.log(percent)
        })

        this.load.on("complete",()=>{
            console.log("Done")
        })



    }

    create(){
        //Cargar otra escena
        // this.scene.start(CST.Scene.MENU,"Heloo from load Scene")
        this.scene.add("Menu",new Menu);
        this.scene.start("Menu")
        console.log('Scene Menu?')
    }
    
    update(time,delta){
        
    }
}