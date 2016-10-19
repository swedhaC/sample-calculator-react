var BtnClass = React.createClass ({
	getInitialState: function () {
	  return {i: this.props.i};
	},
	handleBtnClick : function(){
		
		 this.props.onUpdate(this.state.i,this.props.isoperator);
	},
	render : function(){
		var i = this.props.i;
		return <input type="button" className="calc_number" value={i} onClick={this.handleBtnClick} isoperator={this.props.isoperator}/>;
	},
	getDefaultProps(){
		return {s:0, i:0}
	}
});

var InputElem = React.createClass ({
	getInitialState: function () {
	  return {ans: this.props.ans};
	},
	inputChange : function(){
		console.log("change");
	},
	render : function(){
		return <input type="text" ref="ansText" onChange={this.inputChange} placeholder="Search..." value={this.props.ans}/>;
	},
	getDefaultProps(){
		return {ans:0}
	}
});

var FormContainer = React.createClass({
	getInitialState: function () {
	  return {output: this.props.output};
	},
	handleBtnClick : function(va,isoperator){
		var txt = this.state.output ;
		var result;
		if(isoperator){
			var output;
			if(isNaN(txt)){
				if(txt.includes("+")){
					result= Number.parseInt(txt.split("+")[0])+Number.parseInt(txt.split("+")[1]);
				}
				else if(txt.includes("-")){
					result= Number.parseInt(txt.split("-")[0])-Number.parseInt(txt.split("-")[1]);
				}
				else if(txt.includes("*")){
					result= Number.parseInt(txt.split("*")[0])*Number.parseInt(txt.split("*")[1]);
				}
				else if(txt.includes("/")){
					result= Number.parseInt(txt.split("/")[0])/Number.parseInt(txt.split("/")[1]);
				}
				if(txt.includes("Infinity")||txt.includes("NaN")){
					result = 0;
				}
				console.log(Number.parseInt(result));
				if(va=="="){
		          	output=result;
				}
				else if (va=="Clr") {
		          	output=0;
				}
				else{
					output = result+""+va;
				}
				this.setState({
		          output:output
		      	});
				
			}else{
				if(va=="="){
		          	output=txt;
				}
				else if (va=="Clr") {
		          	output=0;
				}
				else{
					output = txt=="0" || txt==""?va:txt+""+va;
				}
		        this.setState({
		          output: output
		      	});
			}
			
		}else{
			this.setState({
	          output: txt=="0" || txt==""?va:txt+""+va
	      	});
      	}
	},
	getDefaultProps(){
		return {output:0}
	},
	render : function(){
		var arr = [];
		for(var i =0;i<10;i++){
			arr.push(<BtnClass i={i} key={i} isoperator={false} onUpdate={this.handleBtnClick}/>);
		}
		arr.push(<BtnClass i={"Clr"} key={"clr"} isoperator={true} onUpdate={this.handleBtnClick}/>);
		arr.push(<BtnClass i={"="} key={"eql"} isoperator={true} onUpdate={this.handleBtnClick}/>)
		/*var list =arr.map((Obj,i) =>{
				return (
					<BtnClass i={i} key={i}/>
				);
			});*/
		return 	(<div id="form_container">
					<div id="result_output"> <InputElem ans={this.state.output}/> </div>
					<div>
						<div id="calc_btn_holder">
							<div id="calc_buttons">
								{arr}
							</div>
							<div id="oper_btns">
								<BtnClass i={"+"} key={"sum"} isoperator={true} onUpdate={this.handleBtnClick}/>
								<BtnClass i={"-"} key={"sub"} isoperator={true} onUpdate={this.handleBtnClick}/>
								<BtnClass i={"*"} key={"mul"} isoperator={true} onUpdate={this.handleBtnClick}/>
								<BtnClass i={"/"} key={"div"} isoperator={true} onUpdate={this.handleBtnClick}/>
							</div>
						</div>
					</div>
				</div>);
	}
});

$(document).ready(function() {
	//var elem = $(".form_container #calc_buttons")
	/*$(".form_container #calc_buttons").each(function(key, elem) {
        console.log(elem)
        ReactDOM.render(<BtnClass s={new Date().getTime()}/>, elem);
        console.log("sdfs");
    });*/
	/*var arr = [];
	for(var i =0;i<10;i++){
		arr.push(<BtnClass i={i} key={i}/>);
	}*/
	ReactDOM.render(
		<FormContainer/>,
		document.body
	);
	/*ReactDOM.render(
	    React.createElement("div",{id:'calc_buttons'},arr),
	    document.getElementById('calc_btn_holder')
	);*/
	
});
