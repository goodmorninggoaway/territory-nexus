import React, { Component } from 'react';
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Route } from 'react-router';
import CongregationContainer from './congregation/CongregationContainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { sidebar: true };
    }

    getNav() {
        return [
            { name: 'My Congregation', url: '/my-congregation', component: CongregationContainer },
            { name: 'Synchronize', url: '/sync', component: Box },
        ];
    }

    render() {
        const { sidebar } = this.state;

        return (
            <Grommet full theme={grommet}>
                <Grid
                    fill
                    rows={['auto', 'flex']}
                    columns={['auto', 'flex']}
                    areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'sidebar', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] },
                    ]}
                >
                    <Box
                        gridArea="header"
                        direction="row"
                        align="center"
                        justify="between"
                        pad={{ horizontal: 'medium', vertical: 'small' }}
                        background="dark-2"
                    >
                        <Button onClick={() => this.setState({ sidebar: !sidebar })}>
                            <Text size="large">Territory Nexus</Text>
                        </Button>
                        <Text>my@email</Text>
                    </Box>
                    <Box
                        gridArea="sidebar"
                        background="dark-3"
                        width="small"
                        animation={[
                            { type: 'fadeIn', duration: 300 },
                            { type: 'slideRight', size: 'xlarge', duration: 150 },
                        ]}
                    >
                        {this.getNav().map(({ name, url }) => (
                            <Button key={name} href={url} hoverIndicator>
                                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                                    <Text>{name}</Text>
                                </Box>
                            </Button>
                        ))}
                    </Box>
                    <Box gridArea="main" background="light-4" >
                        {this.getNav().map(({ name, url, component }) => (
                            <Route path={url} component={component} />
                        ))}
                    </Box>
                </Grid>
            </Grommet>
        );
    }
}

export default App;
