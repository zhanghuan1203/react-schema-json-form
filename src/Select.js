/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import { MenuItem } from 'material-ui/Menu';
import * as MSelect from 'material-ui/Select';

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
        var possibleValue = this.getModelKey(this.props.model, this.props.form.key);
        this.state = {
            currentValue: this.props.model !== undefined && possibleValue ? possibleValue : this.props.form.titleMap != null ? this.props.form.titleMap[0].value : ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.model && nextProps.form.key) {
            this.setState({
                currentValue: this.getModelKey(nextProps.model, nextProps.form.key)
                || (nextProps.form.titleMap != null ? nextProps.form.titleMap[0].value : '')
            });
        }
    }

    getModelKey(model, key) {
        if (Array.isArray(key)) {
            return key.reduce((cur, nxt) => (cur[nxt] || {}), model);
        } else {
            return model[key];
        }
    }

    onSelected(event, selectedIndex, menuItem) {

        this.setState({
            currentValue: menuItem
        });
        event.target.value = menuItem;
        this.props.onChangeValidate(event);
    }

    render() {
        const menuItems = this.props.form.titleMap.map((item, idx) => (
            <MenuItem key={idx}
                      primaryText={item.name}
                      value={item.value} />
        ));

        return (
            <div className={this.props.form.htmlClass}>
                <MSelect
                    value={this.state.currentValue}
                    floatingLabelText={this.props.form.title}
                    disabled={this.props.form.readonly}
                    onChange={this.onSelected}
                    fullWidth={true} >

                    {menuItems}
                </MSelect>
            </div>
        );
    }
}

// Select.propTypes = {
//
// };

export default ComposedComponent(Select);
