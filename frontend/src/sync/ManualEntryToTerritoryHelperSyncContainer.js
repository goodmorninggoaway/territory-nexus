import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Box, Accordion, AccordionPanel, Heading } from 'grommet';
import { Help } from 'grommet-icons';

class AlbaToTerritoryHelperSyncContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {};
    }

    render() {
        const {} = this.props;
        const {} = this.state;
        return (
            <Box gap="small" pad="small" direction="row" fill>
                <Box pad="small" gap="small" overflow="auto" background="white" round="xsmall" basis="3/4">
                    <Accordion animate>
                        <AccordionPanel label="1. Add or remove households">
                            <Box background="light-2" style={{ height: '800px' }}>
                                Panel 1 contents
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="2. Get existing locations from Territory Helper">
                            <Box background="light-2" style={{ height: '300px' }}>
                                Panel 3 contents
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="3. Get territories from Territory Helper">
                            <Box background="light-2" style={{ height: '300px' }}>
                                Panel 3 contents
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="4. Create a file to import in Territory Helper">
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

AlbaToTerritoryHelperSyncContainer.propTypes = {};

export default AlbaToTerritoryHelperSyncContainer;
