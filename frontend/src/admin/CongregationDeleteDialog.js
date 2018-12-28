import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { Box, Layer, Heading, Button } from 'grommet';
import { Trash } from 'grommet-icons';
import axios from '../util/axios';
import FetchableFuture from '../util/FetchableFuture';
import Spinner from '../components/Spinner';

class CongregationDeleteDialog extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {};
        FetchableFuture.bind(this, { congregation: null });
    }

    async onSubmit() {
        const { close, value } = this.props;
        await this.state.congregation.fetch(axios.delete(`/congregations/${value._id}`));
        close();
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
                        Are you sure you want to delete {value.name}?
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
                            label="Delete"
                            icon={congregation.loading ? <Spinner /> : <Trash />}
                            color="status-critical"
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

CongregationDeleteDialog.propTypes = {
    close: PropTypes.func.isRequired,
    value: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
    }),
};

export default CongregationDeleteDialog;
