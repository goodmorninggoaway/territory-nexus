import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Layer, Heading, Text, Button } from 'grommet';

const Modal = ({ close, title, children, primaryButton, secondaryButton }) => (
    <Layer
        position="center"
        modal
        onClickOutside={close}
        onEsc={close}
    >
        <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">{title}</Heading>
            {children}
            <Box
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: 'medium', bottom: 'small' }}
            >
                <Button label="OK" onClick={close} color="dark-3" primary />
                <Button label="Cancel" onClick={close} color="dark-3" plain />
            </Box>
        </Box>
    </Layer>
);

Modal.propTypes = {
    /**
     * @param {string} action
     */
    close: PropTypes.func.isRequired,

    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    primaryButton: PropTypes.shape({
        label: PropTypes.string,
    }),
};

export default Modal;
