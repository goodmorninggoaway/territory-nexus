import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Box, Heading, Button, DataTable, Text } from 'grommet';
import { ChapterAdd, Edit, Trash, Login } from 'grommet-icons';
import FetchableFuture from '../util/FetchableFuture';
import axios from '../util/axios';
import CongregationFormModal from './CongregationFormModal';
import CongregationDeleteDialog from './CongregationDeleteDialog';
import CongregationSwitchDialog from './CongregationSwitchDialog';

class AdminCongregationsContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            showAddCongregationModal: false,
            showEditCongregationModal: false,
            showDeleteCongregationConfirmation: false,
            showSwitchCongregationConfirmation: false,
        };

        FetchableFuture.bind(this, { congregations: [] });
    }

    componentDidMount() {
        this.fetchCongregations();
    }

    fetchCongregations() {
        this.state.congregations.fetch(axios.get('/congregations'));
    }

    render() {
        const { congregations, showAddCongregationModal, showEditCongregationModal, showDeleteCongregationConfirmation, showSwitchCongregationConfirmation } = this.state;
        return (
            <Box pad="small" background="white" round="xsmall" margin="small">
                <Box direction="row" justify="between">
                    <Heading level={3} margin="xsmall">Congregations</Heading>
                    <Box>
                        <Button label="New Congregation" icon={<ChapterAdd />} primary onClick={() => this.setState({ showAddCongregationModal: true })} />
                    </Box>
                </Box>
                <Box>
                    {congregations.loaded && (
                        <DataTable
                            data={congregations.value}
                            columns={[
                                {
                                    header: '',
                                    property: '_id',
                                    render: (datum) => (
                                        <Box direction="row">
                                            <Button icon={<Edit />} onClick={() => this.setState({ showEditCongregationModal: datum })} />
                                            <Button icon={<Trash />} onClick={() => this.setState({ showDeleteCongregationConfirmation: datum })} />
                                            <Button icon={<Login />} onClick={() => this.setState({ showSwitchCongregationConfirmation: datum })} />
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
                                            {users && users.map(({ name, email }) => <Text key={email}>{name} ({email}), </Text>)}
                                        </>
                                    ),
                                },
                            ]}
                        />
                    )}
                    {(congregations.loading || !congregations.loaded) && <div>Loading</div>}
                </Box>

                {showAddCongregationModal && (
                    <CongregationFormModal
                        create
                        close={() => this.setState({ showAddCongregationModal: false }, this.fetchCongregations)}
                    />
                )}
                {showEditCongregationModal && (
                    <CongregationFormModal
                        edit
                        value={showEditCongregationModal}
                        close={() => this.setState({ showEditCongregationModal: false }, this.fetchCongregations)}
                    />
                )}
                {showDeleteCongregationConfirmation && (
                    <CongregationDeleteDialog
                        value={showDeleteCongregationConfirmation}
                        close={() => this.setState({ showDeleteCongregationConfirmation: false }, this.fetchCongregations)}
                    />
                )}
                {showSwitchCongregationConfirmation && (
                    <CongregationSwitchDialog
                        value={showSwitchCongregationConfirmation}
                        close={() => this.setState({ showSwitchCongregationConfirmation: false })}
                        history={this.props.history}
                    />
                )}
            </Box>
        );
    }
}

AdminCongregationsContainer.propTypes = {};

export default AdminCongregationsContainer;
