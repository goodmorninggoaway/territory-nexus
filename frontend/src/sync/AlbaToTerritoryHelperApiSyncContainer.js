import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Box, Accordion, AccordionPanel, Heading } from 'grommet';
import { Help } from 'grommet-icons';

class AlbaToTerritoryHelperApiSyncContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {};
    }

    render() {
        return (
            <Box gap="small" pad="small" direction="row" fill>
                <Box pad="small" gap="small" overflow="auto" background="white" round="xsmall" basis="3/4">
                    <Accordion animate>
                        <AccordionPanel label="1. Copy households from Alba">
                            <Box background="light-2" style={{ height: '800px' }}>
                                Panel 1 contents
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="2. Choose languages to synchronize">
                            <Box background="light-2" style={{ height: '50px' }}>
                                Panel 2 contents
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="3. Start importing households">
                            <Box background="light-2" style={{ height: '300px' }}>
                                Panel 3 contents
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="4. Automatically synchronize locations with Territory Helper">
                            <Box background="light-2" style={{ height: '300px' }}>
                                Panel 3 contents
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                </Box>

                <Box pad="small" gap="small" overflow="auto" background="white" round="xsmall" basis="1/4">
                    <Box align="center" direction="row"><Help /> <Heading level={3} margin="xsmall">Help</Heading></Box>
                </Box>
            </Box>
        );
    }
}

AlbaToTerritoryHelperApiSyncContainer.propTypes = {};

export default AlbaToTerritoryHelperApiSyncContainer;
