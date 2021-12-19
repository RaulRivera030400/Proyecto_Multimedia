import Bootloader from '../Bootloader.js';
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:"Menu"});
    }
    init(data){
        console.log(data);
        console.log('I GOT IT')
    }
    preload(){
        //Se carga en load Scene
    }

    create(){        
        this.add.image(this.game.renderer.width/2,this.game.renderer.height*.20,"logo").setDepth(1);

        this.add.image(0,0,"title_bg").setOrigin(0).setDepth(0);

        let playButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,"play_button").setDepth(1);
        
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2+100,"options_button").setDepth(1);

        let hoverSprite = this.add.sprite(100,100,"cat");
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false)

        this.anims.create({
            key: 'walk',
            frameRate:4,
            repeat:-1,
            frames: this.anims.generateFrameNumbers("cat",{
                frames:[0,1,2,3]
            })
        })

        this.sound.pauseOnBlur=false;

        this.sound.play("title_music",{

            loop:true

        })



        //Set interactive
        playButton.setInteractive();

        playButton.on("pointerover",()=>{
            console.log("Hover");
            hoverSprite.setVisible(true);
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;
            hoverSprite.play('walk')
        });

        playButton.on("pointerout",()=>{
            console.log("Out of here")
            hoverSprite.setVisible(false)
        });

        playButton.on("pointerup",()=>{
            console.log("Open the gates");
            
            this.scene.add("Bootloader",new Bootloader);
            this.scene.start("Bootloader")
            console.log('Scene Bootloader?')
        });

    }
    update(time,delta){
        
    }
}