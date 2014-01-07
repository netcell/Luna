(function(){
	CAAT.MyDate = function () {
        CAAT.MyDate.superclass.constructor.call(this);
        return this;
    };
	CAAT.MyDate.prototype = {
		styleFont: "Source Sans Pro",
		isPaint: false,
		FillStyleColor: "#dcdcdc",
		initialize: function(director,scene,date,width,height){
			this.director=director;
			this.scene=scene;
			this.setBounds(0,0,width,height);
			this.date= date;
			//console.log(this.date)
			this.today= new Date();
			this.enableEvents(false);
			//console.log(this.x)
			//console.log(this.date.getDay())
			return this;
		},
		paint: function(director,time){
			CAAT.MyDate.superclass.paint.call(this, director, time);
			var ctx= director.ctx;
			if(time<1&&this.isPaint){	
				var ju= convertSolar2Lunar(this.date.getDate(),this.date.getMonth()+1,this.date.getFullYear(),7.0)
				if(this.today.getMonth()==this.date.getMonth()&&this.today.getFullYear()==this.date.getFullYear()&&this.today.getDate()==this.date.getDate()) {
					ctx.globalAlpha=0.8
					ctx.beginPath();
					ctx.rect(0, 0, this.width, this.height);
					ctx.fillStyle = "#dcdcdc";
					ctx.fill();
					ctx.closePath();
					ctx.globalAlpha=1
				}
				if(this.isMouseDown){
					ctx.globalAlpha=0.5
					ctx.beginPath();
					ctx.rect(0, 0, this.width, this.height);
					ctx.fillStyle = "blue";
					ctx.fill();
					ctx.closePath();
					ctx.globalAlpha=1
				}
				var colorDate="#525252";
				if(this.date.getDay()==6) colorDate="green"
				if(this.date.getDay()==0) colorDate="red"
				//console.log(this.date.getDay())
				ctx.beginPath();
				ctx.font = '200 30px '+this.styleFont;		
				ctx.fillStyle = colorDate;
				ctx.fillText(this.date.getDate(), -ctx.measureText(this.date.getDate()+"").width/2+ this.width/2, 35);
				ctx.closePath();
				ctx.beginPath();
				ctx.font = '200 15px '+this.styleFont;	
				if(ju[0]==1){
				ctx.fillStyle = 'red';
				ctx.fillText(ju[0]+"/"+ju[1], -ctx.measureText(ju[0]+"/"+ju[1]).width/2+ this.width/2, this.height-10);
				}else{
				ctx.fillStyle = '#525252';
				ctx.fillText(ju[0], -ctx.measureText(ju[0]).width/2+ this.width/2, this.height-10);
				}
				ctx.closePath();
				//console.log(ju[0])
			}
			if(!this.isPaint){
				this.isPaint=true;
				this.cacheAsBitmap(0,CAAT.Foundation.ActorContainer.CACHE_DEEP);
			}
		},
		isMouseDown: false,
		/*mouseDown: function(e){
			this.parent.parent.setCurrentLunar(this.date);
			this.rePaint();
		},*/
		rePaint: function(){
			this.stopCacheAsBitmap();
			this.cacheAsBitmap(0);
		},
		setIsMouseDown: function(on){
			this.isMouseDown=on;
			this.rePaint();
		},
		setCurrentLunar: function(){
			if(this.parent.parent){
			this.parent.parent.setCurrentLunar(this.date);
			}
			this.rePaint();
		//	console.log(1);
		},
		
	}
	extend(CAAT.MyDate, CAAT.Foundation.ActorContainer);
})();
var GIO_HD = new Array("110100101100", "001101001011", "110011010010", "101100110100", "001011001101", "010010110011");
var CHI = new Array("T\375", "S\u1EEDu", "D\u1EA7n", "M\343o", "Th\354n", "T\u1EF5", "Ng\u1ECD", "M\371i", "Th\342n", "D\u1EADu", "Tu\u1EA5t", "H\u1EE3i");

function getGioHoangDao_Duong(dd,mm,yyyy) {
  var jd=jdFromDate(dd,mm,yyyy);
  var chiOfDay = (jd+1) % 12;
  var gioHD = GIO_HD[chiOfDay % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
  var ret = "";
  var count = 0;
  for (var i = 0; i < 12; i++) {
    if (gioHD.charAt(i) == '1') {
      ret += CHI[i];
      ret += ' ('+(i*2+23)%24+'-'+(i*2+1)%24+')';
      if (count++ < 5) ret += ', ';
      if (count == 3) ret += '\n';
    }
  }
  return ret;
}

function getGioHoangDao_Am(dd,mm,yyyy,leap) {
  var ngayduong=getSolarDateFromLunarDate(dd,mm,yyyy,leap,7);
  var jd=jdFromDate(ngayduong[0],ngayduong[1],ngayduong[2]);
  var chiOfDay = (jd+1) % 12;
  var gioHD = GIO_HD[chiOfDay % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
  var ret = "";
  var count = 0;
  for (var i = 0; i < 12; i++) {
    if (gioHD.charAt(i) == '1') {
      ret += CHI[i];
      ret += ' ('+(i*2+23)%24+'-'+(i*2+1)%24+')';
      if (count++ < 5) ret += ', ';
      if (count == 3) ret += '\n';
    }
  }
  return ret;
}
