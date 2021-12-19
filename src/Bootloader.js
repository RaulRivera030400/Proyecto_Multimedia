class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/');

        this.load.image('logo_gamma','logo_gamma.png')

        this.load.spritesheet('personaje1','./sprites/personaje1.png',{frameWidth: 57, frameHeight:62});

        this.load.tilemapTiledJSON('mapa','./mapa/mapa.json');
        this.load.image('tiles','./mapa/tileSets.png')

    }

    create() {
        //Mapa
        this.logo = this.physics.add.image(470,130,'logo_gamma').setScale(.80).setImmovable(true);
        this.logo.body.setAllowGravity(false);

        var mapa = this.make.tilemap({key: 'mapa'});
        var tilesets = mapa.addTilesetImage('tileSets','tiles');
        var nubes = mapa.createDynamicLayer('nubes',tilesets,0,0);
        var solidos = mapa.createDynamicLayer('solidos',tilesets,0,0);
        solidos.setCollisionByProperty({solido: true});    

        //Jugador
        this.jugador = this.physics.add.sprite(100,100,'personaje1',0);
       // this.jugador .setCollideWorldBounds(true);
        this.jugador.setSize(25,0);        
        this.physics.add.collider(this.jugador,solidos);

        

        //Animaciones
        this.anims.create({
            key:'caminar',
            frames: this.anims.generateFrameNumbers('personaje1',{start:1, end:8}),
            frameRate:10
        })

        //Tweens
        this.tweens.add({
            targets: this.logo,
            duration:4000,
            yoyo: true,
            repeat:-1,
            x:650
        })

        //Colisiones
        
        this.physics.add.overlap(this.jugador,this.logo);



        //Controles
        this.arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.startFollow( this.jugador);

    }

    update(){
        const velocidad = 350;
        const alturaSalto = -530;
        this.jugador.body.setVelocityX(0);
    
        if(this.izquierda.isDown){
            this.jugador.body.setVelocityX(-velocidad);
            this.jugador.flipX = true;
        }
    
        if(this.derecha.isDown){
            this.jugador.body.setVelocityX(velocidad);
            this.jugador.flipX = false;
        }
    
        if(this.arriba.isDown && this.jugador.body.onFloor()){
            this.jugador.body.setVelocityY(alturaSalto);
        }
    
        if((this.izquierda.isDown || this.derecha.isDown) && this.jugador.body.onFloor()){
            this.jugador.anims.play('caminar',true);
        }else if(!this.jugador.body.onFloor()){
            this.jugador.setFrame(9);
        }else{
            this.jugador.setFrame(0);
        }
    }
}
export default Bootloader;