import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Box, Heading, Button, DataTable, Text } from 'grommet';
import { ChapterAdd, Edit, Trash } from 'grommet-icons';

class AdminCongregationsContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            congregations: [
                {
                    id: '1',
                    name: 'Sesame Street',
                    language: 'English',
                    users: [
                        { id: '1_1', name: 'Grover', email: 'grover@sesamestreet.pbs.com' },
                        { id: '1_2', name: 'Elmo', email: 'elmo@sesamestreet.pbs.com' },
                    ],
                },
                {
                    id: '2',
                    name: 'Phillipi',
                    language: 'Greek',
                    users: [
                        { id: '2_1', name: 'Dionysius', email: 'd_ph@gmail.com' },
                        { id: '2_2', name: 'Paul Saul', email: '2.da.nations@apostles.com' },
                    ],
                },
                {
                    id: '3',
                    name: 'Santorini',
                    language: 'Greek',
                    users: [],
                },
                {
                    id: '4',
                    name: 'Oat City',
                    language: 'Hebrew',
                    users: [
                        { id: '4_1', name: 'Ping Pong', email: 'ping@pong.io' },
                    ],
                },
                {
                    id: '5',
                    name: 'Morrisville Central',
                    language: 'Hindi',
                    users: [
                        { id: '5_1', name: 'Ramesh Rao', email: 'ram@outlook.com' },
                    ],
                },
            ],
        };
    }

    render() {
        const { congregations } = this.state;
        return (
            <Box pad="small" background="white" round="xsmall" margin="small">
                <Box direction="row" justify="between">
                    <Heading level={3} margin="xsmall">Congregations</Heading>
                    <Box>
                        <Button label="New Congregation" icon={<ChapterAdd />} primary />
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
                                header: 'Name',
                                property: 'name',
                            },
                            {
                                header: 'Language',
                                property: 'language',
                            },
                            {
                                header: 'Users',
                                property: 'users',
                                render: ({ users }) => (
                                    <>
                                        {users && users.map(({ id, name, email }) => <Text>{name} ({email}), </Text>)}
                                    </>
                                ),
                            },
                        ]}
                        data={congregations}
                    />
                </Box>
            </Box>
        );
    }
}

AdminCongregationsContainer.propTypes = {};

export default AdminCongregationsContainer;
