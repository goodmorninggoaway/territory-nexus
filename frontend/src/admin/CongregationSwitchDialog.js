import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { Box, Layer, Heading, Button } from 'grommet';
import { Login } from 'grommet-icons';
import axios from '../util/axios';
import FetchableFuture from '../util/FetchableFuture';
import Spinner from '../components/Spinner';

class CongregationSwitchDialog extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {};
        FetchableFuture.bind(this, { congregation: null });
    }

    async onSubmit() {
        try {
            const { value } = this.props;
            await this.state.congregation.fetch(axios.put(`/auth`, { congregation: value._id }));
            this.props.history.push('/my-congregation');
        } catch (e) {
            // TODO add toasts or something for notifications
            alert('An error has occurred.');
            console.error(e);
        }
    }

    render() {
        const { close, value } = this.props;
        const { congregation } = this.state;

        return (
            <Layer
                position="center"
                modal
                onClickOutside={close}
                onEsc={close}
            >
                <Box pad="medium" gap="small">
                    <Heading level={3} margin="none">
                        Switch to the <strong>{value.name}</strong> view?
                    </Heading>

                    <Box
                        as="footer"
                        gap="small"
                        direction="row"
                        align="center"
                        justify="end"
                        pad={{ top: 'medium', bottom: 'small' }}
                    >
                        <Button
                            label="Switch"
                            icon={congregation.loading ? <Spinner /> : <Login />}
                            primary
                            disabled={congregation.loading}
                            onClick={this.onSubmit}
                        />
                        <Button plain label="Cancel" onClick={close} />
                    </Box>
                </Box>
            </Layer>
        );
    }
}

CongregationSwitchDialog.propTypes = {
    close: PropTypes.func.isRequired,
    value: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
    }),
};

export default CongregationSwitchDialog;
