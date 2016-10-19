var BtnClass = React.createClass({
	displayName: "BtnClass",

	getInitialState: function () {
		return { i: this.props.i };
	},
	handleBtnClick: function () {

		this.props.onUpdate(this.state.i, this.props.isoperator);
	},
	render: function () {
		var i = this.props.i;
		return React.createElement("input", { type: "button", className: "calc_number", value: i, onClick: this.handleBtnClick, isoperator: this.props.isoperator });
	},
	getDefaultProps() {
		return { s: 0, i: 0 };
	}
});

var InputElem = React.createClass({
	displayName: "InputElem",

	getInitialState: function () {
		return { ans: this.props.ans };
	},
	inputChange: function () {
		console.log("change");
	},
	render: function () {
		return React.createElement("input", { type: "text", ref: "ansText", onChange: this.inputChange, placeholder: "Search...", value: this.props.ans });
	},
	getDefaultProps() {
		return { ans: 0 };
	}
});

var FormContainer = React.createClass({
	displayName: "FormContainer",

	getInitialState: function () {
		return { output: this.props.output };
	},
	handleBtnClick: function (va, isoperator) {
		var txt = this.state.output;
		var result;
		if (isoperator) {
			var output;
			if (isNaN(txt)) {
				if (txt.includes("+")) {
					result = Number.parseInt(txt.split("+")[0]) + Number.parseInt(txt.split("+")[1]);
				} else if (txt.includes("-")) {
					result = Number.parseInt(txt.split("-")[0]) - Number.parseInt(txt.split("-")[1]);
				} else if (txt.includes("*")) {
					result = Number.parseInt(txt.split("*")[0]) * Number.parseInt(txt.split("*")[1]);
				} else if (txt.includes("/")) {
					result = Number.parseInt(txt.split("/")[0]) / Number.parseInt(txt.split("/")[1]);
				}
				if (txt.includes("Infinity") || txt.includes("NaN")) {
					result = 0;
				}
				console.log(Number.parseInt(result));
				if (va == "=") {
					output = result;
				} else if (va == "Clr") {
					output = 0;
				} else {
					output = result + "" + va;
				}
				this.setState({
					output: output
				});
			} else {
				if (va == "=") {
					output = txt;
				} else if (va == "Clr") {
					output = 0;
				} else {
					output = txt == "0" || txt == "" ? va : txt + "" + va;
				}
				this.setState({
					output: output
				});
			}
		} else {
			this.setState({
				output: txt == "0" || txt == "" ? va : txt + "" + va
			});
		}
	},
	getDefaultProps() {
		return { output: 0 };
	},
	render: function () {
		var arr = [];
		for (var i = 0; i < 10; i++) {
			arr.push(React.createElement(BtnClass, { i: i, key: i, isoperator: false, onUpdate: this.handleBtnClick }));
		}
		arr.push(React.createElement(BtnClass, { i: "Clr", key: "clr", isoperator: true, onUpdate: this.handleBtnClick }));
		arr.push(React.createElement(BtnClass, { i: "=", key: "eql", isoperator: true, onUpdate: this.handleBtnClick }));
		/*var list =arr.map((Obj,i) =>{
  		return (
  			<BtnClass i={i} key={i}/>
  		);
  	});*/
		return React.createElement(
			"div",
			{ id: "form_container" },
			React.createElement(
				"div",
				{ id: "result_output" },
				" ",
				React.createElement(InputElem, { ans: this.state.output }),
				" "
			),
			React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ id: "calc_btn_holder" },
					React.createElement(
						"div",
						{ id: "calc_buttons" },
						arr
					),
					React.createElement(
						"div",
						{ id: "oper_btns" },
						React.createElement(BtnClass, { i: "+", key: "sum", isoperator: true, onUpdate: this.handleBtnClick }),
						React.createElement(BtnClass, { i: "-", key: "sub", isoperator: true, onUpdate: this.handleBtnClick }),
						React.createElement(BtnClass, { i: "*", key: "mul", isoperator: true, onUpdate: this.handleBtnClick }),
						React.createElement(BtnClass, { i: "/", key: "div", isoperator: true, onUpdate: this.handleBtnClick })
					)
				)
			)
		);
	}
});

$(document).ready(function () {
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
	ReactDOM.render(React.createElement(FormContainer, null), document.body);
	/*ReactDOM.render(
     React.createElement("div",{id:'calc_buttons'},arr),
     document.getElementById('calc_btn_holder')
 );*/
});