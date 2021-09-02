import { Component,  OnInit , HostListener} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  scrollPosition:number=0;

  @HostListener('window:scroll',['$event']) HandleScroll(event:any){
      
       this.scrollPosition = window.scrollY;
      
  }
 
  goUp(){
    window.scrollTo(0,0);
  }


  ngOnInit(): void {
  }

}
