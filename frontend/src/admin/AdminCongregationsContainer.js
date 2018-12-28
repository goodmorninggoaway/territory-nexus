import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Box, Heading, Button, DataTable, Text } from 'grommet';
import { ChapterAdd, Edit, Trash } from 'grommet-icons';
import FetchableFuture from '../util/FetchableFuture';
import axios from '../util/axios';

class AdminCongregationsContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        FetchableFuture.bind(this, { congregations: [] });
    }

    componentDidMount() {
        this.state.congregations.fetch(axios.get('/congregations'));
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
                    {congregations.loaded && (
                        <DataTable
                            data={congregations.value}
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
                        />
                    )}
                    {(congregations.loading || !congregations.loaded) && <div>Loading</div>}
                </Box>
            </Box>
        );
    }
}

AdminCongregationsContainer.propTypes = {};

export default AdminCongregationsContainer;
