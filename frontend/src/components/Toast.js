import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { Box, Layer, Text, Button } from 'grommet';
import { StatusGood, FormClose } from 'grommet-icons';

class Toast extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {};
    }

    render() {
        const { open } = this.state;
        return (
            <Layer
                position="bottom"
                full="horizontal"
                modal={false}
                responsive={false}
                onEsc={this.onClose}
            >
                <Box
                    align="start"
                    pad={{ vertical: 'medium', horizontal: 'small' }}
                >
                    <Box
                        align="center"
                        direction="row"
                        gap="small"
                        round="medium"
                        elevation="medium"
                        pad={{ vertical: 'xsmall', horizontal: 'small' }}
                        background="status-ok"
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            <StatusGood />
                            <Text>A new virtual machine has been successfully added</Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={this.onClose} plain />
                    </Box>
                </Box>
            </Layer>
        );
    }
}

Toast.propTypes = {};

export default Toast;
