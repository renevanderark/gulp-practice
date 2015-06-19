var React = require('react'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams'),
	appDispatcher = require('../appDispatcher'),
	assign = require('object-assign'),
	_ = require('underscore');

var Paginator = React.createClass({
	getInitialState() {
		return {
			page: 1,
			numberOfRecords: 0,
			numberOfPages: 0,
			range: this.getCurrentRange()
		};
	},

	componentDidMount() { 
	    window.addEventListener('resize', this.handleResize);
		ResultSet.addChangeListener(this._onChange);
		QueryParams.addResetListener(this._onQueryChange);
		QueryParams.addChangeListener(this._onQueryChange);
	},

	_onChange() {
		this.setState({
			numberOfRecords: ResultSet.data.numberOfRecords, 
			numberOfPages: parseInt(Math.ceil(ResultSet.data.numberOfRecords / this.props.maxperpage))
		});
	},
 
 	_onQueryChange() {
 		this.setState({page: parseInt(QueryParams.data.page), numberOfPages: 0});
 	},

 	componentWillUnmount() { 
    	window.removeEventListener('resize', this.handleResize); 		
		ResultSet.removeChangeListener(this._onChange);
		QueryParams.removeChangeListener(this._onQueryChange);
		QueryParams.removeResetListener(this._onQueryChange);
 	},

 	getCurrentRange() {
 		var calced = parseInt(Math.floor(window.innerWidth / 100));
 		return calced > 10 ? 10 : calced;
 	},

	handleResize(e) {
		this.setState({range: this.getCurrentRange()});
	},

 	getPages() {
 		var start = this.state.page - this.state.range,
 			end = this.state.page + parseInt(this.state.range);

 		if(end > this.state.numberOfPages) {
 			start = this.state.numberOfPages - parseInt(this.state.range) * 2;
 			end = this.state.numberOfPages;
 		}

 		if(start < 1) { 
 			start = 1; 
 			end = parseInt(this.state.range) * 2 + 1;
 			if(end > this.state.numberOfPages) { end = this.state.numberOfPages; }
 		}

 		return _.range(start, end + 1);
 	},

 	jumpToPage(event) {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {
				query: QueryParams.data.query,
				coll: QueryParams.data.coll,
				facets: QueryParams.data.facets || {},
				page: parseInt(event.target.getAttribute('data-page'))
			}
		});
 	},

	render() {
		var _self = this,
			jumpToFirst = this.state.page === 1 ? "" : <a onClick={this.jumpToPage} data-page="1" className="blocky">&lt;</a>,
			jumpToLast = this.state.page === this.state.numberOfPages ? "" : <a onClick={this.jumpToPage} data-page={this.state.numberOfPages} className="blocky">&gt;</a>;
		if(this.state.numberOfPages <= 1) {
			return <div className="paginator" />
		} else {
			return (
				<div className="paginator">
					{jumpToFirst}
					{this.getPages().map(function(page, i) { 
						if(page !== _self.state.page) {
							return <a className="blocky" onClick={_self.jumpToPage} data-page={page} key={i}>{page}</a>; 
						} else {
							return <span  key={i} className="blocky">{page}</span>
						}
					})}
					{jumpToLast}
				</div>
			);
		}
	}
});

module.exports = Paginator;