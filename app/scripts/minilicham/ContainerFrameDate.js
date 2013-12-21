(function(){
	CAAT.ContainerFrameDate = function () {
        CAAT.ContainerFrameDate.superclass.constructor.call(this);
        return this;
    };
	CAAT.ContainerFrameDate.prototype = {
		isPaint: false,
		isPress: false,
		startX: [],
		initialize: function(director,scene,width,height,myDate){
			this.director=director;
			this.scene=scene;
			this.setBounds(0,0,width,height);
			this.myDate=myDate;
			this.CreateFrameDate(myDate)
			
			return this;
		},
		
		mouseDown: function(e){
			var isMove= this.parent.isMove;
			if(!this.isPress&& !isMove){
			this.isPress=true;
			this.startX=e.x;
			this.startXX=this.x;
			}
			//console.log(this.myDate)
		},
		mouseUp : function(e){
			this.isPress=false;
			var space= this.x-this.startXX;
			if(Math.abs(space)<=100){
				this.x=this.startXX;
				this.parent.ContainerFrameDate[0].setVisible(false)
				this.parent.ContainerFrameDate[2].setVisible(false)
				this.parent.ContainerFrameDate[0].x=-this.width;
				this.parent.ContainerFrameDate[2].x=this.width;
			}
			var DaysOfMonth= getDaysOfMonth(this.myDate.getFullYear(),this.myDate.getMonth())
			for(var i = 1;i<=DaysOfMonth;i++){
				var _y=102+130+355;
				var target = this.FrameDate[i];
				if(target.AABB.contains(e.x,e.y)){
						target.setCurrentLunar();
				}
			}
			//console.log(this.FrameDate[1].date)
			
		},
		mouseDrag: function(e){
			if(this.parent&&this.parent.isMove){
				var isMove= this.parent.isMove;
			}
			if(this.isPress&&!isMove){
				this.x=e.screenPoint.x-this.startX;
				//console.log(this.parent.ContainerFrameDate)
				this.parent.ContainerFrameDate[0].setVisible(true)
				this.parent.ContainerFrameDate[2].setVisible(true)
				this.parent.ContainerFrameDate[0].x=this.x-this.width;
				this.parent.ContainerFrameDate[2].x=this.x+this.width;
				var space= this.x-this.startXX;
				if(Math.abs(space)>100){
					//console.log(this.parent.StartMoveTime)
					this.parent.StartMoveTime=this.director.time;
					this.parent.SpaceSWent=100;
					this.isPress=false;
					if(space<0){
						this.parent.setIsMoveDirection(true,-1);
					}else{
						this.parent.setIsMoveDirection(true,1);
					}
				}
			}
			
		},
		
		CreateFrameDate: function(myDate){
			this.FrameDate=[];
			this.removeFrameDate();
			var DaysOfMonth= getDaysOfMonth(myDate.getFullYear(),myDate.getMonth())
			var startDay=new Date(myDate.getFullYear(), myDate.getMonth() , 1)
			var x = startDay.getDay();
			var y = 0;
			var width= 71;
			for(var i =1;i<=DaysOfMonth;i++){
				this.FrameDate[i]= new CAAT.MyDate().initialize(this.director,this.scene,new Date(myDate.getFullYear(), myDate.getMonth(), i),width,width)
				.setPosition(width*x,width*y+50)
				this.addChild(this.FrameDate[i]);
				x++
				if(x>=7) {
					x=0
					y++
				}
				
			}
			//console.log(this.FrameDate[1].date)
			
		},
		
		removeFrameDate: function(){
			for(var i =1;i<=this.FrameDate.length;i++){
				this.removeChild(this.FrameDate[i]);
			}
		},
		
	}
	extend(CAAT.ContainerFrameDate, CAAT.Foundation.ActorContainer);
})();

