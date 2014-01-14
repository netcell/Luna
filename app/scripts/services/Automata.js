'use strict';

angular.module('lunaApp')
	.factory('Automata', function () {
		var toString = Object.prototype.toString;

		var Automatum = function(){

			this.States = {};
			this.Extract = {};
			this.onOutcome = function(){};
			this.lastState = 0;

		};

		Automatum.prototype = {

			reset : function(){
				this.currentState = this.zeroState;
				this.Extract = {};
			},

			init : function(state){
				this.currentState = state;
				this.zeroState = state;
				return this.state(state);
			},

			//Not neccessary
			readString : function(string){
				var UnSign = function(str) {
				    str = str.toLowerCase();
				    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
				    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
				    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
				    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
				    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
				    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
				    str = str.replace(/đ/g, "d");
				    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|,|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, " ");
				    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
				    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
				    str = str.replace(/^\-+|\-+$/g, "");
				    //cắt bỏ ký tự - ở đầu và cuối chuỗi
				    return str;
				};
				var array = UnSign(string)
					.replace('/',' / ')
					.replace('.',' . ')
					.replace('-',' - ')
					.replace(':',' : ')
					.replace('  ',' ')
					.split(/\s+|(\d+)(h+)|(\d+)((?=pm|am|AM|PM))/);
				for (var i = array.length - 1; i >= 0; i--) {
					if (array[i]===" "||
						array[i]===""||
						array[i]===undefined){
						array.splice(i,1);
					}
				};
				return this.read(array);
			},

			read : function(array){
				this.reset();
				var i, length = array.length, outcome;
				for (i=0;i<length;i++){
					outcome = this.on(array[i]);
				}
				if (this.currentState!==this.lastState) {
					console.log('input: '+ array[i-1] + ', state:' + this.currentState);
					this.lastState = this.currentState;
				}
				return outcome;
			},

			on : function(input){
				var stateToGo = this.States[this.currentState].recognize(input);
				if (stateToGo){
					return this.transitionTo(stateToGo,input);
				} else {
					return this.transitionToZero(input);
				}
				return false;
			},

			transitionToZero: function(input){
				this.currentState = this.zeroState;
				var stateToGo = this.States[this.currentState].recognize(input);
				if (stateToGo){
					return this.transitionTo(stateToGo,input);
				}
				return false;
			},

			transitionTo : function(state,input){
				this.currentState = state;
				var s = this.States[state];
				s.Extract(input);
				return s.Outcome(input);
			},

			state : function(state){
				if (toString.call(state)!=='[object String]')
					state = ""+state;
				var s,
					i,
					F = this.Recognizers,
					f,
					A = this,
					S = this.States;

				if (!S.hasOwnProperty(state)) {
					S[state] = [];
				}

				s = S[state];

				if (!s.recognize) {
					s.recognize = function(input){
						var stateToGo = false;
						for (i = s.length - 1; i >= 0; i--) {
							switch (toString.call(s[i].r)){
								case '[object Function]':
									f = s[i].r;
									break;
								case '[object String]':
									if (F.hasOwnProperty(s[i].r)){
										f = F[s[i].r];
									} else {
										f = false;
									}
									break;
								default:
									f = false;
									break;
							}
							if (f) {
								if (f(input)) {
									return s[i].s;
								}
							}
						}
						return false;
					};
				}

				if (!s.extract){
					s.extractTo = [];
					s.Extract = function(input){
						for (var i = s.extractTo.length - 1; i >= 0; i--) {
							A.Extract[s.extractTo[i]]=input;
						};
					};
					s.extract = function(name){
						s.extractTo.push(name);
						return s;
					};
				}

				if (!s.outcome){
					s.Outcome = function(){};
					s.outcome = function(outcome){
						s.Outcome = outcome;
						return s;
					};
				}

				var JSONCompare = function JSONCompare(obj1,obj2){
					return JSON.stringify(obj1)===JSON.stringify(obj2);
				}

				if (!s.clearFilter){
					s.clearFilter = function(filter){
						for (var i = s.length - 1; i >= 0; i--) {
							if (JSONCompare(s[i].filter,filter)){
								s.splice(i,1);
							}
						};
						return s;
					};
				}

				if (!s.clearState){
					s.clearState = function(state){
						for (var i = s.length - 1; i >= 0; i--) {
							if (s[i].s===state){
								s.splice(i,1);
							}
						};
						return s;
					};
				}

				if (!s.clear){
					s.clear = function(){
						s.splice(0,s.length);
						return s;
					}
				}

				if (!s.onRecognize) {
					s.onRecognize = function(recognize){
						return {
							transitionTo: function(state){
								if (toString.call(state)!=='[object String]')
									state = ""+state;
								s.push({
									s: state,
									r: recognize
								});
								var i = s.length-1;
								return s;
							}
						};
					};
				}

				if (!s.on) {
					s.on = function(recognize){
						return s.onRecognize(function(input){
							switch (toString.call(recognize)){
								case '[object String]':
									if (input===recognize) {
										return true;
									}
									break;
								case '[object Array]':
									for (var i = recognize.length - 1; i >= 0; i--) {
										if (input===recognize[i]) {
											return true;
										}
									}
									break;
								default:
									break;
							}
							return false;
						});
					};
				}

				return s;
			},

			recognize : function(recognize,fn) {
				this.Recognizers[recognize] = fn;
			},

			extract : function(name) {
				var e = this.Extract[name];
				delete this.Extract[name];
				return e;
			},
			
			recognizer : function(recognizer,fn){
				this.Recognizers = this.Recognizers || {};
				var f = function(input){
					f.a = {};
					if (!f.a.hasOwnProperty(input)) {
						f.a[input] = fn(input);
					}
					return f.a[input];
				};
				this.Recognizers[recognizer] = f;
				return this;
			},

		};

		var Automata = function(name){
			return Automata[name];
		};

		Automata.generate = function(name){
			Automata[name] = new Automatum();
			return Automata[name];
		};

		return Automata;
	});
