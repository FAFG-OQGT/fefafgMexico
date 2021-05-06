import React from 'react';
import { withRouter } from 'react-router';


class ScrollToTop extends React.Component {
    _isMounted = false;
    componentDidUpdate(prevProps) {
        this._isMounted = true;
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop);