
(function(){
	CAAT.MyCalendar = function () {
        CAAT.MyCalendar.superclass.constructor.call(this);
        return this;
    };
	CAAT.MyCalendar.prototype = {
		FrameDate: [],
		currentMonth: null,
		currentYear: null,
		currentDate: null,
		isPaint: false,
		styleFont: "Source Sans Pro",
		initialize: function(director,scene){
			this.director=director;
			this.scene=scene;
			this.setBounds(0, 0, this.director.width, this.director.height)
			.setFillStyle("white")
			this.Today=new Date();
			
				this.currentMonth=this.Today.getMonth();
			this.currentYear=this.Today.getFullYear();
			this.currentDate= this.Today;
			//
			this.CreateContainerFrameDate(1,this.Today);
			var myDate=this.getIndexMonthGoto(0);
			this.CreateContainerFrameDate(0,myDate);
			var myDate=this.getIndexMonthGoto(2);
			this.CreateContainerFrameDate(2,myDate);
			this.ContainerFrameDate[0].x=-this.width
			this.ContainerFrameDate[2].x=this.width
			this.ContainerFrameDate[0].setVisible(false)
			this.ContainerFrameDate[2].setVisible(false)
			//
			
			//this.CreateFrameDate(this.Today);
		
			this.CreateButtonNext();
			this.CreateButtonPrev();
			this.currentLunar= convertSolar2Lunar(this.Today.getDate(),this.Today.getMonth()+1,this.Today.getFullYear(),7.0);
			//var giohoangdao= getGioHoangDao_Duong(16,12,2013);
			//console.log(giohoangdao)
			this.CreateButtonToday();
		
			return this;
		},
		ContainerFrameDate : [],
		indexFrameDate: 1,
		backPageTOday: function(){
			for(var i = 0;i<this.ContainerFrameDate.length;i++){
					this.removeChild(this.ContainerFrameDate[i])
			}
			this.currentMonth=this.Today.getMonth();
			this.currentYear=this.Today.getFullYear();
			this.currentDate= this.Today;
			this.CreateContainerFrameDate(1,this.Today);
			var myDate=this.getIndexMonthGoto(0);
			this.CreateContainerFrameDate(0,myDate);
			var myDate=this.getIndexMonthGoto(2);
			this.CreateContainerFrameDate(2,myDate);
			this.ContainerFrameDate[0].x=-this.width
			this.ContainerFrameDate[2].x=this.width
			this.ContainerFrameDate[0].setVisible(false)
			this.ContainerFrameDate[2].setVisible(false)
		},
		CreateContainerFrameDate: function(id,myDate){
			
			this.ContainerFrameDate[id] = new CAAT.ContainerFrameDate().initialize(this.director,this.scene,this.width,476,myDate)
			this.addChild(this.ContainerFrameDate[id]);
		},
		setIsMoveDirection: function(isMove,direction){
			this.direction=direction;
			this.isMove=isMove;
			return this;
		},
		removeContainerFrameDateMinusIndex: function(index){
			for(var i = 0;i<this.ContainerFrameDate.length;i++){
				if(i!=index){
					this.removeChild(this.ContainerFrameDate[i])
				}
			}
			this.ContainerFrameDate[1]=this.ContainerFrameDate[index];
			this.currentMonth=this.ContainerFrameDate[1].myDate.getMonth()
			this.currentYear=this.ContainerFrameDate[1].myDate.getFullYear()
			var myDate=this.getIndexMonthGoto(0);
			this.CreateContainerFrameDate(0,myDate);
			var myDate=this.getIndexMonthGoto(2);
			this.CreateContainerFrameDate(2,myDate);
			this.ContainerFrameDate[0].x=-this.width
			this.ContainerFrameDate[2].x=this.width
			this.ContainerFrameDate[0].setVisible(false)
			this.ContainerFrameDate[2].setVisible(false)
			this.rePaint();
		},
		isMove: false,
		direction: 0,
		StartMoveTime: 0,
		endDuringTime: 0.5,
		SpaceSWent:100,
		paint: function(director,time){
			var ctx= director.ctx;
			//ctx.font = '200 15px '+this.styleFont ;
			CAAT.MyCalendar.superclass.paint.call(this, director, time);
			if(this.isMove){
				// tinh speed
				
				var duringTime = this.director.time/1000-this.StartMoveTime/1000;
				var speed= (duringTime* (this.width-Math.abs(this.x))/this.endDuringTime)  - this.SpaceSWent>>0;
				this.SpaceSWent=(duringTime* (this.width-Math.abs(this.x))/this.endDuringTime)>>0;
				//
				this.ContainerFrameDate[0].setVisible(true)
				this.ContainerFrameDate[2].setVisible(true)
				this.ContainerFrameDate[0].x+=this.direction*speed
				this.ContainerFrameDate[1].x+=this.direction*speed
				this.ContainerFrameDate[2].x+=this.direction*speed
				if(this.ContainerFrameDate[0].x>=0 || this.ContainerFrameDate[2].x<=0){
					this.isMove=false;
					//this.StartMoveTime=0;
					this.SpaceSWent=0;
					if(this.ContainerFrameDate[0].x>=0){
						this.removeContainerFrameDateMinusIndex(0)
					}else{
						this.removeContainerFrameDateMinusIndex(2);
					}
					this.ContainerFrameDate[1].x=0;
				}
			}
			if(time<1&&this.isPaint){
				
				ctx.globalAlpha=0.3
				ctx.beginPath();
				ctx.font = '200 90px '+this.styleFont;
				ctx.rect(0, 0, this.width, this.height);
				ctx.fillStyle = "#f6f6f6";
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.lineJoin = 'round';
				ctx.strokeStyle = "black";
				ctx.stroke();
				ctx.closePath();
				ctx.globalAlpha=1
				ctx.beginPath();
				ctx.rect(0, 0, this.width, 50);	
				ctx.rect(0, 476, this.width, 80);	
				ctx.fillStyle = "#444750";
				ctx.fill();
				ctx.closePath();
				ctx.beginPath();
				for(var i=0;i<3;i++){
				ctx.beginPath();
				ctx.rect(0,i*71*2+121, this.width, 71);	
				ctx.fillStyle = "#f6f6f6";
				ctx.fill();
				ctx.strokeStyle = "#d6d6d6";
				ctx.stroke();
				ctx.closePath();
				}
				ctx.beginPath();
				for(var i =0 ;i < 7;i++){	
					ctx.font = '200 25px '+this.styleFont;
					ctx.fillStyle = 'white';
					ctx.fillText(this.getStringDayFromIndex(i), i* this .width/7 + 20>>0,35);
				}
			
				ctx.font = '200 23px '+this.styleFont;
				var str= (this.currentMonth+1)+"/"+this.currentYear
				ctx.fillStyle = 'white';
				ctx.fillText(str,this.width/2-ctx.measureText(str).width/2 + 80,510);
				ctx.closePath();
					
			}
			if(!this.isPaint){
				this.isPaint=true;
				this.cacheAsBitmap(0,CAAT.Foundation.ActorContainer.CACHE_DEEP);
			}
			
		},
		setCurrentLunar: function(date){
			var dateLunar=convertSolar2Lunar(date.getDate(),date.getMonth()+1,date.getFullYear(),7.0)
			this.currentDate=date
			this.currentLunar=dateLunar;
			this.rePaint();
			return this;
		},
		setCurrentDate: function(date){
			this.currentDate=date
		},
		getStringDayFromIndex: function(index){
			switch (index){
				case 0: return "CN";
				case 1: return "T2";
				case 2: return "T3";
				case 3: return "T4";
				case 4: return "T5";
				case 5: return "T6";
				case 6: return "T7";
			}
		},
		getStringMonthFromIndex: function(index){
			switch (index){
				case 1: return "tháng một";
				case 2: return "tháng hai";
				case 3: return "tháng ba";
				case 4: return "tháng tư";
				case 5: return "tháng năm";
				case 6: return "tháng sáu";
				case 7: return "tháng bảy";
				case 8: return "tháng tám";
				case 9: return "tháng chín";
				case 10: return "tháng mười";
				case 11: return "tháng mười một";
				case 12: return "tháng mười hai";
			}
		},
		calculateCanChi: function(year){
			var Can=["canh", "tân", "nhâm", "quý", "giáp", "ất", "bính", "đinh", "mậu", "kỷ"];
			var Chi=["thân","dậu","tuất","hợi","tý","sửu","dần","mão","thìn","tỵ","ngọ","mùi"];
			var str=" năm " + Can[year%10]+ " " + Chi[year%12];
			return str;
				
		},
		
		CreateButtonNext: function(){
			var self= this;
			this.Next= new CAAT.Foundation.ActorContainer()
				.setBounds(0,0,50,50)
				.setPosition(this.width-50,476)
				.setFillStyle("red")
			this.Next.paint= function(director,time){
				var ctx= director.ctx;
				ctx.beginPath();
				ctx.moveTo(10+3+5,10+3)
				ctx.lineTo(10+3-3+25,25)
				ctx.lineTo(10+3+5,40-3)
				ctx.fillStyle="white"
				ctx.fill();
				ctx.closePath()
			}
			this.Next.mouseDown= function(e){
				self.setIsMoveDirection(true,-1);
				self.rePaint();
			}
			this.addChild(this.Next);
		},
		getIndexMonthGoto: function(number){
			var self=this;
			var year=self.currentYear;
			var month= self.currentMonth;
			if(number==2){
				month= self.currentMonth+1;
				if(month>=12){
					month=0;
					year+=1
				}
				var myDate= new Date(year,month,1)
			}
			if(number==0){
				month= self.currentMonth-1;
				if(month<0){
					month=11;
					year-=1
				}
				var myDate= new Date(year,month,1)
			}
			return myDate;
		},
		CreateButtonPrev: function(){
			var self= this;
			this.Prev= new CAAT.Foundation.ActorContainer()
				.setBounds(0,0,50,50)
				.setPosition(0,476)
				.setFillStyle("red")
			this.Prev.paint= function(director,time){
				var ctx= director.ctx;
				ctx.beginPath();
				ctx.moveTo(45-10-3,10+3)
				ctx.lineTo(25-10-3+3,25)
				ctx.lineTo(45-10-3,40-3)
				ctx.fillStyle="white"
				ctx.fill();
				ctx.closePath()
			}
			this.Prev.mouseDown= function(e){
				self.setIsMoveDirection(true,1);
				self.rePaint();
			}
			this.addChild(this.Prev);
		},
		rePaint: function(){
			this.stopCacheAsBitmap();
			this.cacheAsBitmap(0);
		},
		CreateButtonToday: function(){
			var self=this;
			//ctx.rect(0, 970+moveY, this.width, 80);	
			this.ButtonToday= new CAAT.Foundation.ActorContainer()
				.setBounds(0,0,155,50)
				.setPosition(120,470)
			this.ButtonToday.isPaint=false;
			this.ButtonToday.paint= function(director,time){
				CAAT.MyCalendar.superclass.paint.call(this, director, time);
				if(time<1&&this.isPaint){	
				var ctx= director.ctx
				ctx.beginPath();
				ctx.font = '200 23px '+self.styleFont ;
				ctx.fillStyle = 'white';
				ctx.fillText("Hôm nay",5,40);
				ctx.closePath();
				}
				if(!this.isPaint){
					this.isPaint=true;
					this.cacheAsBitmap(0,CAAT.Foundation.ActorContainer.CACHE_DEEP);
				}
			}
			this.ButtonToday.mouseDown= function(e){
				self.backPageTOday();
				self.currentLunar= convertSolar2Lunar(self.Today.getDate(),self.Today.getMonth()+1,self.Today.getFullYear(),7.0);
				self.rePaint();
			}
			this.addChild(this.ButtonToday);
		},
		
	}
	extend(CAAT.MyCalendar, CAAT.Foundation.ActorContainer);
})();
function getDaysOfMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();

}