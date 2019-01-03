import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Box, Heading, Text, DataTable, Button } from 'grommet';
import { Trash, Edit, UserAdd, ChapterAdd } from 'grommet-icons';
import FetchableFuture from '../util/FetchableFuture';
import Congregation from './Congregation';

class CongregationContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            congregation: {
                name: 'West Corinth',
                language: 'English',
                alternateLanguages: ['Roman', 'Greek'],
            },
            users: [
                { id: '1', name: 'Marque Davis', email: 'mdavis777@gmail.com' },
                { id: '2', name: 'Sizzla', email: 'pinkpinky@gmail.com' },
                { id: '3', name: 'Popcaan', email: 'steelbangles@pulse.com' },
            ],
            integrations: [
                { from: { source: 'alba', type: 'location-export' }, to: { source: 'territory-helper', type: 'location-import' } },
            ],
        };

    }

    render() {
        const { users, congregation, integrations } = this.state;
        return (
            <Box pad="small" gap="small" overflow="auto">
                <Box pad="small" background="white" round="xsmall">
                    <Congregation />
                </Box>
                <Box direction="row" gap="small" justify="between">
                    <Box pad="small" background="white" round="xsmall" fill>
                        <Box direction="row" justify="between">
                            <Heading level={3} margin="xsmall">Users</Heading>
                            <Box>
                                <Button label="Invite" icon={<UserAdd />} primary />
                            </Box>
                        </Box>
                        <Box>
                            <DataTable
                                columns={[
                                    {
                                        header: '',
                                        property: 'id',
                                        render: () => (
                                            <Box direction="row">
                                                <Button icon={<Edit />} />
                                                <Button icon={<Trash />} />
                                            </Box>
                                        ),
                                    },
                                    { header: 'Name', property: 'name', search: true },
                                    { header: 'Email', property: 'email', search: true },
                                ]}
                                data={users}
                            />
                        </Box>
                    </Box>
                    <Box pad="small" background="white" round="xsmall" fill>
                        <Box direction="row" justify="between">
                            <Heading level={3} margin="xsmall">Integrations</Heading>
                            <Box>
                                <Button label="Add Integration" icon={<ChapterAdd />} primary />
                            </Box>
                        </Box>
                        <Box>
                            <DataTable
                                columns={[
                                    {
                                        header: '',
                                        property: 'id',
                                        render: () => (
                                            <Box direction="row">
                                                <Button icon={<Edit />} />
                                                <Button icon={<Trash />} />
                                            </Box>
                                        ),
                                    },
                                    {
                                        header: 'Source',
                                        property: 'from',
                                        render: ({ from: { source, type } }) => (
                                            <Text>{source}: {type}</Text>
                                        ),
                                    },
                                    {
                                        header: 'Destination',
                                        property: 'to',
                                        render: ({ to: { source, type } }) => (
                                            <Text>{source}: {type}</Text>
                                        ),
                                    },
                                ]}
                                data={integrations}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

CongregationContainer.propTypes = {};

export default CongregationContainer;
