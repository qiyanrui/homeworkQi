let Board = React.createClass({
    getInitialState(){
        return {message:[]};
    },
    handleClick(){
        this.state.message.push(this.refs.myTxt.value);
        this.setState({message:this.state.message});
    },
    render(){
        return (
            <div className="panel panel-default">
            <div className="panel-heading">
            <h1>珠峰留言版</h1>
            </div>
            <div className="panel-body">
            <ul className="list-group">
            {this.state.message.map(function (item, index) {
                return <li key={index}>{item}</li>
            })}
            </ul>
        </div>
        <div className="panel-footer">
            <input ref="myTxt" type="text" className="form-control"/>
            <button className="btn btn-primary" onClick={this.handleClick}>留言</button>
        </div>
        </div>
    )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));
