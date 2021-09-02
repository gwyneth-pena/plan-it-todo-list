import { animate,style, transition, trigger,state } from '@angular/animations';




export let fade = trigger('fade',[
    transition('*=>*',[
        style({opacity:0}),
        animate(2000,style({opacity:1}))

    ])

])

export let fall = trigger('fall',[
      transition('*=>*',[
         style({transform:'translate(0px,0px)'}),
         animate(1000, style({transform:'translate(0px,20px)'})),
         animate(1000,style({transform:'translate(0px,0px)'}) )

      ])

])


export let triggeredFall = trigger('triggeredFall',[
     state('notScrolled',style({transform:'translateY(0px)'})),
     state('scrolled', style({transform:'translateY(10px)'})),
     transition('notScrolled<=>scrolled',animate(1000))
  

])

export let slide = trigger('slide',[
     state('hide',style({opacity:0, transform:'translateX(-50px)'})),
      transition('hide=>*',[
          
          animate(300,style({opacity:0.4,transform:'translate(-20px)'})),
          animate(300,style({opacity:0.7,transform:'translate(-10px)'})),
          animate(400,style({opacity:1,transform:'translate(0px)'}))
      ])


])



export let appearUp = trigger('appearUp',[
        
     transition('void=>*',[
         style({transform:'translateY(-30px)'}),
         animate(2000, style({transform:'translateY(0px)'}))
        
        ])


])